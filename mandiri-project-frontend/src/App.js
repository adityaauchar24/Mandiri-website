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
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showMessage, setShowMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    let clearToastMess;
    
    if (showMessage && (showMessage.success || showMessage.error)) {
      clearToastMess = setTimeout(() => {
        setShowMessage(null);
      }, 5000);
    }

    return () => {
      if (clearToastMess) {
        clearTimeout(clearToastMess);
      }
    };
  }, [showMessage]);

  const globalStyles = `
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

    .App {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .main-content {
      flex: 1;
      width: 100%;
      position: relative;
    }

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

    ::selection {
      background: rgba(8, 2, 163, 0.2);
      color: #0802A3;
    }

    *:focus {
      outline: 2px solid #0802A3;
      outline-offset: 2px;
    }

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

    @media (min-width: 1440px) {
      html {
        font-size: 18px;
      }
    }
  `;

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
      }}>Loading PT. International Mandiri Expo...</p>
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

  return (
    <div className="App">
      <style>{globalStyles}</style>
      
      {isLoading && <LoadingSpinner />}

      <Router>
        {showMessage && (
          <ToastMessage showMessage={showMessage} />
        )}
        
        <div style={{ 
          width: "100%", 
          position: "relative",
          zIndex: 1000
        }}>
          <Header />
        </div>
        
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
            <Route 
              path="*" 
              element={<Navigate to="/" replace />} 
            />
          </Routes>
        </main>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;