import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = (props) => {
    const { serviceData } = props;
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    // Animation on component mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Enhanced responsive styles
    const styles = {
        // Main Card Container - UPDATED FOR EQUAL HEIGHT
        card: {
            maxWidth: '100%',
            width: '100%',
            height: '100%',
            minHeight: '650px',
            background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
            border: '3px solid #0802A3',
            borderRadius: '20px',
            padding: '0 0 2rem 0',
            boxShadow: isHovered 
                ? '0 25px 50px rgba(8, 2, 163, 0.2)' 
                : '0 10px 30px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            animation: isVisible ? 'fadeInUp 0.6s ease-out' : 'none',
            display: 'flex',
            flexDirection: 'column'
        },

        // Image Section
        media: {
            width: '100%',
            height: 'clamp(250px, 30vw, 350px)',
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'all 0.4s ease',
            filter: isHovered ? 'brightness(1.1) saturate(1.1)' : 'brightness(1) saturate(1)'
        },

        // Content Section - UPDATED FOR FLEXIBLE LAYOUT
        cardContent: {
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            textAlign: 'left',
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },

        // Title Section - REMOVED UNDERLINE
        title: {
            color: '#0802A3',
            fontWeight: '700',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
            margin: '0 0 1.5rem 0',
            fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
            lineHeight: '1.3',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease'
        },

        // Description Section
        description: {
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
            color: '#444',
            lineHeight: '1.7',
            margin: '0 0 2rem 0',
            textAlign: 'left',
            display: '-webkit-box',
            WebkitLineClamp: 6,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: '1'
        },

        // Action Button - UPDATED FOR CONSISTENT STYLING
        actionButton: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.8rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#0802A3',
            border: '2px solid #0802A3',
            borderRadius: '25px',
            fontSize: '0.9rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            fontFamily: 'inherit',
            alignSelf: 'flex-start',
            minWidth: '140px',
            minHeight: '45px'
        },

        buttonIcon: {
            fontSize: '1rem',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'translateX(3px)' : 'translateX(0)'
        },

        // Hover Effects
        hoverGlow: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(8, 2, 163, 0.05) 0%, rgba(74, 0, 224, 0.02) 100%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
        },

        // Feature Badge
        featureBadge: {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: '#0802A3',
            color: '#ffffff',
            padding: '0.5rem 1rem',
            borderRadius: '15px',
            fontSize: '0.8rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            zIndex: 2,
            boxShadow: '0 4px 15px rgba(8, 2, 163, 0.3)'
        }
    };

    // Enhanced CSS animations - REMOVED UNDERLINE HOVER EFFECTS
    const enhancedStyles = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        .service-card:hover {
            transform: translateY(-10px) scale(1.02);
            border-color: #4A00E0;
        }
        
        /* REMOVED BLUE HOVER EFFECTS FOR BUTTON */
        .service-card:hover .action-button {
            background: transparent;
            color: #0802A3;
            border-color: #0802A3;
            box-shadow: none;
        }
        
        .service-card:hover .title {
            color: #4A00E0;
        }
        
        .service-card:hover .media {
            transform: scale(1.05);
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
            .service-card {
                min-height: 600px;
                margin: 0 auto;
                max-width: 400px;
            }
            
            .card-content {
                padding: 1.5rem;
            }
            
            .title {
                font-size: 1.4rem;
            }
            
            .description {
                -webkit-line-clamp: 5;
            }
            
            .action-button {
                min-width: 130px;
                min-height: 42px;
            }
        }
        
        @media (max-width: 480px) {
            .service-card {
                min-height: 550px;
                border-width: 2px;
            }
            
            .card-content {
                padding: 1.25rem;
            }
            
            .title {
                font-size: 1.2rem;
                margin-bottom: 1rem;
            }
            
            .description {
                font-size: 0.9rem;
                -webkit-line-clamp: 4;
            }
            
            .action-button {
                padding: 0.7rem 1.25rem;
                font-size: 0.85rem;
                min-width: 120px;
                min-height: 40px;
            }
        }
        
        /* Tablet Optimizations */
        @media (min-width: 769px) and (max-width: 1024px) {
            .service-card {
                min-height: 620px;
            }
            
            .description {
                -webkit-line-clamp: 5;
            }
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .service-card {
                transition: none;
                animation: none;
            }
            
            .service-card:hover {
                transform: none;
            }
            
            .button-icon,
            .media {
                transition: none;
            }
        }
    `;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleLearnMore = () => {
        if (serviceData.link) {
            navigate(serviceData.link);
        }
    };

    return (
        <div 
            style={styles.card}
            className="service-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <style>{enhancedStyles}</style>
            
            {/* Hover Glow Effect */}
            <div style={styles.hoverGlow}></div>
            
            {/* Feature Badge */}
            {serviceData.badge && (
                <div style={styles.featureBadge}>
                    {serviceData.badge}
                </div>
            )}
            
            {/* Image Section */}
            <img 
                src={serviceData.imgSrc} 
                alt={serviceData.title}
                style={styles.media}
                className="media"
                loading="lazy"
            />
            
            {/* Content Section */}
            <div style={styles.cardContent} className="card-content">
                <div>
                    {/* Title - REMOVED UNDERLINE */}
                    <h3 style={styles.title} className="title">
                        {serviceData.title}
                    </h3>
                    
                    {/* Description */}
                    <p style={styles.description} className="description">
                        {serviceData.detail}
                    </p>
                </div>
                
                {/* Action Button */}
                <button 
                    style={styles.actionButton}
                    className="action-button"
                    onClick={handleLearnMore}
                >
                    Learn More
                    <span style={styles.buttonIcon} className="button-icon">→</span>
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;