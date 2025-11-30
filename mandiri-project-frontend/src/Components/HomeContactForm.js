import React, { useState, useEffect } from 'react';
import worldDeliveryImg from '../Images/worldDeliveryImg.jpg';

const HomeContactForm = ({ setShowMessage, showMessage }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);
    const [backendStatus, setBackendStatus] = useState('checking');
    const [backendUrl, setBackendUrl] = useState(process.env.REACT_APP_API_BASE_URL || 'https://mandiri-project-backend-cnv1.onrender.com');
    // Check backend connection on component mount
    useEffect(() => {
        checkBackendConnection();
    }, []);

    const checkBackendConnection = async () => {
        try {
            setBackendStatus('checking');
            const response = await fetch(`${backendUrl}/api/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                setBackendStatus('connected');
                console.log('✅ Backend connected:', data);
            } else {
                setBackendStatus('error');
                console.log('❌ Backend health check failed');
            }
        } catch (error) {
            setBackendStatus('error');
            console.error('Backend connection failed:', error);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        if (field === 'message') {
            setCharacterCount(value.length);
        }
        
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
        
        if (showMessage?.show) {
            setShowMessage({ show: false });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[\+]?[0-9\s\-\(\)]{8,20}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid phone number (8-20 digits)';
        }
        
        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (backendStatus !== 'connected') {
            setShowMessage({ 
                show: true,
                success: false, 
                message: 'Backend server is not connected. Please start the backend server first.' 
            });
            return;
        }

        setIsSubmitting(true);
        setShowMessage({ show: false });

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            const submissionData = {
                fullName: formData.fullName.trim(),
                email: formData.email.trim().toLowerCase(),
                phoneNumber: formData.phoneNumber.trim(),
                companyName: formData.companyName.trim(),
                message: formData.message.trim()
            };

            console.log('📤 Sending contact form data to backend:', submissionData);

            const response = await fetch(`${backendUrl}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setShowMessage({ 
                    show: true,
                    success: true, 
                    message: result.message || 'Thank you! Your message has been sent successfully and saved to MongoDB Atlas.' 
                });
                
                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    companyName: '',
                    message: ''
                });
                
                setCharacterCount(0);
                setErrors({});
                
                console.log('✅ Form data saved to MongoDB Atlas successfully:', result.data);
            } else {
                // Handle backend validation errors
                if (result.errors && Array.isArray(result.errors)) {
                    const backendErrors = {};
                    result.errors.forEach(error => {
                        if (error.includes('email')) backendErrors.email = error;
                        else if (error.includes('name')) backendErrors.fullName = error;
                        else if (error.includes('phone')) backendErrors.phoneNumber = error;
                        else if (error.includes('company')) backendErrors.companyName = error;
                        else if (error.includes('message')) backendErrors.message = error;
                    });
                    setErrors(backendErrors);
                    throw new Error('Please check the form for errors');
                }
                throw new Error(result.message || result.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('❌ Form submission error:', error);
            
            let userFriendlyMessage = 'Failed to send message. Please try again.';
            
            // Handle specific error cases from your backend
            if (error.message.includes('Email already exists') || 
                error.message.includes('email already exists') ||
                error.message.includes('duplicate') ||
                error.message.includes('already registered')) {
                userFriendlyMessage = 'This email address is already registered. Please use a different email address.';
                setErrors(prev => ({ ...prev, email: 'Email already exists' }));
            } else if (error.message.includes('Network error') || 
                       error.message.includes('Failed to fetch') ||
                       error.message.includes('fetch')) {
                userFriendlyMessage = 'Cannot connect to server. Please check if the backend server is running.';
            } else if (error.message.includes('Request timeout')) {
                userFriendlyMessage = 'Server is taking too long to respond. Please try again later.';
            } else if (error.message.includes('404') || error.message.includes('Not Found')) {
                userFriendlyMessage = 'Contact endpoint not found. Please check backend routes.';
            } else if (error.message.includes('400') || error.message.includes('Bad Request')) {
                userFriendlyMessage = 'Invalid data submitted. Please check your information and try again.';
            } else if (error.message.includes('500') || error.message.includes('Server error')) {
                userFriendlyMessage = 'Server error occurred. Please try again later.';
            } else if (error.message.includes('All fields are required')) {
                userFriendlyMessage = 'Please fill in all required fields.';
            } else {
                userFriendlyMessage = error.message || 'Failed to send message. Please try again.';
            }
          
            setShowMessage({ 
                show: true,
                success: false, 
                message: userFriendlyMessage 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRetryConnection = () => {
        checkBackendConnection();
    };

    const startBackendServer = () => {
        setShowMessage({
            show: true,
            success: false,
            message: 'Please start the backend server manually. Run: cd mandiri-project-backend && npm start'
        });
    };

    // Test backend connection
    const testBackendEndpoints = async () => {
        console.log('🔍 Testing backend endpoints:');
        try {
            const response = await fetch(`${backendUrl}/api/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(`   /api/users: ${response.status} ${response.statusText}`);
            if (response.ok) {
                const data = await response.json();
                console.log(`     ✅ Users endpoint working`);
            }
        } catch (error) {
            console.log(`   /api/users: ❌ ERROR - ${error.message}`);
        }
    };

    // Styles object
    const styles = {
        container: {
            display: 'flex',
            minHeight: '600px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            margin: '2rem auto',
            maxWidth: '1800px',
            maxHeight: '900px',
            width: '90%',
            backgroundColor: '#fff'
        },
        imageSection: {
            flex: '1',
            minWidth: '50%',
            background: `linear-gradient(rgba(8, 2, 163, 0.1), rgba(8, 2, 163, 0.2)), url(${worldDeliveryImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative'
        },
        formSection: {
            flex: '1',
            minWidth: '50%',
            padding: '2rem',
            background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        },
        formWrapper: {
            width: '100%',
            maxWidth: '450px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        form: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column'
        },
        heading: {
            fontSize: 'clamp(24px, 3vw, 28px)',
            fontWeight: '700',
            color: '#0802A3',
            marginBottom: '1rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #0802A3, #4A00E0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            width: '100%'
        },
        subheading: {
            fontSize: '14px',
            color: '#718096',
            textAlign: 'center',
            marginBottom: '2rem',
            fontStyle: 'italic'
        },
        inputGroup: {
            marginBottom: '1.25rem',
            width: '100%'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#2d3748',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            width: '100%'
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            backgroundColor: '#fff',
            fontFamily: 'inherit',
            boxSizing: 'border-box'
        },
        textarea: {
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '16px',
            minHeight: '120px',
            resize: 'vertical',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit',
            backgroundColor: '#fff',
            boxSizing: 'border-box'
        },
        error: {
            color: '#e53e3e',
            fontSize: '14px',
            marginTop: '0.5rem',
            display: 'block',
            width: '100%'
        },
        submitBtn: {
            width: '100%',
            padding: '15px',
            backgroundColor: '#0802A3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '1rem',
            fontFamily: 'inherit',
            boxSizing: 'border-box'
        },
        submittingBtn: {
            backgroundColor: '#4A00E0',
            opacity: 0.7,
            cursor: 'not-allowed'
        },
        disabledBtn: {
            backgroundColor: '#718096',
            cursor: 'not-allowed',
            opacity: 0.6
        },
        successMessage: {
            backgroundColor: '#f0fff4',
            border: '1px solid #9ae6b4',
            color: '#2d7745',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box'
        },
        errorMessage: {
            backgroundColor: '#fed7d7',
            border: '1px solid #feb2b2',
            color: '#c53030',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box'
        },
        backendStatus: {
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'center',
            width: '100%',
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
        requiredText: {
            marginTop: '1rem',
            textAlign: 'center',
            color: '#718096',
            fontSize: '12px',
            width: '100%'
        },
        characterCount: {
            fontSize: '12px',
            color: '#718096',
            textAlign: 'right',
            marginTop: '4px'
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
        startServerButton: {
            padding: '8px 16px',
            backgroundColor: '#2d3748',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            marginLeft: '10px',
            transition: 'all 0.3s ease'
        },
        testEndpointsButton: {
            padding: '6px 12px',
            backgroundColor: '#805ad5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '500',
            cursor: 'pointer',
            marginLeft: '8px',
            transition: 'all 0.3s ease'
        },
        backendStatusContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'center',
            marginBottom: '20px'
        },
        backendStatusButtons: {
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '8px'
        }
    };

    const getInputStyle = (field) => {
        const baseStyle = styles.input;
        if (errors[field]) {
            return {
                ...baseStyle,
                border: '2px solid #e53e3e',
                backgroundColor: '#fef5f5'
            };
        }
        return baseStyle;
    };

    const getTextareaStyle = () => {
        const baseStyle = styles.textarea;
        if (errors.message) {
            return {
                ...baseStyle,
                border: '2px solid #e53e3e',
                backgroundColor: '#fef5f5'
            };
        }
        return baseStyle;
    };

    const getButtonStyle = () => {
        const baseStyle = styles.submitBtn;
        if (isSubmitting) {
            return {
                ...baseStyle,
                ...styles.submittingBtn
            };
        }
        if (backendStatus !== 'connected') {
            return {
                ...baseStyle,
                ...styles.disabledBtn
            };
        }
        return baseStyle;
    };

    const getStatusMessage = () => {
        switch (backendStatus) {
            case 'checking':
                return {
                    message: '🔄 Checking backend connection...',
                    style: { ...styles.backendStatus, ...styles.checkingStatus }
                };
            case 'connected':
                return {
                    message: '✅ Backend connected - Ready to save data to MongoDB Atlas',
                    style: { ...styles.backendStatus, ...styles.connectedStatus }
                };
            case 'error':
                return {
                    message: '❌ Backend not connected - Please start backend server',
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
        <div style={styles.container}>
            <div style={styles.imageSection} />
            
            <div style={styles.formSection}>
                <div style={styles.formWrapper}>
                    <form 
                        style={styles.form} 
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <h2 style={styles.heading}>Get In Touch</h2>
                        <div style={styles.subheading}>
                            Connect with PT. International Mandiri Expo
                        </div>
                        
                        {/* Backend Status */}
                        
                        
                        {showMessage?.show && (
                            <div style={showMessage.success ? styles.successMessage : styles.errorMessage}>
                                {showMessage.message}
                            </div>
                        )}
                        
                        {['fullName', 'email', 'phoneNumber', 'companyName'].map(field => (
                            <div key={field} style={styles.inputGroup}>
                                <label style={styles.label} htmlFor={field}>
                                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    <span style={{color: '#e53e3e'}}>*</span>
                                </label>
                                <input
                                    id={field}
                                    type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                                    style={getInputStyle(field)}
                                    value={formData[field]}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    disabled={isSubmitting || backendStatus !== 'connected'}
                                    placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                />
                                {errors[field] && <span style={styles.error}>{errors[field]}</span>}
                            </div>
                        ))}
                        
                        <div style={styles.inputGroup}>
                            <label style={styles.label} htmlFor="message">
                                Message
                                <span style={{color: '#e53e3e'}}>*</span>
                            </label>
                            <textarea
                                id="message"
                                style={getTextareaStyle()}
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                disabled={isSubmitting || backendStatus !== 'connected'}
                                placeholder="Enter your message here (minimum 10 characters)..."
                                maxLength={1000}
                            />
                            <div style={styles.characterCount}>
                                {characterCount}/1000 characters
                            </div>
                            {errors.message && <span style={styles.error}>{errors.message}</span>}
                        </div>
                        
                        <button 
                            type="submit" 
                            style={getButtonStyle()}
                            disabled={isSubmitting || backendStatus !== 'connected'}
                        >
                            {isSubmitting ? (
                                <>
                                    <span style={{marginRight: '8px'}}>⏳</span>
                                    Sending to Database...
                                </>
                            ) : backendStatus !== 'connected' ? (
                                <>
                                    <span style={{marginRight: '8px'}}>🔌</span>
                                    Backend Offline
                                </>
                            ) : (
                                <>
                                    <span style={{marginRight: '8px'}}>💾</span>
                                    Save to MongoDB Atlas
                                </>
                            )}
                        </button>
                        
                        <div style={styles.requiredText}>
                            * Required fields | {backendStatus === 'connected' ? '✅ Data will be saved permanently to MongoDB Atlas' : '🔌 Backend connection required to save data'}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomeContactForm;