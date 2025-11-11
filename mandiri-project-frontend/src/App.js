import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import './App.css';
import "@fontsource/roboto";
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import Header from './Components/Header';
import Home from './Components/Home';
import Services from './Components/Services';
import { styled } from '@mui/material/styles';
import Footer from './Components/Footer';
import ToastMessage from './Components/ToastMessage';
import { useEffect, useState } from 'react';
import Products from './Components/Products';
import websiteDown from '../src/Images/websiteDown.jpg';

// Using MUI styled components instead of makeStyles
const ProjectContainer = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
});

const HeaderContainer = styled('div')({
  width: "100%",
  height: 100,
  position: "relative",
});

const AppContainer = styled('div')({
  textAlign: 'center',
});

function App() {
  // useState
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
    <AppContainer className="App">
      {/* <img src={websiteDown} width="100%" height="100%" alt="Website Maintenance" /> */}
      <Router>
        {showMessage.success && <ToastMessage showMessage={showMessage} />}
        {showMessage.error && <ToastMessage showMessage={showMessage} />}
        <HeaderContainer>
          <Header />
        </HeaderContainer>
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
        <Footer />
      </Router>
    </AppContainer>
  );
}

export default App;