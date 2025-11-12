import React, { useState, useEffect } from 'react';
import successMessIcon from '../Images/successMessIcon.svg';
import discardMessIcon from '../Images/discardMessIcon.svg';

const ToastMessage = (props) => {
    const { error, message, success } = props.showMessage;
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    // Auto-hide functionality
    useEffect(() => {
        if (message) {
            setIsVisible(true);
            setIsExiting(false);

            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => {
                    setIsVisible(false);
                }, 300);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    // Enhanced responsive styles
    const styles = {
        // Main Toast Container
        toastMessageSection: {
            maxWidth: 'clamp(300px, 90vw, 500px)',
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)',
            fontWeight: '600',
            borderRadius: '12px',
            position: 'fixed',
            zIndex: 9999,
            top: 'clamp(1rem, 3vw, 2rem)',
            right: 'clamp(1rem, 3vw, 2rem)',
            left: 'auto',
            padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.5rem)',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            opacity: isVisible ? (isExiting ? 0 : 1) : 0,
            transform: isVisible ? (isExiting ? 'translateX(100%)' : 'translateX(0)') : 'translateX(100%)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            overflow: 'hidden',
            pointerEvents: isVisible ? 'auto' : 'none'
        },

        // Success Style
        successStyle: {
            background: 'linear-gradient(135deg, rgba(109, 174, 67, 0.95) 0%, rgba(86, 157, 48, 0.9) 100%)',
            color: '#ffffff',
            borderLeft: '4px solid #4CAF50'
        },

        // Error Style
        errorStyle: {
            background: 'linear-gradient(135deg, rgba(235, 0, 40, 0.95) 0%, rgba(200, 0, 30, 0.9) 100%)',
            color: '#ffffff',
            borderLeft: '4px solid #F44336'
        },

        // Content Container
        contentContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
            width: '100%'
        },

        // Icon Style
        icon: {
            width: 'clamp(20px, 3vw, 24px)',
            height: 'clamp(20px, 3vw, 24px)',
            flexShrink: 0,
            filter: 'brightness(0) invert(1)'
        },

        // Message Text
        message: {
            fontWeight: '600',
            fontSize: 'clamp(0.8rem, 1.1vw, 0.9rem)',
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.4',
            margin: 0,
            flex: 1,
            textAlign: 'left'
        },

        // Close Button
        closeButton: {
            background: 'none',
            border: 'none',
            color: 'inherit',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '4px',
            marginLeft: '0.5rem',
            opacity: '0.7',
            transition: 'all 0.2s ease',
            flexShrink: 0,
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },

        // Progress Bar
        progressBar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '3px',
            background: 'rgba(255, 255, 255, 0.8)',
            width: isVisible ? (isExiting ? '0%' : '100%') : '100%',
            transition: 'width 5s linear',
            borderRadius: '0 0 12px 12px'
        },

        // Icon Container
        iconContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'clamp(28px, 4vw, 32px)',
            height: 'clamp(28px, 4vw, 32px)',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            flexShrink: 0
        }
    };

    // Enhanced CSS animations
    const enhancedStyles = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        @keyframes progress {
            from {
                width: 100%;
            }
            to {
                width: 0%;
            }
        }
        
        .toast-message:hover {
            transform: translateX(0) scale(1.02);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .close-button:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.1);
        }
        
        .toast-message.success:hover {
            background: linear-gradient(135deg, rgba(109, 174, 67, 1) 0%, rgba(86, 157, 48, 0.95) 100%);
        }
        
        .toast-message.error:hover {
            background: linear-gradient(135deg, rgba(235, 0, 40, 1) 0%, rgba(200, 0, 30, 0.95) 100%);
        }
        
        /* Mobile Optimizations */
        @media (max-width: 480px) {
            .toast-message {
                max-width: calc(100vw - 2rem);
                right: 1rem;
                left: 1rem;
            }
            
            .content-container {
                gap: 0.5rem;
            }
            
            .message {
                font-size: 0.8rem;
            }
        }
        
        /* Tablet Optimizations */
        @media (min-width: 481px) and (max-width: 768px) {
            .toast-message {
                max-width: 400px;
            }
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .toast-message {
                transition: none;
            }
            
            .close-button {
                transition: none;
            }
            
            .progress-bar {
                animation: none;
                transition: none;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .toast-message {
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
        }
    `;

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    const handleToastClick = () => {
        handleClose();
    };

    if (!isVisible) return null;

    return (
        <div 
            style={{
                ...styles.toastMessageSection,
                ...(success ? styles.successStyle : styles.errorStyle)
            }}
            className={`toast-message ${success ? 'success' : 'error'}`}
            onClick={handleToastClick}
            role="alert"
            aria-live="assertive"
        >
            <style>{enhancedStyles}</style>
            
            {/* Progress Bar */}
            <div 
                style={styles.progressBar}
                className="progress-bar"
            />
            
            {/* Content */}
            <div style={styles.contentContainer} className="content-container">
                {/* Icon */}
                <div style={styles.iconContainer}>
                    <img 
                        src={success ? successMessIcon : discardMessIcon} 
                        alt={success ? "Success" : "Error"} 
                        style={styles.icon}
                    />
                </div>
                
                {/* Message */}
                <p style={styles.message} className="message">
                    {message}
                </p>
                
                {/* Close Button */}
                <button 
                    style={styles.closeButton}
                    className="close-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                    }}
                    aria-label="Close notification"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default ToastMessage;