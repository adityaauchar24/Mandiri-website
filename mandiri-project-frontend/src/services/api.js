import { envConfig } from '../config/env';

class ApiService {
  constructor() {
    this.baseURL = envConfig.API_BASE_URL;
    this.timeout = 8000; // 8 seconds timeout
    console.log(`🚀 API Service Initialized:`, this.getEnvironmentInfo());
  }

  getEnvironmentInfo() {
    return {
      baseURL: this.baseURL,
      environment: envConfig.ENV,
      isProduction: envConfig.ENV === 'production',
      endpoints: {
        health: envConfig.API_HEALTH_ENDPOINT,
        users: envConfig.API_CONTACT_ENDPOINT
      }
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    console.log(`📡 API Request: ${url}`, options.method || 'GET');

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      clearTimeout(timeoutId);

      // Check if response is HTML (error page) instead of JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error(`❌ Received non-JSON response from ${url}:`, text.substring(0, 200));
        throw new Error('Server returned HTML instead of JSON. Backend might not be running.');
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ HTTP Error ${response.status}:`, errorText);
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ API Response from ${url}:`, data);
      return data;

    } catch (error) {
      clearTimeout(timeoutId);
      console.error(`❌ API Request failed for ${url}:`, error);

      if (error.name === 'AbortError') {
        throw new Error('Request timeout - Backend server is not responding');
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error - Cannot connect to backend server. Please make sure the backend is running on port 5001.');
      } else if (error.message.includes('HTML instead of JSON')) {
        throw new Error('Backend server not found. Please start the backend server on port 5001.');
      }
      
      throw error;
    }
  }

  // Health check with better error handling
  async healthCheck(maxRetries = 2) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔍 Health check attempt ${attempt}/${maxRetries}`);
        const data = await this.request(envConfig.API_HEALTH_ENDPOINT);
        
        if (data.success && data.database === 'Connected') {
          console.log('✅ Backend health check passed');
          return { status: 'connected', data };
        } else {
          console.log('⚠️ Backend health check warning:', data);
          return { status: 'warning', data };
        }
      } catch (error) {
        console.log(`❌ Health check attempt ${attempt} failed:`, error.message);
        if (attempt === maxRetries) {
          return { 
            status: 'error', 
            error: error.message,
            details: 'Make sure the backend server is running on port 5001. Run: cd mandiri-project-backend && npm start'
          };
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
  }

  // Contact form submission
  async submitContactForm(formData) {
    return this.request(envConfig.API_CONTACT_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Test API connection
  async testConnection() {
    return this.request('/api/test');
  }
}

// Create singleton instance
const apiService = new ApiService();
export default apiService;