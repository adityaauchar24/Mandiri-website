import React, { useState, useEffect, useRef } from 'react';
import AboutImg1 from '../Images/AboutImg1.jpeg';
import AboutImg2 from '../Images/AboutImg2.jpeg';
import AboutImg3 from '../Images/AboutImg3.jpeg';
import AboutImg4 from '../Images/AboutImg4.jpeg';
import charcoalVideo1 from '../Videos/charcoalVideo1.mp4';
import charcoalVideo2 from '../Videos/charcoalVideo2.mp4';
import charcoalVideo3 from '../Videos/charcoalVideo3.mp4';

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});
  const [videoHovered, setVideoHovered] = useState({});
  const sectionRefs = useRef([]);
  const videoRefs = useRef([]);

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, 3);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '-50px'
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleVideoPlay = (index) => {
    setActiveVideo(index);
    setIsPlaying(prev => ({ ...prev, [index]: true }));
    
    // Pause other videos
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index && !video.paused) {
        video.pause();
        setIsPlaying(prev => ({ ...prev, [i]: false }));
      }
    });
  };

  const handleVideoPause = (index) => {
    setIsPlaying(prev => ({ ...prev, [index]: false }));
    if (activeVideo === index) {
      setActiveVideo(null);
    }
  };

  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused || video.ended) {
        video.play().catch(error => {
          console.error('Error playing video:', error);
        });
      } else {
        video.pause();
      }
    }
  };

  const handleVideoHover = (index, isHovered) => {
    setVideoHovered(prev => ({ ...prev, [index]: isHovered }));
  };

  // Premium responsive styles
  const styles = {
    // Main Container
    aboutContainer: {
      width: "100%",
      minHeight: "100vh",
      background: 'linear-gradient(135deg, #fafbff 0%, #ffffff 50%, #f8f9ff 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
    },

    // Floating Background Elements
    floatingElement: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #0802A310, #4A00E010)',
      animation: 'float 6s ease-in-out infinite',
      zIndex: 0
    },

    // Hero Section
    heroSection: {
      position: 'relative',
      padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 4rem)',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
      color: 'white',
      marginBottom: 'clamp(3rem, 6vw, 6rem)'
    },

    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      fontWeight: '800',
      marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      opacity: isVisible.hero ? 1 : 0,
      transform: isVisible.hero ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },

    heroSubtitle: {
      fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
      fontWeight: '400',
      opacity: 0.9,
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6',
      opacity: isVisible.hero ? 1 : 0,
      transform: isVisible.hero ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
    },

    // Image Gallery Section
    imageGallerySection: {
      position: 'relative',
      padding: '0 clamp(1rem, 4vw, 4rem)',
      marginBottom: 'clamp(4rem, 8vw, 8rem)'
    },

    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 'clamp(2rem, 4vw, 4rem)',
      background: 'linear-gradient(45deg, #0802A3, #4A00E0)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      opacity: isVisible['global-operations'] ? 1 : 0,
      transform: isVisible['global-operations'] ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease'
    },

    imageGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
      gap: 'clamp(1.5rem, 3vw, 2.5rem)',
      opacity: isVisible['global-operations'] ? 1 : 0,
      transform: isVisible['global-operations'] ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease 0.3s'
    },

    imageCard: {
      position: 'relative',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(8, 2, 163, 0.1)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer'
    },

    galleryImage: {
      width: '100%',
      height: 'clamp(280px, 35vw, 450px)',
      objectFit: 'cover',
      transition: 'transform 0.6s ease'
    },

    // About Content Section
    aboutContentSection: {
      position: 'relative',
      padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem)',
      marginBottom: 'clamp(4rem, 8vw, 8rem)',
      background: '#ffffff',
      borderRadius: '30px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
      margin: '0 clamp(1rem, 4vw, 4rem) clamp(4rem, 8vw, 8rem)'
    },

    aboutContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      opacity: isVisible.about ? 1 : 0,
      transform: isVisible.about ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease'
    },

    contentHeading: {
      fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 'clamp(2rem, 4vw, 4rem)',
      color: '#0802A3',
      position: 'relative'
    },

    aboutText: {
      fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
      lineHeight: '1.8',
      color: '#555',
      textAlign: 'justify',
      marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
      padding: '0 clamp(0.5rem, 2vw, 2rem)'
    },

    highlightBox: {
      background: 'linear-gradient(135deg, #0802A3 0%, #4A00E0 100%)',
      color: 'white',
      padding: 'clamp(2rem, 4vw, 3rem)',
      borderRadius: '20px',
      margin: 'clamp(2rem, 4vw, 3rem) 0',
      textAlign: 'center',
      boxShadow: '0 20px 40px rgba(8, 2, 163, 0.3)',
      transform: 'perspective(1000px) rotateX(5deg)',
      transition: 'all 0.4s ease'
    },

    highlightText: {
      fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)',
      fontWeight: '600',
      lineHeight: '1.6',
      margin: 0
    },

    // Video Section - UPDATED WITH SMALL TRANSPARENT BUTTONS
    videoSection: {
      position: 'relative',
      padding: '0 clamp(1rem, 4vw, 4rem)',
      marginBottom: 'clamp(4rem, 8vw, 8rem)'
    },

    videoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
      gap: 'clamp(2rem, 4vw, 3rem)',
      opacity: isVisible.videos ? 1 : 0,
      transform: isVisible.videos ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease'
    },

    videoCard: {
      position: 'relative',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      background: '#000',
      border: '2px solid transparent'
    },

    videoPlayer: {
      width: '100%',
      height: 'clamp(250px, 30vw, 400px)',
      objectFit: 'cover',
      borderRadius: '18px',
      display: 'block'
    },

    // NEW: Small transparent play button in bottom-left
    smallPlayButton: {
      position: 'absolute',
      bottom: '15px',
      left: '15px',
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: 'white',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      zIndex: 10
    },

    // NEW: Small transparent video indicator
    videoIndicator: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      background: 'rgba(0, 0, 0, 0.3)',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '10px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      zIndex: 10
    },

    playOverlay: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'linear-gradient(45deg, rgba(8, 2, 163, 0.05), rgba(74, 0, 224, 0.05))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0,
      transition: 'all 0.3s ease',
      zIndex: 2
    },

    // UPDATED Mission Section Styles with equal height cards
    visionMissionSection: {
      position: 'relative',
      padding: 'clamp(5rem, 10vw, 8rem) clamp(1rem, 4vw, 4rem)',
      background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)',
      borderRadius: '40px 40px 0 0',
      marginTop: 'clamp(3rem, 6vw, 6rem)'
    },

    missionHeader: {
      textAlign: 'center',
      marginBottom: 'clamp(3rem, 6vw, 5rem)',
      maxWidth: '800px',
      margin: '0 auto clamp(3rem, 6vw, 5rem) auto'
    },

    missionMainTitle: {
      fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
      fontWeight: '800',
      background: 'linear-gradient(45deg, #0802A3, #4A00E0)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1.5rem',
      lineHeight: '1.2'
    },

    missionSubtitle: {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      color: '#666',
      fontWeight: '400',
      lineHeight: '1.6',
      maxWidth: '600px',
      margin: '0 auto'
    },

    missionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
      gap: 'clamp(2.5rem, 5vw, 4rem)',
      maxWidth: '1400px',
      margin: '0 auto',
      opacity: isVisible.mission ? 1 : 0,
      transform: isVisible.mission ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s ease',
      alignItems: 'stretch' // This ensures cards stretch to equal height
    },

    missionCard: {
      background: '#ffffff',
      padding: 'clamp(2.5rem, 4vw, 3.5rem)',
      borderRadius: '28px',
      boxShadow: '0 15px 40px rgba(8, 2, 163, 0.08)',
      border: '1px solid rgba(8, 2, 163, 0.08)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%', // Changed from 'fit-content' to '100%'
      minHeight: '550px' // Added minimum height to ensure consistency
    },

    cardHeader: {
      textAlign: 'center',
      marginBottom: '2.5rem',
      position: 'relative'
    },

    iconContainer: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #0802A3, #4A00E0)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem auto',
      boxShadow: '0 10px 25px rgba(8, 2, 163, 0.2)'
    },

    missionIcon: {
      fontSize: 'clamp(2rem, 3vw, 2.5rem)',
      filter: 'brightness(0) invert(1)'
    },

    missionTitle: {
      fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
      fontWeight: '700',
      color: '#0802A3',
      marginBottom: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    titleUnderline: {
      width: '60px',
      height: '4px',
      background: 'linear-gradient(45deg, #0802A3, #4A00E0)',
      margin: '0 auto',
      borderRadius: '2px'
    },

    missionContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      flex: '1 1 auto' // This makes the content area flexible
    },

    missionPoint: {
      display: 'flex',
      gap: '1.2rem',
      alignItems: 'flex-start',
      padding: '1.2rem',
      borderRadius: '16px',
      transition: 'all 0.3s ease',
      background: 'transparent',
      flex: '1 1 auto' // Added to ensure points take available space
    },

    pointIcon: {
      fontSize: '1.8rem',
      minWidth: '50px',
      height: '50px',
      background: 'rgba(8, 2, 163, 0.08)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },

    pointContent: {
      flex: 1
    },

    pointTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: '#0802A3',
      marginBottom: '0.5rem',
      lineHeight: '1.3'
    },

    pointDescription: {
      fontSize: '0.95rem',
      color: '#555',
      lineHeight: '1.6',
      margin: 0
    },

    // Values Footer
    valuesFooter: {
      marginTop: 'clamp(3rem, 6vw, 5rem)',
      textAlign: 'center'
    },

    valuesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1rem',
      maxWidth: '800px',
      margin: '0 auto'
    },

    valuePill: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(8, 2, 163, 0.05)',
      padding: '0.8rem 1.5rem',
      borderRadius: '50px',
      border: '1px solid rgba(8, 2, 163, 0.1)',
      transition: 'all 0.3s ease'
    },

    valueEmoji: {
      fontSize: '1.2rem'
    },

    valueText: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#0802A3'
    }
  };

  // Add floating animation and video styles
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      .video-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px rgba(8, 2, 163, 0.2);
        border-color: #0802A3;
      }
      
      .video-card:hover .small-play-button {
        background: rgba(8, 2, 163, 0.6);
        border-color: rgba(255, 255, 255, 0.5);
        transform: scale(1.1);
      }
      
      .video-card:hover .video-indicator {
        background: rgba(8, 2, 163, 0.6);
      }
      
      .video-card:hover .play-overlay {
        opacity: 1;
      }
      
      .small-play-button:hover {
        background: rgba(8, 2, 163, 0.8) !important;
        border-color: rgba(255, 255, 255, 0.7) !important;
        transform: scale(1.15) !important;
      }
      
      .image-card:hover {
        transform: translateY(-15px) scale(1.03);
        box-shadow: 0 30px 60px rgba(8, 2, 163, 0.2);
      }
      
      .mission-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 60px rgba(8, 2, 163, 0.15);
        border-color: rgba(8, 2, 163, 0.15);
      }
      
      .mission-point:hover {
        background: rgba(8, 2, 163, 0.03);
        transform: translateX(5px);
      }
      
      .mission-point:hover .point-icon {
        background: rgba(8, 2, 163, 0.12);
        transform: scale(1.1);
      }
      
      .value-pill:hover {
        background: rgba(8, 2, 163, 0.1);
        border-color: rgba(8, 2, 163, 0.2);
        transform: translateY(-2px);
      }
      
      .icon-container {
        position: relative;
        overflow: hidden;
      }
      
      .icon-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
        border-radius: 50%;
        z-index: 1;
      }
      
      .highlight-box:hover {
        transform: perspective(1000px) rotateX(0deg) scale(1.02);
      }
      
      .content-heading::after {
        content: "";
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        background: linear-gradient(45deg, #0802A3, #4A00E0);
        border-radius: 2px;
      }
      
      .video-playing .small-play-button {
        background: rgba(76, 175, 80, 0.6);
      }
      
      .video-playing .video-indicator {
        background: rgba(76, 175, 80, 0.6);
      }
    `;
    
    try {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    } catch (e) {
      // Fallback if CSS injection fails
      const styleElement = document.createElement('style');
      styleElement.textContent = keyframes;
      document.head.appendChild(styleElement);
    }
  }, []);

  return (
    <div style={styles.aboutContainer}>
      {/* Floating Background Elements */}
      <div style={{
        ...styles.floatingElement,
        top: '10%',
        left: '5%',
        width: 'clamp(80px, 10vw, 120px)',
        height: 'clamp(80px, 10vw, 120px)',
        animationDelay: '0s'
      }}></div>
      <div style={{
        ...styles.floatingElement,
        top: '60%',
        right: '8%',
        width: 'clamp(60px, 8vw, 100px)',
        height: 'clamp(60px, 8vw, 100px)',
        animationDelay: '2s'
      }}></div>

      {/* Hero Section */}
      <section 
        id="hero"
        ref={el => sectionRefs.current[0] = el}
        style={styles.heroSection}
      >
        <h1 style={styles.heroTitle}>About International Mandiri Expo</h1>
        <p style={styles.heroSubtitle}>
          Leading the Global Energy Revolution Through Sustainable Innovation and Excellence
        </p>
      </section>

      {/* Image Gallery Section */}
      <section 
        id="global-operations"
        ref={el => sectionRefs.current[1] = el}
        style={styles.imageGallerySection}
      >
        <h2 style={styles.sectionTitle}>Our Global Operations</h2>
        <div style={styles.imageGrid}>
          {[AboutImg2, AboutImg3, AboutImg1, AboutImg4].map((img, index) => (
            <div 
              key={index}
              style={styles.imageCard}
              className="image-card"
            >
              <img 
                src={img} 
                alt={`International Mandiri Expo operation ${index + 1}`}
                style={styles.galleryImage}
              />
            </div>
          ))}
        </div>
      </section>

      {/* About Content Section */}
      <section 
        id="about"
        ref={el => sectionRefs.current[2] = el}
        style={styles.aboutContentSection}
      >
        <div style={styles.aboutContent}>
          <h2 style={{...styles.contentHeading}} className="content-heading">Our Visionary Journey</h2>
          
          <p style={styles.aboutText}>
            Welcome to <strong style={{color: '#0802A3'}}>PT. International Mandiri Expo</strong>, 
            where we redefine global trade excellence through sustainable energy innovation. 
            Established in 2020, we emerged as pioneers in the energy sector with a clear vision: 
            to transform traditional energy consumption into eco-conscious solutions that power 
            progress while preserving our planet.
          </p>

          <div 
            style={styles.highlightBox}
            className="highlight-box"
          >
            <p style={styles.highlightText}>
              "Innovating today for a sustainable tomorrow - where every briquette represents 
              our commitment to cleaner energy and environmental stewardship."
            </p>
          </div>

          <p style={styles.aboutText}>
            Our state-of-the-art manufacturing facilities combine cutting-edge technology with 
            sustainable practices, producing premium coal briquettes that set new industry standards. 
            Each product undergoes rigorous quality control, ensuring optimal performance while 
            significantly reducing environmental impact compared to traditional coal alternatives.
          </p>

          <p style={styles.aboutText}>
            Backed by a team of industry experts and strategic global partnerships, we've 
            established ourselves as trusted leaders in sustainable energy solutions. Our 
            commitment extends beyond business - we're dedicated to creating lasting positive 
            impact through innovation, quality, and environmental responsibility.
          </p>
        </div>
      </section>

      {/* Video Section - UPDATED WITH SMALL TRANSPARENT BUTTONS */}
      <section 
        id="videos"
        ref={el => sectionRefs.current[3] = el}
        style={styles.videoSection}
      >
        <h2 style={styles.sectionTitle}>Innovation in Motion</h2>
        <div style={styles.videoGrid}>
          {[charcoalVideo1, charcoalVideo2, charcoalVideo3].map((video, index) => (
            <div 
              key={index}
              style={styles.videoCard}
              className={`video-card ${isPlaying[index] ? 'video-playing' : ''}`}
              onClick={() => handleVideoClick(index)}
              onMouseEnter={() => handleVideoHover(index, true)}
              onMouseLeave={() => handleVideoHover(index, false)}
            >
              <video 
                ref={el => {
                  if (el) {
                    videoRefs.current[index] = el;
                  }
                }}
                src={video} 
                style={styles.videoPlayer}
                onPlay={() => handleVideoPlay(index)}
                onPause={() => handleVideoPause(index)}
                poster={[AboutImg1, AboutImg2, AboutImg3][index]}
                preload="metadata"
                playsInline
                webkit-playsinline="true"
              >
                Your browser does not support the video tag.
              </video>
              
              {/* Small transparent video indicator in top-left */}
              <div style={styles.videoIndicator} className="video-indicator">
                <span>▶</span>
                <span>VIDEO</span>
              </div>

              {/* Small transparent play button in bottom-left */}
              <button 
                style={styles.smallPlayButton}
                className="small-play-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleVideoClick(index);
                }}
                aria-label={isPlaying[index] ? "Pause video" : "Play video"}
              >
                {isPlaying[index] ? '❚❚' : '▶'}
              </button>

              {/* Subtle overlay */}
              <div style={styles.playOverlay} className="play-overlay"></div>
            </div>
          ))}
        </div>
      </section>

      {/* UPDATED Mission Section */}
      <section 
        id="mission"
        ref={el => sectionRefs.current[4] = el}
        style={styles.visionMissionSection}
      >
        <div style={styles.missionHeader}>
          <h2 style={styles.missionMainTitle}>Our Core Values</h2>
          <p style={styles.missionSubtitle}>
            Driving sustainable innovation through clear vision and purposeful mission
          </p>
        </div>
        
        <div style={styles.missionGrid}>
          {/* Vision Card */}
          <div 
            style={styles.missionCard}
            className="mission-card"
          >
            <div style={styles.cardHeader}>
              <div style={styles.iconContainer} className="icon-container">
                <div style={styles.missionIcon}>🌍</div>
              </div>
              <h3 style={styles.missionTitle}>Our Vision</h3>
              <div style={styles.titleUnderline}></div>
            </div>
            
            <div style={styles.missionContent}>
              <div style={styles.missionPoint} className="mission-point">
                <div style={styles.pointIcon}>🎯</div>
                <div style={styles.pointContent}>
                  <h4 style={styles.pointTitle}>Global Leadership</h4>
                  <p style={styles.pointDescription}>
                    Establish Indonesia as the premier global exporter of premium coconut and sustainable energy solutions
                  </p>
                </div>
              </div>
              
              <div style={styles.missionPoint} className="mission-point">
                <div style={styles.pointIcon}>💡</div>
                <div style={styles.pointContent}>
                  <h4 style={styles.pointTitle}>Innovation Pioneer</h4>
                  <p style={styles.pointDescription}>
                    Transform global energy consumption through cutting-edge eco-friendly technologies and practices
                  </p>
                </div>
              </div>
              
              <div style={styles.missionPoint} className="mission-point">
                <div style={styles.pointIcon}>⚡</div>
                <div style={styles.pointContent}>
                  <h4 style={styles.pointTitle}>Industry Standards</h4>
                  <p style={styles.pointDescription}>
                    Set new benchmarks for quality, innovation, and environmental responsibility worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div 
            style={styles.missionCard}
            className="mission-card"
          >
            <div style={styles.cardHeader}>
              <div style={styles.iconContainer} className="icon-container">
                <div style={styles.missionIcon}>🚀</div>
              </div>
              <h3 style={styles.missionTitle}>Our Mission</h3>
              <div style={styles.titleUnderline}></div>
            </div>
            
            <div style={styles.missionContent}>
              <div style={styles.missionPoint} className="mission-point">
                <div style={styles.pointIcon}>⭐</div>
                <div style={styles.pointContent}>
                  <h4 style={styles.pointTitle}>Quality Excellence</h4>
                  <p style={styles.pointDescription}>
                    Deliver unparalleled quality in coconut products and sustainable energy solutions across global markets
                  </p>
                </div>
              </div>
              
              <div style={styles.missionPoint} className="mission-point">
                <div style={styles.pointIcon}>🤝</div>
                <div style={styles.pointContent}>
                  <h4 style={styles.pointTitle}>Strategic Partnerships</h4>
                  <p style={styles.pointDescription}>
                    Build lasting relationships founded on trust, integrity, and shared growth with partners worldwide
                  </p>
                </div>
              </div>
              
              <div style={styles.missionPoint} className="mission-point">
                <div style={styles.pointIcon}>🌱</div>
                <div style={styles.pointContent}>
                  <h4 style={styles.pointTitle}>Environmental Stewardship</h4>
                  <p style={styles.pointDescription}>
                    Champion sustainable practices and eco-conscious innovation in every aspect of our operations
                  </p>
                </div>
              </div>
              
              <div style={styles.missionPoint} className="mission-point">
                <div style={styles.pointIcon}>🔬</div>
                <div style={styles.pointContent}>
                  <h4 style={styles.pointTitle}>Continuous Innovation</h4>
                  <p style={styles.pointDescription}>
                    Drive relentless innovation to meet evolving global energy demands with sustainable solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Values Footer */}
        <div style={styles.valuesFooter}>
          <div style={styles.valuesContainer}>
            <div style={styles.valuePill} className="value-pill">
              <span style={styles.valueEmoji}>💎</span>
              <span style={styles.valueText}>Quality</span>
            </div>
            <div style={styles.valuePill} className="value-pill">
              <span style={styles.valueEmoji}>♻️</span>
              <span style={styles.valueText}>Sustainability</span>
            </div>
            <div style={styles.valuePill} className="value-pill">
              <span style={styles.valueEmoji}>🌍</span>
              <span style={styles.valueText}>Global Impact</span>
            </div>
            <div style={styles.valuePill} className="value-pill">
              <span style={styles.valueEmoji}>🤝</span>
              <span style={styles.valueText}>Partnership</span>
            </div>
            <div style={styles.valuePill} className="value-pill">
              <span style={styles.valueEmoji}>🚀</span>
              <span style={styles.valueText}>Innovation</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;