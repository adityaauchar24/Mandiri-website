import React, { useState, useEffect } from 'react';
import bussLogo from '../Images/bussLogo.jpeg';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [hoveredSocial, setHoveredSocial] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // Animation on component mount
    useEffect(() => {
        setIsVisible(true);
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-5px); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Enhanced responsive styles with modern design
    const styles = {
        // Main Footer Container
        footerContainer: {
            width: '100%',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 4vw, 4rem)',
            boxSizing: 'border-box',
            marginTop: 'auto',
            gap: 'clamp(2rem, 4vw, 3rem)',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
            position: 'relative',
            overflow: 'hidden'
        },

        // Company Details Section
        footerCompanyDetail: {
            flex: '1 1 320px',
            minWidth: 'min(100%, 320px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1.5rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.1s'
        },

        logoContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            textDecoration: 'none'
        },

        logo: {
            width: 'clamp(70px, 8vw, 90px)',
            height: 'clamp(70px, 8vw, 90px)',
            borderRadius: '20px',
            objectFit: 'cover',
            border: '3px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
        },

        companyName: {
            fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
            fontWeight: '800',
            color: '#ffffff',
            textAlign: 'left',
            background: 'linear-gradient(45deg, #ffffff, #e6e6e6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },

        footerNavLink: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },

        link: {
            fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
            color: 'rgba(255,255,255,0.8)',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            fontWeight: '500'
        },

        // Contact Information Section
        footerLeftSection: {
            flex: '1 1 380px',
            minWidth: 'min(100%, 380px)',
            display: 'flex',
            flexDirection: 'column',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.2s'
        },

        sectionHeading: {
            fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 2rem 0',
            textAlign: 'left',
            position: 'relative',
            paddingBottom: '0.5rem'
        },

        footerDetail: {
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '1.75rem',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)'
        },

        contactText: {
            fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.6',
            flex: '1'
        },

        // About Company & Social Media Section
        footerRightSection: {
            flex: '1 1 420px',
            minWidth: 'min(100%, 420px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.3s'
        },

        aboutText: {
            fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.7',
            textAlign: 'left',
            marginBottom: '2rem'
        },

        socialMediaIcons: {
            display: 'flex',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            flexWrap: 'wrap'
        },

        socialIconLink: {
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            padding: '0.75rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)'
        },

        socialIcon: {
            width: 'clamp(24px, 3vw, 28px)',
            height: 'clamp(24px, 3vw, 28px)',
            transition: 'all 0.3s ease'
        },

        // Copyright Section
        copyrightSection: {
            width: '100%',
            textAlign: 'center',
            padding: '2rem 0 0 0',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            marginTop: '2rem'
        },

        copyrightText: {
            fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.5'
        }
    };

    // Custom SVG Icons with enhanced styling
    const LocationIcon = () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#4FC3F7" style={{ minWidth: '22px', flexShrink: 0 }}>
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
    );

    const PhoneIcon = () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#4FC3F7" style={{ minWidth: '22px', flexShrink: 0 }}>
            <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z"/>
        </svg>
    );

    const EmailIcon = () => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#4FC3F7" style={{ minWidth: '22px', flexShrink: 0 }}>
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
    );

    const FacebookIcon = () => (
        <svg viewBox="0 0 24 24" fill={hoveredSocial === 'facebook' ? '#1877F2' : '#FFFFFF'} style={styles.socialIcon}>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
    );

    const WhatsAppIcon = () => (
        <svg viewBox="0 0 24 24" fill={hoveredSocial === 'whatsapp' ? '#25D366' : '#FFFFFF'} style={styles.socialIcon}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.209-3.553-8.503"/>
        </svg>
    );

    const InstagramIcon = () => (
        <svg viewBox="0 0 24 24" fill={hoveredSocial === 'instagram' ? '#E4405F' : '#FFFFFF'} style={styles.socialIcon}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
    );

    const LinkedInIcon = () => (
        <svg viewBox="0 0 24 24" fill={hoveredSocial === 'linkedin' ? '#0A66C2' : '#FFFFFF'} style={styles.socialIcon}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
    );

    const handleSocialHover = (platform) => {
        setHoveredSocial(platform);
    };

    const handleSocialLeave = () => {
        setHoveredSocial(null);
    };

    // Enhanced hover effects
    const enhancedHoverEffects = `
        .footer-link:hover {
            background: linear-gradient(135deg, rgba(8,2,163,0.8) 0%, rgba(74,0,224,0.8) 100%) !important;
            color: #ffffff !important;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(8,2,163,0.3);
        }
        .social-icon:hover {
            transform: scale(1.2) rotate(5deg);
            animation: float 2s ease-in-out infinite;
        }
        .footer-detail:hover {
            background: rgba(255,255,255,0.08) !important;
            border-color: rgba(255,255,255,0.2) !important;
            transform: translateX(5px);
        }
        .logo:hover {
            transform: scale(1.05) rotate(2deg);
            box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }
        @media (max-width: 768px) {
            .footer-container {
                padding: 2rem 1.5rem;
                gap: 2rem;
            }
        }
        @media (max-width: 480px) {
            .footer-container {
                padding: 1.5rem 1rem;
                gap: 1.5rem;
            }
            .footer-detail {
                padding: 0.75rem;
            }
        }
    `;

    return (
        <footer style={styles.footerContainer} className="footer-container">
            <style>{enhancedHoverEffects}</style>
            
            {/* Floating Background Elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: 'clamp(40px, 6vw, 80px)',
                height: 'clamp(40px, 6vw, 80px)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite'
            }}></div>
            
            <div style={{
                position: 'absolute',
                bottom: '15%',
                right: '8%',
                width: 'clamp(30px, 5vw, 60px)',
                height: 'clamp(30px, 5vw, 60px)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite 2s'
            }}></div>

            {/* Company Details Section */}
            <div style={styles.footerCompanyDetail}>
                <Link to="/" style={styles.logoContainer}>
                    <img 
                        src={bussLogo} 
                        alt="PT.International Mandiri Expo Logo" 
                        style={styles.logo}
                        className="logo"
                    />
                    <span style={styles.companyName}>
                        PT.International Mandiri Expo
                    </span>
                </Link>
                <div style={styles.footerNavLink}>
                    {['Home', 'Products', 'About', 'Contact'].map((item, index) => (
                        <React.Fragment key={item}>
                            <Link 
                                style={styles.link} 
                                to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                                className="footer-link"
                            >
                                {item}
                            </Link>
                            {index < 3 && <span style={{color: 'rgba(255,255,255,0.3)'}}>•</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Contact Information Section */}
            <div style={styles.footerLeftSection}>
                <h4 style={styles.sectionHeading}>
                    <span style={{
                        display: 'inline-block',
                        paddingBottom: '0.5rem',
                        borderBottom: '2px solid #4FC3F7'
                    }}>
                        Contact us
                    </span>
                </h4>
                <div style={styles.footerDetail} className="footer-detail">
                    <LocationIcon />
                    <span style={styles.contactText}>
                        SOHO CAPITAL LT.32 UNIT 7 JL. LETJEN PARMAN KAV 28<br />
                        TANJUNG DUREN SELATAN GROGOL PETAMBURAN<br />
                        JAKARTA BARAT DKI JAKARTA, 11470
                    </span>
                </div>
                <div style={styles.footerDetail} className="footer-detail">
                    <PhoneIcon />
                    <span style={styles.contactText}>
                        +62 813 1193 2441<br />
                        +62 878 1788 3677
                    </span>
                </div>
                <div style={styles.footerDetail} className="footer-detail">
                    <EmailIcon />
                    <span style={styles.contactText}>
                        ptinternationalmandiriexpo@gmail.com<br />
                        info@ptinternationalmandiriexpo.com
                    </span>
                </div>
            </div>

            {/* About Company & Social Media Section */}
            <div style={styles.footerRightSection}>
                <h4 style={styles.sectionHeading}>
                    <span style={{
                        display: 'inline-block',
                        paddingBottom: '0.5rem',
                        borderBottom: '2px solid #4FC3F7'
                    }}>
                        About our company
                    </span>
                </h4>
                <p style={styles.aboutText}>
                    Welcome to PT.International Mandiri Expo - your gateway to global trade!
                    We are a pioneering energy company, established with a vision to revolutionize 
                    the energy industry. Our commitment to sustainability and innovation drives us to produce 
                    high-quality coconut-based products that provide efficient and eco-friendly alternatives 
                    to traditional energy consumption.
                </p>
                <div style={styles.socialMediaIcons}>
                    {[
                        { 
                            icon: <FacebookIcon />, 
                            href: "https://www.facebook.com/people/Ptime-Cro/pfbid0WS4sfd7GURwVR1RFMXzUthAqdCWm4MNY939ABdDTZ69wVGZPt8r1vKUJdwYcbrrUl/?mibextid=7cd5pb",
                            platform: 'facebook'
                        },
                        { 
                            icon: <WhatsAppIcon />, 
                            href: "https://api.whatsapp.com/send/?phone=6281311932441&text&type=phone_number&app_absent=0",
                            platform: 'whatsapp'
                        },
                        { 
                            icon: <InstagramIcon />, 
                            href: "https://www.instagram.com/ptime91/?igshid=NGVhN2U2NjQ0Yg%3D%3D",
                            platform: 'instagram'
                        },
                        { 
                            icon: <LinkedInIcon />, 
                            href: "https://www.linkedin.com/in/pt-ime-350b34290",
                            platform: 'linkedin'
                        }
                    ].map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.socialIconLink}
                            className="social-icon"
                            onMouseEnter={() => handleSocialHover(social.platform)}
                            onMouseLeave={handleSocialLeave}
                            aria-label={`Follow us on ${social.platform}`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>

            {/* Copyright Section */}
            <div style={styles.copyrightSection}>
                <p style={styles.copyrightText}>
                    © {new Date().getFullYear()} PT.International Mandiri Expo. All rights reserved.<br />
                    Pioneering Sustainable Energy Solutions from Indonesia to the World.
                </p>
            </div>
        </footer>
    );
};

export default Footer;