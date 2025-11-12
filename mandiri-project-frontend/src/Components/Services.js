import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import HomeProCoalImg from "../Images/HomeProCoalImg.jpeg";
import truckTransportImg from "../Images/truckTransportImg.jpeg";
import coconutShellImg from "../Images/coconutShellImg.jpeg";

// Constants for better maintainability
const SERVICES_DATA = [
  {
    imgSrc: HomeProCoalImg,
    title: 'COCONUT CHARCOAL BRIQUETTE',
    detail: "Coconut Charcoal Briquette is a briquette charcoal with coconut shell as the raw material. One of the main functions of Coconut Charcoal Briquette is for sisha or hookah burner. Moreover, people also use the lower grade for barbecue purposes. There are many benefits to use coconut charcoal compare to other type of charcoal. Firstly, coconut charcoal briquette have relatively higher burning point and longer burning time compare to the other type of charcoal. Furthermore, it produces less smokes and natural scent which is a best choice for your sisha/hookah companion.",
    badge: 'Premium',
    link: '/products#coconut-charcoal-briquette'
  },
  {
    imgSrc: coconutShellImg,
    title: 'COCONUT SHELL CHARCOAL',
    detail: "Coconut shell charcoal is simply charcoal product that are originally from coconut shell. Previously, people think that coconut shell is waste and they throw it away. However, actually we can process it further to be useful products, such as charcoal. Like other types of charcoal, coconut shell charcoal can be used energy. Coconut shell charcoal is also often to be processed further to be briquette (Coconut Shell Charcoal Briquette) or activated carbon products.",
    badge: 'Eco-Friendly',
    link: '/products#coconut-shell-charcoal'
  },
  {
    imgSrc: truckTransportImg,
    title: 'GLOBAL LOGISTICS',
    detail: "Our comprehensive global logistics services ensure seamless transportation and delivery of your coconut products worldwide. We handle everything from packaging to customs clearance, providing reliable and efficient supply chain solutions. With our extensive network and expertise in international trade, we guarantee timely delivery and complete satisfaction for all your import-export needs.",
    badge: 'Worldwide',
    link: '/about#global-operations'
  }
];

const STATS_DATA = [
  { number: '50+', label: 'Countries Served' },
  { number: '1000+', label: 'Happy Clients' },
  { number: '15+', label: 'Years Experience' },
  { number: '99%', label: 'Satisfaction Rate' }
];

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Animation on component mount with intersection observer for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Memoized navigation handler - CONNECTED TO CONTACT US
  const navigateToContact = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  // Memoized styles for better performance
  const styles = useMemo(() => ({
    // Main Container
    serviceContainer: {
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: 'clamp(3rem, 6vw, 6rem) clamp(1.5rem, 4vw, 4rem)',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      overflow: 'hidden'
    },

    // Header Section
    headerSection: {
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto 4rem auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
    },

    mainTitle: {
      color: '#0802A3',
      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
      fontWeight: '800',
      margin: '0 0 1.5rem 0',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      position: 'relative',
      paddingBottom: '1.5rem'
    },

    titleUnderline: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'clamp(80px, 10vw, 120px)',
      height: '4px',
      background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
      borderRadius: '2px'
    },

    subtitle: {
      color: '#0000008a',
      fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
      lineHeight: '1.7',
      maxWidth: '800px',
      margin: '0 auto',
      fontWeight: '400'
    },

    // Services Grid
    serviceCardContainer: {
      width: "100%",
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
      gap: 'clamp(2rem, 4vw, 3rem)',
      alignItems: 'stretch',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
    },

    // Stats Section
    statsSection: {
      width: '100%',
      maxWidth: '1200px',
      margin: '5rem auto 0 auto',
      padding: '3rem 2rem',
      backgroundColor: '#f8f9ff',
      borderRadius: '20px',
      border: '2px solid rgba(8, 2, 163, 0.1)',
      textAlign: 'center',
      backdropFilter: 'blur(10px)'
    },

    statsTitle: {
      color: '#0802A3',
      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
      fontWeight: '700',
      margin: '0 0 2rem 0'
    },

    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    },

    statItem: {
      textAlign: 'center',
      padding: '1.5rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },

    statNumber: {
      fontSize: 'clamp(2rem, 3vw, 2.5rem)',
      fontWeight: '800',
      color: '#0802A3',
      margin: '0 0 0.5rem 0',
      background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },

    statLabel: {
      fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
      color: '#666',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    // CTA Section
    ctaSection: {
      textAlign: 'center',
      margin: '4rem auto 0 auto',
      padding: '3rem 2rem',
      background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
      borderRadius: '20px',
      color: '#ffffff',
      maxWidth: '800px',
      position: 'relative',
      overflow: 'hidden'
    },

    ctaTitle: {
      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
      fontWeight: '700',
      margin: '0 0 1rem 0',
      position: 'relative',
      zIndex: 2
    },

    ctaText: {
      fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
      lineHeight: '1.6',
      margin: '0 0 2rem 0',
      opacity: '0.9',
      position: 'relative',
      zIndex: 2
    },

    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '1rem 2.5rem',
      backgroundColor: '#ffffff',
      color: '#0802A3',
      border: 'none',
      borderRadius: '50px',
      fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textDecoration: 'none',
      fontFamily: 'inherit',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
      position: 'relative',
      zIndex: 2,
      '&:focus-visible': {
        outline: '3px solid #ffffff',
        outlineOffset: '2px'
      }
    },

    buttonIcon: {
      fontSize: '1.1rem',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },

    ctaBackground: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
      zIndex: 1
    }
  }), [isVisible]);

  // Enhanced CSS animations with modern features
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
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    .cta-button {
      position: relative;
      overflow: hidden;
    }
    
    .cta-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s ease;
    }
    
    .cta-button:hover::before {
      left: 100%;
    }
    
    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    }
    
    .cta-button:hover .button-icon {
      transform: translateX(5px);
    }
    
    .cta-button:active {
      transform: translateY(-1px);
    }
    
    .stat-item:hover {
      transform: translateY(-5px) scale(1.05);
      background: rgba(255, 255, 255, 0.95);
      border-radius: '15px';
      box-shadow: 0 20px 40px rgba(8, 2, 163, 0.15);
    }
    
    .service-card-container > * {
      animation: float 6s ease-in-out infinite;
    }
    
    .service-card-container > *:nth-child(2) {
      animation-delay: 2s;
    }
    
    .service-card-container > *:nth-child(3) {
      animation-delay: 4s;
    }
    
    /* Mobile Optimizations */
    @media (max-width: 768px) {
      .service-card-container {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }
      
      .cta-section {
        padding: 2rem 1.5rem;
        margin: 3rem auto 0 auto;
      }
      
      .service-card-container > * {
        animation: none;
      }
    }
    
    @media (max-width: 480px) {
      .service-container {
        padding: 2rem 1rem;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .stat-item {
        padding: 1rem;
      }
      
      .cta-button {
        width: 100%;
        max-width: 300px;
      }
    }
    
    /* Tablet Optimizations */
    @media (min-width: 769px) and (max-width: 1024px) {
      .service-card-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    /* Reduced motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
      .header-section,
      .service-card-container,
      .stat-item,
      .cta-button {
        transition: none;
        animation: none;
      }
      
      .service-card-container > * {
        animation: none;
      }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .stat-item:hover {
        background: #ffffff;
        border: 2px solid #0802A3;
      }
      
      .cta-section {
        background: #0802A3;
      }
    }
  `;

  return (
    <section 
      style={styles.serviceContainer} 
      className="service-container"
      role="main"
      aria-label="Our Services and Products"
    >
      <style>{enhancedStyles}</style>
      
      {/* Header Section */}
      <header style={styles.headerSection} className="header-section">
        <h1 style={styles.mainTitle}>
          OUR PREMIUM PRODUCTS
          <div style={styles.titleUnderline} aria-hidden="true"></div>
        </h1>
        <p style={styles.subtitle}>
          Explore our comprehensive range of premium coconut products and global trade solutions, 
          designed to streamline your operations and boost your business success worldwide.
        </p>
      </header>

      {/* Services Grid */}
      <div 
        style={styles.serviceCardContainer} 
        className="service-card-container"
        role="list"
        aria-label="List of services"
      >
        {SERVICES_DATA.map((serviceData, index) => (
          <ServiceCard 
            key={serviceData.title}
            serviceData={serviceData}
            role="listitem"
          />
        ))}
      </div>

      {/* Stats Section */}
      <section style={styles.statsSection} aria-labelledby="stats-title">
        <h3 style={styles.statsTitle} id="stats-title">Why Choose Our Products?</h3>
        <div style={styles.statsGrid} className="stats-grid" role="list" aria-label="Company statistics">
          {STATS_DATA.map((stat, index) => (
            <div 
              key={stat.label} 
              style={styles.statItem} 
              className="stat-item"
              role="listitem"
            >
              <div style={styles.statNumber} aria-label={stat.number}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - CONNECTED TO CONTACT US */}
      <section style={styles.ctaSection} aria-labelledby="cta-title">
        <div style={styles.ctaBackground} aria-hidden="true"></div>
        <h3 style={styles.ctaTitle} id="cta-title">Have questions about our coconut products?</h3>
        <p style={styles.ctaText}>
          We're here to help! Contact our expert team for personalized assistance, 
          product specifications, pricing, and global shipping information.
        </p>
        <button 
          style={styles.ctaButton}
          className="cta-button"
          onClick={navigateToContact}
          aria-label="Contact us today - navigate to contact page"
        >
          <span>Contact Us Today</span>
          <span style={styles.buttonIcon} className="button-icon" aria-hidden="true">→</span>
        </button>
      </section>
    </section>
  );
};

export default React.memo(Services);