import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import Header from './Components/Header';
import Home from './Components/Home';
import Services from './Components/Services';
import Footer from './Components/Footer';
import ToastMessage from './Components/ToastMessage';
import { useEffect, useState } from 'react';
import Products from './Components/Products';
import websiteDown from './Images/websiteDown.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Fixed: Initialize showMessage as null instead of object
  const [showMessage, setShowMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);

  // Enhanced useEffect for better performance
  useEffect(() => {
    // Simulate initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Enhanced toast message cleanup - Fixed null checks
  useEffect(() => {
    let clearToastMess;
    
    // Fixed: Check if showMessage exists and has success or error
    if (showMessage && (showMessage.success || showMessage.error)) {
      clearToastMess = setTimeout(() => {
        setShowMessage(null); // Set to null instead of object
      }, 5000);
    }

    return () => {
      if (clearToastMess) {
        clearTimeout(clearToastMess);
      }
    };
  }, [showMessage]);

  // Enhanced global styles
  const globalStyles = `
    /* Global Reset and Base Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
      font-size: 16px;
    }

    body {
      font-family: 'Inter', 'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      color: #333;
      overflow-x: hidden;
      background-color: #ffffff;
    }

    /* App Container */
    .App {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* Main Content Area */
    .main-content {
      flex: 1;
      width: 100%;
      position: relative;
    }

    /* Loading Animation */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .content-loaded {
      animation: fadeIn 0.6s ease-out;
    }

    /* Scrollbar Styling */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #0802A3 0%, #4A00E0 100%);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, #4A00E0 0%, #0802A3 100%);
    }

    /* Selection Styling */
    ::selection {
      background: rgba(8, 2, 163, 0.2);
      color: #0802A3;
    }

    /* Focus Styles for Accessibility */
    *:focus {
      outline: 2px solid #0802A3;
      outline-offset: 2px;
    }

    /* Reduced Motion for Accessibility */
    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }
      
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* Print Styles */
    @media print {
      .App {
        background: white !important;
        color: black !important;
      }
      
      .ToastMessageSection,
      .mobile-menu-button {
        display: none !important;
      }
    }

    /* High Contrast Mode Support */
    @media (prefers-contrast: high) {
      .App {
        background: white;
        color: black;
      }
    }

    /* Mobile Optimizations */
    @media (max-width: 768px) {
      html {
        font-size: 14px;
      }
    }

    @media (max-width: 480px) {
      html {
        font-size: 13px;
      }
    }

    /* Large Screen Optimizations */
    @media (min-width: 1440px) {
      html {
        font-size: 18px;
      }
    }

    /* Performance Optimizations */
    .lazy-load {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .lazy-load.loaded {
      opacity: 1;
    }
  `;

  // Enhanced maintenance page styles
  const maintenanceStyles = {
    maintenanceContainer: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '2rem',
      fontFamily: "'Inter', sans-serif"
    },
    maintenanceImage: {
      maxWidth: 'min(500px, 90vw)',
      height: 'auto',
      borderRadius: '20px',
      marginBottom: '2rem',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    maintenanceTitle: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '800',
      marginBottom: '1rem',
      textTransform: 'uppercase'
    },
    maintenanceText: {
      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
      opacity: '0.9',
      maxWidth: '600px',
      lineHeight: '1.6',
      marginBottom: '2rem'
    }
  };

  // Loading component
  const LoadingSpinner = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #0802A3',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{
        color: '#0802A3',
        fontSize: '1.1rem',
        fontWeight: '600'
      }}>Loading...</p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );

  // Render maintenance page if needed
  if (isMaintenance) {
    return (
      <div style={maintenanceStyles.maintenanceContainer}>
        <img 
          src={websiteDown} 
          alt="Website Maintenance" 
          style={maintenanceStyles.maintenanceImage}
        />
        <h1 style={maintenanceStyles.maintenanceTitle}>
          Website Under Maintenance
        </h1>
        <p style={maintenanceStyles.maintenanceText}>
          We're currently performing some updates to improve your experience. 
          Please check back shortly. Thank you for your patience!
        </p>
        <button 
          onClick={() => setIsMaintenance(false)}
          style={{
            padding: '1rem 2rem',
            backgroundColor: 'white',
            color: '#0802A3',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Global Styles */}
      <style>{globalStyles}</style>
      
      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}

      {/* Maintenance Mode - Uncomment to enable */}
      {/* 
      <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 10000 }}>
        <button 
          onClick={() => setIsMaintenance(!isMaintenance)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0802A3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          {isMaintenance ? 'Disable Maintenance' : 'Enable Maintenance'}
        </button>
      </div>
      */}

      <Router>
        {/* Toast Messages - Fixed: Check if showMessage exists */}
        {showMessage && (
          <ToastMessage showMessage={showMessage} />
        )}
        
        {/* Header with enhanced spacing */}
        <div style={{ 
          width: "100%", 
          position: "relative",
          zIndex: 1000
        }}>
          <Header />
        </div>
        
        {/* Main Content Area */}
        <main className={`main-content ${!isLoading ? 'content-loaded' : ''}`}>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  showMessage={showMessage} 
                  setShowMessage={setShowMessage} 
                />
              } 
            />
            <Route 
              path="/services" 
              element={<Services />} 
            />
            <Route 
              path="/products" 
              element={<Products />} 
            />
            <Route 
              path="/about" 
              element={<AboutUs />} 
            />
            <Route 
              path="/contact" 
              element={
                <ContactUs 
                  showMessage={showMessage} 
                  setShowMessage={setShowMessage} 
                />
              } 
            />
            {/* Catch all route - redirect to home */}
            <Route 
              path="*" 
              element={<Navigate to="/" replace />} 
            />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
      </Router>

      {/* Additional Global Scripts */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Lazy loading images
            document.addEventListener('DOMContentLoaded', function() {
              const lazyImages = [].slice.call(document.querySelectorAll('img.lazy-load'));
              
              if ('IntersectionObserver' in window) {
                let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                  entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                      let lazyImage = entry.target;
                      lazyImage.src = lazyImage.dataset.src;
                      lazyImage.classList.remove('lazy-load');
                      lazyImage.classList.add('loaded');
                      lazyImageObserver.unobserve(lazyImage);
                    }
                  });
                });

                lazyImages.forEach(function(lazyImage) {
                  lazyImageObserver.observe(lazyImage);
                });
              }
            });

            // Performance monitoring
            window.addEventListener('load', function() {
              // Page is fully loaded
              console.log('Page fully loaded');
            });

            // Error handling
            window.addEventListener('error', function(e) {
              console.error('Global error:', e.error);
            });
          `
        }}
      />
    </div>
  );
}

export default App;