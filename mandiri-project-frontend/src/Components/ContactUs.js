import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import aboutUsCoconutImg from '../Images/aboutUsCoconutImg.jpg';

// Constants for better maintainability
const INITIAL_FORM_DATA = [
  {
    id: 'full-name',
    title: 'Full Name',
    type: 'text',
    value: '',
    error: false,
    mess: '',
    required: true,
    placeholder: 'Enter your full name',
    maxLength: 50,
    autoComplete: 'name'
  },
  {
    id: 'email',
    title: 'Email',
    type: 'email',
    value: '',
    error: false,
    mess: '',
    required: true,
    placeholder: 'Enter your email address',
    maxLength: 100,
    autoComplete: 'email'
  },
  {
    id: 'phone-number',
    title: 'Phone Number',
    type: 'tel',
    value: '',
    error: false,
    mess: '',
    required: true,
    placeholder: 'Enter your phone number',
    maxLength: 20,
    autoComplete: 'tel'
  },
  {
    id: 'company-name',
    title: 'Company Name',
    type: 'text',
    value: '',
    error: false,
    mess: '',
    required: true,
    placeholder: 'Enter your company name',
    maxLength: 100,
    autoComplete: 'organization'
  },
  {
    id: 'message',
    title: 'Message',
    type: 'textarea',
    value: '',
    error: false,
    mess: '',
    required: true,
    placeholder: 'Enter your message (minimum 10 characters)',
    maxLength: 1000,
    rows: 5,
    autoComplete: 'off'
  }
];

const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[1-9][\d\s\-()]{8,20}$/,
  name: /^[a-zA-Z\s\-']{2,50}$/
};

const ERROR_MESSAGES = {
  required: (field) => `${field} is required`,
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number (8-20 digits)',
  name: 'Please enter a valid name (2-50 characters)',
  message: 'Message must be between 10 and 1000 characters'
};

// Default message state
const DEFAULT_MESSAGE_STATE = {
  success: false,
  error: false,
  message: ''
};

const ContactUs = ({ setShowMessage, showMessage }) => {
  // Safe state management for showMessage
  const safeShowMessage = useMemo(() => {
    return showMessage || DEFAULT_MESSAGE_STATE;
  }, [showMessage]);

  const safeSetShowMessage = useCallback((message) => {
    if (setShowMessage) {
      setShowMessage(message || DEFAULT_MESSAGE_STATE);
    }
  }, [setShowMessage]);

  const [formFieldData, setFormFieldData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [backendStatus, setBackendStatus] = useState('checking');
  const [characterCounts, setCharacterCounts] = useState({});
  const formRef = useRef(null);
  const navigate = useNavigate();

  // Local development configuration
  const API_BASE_URL = 'http://localhost:5001';
  const API_CONTACT_ENDPOINT = '/api/users';

  // Check backend connection on component mount
  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    try {
      setBackendStatus('checking');
      console.log('🔍 Checking backend connection to:', `${API_BASE_URL}/health`);
      
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.database === 'Connected') {
          setBackendStatus('connected');
          console.log('✅ Backend is connected and running');
        } else {
          setBackendStatus('error');
        }
      } else {
        setBackendStatus('error');
      }
    } catch (error) {
      setBackendStatus('error');
      console.log('❌ Backend connection error:', error.message);
    }
  };

  const handleRetryConnection = () => {
    checkBackendConnection();
  };

  // Enhanced validation patterns with better international support
  const validationPatterns = useMemo(() => VALIDATION_PATTERNS, []);

  // Field validation helper
  const validateField = useCallback((field) => {
    const trimmedValue = field.value.trim();
    const newField = { ...field, error: false, mess: '' };

    // Required field validation
    if (field.required && trimmedValue === '') {
      return { 
        ...newField, 
        error: true, 
        mess: ERROR_MESSAGES.required(field.title)
      };
    }
    
    // Email validation
    if (field.title === 'Email' && trimmedValue && !validationPatterns.email.test(trimmedValue)) {
      return { 
        ...newField, 
        error: true, 
        mess: ERROR_MESSAGES.email
      };
    }
    
    // Phone validation
    if (field.title === 'Phone Number' && trimmedValue && !validationPatterns.phone.test(trimmedValue.replace(/\s/g, ''))) {
      return { 
        ...newField, 
        error: true, 
        mess: ERROR_MESSAGES.phone
      };
    }
    
    // Name validation
    if (field.title === 'Full Name' && trimmedValue && !validationPatterns.name.test(trimmedValue)) {
      return { 
        ...newField, 
        error: true, 
        mess: ERROR_MESSAGES.name
      };
    }
    
    // Message length validation
    if (field.title === 'Message' && trimmedValue && (trimmedValue.length < 10 || trimmedValue.length > 1000)) {
      return { 
        ...newField, 
        error: true, 
        mess: ERROR_MESSAGES.message
      };
    }
    
    return newField;
  }, [validationPatterns.email, validationPatterns.phone, validationPatterns.name]);

  // Enhanced field change function with immediate validation
  const handleFormOnChange = useCallback((title, val) => {
    setFormFieldData(prev => prev.map(elm => {
      if (elm.title === title) {
        const newField = { 
          ...elm, 
          value: val,
          error: false,
          mess: ''
        };
        
        // Update character count for message field
        if (title === 'Message') {
          setCharacterCounts(prev => ({ ...prev, message: val.length }));
        }
        
        // Immediate validation for touched fields
        if (touchedFields[title]) {
          return validateField(newField);
        }
        
        return newField;
      }
      return elm;
    }));
  }, [touchedFields, validateField]);

  // Handle field blur for validation
  const handleFieldBlur = useCallback((title) => {
    setTouchedFields(prev => ({ ...prev, [title]: true }));
    
    setFormFieldData(prev => prev.map(elm => {
      if (elm.title === title) {
        return validateField(elm);
      }
      return elm;
    }));
  }, [validateField]);

  // Enhanced form validation with better error messages
  const handleFormValidation = useCallback(() => {
    let isValid = true;
    
    const validationData = formFieldData.map(elm => {
      const validatedField = validateField(elm);
      if (validatedField.error) {
        isValid = false;
      }
      return validatedField;
    });

    setFormFieldData(validationData);
    
    // Mark all fields as touched
    const allTouched = {};
    formFieldData.forEach(field => {
      allTouched[field.title] = true;
    });
    setTouchedFields(allTouched);
    
    return isValid;
  }, [formFieldData, validateField]);

  // Auto-hide success message with cleanup
  useEffect(() => {
    if (safeShowMessage.success) {
      const timer = setTimeout(() => {
        safeSetShowMessage(DEFAULT_MESSAGE_STATE);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [safeShowMessage.success, safeSetShowMessage]);

  // Validate form on data change - ENHANCED
  useEffect(() => {
    const hasErrors = formFieldData.some(field => field.error);
    const requiredFieldsFilled = formFieldData
      .filter(field => field.required)
      .every(field => field.value.trim() !== '');
    
    setIsFormValid(!hasErrors && requiredFieldsFilled && backendStatus === 'connected');
  }, [formFieldData, backendStatus]);

  // Initialize character counts
  useEffect(() => {
    const initialCounts = {};
    formFieldData.forEach(field => {
      if (field.maxLength) {
        initialCounts[field.title] = field.value.length;
      }
    });
    setCharacterCounts(initialCounts);
  }, []);

  // Navigation handler to go back to services
  const navigateToServices = useCallback(() => {
    navigate('/services');
  }, [navigate]);

  // Form submission
  const handleContactFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (backendStatus !== 'connected') {
      safeSetShowMessage({ 
        success: false, 
        error: true, 
        message: 'Backend server is not connected. Please make sure the backend is running on localhost:5001' 
      });
      return;
    }

    // Clear any previous messages when starting new submission
    safeSetShowMessage(null);
    setIsSubmitting(true);

    if (!handleFormValidation()) {
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('📤 Sending contact form data to:', `${API_BASE_URL}${API_CONTACT_ENDPOINT}`);
      
      // Transform form data to match backend expectations
      const submissionData = {
        fullName: formFieldData.find(field => field.title === 'Full Name')?.value.trim() || '',
        email: formFieldData.find(field => field.title === 'Email')?.value.trim().toLowerCase() || '',
        phoneNumber: formFieldData.find(field => field.title === 'Phone Number')?.value.trim() || '',
        companyName: formFieldData.find(field => field.title === 'Company Name')?.value.trim() || '',
        message: formFieldData.find(field => field.title === 'Message')?.value.trim() || ''
      };

      console.log('📝 Submission data:', submissionData);

      const response = await fetch(`${API_BASE_URL}${API_CONTACT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      // Enhanced error handling
      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ Backend response:', result);

      if (result.success) {
        safeSetShowMessage({ 
          success: true, 
          error: false, 
          message: result.message || 'Thank you! Your message has been sent successfully.' 
        });
        
        // Reset form
        setFormFieldData(INITIAL_FORM_DATA);
        setTouchedFields({});
        setCharacterCounts({});
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      
      // Provide user-friendly error messages
      let userFriendlyMessage = error.message;
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        userFriendlyMessage = 'Cannot connect to server. Please make sure the backend is running on localhost:5001';
      } else if (error.message.includes('Failed to fetch')) {
        userFriendlyMessage = 'Network error: Please check if the backend server is running on http://localhost:5001';
      } else if (error.message.includes('Email already exists')) {
        userFriendlyMessage = 'This email is already registered. Please use a different email address.';
      }
      
      safeSetShowMessage({ 
        success: false, 
        error: true, 
        message: userFriendlyMessage 
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formFieldData, handleFormValidation, safeSetShowMessage, backendStatus]);

  // Reset form function
  const handleResetForm = useCallback(() => {
    setFormFieldData(INITIAL_FORM_DATA);
    setTouchedFields({});
    setCharacterCounts({});
    if (formRef.current) {
      formRef.current.reset();
    }
    safeSetShowMessage(null);
  }, [safeSetShowMessage]);

  // Memoized styles for better performance
  const styles = useMemo(() => ({
    // Main container style
    contactContainer: {
      width: "100%",
      minHeight: "100vh",
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      backgroundColor: '#fafbff'
    },

    // Backend Status Styles
    backendStatus: {
      padding: '1rem',
      borderRadius: '8px',
      margin: '1rem auto',
      textAlign: 'center',
      width: '90%',
      maxWidth: '500px',
      boxSizing: 'border-box',
      fontSize: '14px',
      fontWeight: '600'
    },
    checkingStatus: {
      backgroundColor: '#fefcbf',
      border: '1px solid #f6e05e',
      color: '#744210'
    },
    connectedStatus: {
      backgroundColor: '#c6f6d5',
      border: '1px solid #68d391',
      color: '#22543d'
    },
    errorStatus: {
      backgroundColor: '#fed7d7',
      border: '1px solid #feb2b2',
      color: '#c53030'
    },
    retryButton: {
      padding: '8px 16px',
      backgroundColor: '#0802A3',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      marginLeft: '10px',
      transition: 'all 0.3s ease'
    },

    // Hero section styles
    contactUsTitle: {
      width: '100%',
      height: '60vh',
      minHeight: '400px',
      maxHeight: '600px',
      position: 'relative',
      overflow: 'hidden'
    },

    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(8,2,163,0.85) 0%, rgba(74,0,224,0.8) 100%)',
      zIndex: 1
    },

    contactImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      transition: "transform 0.8s ease-out",
      transform: imageLoaded ? 'scale(1)' : 'scale(1.1)',
      filter: imageLoaded ? 'brightness(1)' : 'brightness(0.7)'
    },

    contactText: {
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      padding: '20px',
      boxSizing: 'border-box',
      zIndex: 2,
      textAlign: 'center'
    },

    contactH2: {
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: 700,
      textTransform: 'uppercase',
      color: '#fff',
      margin: '0 0 10px 0',
      letterSpacing: '2px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },

    contactH1: {
      fontSize: 'clamp(2rem, 6vw, 4rem)',
      fontWeight: 800,
      textTransform: 'uppercase',
      color: '#fff',
      margin: '10px 0 20px 0',
      background: 'linear-gradient(45deg, #fff, #e0e0e0)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: 'none'
    },

    contactP: {
      fontSize: 'clamp(1rem, 2vw, 1.3rem)',
      fontWeight: 400,
      lineHeight: "1.6",
      color: '#fff',
      maxWidth: '600px',
      margin: '0 auto',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    },

    // Form container styles
    formContainer: {
      width: '100%',
      maxWidth: '1400px',
      margin: '20px auto',
      padding: '20px',
      boxSizing: 'border-box',
      display: "flex",
      flexWrap: 'wrap',
      gap: '40px',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },

    formSection: {
      flex: '1 1 500px',
      minWidth: '300px',
      maxWidth: '600px',
      border: '2px solid #0802A3',
      borderRadius: '20px',
      padding: '40px 30px',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
      boxShadow: '0 20px 40px rgba(8,2,163,0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },

    formH2: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      textTransform: "uppercase",
      color: '#0802A3',
      fontWeight: 800,
      margin: '0 0 30px 0',
      textAlign: 'center',
      letterSpacing: '1px'
    },

    fieldBox: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '25px',
      position: 'relative'
    },

    label: {
      textAlign: 'left',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      color: '#333',
      marginBottom: '8px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },

    input: {
      padding: "16px 20px",
      fontSize: '16px',
      color: '#333',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      fontFamily: 'inherit',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: backendStatus === 'connected' ? '#ffffff' : '#f7fafc',
      width: '100%',
      boxSizing: 'border-box'
    },

    textarea: {
      padding: "16px 20px",
      fontSize: '16px',
      color: '#333',
      border: '2px solid #e0e0e0',
      borderRadius: '12px',
      fontFamily: 'inherit',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: backendStatus === 'connected' ? '#ffffff' : '#f7fafc',
      width: '100%',
      boxSizing: 'border-box',
      minHeight: '140px',
      resize: 'vertical',
      lineHeight: '1.5'
    },

    errorSpan: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#ff4444',
      textAlign: 'start',
      paddingTop: '6px',
      marginLeft: '5px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },

    submitBtn: {
      margin: '30px 0 10px 0',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: 'center'
    },

    // Button styles
    primaryButton: {
      padding: '14px 32px',
      background: backendStatus === 'connected' ? 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)' : '#718096',
      color: '#fff',
      cursor: backendStatus === 'connected' && !isSubmitting ? 'pointer' : 'not-allowed',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'inherit',
      fontWeight: '600',
      textTransform: 'none',
      letterSpacing: '0.3px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 2px 8px rgba(8,2,163,0.2)',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '220px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      minHeight: '44px',
      opacity: (backendStatus !== 'connected' || isSubmitting) ? 0.6 : 1
    },

    secondaryButton: {
      padding: '12px 24px',
      background: 'transparent',
      color: '#0802A3',
      cursor: 'pointer',
      border: '1.5px solid #0802A3',
      borderRadius: '6px',
      fontSize: '13px',
      fontFamily: 'inherit',
      fontWeight: '500',
      textTransform: 'none',
      letterSpacing: '0.2px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      width: '100%',
      maxWidth: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      minHeight: '40px'
    },

    tertiaryButton: {
      padding: '11px 22px',
      background: 'transparent',
      color: '#666',
      cursor: 'pointer',
      border: '1.5px solid #e0e0e0',
      borderRadius: '6px',
      fontSize: '13px',
      fontFamily: 'inherit',
      fontWeight: '500',
      textTransform: 'none',
      letterSpacing: '0.2px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      width: '100%',
      maxWidth: '160px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      minHeight: '38px'
    },

    contactRightContainer: {
      flex: '1 1 400px',
      minWidth: '300px',
      maxWidth: '500px',
      padding: '40px 30px',
      boxSizing: 'border-box',
      border: '2px solid #0802A3',
      borderRadius: '20px',
      background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
      boxShadow: '0 20px 40px rgba(8,2,163,0.1)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden'
    },

    contactBoxHeader: {
      width: '100%',
      height: '120px',
      background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
      color: '#fff',
      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textTransform: 'uppercase',
      fontWeight: 800,
      borderRadius: '15px',
      marginBottom: '30px',
      textAlign: 'center',
      letterSpacing: '1px',
      position: 'relative',
      overflow: 'hidden'
    },

    contactFieldBox: {
      display: 'flex',
      gap: '18px',
      textAlign: 'start',
      marginBottom: '32px',
      alignItems: 'flex-start'
    },

    contactEmailBox: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      gap: '6px'
    },

    addressLabel: {
      color: '#0802A3',
      fontWeight: '700',
      fontSize: '1em',
      marginBottom: '4px'
    },

    phoneNumLabel: {
      color: '#0802A3',
      fontWeight: '700',
      fontSize: '1em',
      marginBottom: '4px'
    },

    phoneNum: {
      width: '100%',
      color: '#555',
      lineHeight: '1.6'
    },

    emailLabel: {
      color: '#0802A3',
      fontWeight: '700',
      fontSize: '1em',
      marginBottom: '4px'
    },

    emailId: {
      width: '100%',
      color: '#555',
      lineHeight: '1.6'
    },

    // Success message style
    successMessage: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '20px 30px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(76,175,80,0.3)',
      zIndex: 1000,
      animation: 'slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      maxWidth: '400px',
      border: '2px solid #45a049',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    errorMessage: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#ff4444',
      color: 'white',
      padding: '20px 30px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(255,68,68,0.3)',
      zIndex: 1000,
      animation: 'slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      maxWidth: '400px',
      border: '2px solid #cc0000',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },

    characterCount: {
      fontSize: '12px',
      color: '#666',
      textAlign: 'right',
      marginTop: '4px',
      marginRight: '5px'
    },

    requiredAsterisk: {
      color: '#ff4444',
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginLeft: '2px'
    },

    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '100%',
      maxWidth: '220px',
      alignItems: 'center'
    },

    connectionInfo: {
      fontSize: '12px',
      color: '#718096',
      textAlign: 'center',
      marginTop: '10px',
      fontStyle: 'italic'
    }
  }), [imageLoaded, backendStatus, isSubmitting]);

  // SVG icons
  const LocationIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#0802A3" style={{ minWidth: '32px', flexShrink: 0 }}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#0802A3" style={{ minWidth: '32px', flexShrink: 0 }}>
      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"/>
    </svg>
  );

  const EmailIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#0802A3" style={{ minWidth: '32px', flexShrink: 0 }}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );

  const SuccessIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  );

  const ErrorIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
  );

  const BackIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  );

  const ResetIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    </svg>
  );

  const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
  );

  // Dynamic styles for hover effects and animations
  const dynamicStyles = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    .form-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(135deg, #0802A3 0%, #4A00E0 100%);
      transform: scaleX(0);
      transition: transform 0.4s ease;
    }
    
    .form-section:hover::before {
      transform: scaleX(1);
    }
    
    .primary-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(8,2,163,0.3);
      background: linear-gradient(135deg, #070294 0%, #4300cb 100%);
    }
    
    .secondary-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(8,2,163,0.15);
      background: rgba(8,2,163,0.05);
    }
    
    .tertiary-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102,102,102,0.15);
      background: rgba(102,102,102,0.05);
      border-color: #999;
      color: #444;
    }
    
    .input-field:focus {
      outline: none;
      border-color: #0802A3;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(8,2,163,0.1);
    }
    
    .input-field:disabled {
      background-color: #f7fafc;
      color: #a0aec0;
      cursor: not-allowed;
    }
    
    .success-message {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .error-message {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .input-error {
      border-color: #ff4444 !important;
      background-color: #fff8f8 !important;
    }
    
    .input-error:focus {
      box-shadow: 0 0 0 3px rgba(255,68,68,0.1) !important;
    }
    
    .button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
    }
    
    @media (max-width: 768px) {
      .form-container {
        gap: 30px;
        margin: 40px auto;
        padding: 15px;
      }
      
      .contact-hero {
        height: 50vh;
        min-height: 350px;
      }
      
      .form-section, .contact-right {
        padding: 30px 20px;
      }
    }
    
    @media (max-width: 480px) {
      .form-section, .contact-right {
        min-width: 100%;
        padding: 25px 15px;
        margin: 0 10px;
      }
      
      .contact-hero {
        height: 40vh;
        min-height: 300px;
      }
      
      .success-message, .error-message {
        right: 10px;
        left: 10px;
        max-width: calc(100% - 20px);
      }
    }
  `;

  const getStatusMessage = () => {
    switch (backendStatus) {
      case 'checking':
        return {
          message: '🔄 Checking backend connection...',
          style: { ...styles.backendStatus, ...styles.checkingStatus }
        };
      case 'connected':
        return {
          message: '✅ Backend connected - Data will be saved permanently to MongoDB',
          style: { ...styles.backendStatus, ...styles.connectedStatus }
        };
      case 'error':
        return {
          message: '❌ Backend not connected - Form submission disabled',
          style: { ...styles.backendStatus, ...styles.errorStatus }
        };
      default:
        return {
          message: '🔍 Checking connection...',
          style: { ...styles.backendStatus, ...styles.checkingStatus }
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div style={styles.contactContainer} role="main" aria-label="Contact Us">
      <style>{dynamicStyles}</style>
      
      {/* Success/Error Messages */}
      {safeShowMessage.success && (
        <div style={styles.successMessage} className="success-message" role="alert">
          <SuccessIcon />
          <span>{safeShowMessage.message}</span>
        </div>
      )}
      
      {safeShowMessage.error && (
        <div style={styles.errorMessage} className="error-message" role="alert">
          <ErrorIcon />
          <span>{safeShowMessage.message}</span>
        </div>
      )}

      {/* Backend Connection Status */}
      <div style={statusInfo.style}>
        {statusInfo.message}
        {backendStatus === 'error' && (
          <button 
            type="button"
            style={styles.retryButton}
            onClick={handleRetryConnection}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#4A00E0';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#0802A3';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Retry Connection
          </button>
        )}
      </div>

      {/* Hero Section */}
      <section style={styles.contactUsTitle} className="contact-hero" aria-labelledby="contact-hero-title">
        <div style={styles.overlay} aria-hidden="true"></div>
        <img 
          src={aboutUsCoconutImg} 
          alt="Coconut products background" 
          style={styles.contactImage} 
          onLoad={() => setImageLoaded(true)}
          loading="eager"
        />
        <div style={styles.contactText}>
          <h2 style={styles.contactH2}>Get In Touch</h2>
          <h1 style={styles.contactH1} id="contact-hero-title">Contact Us</h1>
          <p style={styles.contactP}>
            Have questions about our coconut products? We're here to help! 
            Reach out to us and our team will get back to you promptly.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <div style={styles.formContainer} className="form-container">
        {/* Contact Form */}
        <form 
          style={styles.formSection} 
          className="form-section"
          ref={formRef}
          noValidate
          aria-labelledby="contact-form-title"
        >
          <h2 style={styles.formH2} id="contact-form-title">Send us a Message</h2>

          {formFieldData.map((elem) => (
            <div key={elem.id} style={styles.fieldBox}>
              <label style={styles.label} htmlFor={elem.id}>
                {elem.title} 
                {elem.required && (
                  <span style={styles.requiredAsterisk} aria-hidden="true">*</span>
                )}
              </label>
              {elem.type === 'textarea' ? (
                <>
                  <textarea
                    id={elem.id}
                    style={{
                      ...styles.textarea,
                      ...(elem.error ? { borderColor: '#ff4444', backgroundColor: '#fff8f8' } : {})
                    }}
                    value={elem.value}
                    onChange={(e) => handleFormOnChange(elem.title, e.target.value)}
                    onBlur={() => handleFieldBlur(elem.title)}
                    placeholder={elem.placeholder}
                    className={`input-field ${elem.error ? 'input-error' : ''}`}
                    required={elem.required}
                    maxLength={elem.maxLength}
                    rows={elem.rows}
                    aria-describedby={elem.error ? `error-${elem.id}` : undefined}
                    aria-invalid={elem.error}
                    autoComplete={elem.autoComplete}
                    disabled={isSubmitting || backendStatus !== 'connected'}
                  />
                  <div style={styles.characterCount}>
                    {characterCounts[elem.title] || 0}/{elem.maxLength}
                  </div>
                </>
              ) : (
                <input
                  id={elem.id}
                  type={elem.type}
                  value={elem.value}
                  style={{
                    ...styles.input,
                    ...(elem.error ? { borderColor: '#ff4444', backgroundColor: '#fff8f8' } : {})
                  }}
                  onChange={(e) => handleFormOnChange(elem.title, e.target.value)}
                  onBlur={() => handleFieldBlur(elem.title)}
                  placeholder={elem.placeholder}
                  className={`input-field ${elem.error ? 'input-error' : ''}`}
                  required={elem.required}
                  maxLength={elem.maxLength}
                  aria-describedby={elem.error ? `error-${elem.id}` : undefined}
                  aria-invalid={elem.error}
                  autoComplete={elem.autoComplete}
                  disabled={isSubmitting || backendStatus !== 'connected'}
                />
              )}
              {elem.error && (
                <span 
                  style={styles.errorSpan} 
                  id={`error-${elem.id}`}
                  role="alert"
                  aria-live="polite"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff4444">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  {elem.mess}
                </span>
              )}
            </div>
          ))}

          {/* Buttons Section */}
          <div style={styles.submitBtn}>
            <div style={styles.buttonContainer}>
              <button 
                type="submit" 
                onClick={handleContactFormSubmit} 
                style={styles.primaryButton}
                className="primary-button"
                disabled={isSubmitting || backendStatus !== 'connected' || !isFormValid}
                aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
              >
                {isSubmitting ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    Sending...
                  </>
                ) : backendStatus !== 'connected' ? (
                  <>
                    <span>🔌</span>
                    Backend Offline
                  </>
                ) : (
                  <>
                    <SendIcon />
                    Send Message
                  </>
                )}
              </button>
              
              <button 
                type="button"
                style={styles.tertiaryButton}
                className="tertiary-button"
                onClick={handleResetForm}
                aria-label="Reset form"
                disabled={isSubmitting}
              >
                <ResetIcon />
                Reset Form
              </button>
              
              <button 
                type="button"
                style={styles.secondaryButton}
                className="secondary-button"
                onClick={navigateToServices}
                aria-label="Go back to services page"
              >
                <BackIcon />
                Back to Services
              </button>
            </div>
            
            <div style={styles.connectionInfo}>
              {backendStatus === 'connected' 
                ? '✅ Connected to backend - Data will be saved to MongoDB'
                : '🔌 Backend connection required to save data'
              }
            </div>
          </div>
        </form>

        {/* Contact Information */}
        <section style={styles.contactRightContainer} className="contact-right" aria-labelledby="contact-info-title">
          <div style={styles.contactBoxHeader}>
            <span id="contact-info-title">Corporate Office</span>
          </div>
          <div role="list" aria-label="Contact information">
            <div style={styles.contactFieldBox} role="listitem">
              <LocationIcon aria-hidden="true" />
              <div style={styles.contactEmailBox}>
                <div style={styles.addressLabel}>
                  <span>Address</span>
                </div>
                <div style={styles.phoneNum}>
                  <address style={{ fontStyle: 'normal' }}>
                    SOHO CAPITAL LT.32 UNIT 7 JL. LETJEN PARMAN KAV 28<br />
                    TANJUNG DUREN SELATAN GROGOL PETAMBURAN<br />
                    JAKARTA BARAT DKI JAKARTA, 11470
                  </address>
                </div>
              </div>
            </div>
            <div style={styles.contactFieldBox} role="listitem">
              <PhoneIcon aria-hidden="true" />
              <div style={styles.contactEmailBox}>
                <div style={styles.phoneNumLabel}>
                  <span>Telephone</span>
                </div>
                <div style={styles.phoneNum}>
                  <a href="tel:+6281311932441" style={{ color: '#555', textDecoration: 'none' }}>+62 813-1193-2441</a><br />
                  <a href="tel:+6287817883677" style={{ color: '#555', textDecoration: 'none' }}>+62 878-1788-3677</a>
                </div>
              </div>
            </div>
            <div style={styles.contactFieldBox} role="listitem">
              <EmailIcon aria-hidden="true" />
              <div style={styles.contactEmailBox}>
                <div style={styles.emailLabel}>
                  <span>Email</span>
                </div>
                <div style={styles.emailId}>
                  <a href="mailto:Ceo@ptinternationalmandiriexpo.com" style={{ color: '#555', textDecoration: 'none' }}>Ceo@ptinternationalmandiriexpo.com</a><br />
                  <a href="mailto:Admin@ptinternationalmandiriexpo.com" style={{ color: '#555', textDecoration: 'none' }}>Admin@ptinternationalmandiriexpo.com</a><br />
                  <a href="mailto:Sales@ptinternationalmandiriexpo.com" style={{ color: '#555', textDecoration: 'none' }}>Sales@ptinternationalmandiriexpo.com</a><br />
                  <a href="mailto:Info@ptinternationalmandiriexpo.com" style={{ color: '#555', textDecoration: 'none' }}>Info@ptinternationalmandiriexpo.com</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(ContactUs);