// Environment configuration for Cyclic deployment
const getEnvConfig = () => {
  // Check if we're in production (on Cyclic) or development
  const isProduction = process.env.NODE_ENV === 'production' || 
                       (typeof window !== 'undefined' && 
                        (window.location.hostname.includes('cyclic') || 
                         !window.location.hostname.includes('localhost')));

  if (isProduction) {
    console.log('🌐 Production environment detected - Using relative URLs');
    return {
      API_BASE_URL: '',
      API_CONTACT_ENDPOINT: '/api/users',
      API_HEALTH_ENDPOINT: '/api/health',
      ENV: 'production'
    };
  } else {
    console.log('🔧 Development environment detected - Using localhost:5001');
    return {
      API_BASE_URL: 'http://localhost:5001',
      API_CONTACT_ENDPOINT: '/api/users',
      API_HEALTH_ENDPOINT: '/api/health',
      ENV: 'development'
    };
  }
};

export const envConfig = getEnvConfig();