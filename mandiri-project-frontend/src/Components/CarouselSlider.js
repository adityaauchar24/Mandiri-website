import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import AboutCoconutImg from '../Images/AboutCoconutImg.jpeg';
import coconutFarm from '../Images/coconutFarm.jpg';
import productCharcoalBri from '../Images/productCharcoalBri.jpeg';

const CarouselSlider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const styles = {
    carouselImg: {
      width: "100%",
      height: "90vh",
      minHeight: "600px",
      objectFit: "cover",
    },
    carouselOverlay: {
      position: 'absolute',
      top: '70%', // Changed from 0 to 60% to move content down
      left: 0,
      width: '100%',
      height: '40%', // Reduced height since we're positioning lower
      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', // Simplified gradient
      display: 'flex',
      alignItems: 'flex-start', // Changed to flex-start to position at top of overlay
      justifyContent: 'center',
      paddingTop: '2rem', // Added padding to push content further down
    },
    carouselContent: {
      textAlign: 'center',
      color: '#fff',
      maxWidth: '800px',
      padding: '0 20px',
    },
    carouselTitle: {
      fontSize: 'clamp(2rem, 3.5vw, 3rem)',
      fontWeight: 400,
      marginBottom: '1rem',
      textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
    },
    carouselSubtitle: {
      fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
      marginBottom: '1rem',
      textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
    }
  };

  const carouselData = [
    {
      src: coconutFarm,
      title: "Premium Coconut Products",
      subtitle: "Sourced from sustainable farms with the highest quality standards"
    },
    {
      src: AboutCoconutImg,
      title: "Sustainable Farming",
      subtitle: "Eco-friendly practices that respect nature and support local communities"
    },
    {
      src: productCharcoalBri,
      title: "Eco-Friendly Solutions",
      subtitle: "Innovative coconut-based products for a greener future"
    }
  ];

  return (
    <Carousel 
      activeIndex={index}
      onSelect={handleSelect}
      fade={true}
    >
      {carouselData.map((item, idx) => (
        <Carousel.Item key={idx} interval={5000}>
          <img
            style={styles.carouselImg}
            src={item.src}
            alt={item.title}
          />
          <div style={styles.carouselOverlay}>
            <div style={styles.carouselContent}>
              <h2 style={styles.carouselTitle}>{item.title}</h2>
              <p style={styles.carouselSubtitle}>{item.subtitle}</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselSlider;