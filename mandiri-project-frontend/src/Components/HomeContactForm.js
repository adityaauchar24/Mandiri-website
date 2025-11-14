import React, { useState } from 'react';
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

    // API URL configuration
    const API_BASE_URL = process.env.NODE_ENV === 'production' 
        ? 'https://pt-international-mandiri-expo.onrender.com'
        : 'http://localhost:5001';

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
            transition: 'transform 0.3s ease',
            display: 'flex',
            flexDirection: 'column'
        },
        heading: {
            fontSize: 'clamp(24px, 3vw, 28px)',
            fontWeight: '700',
            color: '#0802A3',
            marginBottom: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #0802A3, #4A00E0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            width: '100%'
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
        requiredText: {
            marginTop: '1rem',
            textAlign: 'center',
            color: '#718096',
            fontSize: '12px',
            width: '100%'
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
        // Clear any message when user starts typing
        if (showMessage) {
            setShowMessage(null);
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
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[+]?[0-9\s\-()]{10,}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
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
        
        // Clear any previous messages when starting new submission
        setShowMessage(null);
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            console.log('📤 Sending contact form data to:', `${API_BASE_URL}/api/users`);
            
            const response = await fetch(`${API_BASE_URL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName.trim(),
                    email: formData.email.trim().toLowerCase(),
                    phoneNumber: formData.phoneNumber.trim(),
                    companyName: formData.companyName.trim(),
                    message: formData.message.trim()
                })
            });

            // Check if response is OK before parsing JSON
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

            if (result.success) {
                setShowMessage({ 
                    success: true, 
                    error: false, 
                    message: result.message || 'Thank you! Your message has been sent successfully.' 
                });
                
                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    companyName: '',
                    message: ''
                });
                
                // Clear any existing errors
                setErrors({});
                
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
            } else if (error.message.includes('Network error')) {
                userFriendlyMessage = 'Network connection issue. Please check your internet connection.';
            }
            
            setShowMessage({ 
                success: false, 
                error: true, 
                message: userFriendlyMessage 
            });
        } finally {
            setIsSubmitting(false);
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
        return baseStyle;
    };

    return (
        <div style={styles.container}>
            <div style={styles.imageSection} />
            
            <div style={styles.formSection}>
                <div style={styles.formWrapper}>
                    <form 
                        style={styles.form} 
                        onSubmit={handleSubmit}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <h2 style={styles.heading}>Get In Touch</h2>
                        
                        {/* Display success/error messages */}
                        {showMessage && (
                            <div style={showMessage.success ? styles.successMessage : styles.errorMessage}>
                                {showMessage.message}
                            </div>
                        )}
                        
                        {['fullName', 'email', 'phoneNumber', 'companyName'].map(field => (
                            <div key={field} style={styles.inputGroup}>
                                <label style={styles.label}>
                                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    <span style={{color: '#e53e3e'}}>*</span>
                                </label>
                                <input
                                    type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                                    style={getInputStyle(field)}
                                    value={formData[field]}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    onFocus={(e) => {
                                        if (!errors[field]) {
                                            e.target.style.border = '2px solid #0802A3';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(8, 2, 163, 0.1)';
                                            e.target.style.backgroundColor = '#fff';
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (!errors[field]) {
                                            e.target.style.border = '2px solid #e2e8f0';
                                            e.target.style.boxShadow = 'none';
                                            e.target.style.backgroundColor = '#fff';
                                        }
                                    }}
                                    disabled={isSubmitting}
                                    placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                />
                                {errors[field] && <span style={styles.error}>{errors[field]}</span>}
                            </div>
                        ))}
                        
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>
                                Message
                                <span style={{color: '#e53e3e'}}>*</span>
                            </label>
                            <textarea
                                style={getTextareaStyle()}
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                onFocus={(e) => {
                                    if (!errors.message) {
                                        e.target.style.border = '2px solid #0802A3';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(8, 2, 163, 0.1)';
                                        e.target.style.backgroundColor = '#fff';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (!errors.message) {
                                        e.target.style.border = '2px solid #e2e8f0';
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.backgroundColor = '#fff';
                                    }
                                }}
                                disabled={isSubmitting}
                                placeholder="Enter your message here..."
                            />
                            {errors.message && <span style={styles.error}>{errors.message}</span>}
                        </div>
                        
                        <button 
                            type="submit" 
                            style={getButtonStyle()}
                            disabled={isSubmitting}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.backgroundColor = '#4A00E0';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 10px 20px rgba(8, 2, 163, 0.3)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSubmitting) {
                                    e.target.style.backgroundColor = '#0802A3';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <span style={{marginRight: '8px'}}>⏳</span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <span style={{marginRight: '8px'}}>📨</span>
                                    Send Message
                                </>
                            )}
                        </button>
                        
                        <div style={styles.requiredText}>
                            * Required fields
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HomeContactForm;