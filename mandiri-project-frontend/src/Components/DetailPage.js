import React, { useState, useEffect } from 'react';
import detailCoalImg from "../Images/detailCoalImg.jpg";
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Animation on component mount
    useEffect(() => {
        setIsVisible(true);
        
        // Add floating animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg) scale(1); 
                }
                33% { 
                    transform: translateY(-15px) rotate(120deg) scale(1.1); 
                }
                66% { 
                    transform: translateY(-10px) rotate(240deg) scale(0.9); 
                }
            }
            @keyframes pulse {
                0%, 100% { 
                    opacity: 0.6; 
                    transform: scale(1);
                }
                50% { 
                    opacity: 0.8; 
                    transform: scale(1.05);
                }
            }
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            @keyframes shimmer {
                0% {
                    background-position: -1000px 0;
                }
                100% {
                    background-position: 1000px 0;
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Mouse move effect for parallax
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Enhanced responsive styles with modern design
    const styles = {
        detailPage: {
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 50%, #8A2BE2 100%)',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
        },

        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '120%',
            height: '120%',
            objectFit: 'cover',
            opacity: 0.3,
            filter: 'brightness(0.6) contrast(1.3) blur(1px)',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.1)`,
            transition: 'transform 0.1s ease-out',
            animation: 'pulse 8s ease-in-out infinite'
        },

        gradientOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, rgba(8, 2, 163, 0.85) 0%, rgba(74, 0, 224, 0.7) 50%, rgba(138, 43, 226, 0.6) 100%)',
            zIndex: 1
        },

        contentContainer: {
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: 'white',
            padding: 'clamp(1.5rem, 5vw, 4rem)',
            maxWidth: '1400px',
            width: '95%',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        },

        badge: {
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            color: '#fff',
            padding: 'clamp(0.6rem, 1.5vw, 1rem) clamp(1.2rem, 2.5vw, 2rem)',
            borderRadius: '50px',
            fontSize: 'clamp(0.75rem, 1.2vw, 0.95rem)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(1px, 0.2vw, 3px)',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            animation: 'slideInUp 0.8s ease-out 0.2s both'
        },

        mainTitle: {
            fontSize: 'clamp(2.2rem, 6vw, 5rem)',
            fontWeight: '900',
            lineHeight: '1.05',
            marginBottom: 'clamp(1rem, 2vw, 1.8rem)',
            textTransform: 'uppercase',
            textShadow: '3px 3px 12px rgba(0, 0, 0, 0.6)',
            background: 'linear-gradient(45deg, #ffffff 20%, #e6e6e6 50%, #ffffff 80%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s ease-in-out infinite',
            letterSpacing: 'clamp(-0.5px, 0.5vw, 2px)'
        },

        subtitle: {
            fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
            fontWeight: '500',
            lineHeight: '1.3',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4)',
            maxWidth: '900px',
            margin: '0 auto',
            opacity: 0.95,
            letterSpacing: 'clamp(0.2px, 0.1vw, 1px)'
        },

        description: {
            fontSize: 'clamp(1.2rem, 1.2vw, 1.2rem)',
            lineHeight: '1.5',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
            opacity: 0.9,
            maxWidth: '700px',
            margin: '1rem auto',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
            fontWeight: '300',
            textAlign: 'start',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            whiteSpace: 'normal'
        },

        ctaButton: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.6rem, 1.2vw, 1rem)',
            padding: 'clamp(1rem, 2.2vw, 1.4rem) clamp(2rem, 4vw, 3rem)',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(1px, 0.3vw, 2px)',
            color: isHovered ? '#0802A3' : '#ffffff',
            background: isHovered 
                ? 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)' 
                : 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
            border: `2px solid ${isHovered ? '#0802A3' : 'rgba(255, 255, 255, 0.4)'}`,
            borderRadius: '60px',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            textDecoration: 'none',
            transform: isHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
            boxShadow: isHovered 
                ? '0 25px 50px rgba(255, 255, 255, 0.25), 0 0 0 4px rgba(255, 255, 255, 0.1)' 
                : '0 15px 35px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            animation: 'bounceIn 1s ease-out 0.8s both',
            marginTop:'2rem'
        },

        buttonIcon: {
            fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'translateX(5px) rotate(90deg)' : 'translateX(0) rotate(0)'
        },

        // Stats Section
        statsSection: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'clamp(1.2rem, 2.5vw, 2.5rem)',
            marginTop: 'clamp(3rem, 6vw, 6rem)',
            maxWidth: '1000px',
            margin: 'clamp(3rem, 6vw, 6rem) auto 0',
            animation: 'slideInUp 0.8s ease-out 1s both'
        },

        statItem: {
            textAlign: 'center',
            padding: 'clamp(1.2rem, 2.5vw, 2rem) clamp(1rem, 2vw, 1.5rem)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '20px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden'
        },

        statNumber: {
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '0.8rem',
            textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)',
            background: 'linear-gradient(45deg, #ffffff, #e6e6e6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },

        statLabel: {
            fontSize: 'clamp(0.8rem, 1.3vw, 1rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(1px, 0.2vw, 2px)',
            fontWeight: '600'
        },

        // Features Grid
        featuresGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            maxWidth: '1200px',
            margin: 'clamp(3rem, 6vw, 5rem) auto 0',
            animation: 'slideInUp 0.8s ease-out 1.2s both'
        },

        featureItem: {
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            borderRadius: '20px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            textAlign: 'center',
            transition: 'all 0.3s ease'
        },

        featureIcon: {
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '1.5rem',
            opacity: 0.9
        },

        featureTitle: {
            fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#ffffff'
        },

        featureDesc: {
            fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6'
        }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const statsData = [
        { number: '50+', label: 'Countries Served' },
        { number: '1000+', label: 'Happy Clients' },
        { number: '15+', label: 'Years Experience' },
        { number: '24/7', label: 'Customer Support' }
    ];

    const featuresData = [
        { icon: '🌱', title: 'Sustainable Sourcing', desc: 'Eco-friendly practices from farm to factory' },
        { icon: '⚡', title: 'High Quality', desc: 'Premium coconut products with strict quality control' },
        { icon: '🚢', title: 'Global Shipping', desc: 'Worldwide delivery with reliable logistics' }
    ];

    return (
        <section style={styles.detailPage}>
            {/* Background Image with Enhanced Styling */}
            <img 
                style={styles.backgroundImage}
                src={detailCoalImg} 
                alt="Premium coconut products and sustainable energy solutions from Indonesia" 
            />
            
            {/* Gradient Overlay */}
            <div style={styles.gradientOverlay}></div>

            {/* Main Content */}
            <div style={styles.contentContainer}>
                {/* Badge */}
                <div style={styles.badge}>
                    🌟 Trusted Worldwide Supplier
                </div>

                {/* Main Title */}
                <h1 style={styles.mainTitle}>
                    Premium Coconut
                    <br />
                    <span style={{ 
                        display: 'block',
                        background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF8C00)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: 'none'
                    }}>
                       
                    </span>
                </h1>

                {/* Subtitle */}
                <h2 style={styles.subtitle}>
                    From the Heart of Indonesia to Global Markets
                </h2>

                {/* Description - FIXED PARAGRAPH ALIGNMENT */}
                <p style={styles.description}>
                    Experience unparalleled quality with premium coconut-derived products. We combine traditional expertise with modern innovation to deliver solutions that power homes and industries across the globe with eco-friendly energy.
                </p>

                {/* CTA Button */}
                <button 
                    style={styles.ctaButton}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => navigate('/about')}
                >
                    <span>Explore Our Products</span>
                    <span style={styles.buttonIcon}>→</span>
                </button>

                {/* Stats Section */}
                <div style={styles.statsSection}>
                    {statsData.map((stat, index) => (
                        <div 
                            key={index} 
                            style={styles.statItem}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)';
                            }}
                        >
                            <div style={styles.statNumber}>{stat.number}</div>
                            <div style={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div style={styles.featuresGrid}>
                    {featuresData.map((feature, index) => (
                        <div 
                            key={index} 
                            style={styles.featureItem}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
                            }}
                        >
                            <div style={styles.featureIcon}>{feature.icon}</div>
                            <h3 style={styles.featureTitle}>{feature.title}</h3>
                            <p style={styles.featureDesc}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Elements for Visual Interest */}
            <div style={{
                position: 'absolute',
                top: '15%',
                left: '8%',
                width: 'clamp(40px, 6vw, 70px)',
                height: 'clamp(40px, 6vw, 70px)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 70%)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}></div>
            
            <div style={{
                position: 'absolute',
                bottom: '25%',
                right: '12%',
                width: 'clamp(30px, 5vw, 60px)',
                height: 'clamp(30px, 5vw, 60px)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 70%)',
                borderRadius: '50%',
                animation: 'float 10s ease-in-out infinite 1s',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}></div>

            <div style={{
                position: 'absolute',
                top: '60%',
                left: '5%',
                width: 'clamp(20px, 4vw, 50px)',
                height: 'clamp(20px, 4vw, 50px)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 70%)',
                borderRadius: '50%',
                animation: 'float 12s ease-in-out infinite 2s',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}></div>
        </section>
    );
};

export default DetailPage;