import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Simple components if yours are causing issues
const Home = () => <div className="container mt-5"><h1>Home Page - Working!</h1></div>;
const About = () => <div className="container mt-5"><h1>About Page</h1></div>;
const Contact = () => <div className="container mt-5"><h1>Contact Page</h1></div>;
const Header = () => <nav className="navbar navbar-expand-lg navbar-light bg-light"><div className="container"><span className="navbar-brand">Mandiri Project</span></div></nav>;
const Footer = () => <footer className="bg-dark text-white text-center py-3 mt-5"><div className="container">Footer Content</div></footer>;

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;