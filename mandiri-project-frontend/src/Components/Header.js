import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import bussLogo from '../Images/bussLogo.jpeg';

const Header = () => {
    const [navLinkData] = useState([
        { route: "/", name: "Home" },
        { route: "/products", name: "Products" },
        { route: "/about", name: "About Us" },
        { route: "/contact", name: "Contact Us" }
    ]);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    // Detect screen size and scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        checkScreenSize();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', checkScreenSize);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Enhanced responsive styles with mobile-first approach
    const styles = {
        // Main Header Container
        headerContainer: {
            width: '100%',
            height: isMobile ? (isScrolled ? '70px' : '80px') : (isScrolled ? '80px' : '100px'),
            display: "flex",
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.98)' : '#ffffff',
            padding: isMobile ? '0 1rem' : '0 clamp(1.5rem, 4vw, 4rem)',
            boxSizing: 'border-box',
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            borderBottom: isScrolled ? '1px solid rgba(8, 2, 163, 0.1)' : 'none'
        },

        // Logo Section
        logoBox: {
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.75rem' : 'clamp(0.75rem, 2vw, 1.5rem)',
            textDecoration: 'none',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            flexShrink: 0
        },

        logo: {
            width: isMobile ? (isScrolled ? '50px' : '55px') : (isScrolled ? '60px' : 'clamp(70px, 8vw, 90px)'),
            height: isMobile ? (isScrolled ? '50px' : '55px') : (isScrolled ? '60px' : 'clamp(70px, 8vw, 90px)'),
            borderRadius: '15px',
            objectFit: 'cover',
            border: '2px solid rgba(8, 2, 163, 0.1)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            flexShrink: 0
        },

        companyName: {
            color: "#0802A3",
            fontSize: isMobile ? '0.8rem' : 'clamp(0.9rem, 1.5vw, 1.2rem)',
            fontWeight: '800',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            transition: 'all 0.3s ease',
            lineHeight: '1.2',
            display: isMobile ? (isScrolled ? 'none' : 'block') : 'block'
        },

        // Navigation
        headerNav: {
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: 'clamp(0.25rem, 1vw, 0.5rem)',
            transition: 'all 0.3s ease'
        },

        navLinkBase: {
            color: '#242424',
            textDecoration: 'none',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
            fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
            display: 'inline-block',
            padding: 'clamp(0.5rem, 0.5vw, 0.5rem) clamp(1.5rem, 2.3vw, 2.3rem)',
            borderRadius: '12px',
            margin: '0 clamp(0.125rem, 0.5vw, 0.25rem)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fontWeight: '500',
            position: 'relative',
            overflow: 'hidden',
            background: 'transparent',
            border: '1px solid transparent',
            whiteSpace: 'nowrap'
        },

        // Mobile Menu Button
        mobileMenuButton: {
            display: isMobile ? 'flex' : 'none',
            background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
            border: 'none',
            width: '45px',
            height: '45px',
            borderRadius: '10px',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(8, 2, 163, 0.2)',
            position: 'relative',
            zIndex: 1001,
            flexShrink: 0
        },

        // Mobile Menu Overlay
        mobileMenuOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998,
            opacity: isMobileMenuOpen ? 1 : 0,
            visibility: isMobileMenuOpen ? 'visible' : 'hidden',
            transition: 'all 0.3s ease'
        },

        mobileNav: {
            position: 'fixed',
            top: 0,
            right: isMobileMenuOpen ? 0 : '-100%',
            width: isMobile ? 'min(85%, 300px)' : 'min(400px, 50%)',
            height: '100%',
            backgroundColor: '#ffffff',
            boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
            zIndex: 999,
            padding: '5rem 1.5rem 2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            transition: 'right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            overflowY: 'auto'
        },

        mobileNavLink: {
            color: '#242424',
            textDecoration: 'none',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
            fontSize: isMobile ? '1rem' : '1.1rem',
            padding: isMobile ? '0.9rem 1.25rem' : '1rem 1.5rem',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            fontWeight: '500',
            border: '1px solid transparent',
            textAlign: 'left',
            width: '100%'
        },

        closeButton: {
            position: 'absolute',
            top: isMobile ? '1rem' : '1.5rem',
            right: isMobile ? '1rem' : '1.5rem',
            background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
            border: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease',
            zIndex: 1001
        }
    };

    // Enhanced hover and active styles
    const navLinkHoverStyle = {
        ...styles.navLinkBase,
        color: '#0802A3',
        background: 'rgba(8, 2, 163, 0.05)',
        border: '1px solid rgba(8, 2, 163, 0.1)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(8, 2, 163, 0.15)'
    };

    const navLinkActiveStyle = {
        ...styles.navLinkBase,
        color: '#ffffff',
        background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
        fontWeight: "600",
        boxShadow: '0 8px 25px rgba(8, 2, 163, 0.25)',
        transform: 'translateY(-2px)'
    };

    const mobileNavLinkActiveStyle = {
        ...styles.mobileNavLink,
        color: '#ffffff',
        background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
        fontWeight: "600",
        boxShadow: '0 4px 15px rgba(8, 2, 163, 0.2)'
    };

    const mobileNavLinkHoverStyle = {
        ...styles.mobileNavLink,
        color: '#0802A3',
        background: 'rgba(8, 2, 163, 0.05)',
        border: '1px solid rgba(8, 2, 163, 0.1)'
    };

    // Event handlers
    const handleMouseEnter = (index) => setHoveredIndex(index);
    const handleMouseLeave = () => setHoveredIndex(null);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // Enhanced CSS animations
    const enhancedStyles = `
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .nav-link::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(135deg, #0802A3 0%, #4A00E0 100%);
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }
        
        .nav-link:hover::before {
            width: 80%;
        }
        
        .mobile-menu-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(8, 2, 163, 0.3);
        }
        
        .close-button:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(8, 2, 163, 0.3);
        }
        
        .logo-box:hover .logo {
            transform: scale(1.05) rotate(2deg);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .logo-box:hover .company-name {
            background: linear-gradient(135deg, #4A00E0 0%, #0802A3 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        /* Remove all borders, backgrounds, and outlines from logo box */
        .logo-box,
        .logo-box:hover,
        .logo-box:active,
        .logo-box:focus {
            background: transparent !important;
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
        }
        
        /* Desktop Styles */
        @media (min-width: 769px) {
            .header-nav {
                animation: slideInRight 0.6s ease-out;
            }
        }
        
        /* Tablet Styles */
        @media (max-width: 1024px) and (min-width: 769px) {
            .nav-link {
                padding: 0.5rem 1.2rem !important;
                font-size: 0.9rem !important;
            }
        }
        
        /* Mobile Styles */
        @media (max-width: 768px) {
            .header-container {
                animation: fadeInDown 0.6s ease-out;
            }
            
            .header-nav {
                display: none;
            }
            
            .mobile-menu-button {
                display: flex;
            }
        }
        
        /* Small Mobile Styles */
        @media (max-width: 480px) {
            .header-container {
                padding: 0 1rem;
            }
            
            .company-name {
                font-size: 0.75rem;
            }
            
            .logo {
                width: 45px !important;
                height: 45px !important;
            }
            
            .mobile-menu-button {
                width: 40px;
                height: 40px;
            }
            
            .mobile-nav-link {
                font-size: 0.95rem;
                padding: 0.8rem 1rem;
            }
        }
        
        /* Extra Small Mobile Styles */
        @media (max-width: 360px) {
            .header-container {
                padding: 0 0.75rem;
            }
            
            .company-name {
                font-size: 0.7rem;
            }
            
            .logo-box {
                gap: 0.5rem;
            }
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .header-container,
            .nav-link,
            .logo,
            .mobile-menu-button,
            .close-button {
                transition: none;
                animation: none;
            }
        }
        
        /* Touch device improvements */
        @media (hover: none) and (pointer: coarse) {
            .nav-link:hover {
                transform: none !important;
            }
            
            .nav-link:hover::before {
                width: 0 !important;
            }
        }
    `;

    return (
        <>
            <style>{enhancedStyles}</style>
            
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    style={styles.mobileMenuOverlay}
                    onClick={toggleMobileMenu}
                    aria-hidden="true"
                />
            )}
            
            <header style={styles.headerContainer} className="header-container">
                {/* Logo and Company Name */}
                <NavLink 
                    to="/" 
                    style={styles.logoBox} 
                    className="logo-box"
                    onClick={(e) => {
                        if (isMobileMenuOpen) {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            setTimeout(() => {
                                window.location.href = '/';
                            }, 300);
                        }
                    }}
                >
                    <img 
                        src={bussLogo} 
                        alt="PT.International Mandiri Expo Logo" 
                        style={styles.logo}
                        className="logo"
                    />
                    <span style={styles.companyName} className="company-name">
                        PT.International Mandiri Expo
                    </span>
                </NavLink>

                {/* Desktop Navigation */}
                <nav style={styles.headerNav} className="header-nav">
                    {navLinkData.map((elem, index) => (
                        <NavLink 
                            key={index}
                            to={elem.route}
                            style={({ isActive }) => 
                                isActive ? navLinkActiveStyle : 
                                hoveredIndex === index ? navLinkHoverStyle : styles.navLinkBase
                            }
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            className="nav-link"
                        >
                            {elem.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    style={styles.mobileMenuButton}
                    onClick={toggleMobileMenu}
                    className="mobile-menu-button"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Navigation */}
                <nav style={styles.mobileNav} className="mobile-nav">
                    <button 
                        style={styles.closeButton}
                        onClick={toggleMobileMenu}
                        className="close-button"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                    
                    {navLinkData.map((elem, index) => (
                        <NavLink 
                            key={index}
                            to={elem.route}
                            style={({ isActive }) => 
                                isActive ? mobileNavLinkActiveStyle : 
                                mobileNavLinkHoverStyle
                            }
                            onClick={toggleMobileMenu}
                            className="mobile-nav-link"
                        >
                            {elem.name}
                        </NavLink>
                    ))}
                </nav>
            </header>
        </>
    );
};

export default Header;