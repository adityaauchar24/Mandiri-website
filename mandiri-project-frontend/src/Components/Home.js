import React, { useState, useEffect } from 'react';
import Services from './Services';
import DetailPage from './DetailPage';
import HomeContactForm from './HomeContactForm';
import BussinessLocationMap from './BussinessLocationMap';
import { useNavigate } from 'react-router-dom';
import CarouselSlider from './CarouselSlider';

const Home = (props) => {
    const navigate = useNavigate();
    const { showMessage, setShowMessage } = props;
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

    // Animation on component mount
    useEffect(() => {
        setIsVisible(true);
        
        // Animate stats
        const finalStats = [50, 1000, 15, 24];
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;
        
        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            setAnimatedStats(
                finalStats.map((target, index) => {
                    if (index === 3) return '24/7'; // Special case for 24/7
                    return Math.floor(target * progress);
                })
            );
            
            if (currentStep >= steps) {
                clearInterval(timer);
                setAnimatedStats(finalStats);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, []);

    // Enhanced responsive styles
    const styles = {
        homeContainer: {
            width: '100%',
            minHeight: '100vh',
            overflow: 'hidden',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
            backgroundColor: '#ffffff'
        },

        // Hero Section Styles (After Carousel)
        heroSection: {
            position: 'relative',
            width: '100%',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            padding: 'clamp(5rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem)',
            overflow: 'hidden'
        },

        heroContent: {
            maxWidth: '1400px',
            width: '100%',
            zIndex: 2,
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            textAlign: 'center'
        },

        heroTitle: {
            fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
            fontWeight: '800',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            textTransform: 'uppercase',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        },

        heroSubtitle: {
            fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
            fontWeight: '600',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: '#333',
            maxWidth: '800px',
            margin: '0 auto clamp(1.5rem, 3vw, 2.5rem)',
            lineHeight: '1.5',
            opacity: '0.9'
        },

        heroDescription: {
            fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
            lineHeight: '1.8',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
            maxWidth: '1000px',
            margin: '0 auto clamp(2.5rem, 5vw, 4rem)',
            color: '#555',
            fontWeight: '400',
            textAlign: 'center'
        },

        ctaButton: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.5rem, 1vw, 0.8rem)',
            padding: 'clamp(1.2rem, 2.5vw, 1.6rem) clamp(2.5rem, 5vw, 4rem)',
            fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 'clamp(0.5px, 0.3vw, 1.5px)',
            color: isBtnHovered ? '#ffffff' : '#0802A3',
            background: isBtnHovered 
                ? 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)' 
                : 'linear-gradient(135deg, rgba(8, 2, 163, 0.1) 0%, rgba(74, 0, 224, 0.05) 100%)',
            border: `3px solid ${isBtnHovered ? '#4A00E0' : '#0802A3'}`,
            borderRadius: '60px',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            textDecoration: 'none',
            transform: isBtnHovered ? 'translateY(-4px) scale(1.05)' : 'translateY(0) scale(1)',
            boxShadow: isBtnHovered 
                ? '0 20px 40px rgba(8, 2, 163, 0.3)' 
                : '0 10px 30px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden'
        },

        buttonIcon: {
            fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
            transition: 'transform 0.3s ease',
            transform: isBtnHovered ? 'translateX(5px) rotate(0deg)' : 'translateX(0) rotate(0deg)'
        },

        // Stats Section Styles
        statsSection: {
            backgroundColor: '#f8f9ff',
            padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        },

        statsContainer: {
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(2.5rem, 4vw, 4rem)',
            position: 'relative',
            zIndex: 2
        },

        statItem: {
            padding: 'clamp(2.5rem, 4vw, 4rem) clamp(1.5rem, 3vw, 2.5rem)',
            background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
            borderRadius: '25px',
            boxShadow: '0 15px 40px rgba(8, 2, 163, 0.1)',
            border: '2px solid rgba(8, 2, 163, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            position: 'relative',
            overflow: 'hidden'
        },

        statNumber: {
            fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
            fontWeight: '900',
            color: '#0802A3',
            marginBottom: '1.5rem',
            fontFamily: "'Inter', sans-serif",
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },

        statLabel: {
            fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
            color: '#666',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        },

        // Features Section Styles
        featuresSection: {
            padding: '80px 20px',
            backgroundColor: '#ffffff',
            textAlign: 'center'
        },
        
        sectionHeader: {
            marginBottom: '60px'
        },
        
        sectionTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#0802A3',
            marginBottom: '15px'
        },
        
        titleUnderline: {
            width: '80px',
            height: '4px',
            backgroundColor: '#0802A3',
            margin: '0 auto',
            borderRadius: '2px'
        },
        
        featuresGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
        },
        
        featureCard: {
            padding: '40px 30px',
            backgroundColor: '#f8f9ff',
            borderRadius: '15px',
            textAlign: 'center',
            transition: 'all 0.3s ease'
        },
        
        featureIcon: {
            fontSize: '3rem',
            marginBottom: '20px'
        },
        
        featureTitle: {
            fontSize: '1.4rem',
            fontWeight: '600',
            color: '#0802A3',
            marginBottom: '15px'
        },
        
        featureDescription: {
            fontSize: '1rem',
            color: '#666',
            lineHeight: '1.6'
        }
    };

    // Enhanced CSS animations
    const enhancedStyles = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        
        .stat-item:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 25px 60px rgba(8, 2, 163, 0.2);
            border-color: rgba(8, 2, 163, 0.3);
        }
        
        .cta-button:hover {
            transform: translateY(-4px) scale(1.05);
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
            .hero-section {
                min-height: auto;
                padding: 4rem 1.5rem;
            }
            
            .stats-container {
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
            }
            
        }
        
        @media (max-width: 480px) {
            .hero-section {
                padding: 3rem 1rem;
            }
            
            .stat-item {
                padding: 2rem 1rem;
            }
            
            .feature-card {
                padding: 2rem 1.5rem;
            }
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .hero-content,
            .stat-item,
            .feature-card,
            .cta-button {
                transition: none;
                animation: none;
            }
        }
    `;

    // Sample stats data
    const statsData = [
        { number: `${animatedStats[0]}+`, label: 'Countries Served' },
        { number: `${animatedStats[1]}+`, label: 'Happy Clients' },
        { number: `${animatedStats[2]}+`, label: 'Years Experience' },
        { number: animatedStats[3], label: 'Customer Support' }
    ];

    // Enhanced features data
    const featuresData = [
        {
            icon: '🌱',
            title: 'Sustainable Products',
            description: 'Eco-friendly coconut products that support environmental sustainability and green energy solutions. Our commitment to the planet drives every product we create.'
        },
        {
            icon: '🚢',
            title: 'Global Shipping',
            description: 'Efficient worldwide logistics and shipping network ensuring timely delivery of premium coconut products to clients across the globe.'
        },
        {
            icon: '⭐',
            title: 'Premium Quality',
            description: 'Rigorous quality control and testing processes guarantee the highest standards in all our coconut-derived products and energy solutions.'
        },
        {
            icon: '🤝',
            title: 'Trusted Partnership',
            description: 'Building long-term relationships with clients through reliable service, transparent communication, and exceptional customer support.'
        }
    ];

    const handleMouseEnter = () => setIsBtnHovered(true);
    const handleMouseLeave = () => setIsBtnHovered(false);

    return (
        <div style={styles.homeContainer}>
            <style>{enhancedStyles}</style>
            
            {/* CarouselSlider at the TOP */}
            <CarouselSlider />
            
            {/* Hero Section (Now comes after carousel) */}
            <section style={styles.heroSection} className="hero-section">
                <div style={styles.heroContent} className="hero-content">
                    <h1 style={styles.heroTitle}>
                        WELCOME TO INTERNATIONAL MANDIRI EXPO
                    </h1>
                    <p style={styles.heroSubtitle}>
                        Your Trusted Partner for Premium Coconut Products
                    </p>
                    <p style={styles.heroDescription}>
                        Welcome to PT. International Mandiri Expo - where quality meets sustainability. 
                        As a pioneering company established in 2020, we specialize in premium coconut-derived 
                        products and eco-friendly energy solutions. Our commitment to innovation and environmental 
                        responsibility drives us to deliver exceptional value to partners worldwide.
                    </p>
                    <button 
                        style={styles.ctaButton}
                        className="cta-button"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => navigate('/contact')}
                    >
                        <span>Start Your Journey With Us</span>
                        <span style={styles.buttonIcon}>→</span>
                    </button>
                </div>
            </section>

            {/* Enhanced Features Section */}
            <section style={styles.featuresSection}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
                    <div style={styles.titleUnderline}></div>
                </div>
                
                <div style={styles.featuresGrid}>
                    {featuresData.map((feature, index) => (
                        <div key={index} style={styles.featureCard}>
                            <div style={styles.featureIcon}>{feature.icon}</div>
                            <h3 style={styles.featureTitle}>{feature.title}</h3>
                            <p style={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Other Components with enhanced spacing */}
            <div style={{ marginTop: 'clamp(3rem, 6vw, 6rem)' }}>
                <Services />
            </div>
            <div style={{ marginTop: 'clamp(3rem, 6vw, 6rem)' }}>
                <DetailPage />
            </div>
            <div style={{ marginTop: 'clamp(3rem, 6vw, 6rem)' }}>
                <HomeContactForm showMessage={showMessage} setShowMessage={setShowMessage} />
            </div>
            <div style={{ marginTop: 'clamp(3rem, 6vw, 6rem)' }}>
                <BussinessLocationMap />
            </div>
        </div>
    );
};

export default Home;