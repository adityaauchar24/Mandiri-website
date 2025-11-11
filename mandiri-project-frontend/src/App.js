import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './App.css';
import "@fontsource/roboto";
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import Header from './Components/Header';
import Home from './Components/Home';
import Services from './Components/Services';
import Footer from './Components/Footer';
import ToastMessage from './Components/ToastMessage';
import { useEffect, useState } from 'react';
import Products from './Components/Products';
import websiteDown from '../src/Images/websiteDown.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showMessage, setShowMessage] = useState({
    success: false,
    error: false,
    message: null
  });

  useEffect(() => {
    const clearToastMess = setTimeout(() => {
      setShowMessage({
        success: false,
        error: false,
        message: null
      });
    }, 5000);

    return () => {
      clearTimeout(clearToastMess);
    };
  }, [showMessage]);

  return (
    <div className="App">
      {/* <img src={websiteDown} width="100%" height="100%" alt="Website Maintenance" /> */}
      <Router>
        {showMessage.success && <ToastMessage showMessage={showMessage} />}
        {showMessage.error && <ToastMessage showMessage={showMessage} />}
        
        <Header />
        
        <main>
          <Routes>
            <Route 
              path="/" 
              element={<Home showMessage={showMessage} setShowMessage={setShowMessage} />} 
            />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<AboutUs />} />
            <Route 
              path="/contact" 
              element={<ContactUs showMessage={showMessage} setShowMessage={setShowMessage} />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;