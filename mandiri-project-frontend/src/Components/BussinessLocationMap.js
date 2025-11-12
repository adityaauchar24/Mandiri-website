import React, { useState } from 'react';

const BusinessLocationMap = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentLocation, setCurrentLocation] = useState({
        name: "Werkspace Soho Capital",
        url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9235999999997!2d107.60985277499606!3d-6.897790993094791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64a1d699149%3A0x5b4e5cd3513b8c8d!2sWerkspace%20Soho%20Capital!5e0!3m2!1sen!2sid!4v1694671763536!5m2!1sen!2sid"
    });

    const popularLocations = {
        "Mumbai": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.903917991898!2d72.83246517507413!3d19.075021682095214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1694671763536!5m2!1sen!2sin",
        "Jakarta": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.609124278!2d106.845434875!3d-6.229728000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1694671763536!5m2!1sen!2sid",
        "Singapore": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.190362757!2d103.704162!3d1.314339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2ssg!4v1694671763536!5m2!1sen!2ssg",
        "Bangkok": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d496113.5602177401!2d100.35290959999999!3d13.7251093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6032280d61f3%3A0x10100b25de24820!2sBangkok%2C%20Thailand!5e0!3m2!1sen!2sth!4v1694671763536!5m2!1sen!2sth"
    };

    const styles = {
        container: {
            width: '100%',
            padding: '0 20px',
            maxWidth: '1400px',
            margin: '0 auto',
            fontFamily: 'Roboto, Arial, sans-serif'
        },
        title: {
            color: "#0802A3",
            fontSize: '42px',
            fontWeight: 900,
            textTransform: 'uppercase',
            margin: '50px 0 30px 0',
            textAlign: 'center',
            letterSpacing: '2px',
            background: 'linear-gradient(135deg, #0802A3, #4A00E0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(8, 2, 163, 0.1)'
        },
        subtitle: {
            color: '#666',
            fontSize: '18px',
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: '40px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 40px auto'
        },
        searchContainer: {
            display: 'flex',
            gap: '15px',
            marginBottom: '30px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
        },
        searchInput: {
            flex: '1',
            maxWidth: '400px',
            padding: '12px 20px',
            border: '2px solid #e0e0e0',
            borderRadius: '25px',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        searchButton: {
            padding: '12px 25px',
            backgroundColor: '#0802A3',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(8, 2, 163, 0.3)'
        },
        quickLocations: {
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap'
        },
        locationButton: {
            padding: '8px 16px',
            backgroundColor: '#f8f9ff',
            color: '#0802A3',
            border: '2px solid #0802A3',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },
        mapContainer: {
            width: '100%',
            height: '500px',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            position: 'relative',
            transition: 'all 0.3s ease',
            border: '3px solid #f0f0f0'
        },
        mapFrame: {
            width: '100%',
            height: '100%',
            border: 'none',
            filter: 'saturate(1.2) contrast(1.1)'
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(8, 2, 163, 0.03) 0%, rgba(74, 0, 224, 0.03) 100%)',
            pointerEvents: 'none',
            borderRadius: '15px'
        },
        infoCard: {
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
            padding: '30px',
            borderRadius: '12px',
            marginTop: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            border: '1px solid #e0e0e0'
        },
        infoTitle: {
            color: '#0802A3',
            fontSize: '20px',
            fontWeight: 700,
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        infoText: {
            color: '#555',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        contactButton: {
            background: 'linear-gradient(135deg, #0802A3, #4A00E0)',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '15px',
            boxShadow: '0 4px 15px rgba(8, 2, 163, 0.3)',
            marginRight: '15px'
        },
        mumbaiButton: {
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: '15px',
            boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            // For demo purposes, we'll use a generic search URL
            // In a real application, you would use Google Maps API for precise geocoding
            const searchUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.903917991898!2d72.83246517507413!3d19.075021682095214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2s${encodeURIComponent(searchQuery)}!5e0!3m2!1sen!2sin!4v1694671763536!5m2!1sen!2sin`;
            
            setCurrentLocation({
                name: searchQuery,
                url: searchUrl
            });
        }
    };

    const handleLocationClick = (locationName) => {
        setCurrentLocation({
            name: locationName,
            url: popularLocations[locationName]
        });
    };

    const handleGetDirections = () => {
        // Open directions to current location in new tab
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(currentLocation.name)}`;
        window.open(directionsUrl, '_blank');
    };

    const handleMumbaiDirections = () => {
        // Always open directions to Mumbai
        const mumbaiUrl = `https://www.google.com/maps/dir/?api=1&destination=Mumbai,India`;
        window.open(mumbaiUrl, '_blank');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>FIND OUR LOCATIONS</h2>
            
            {/* Search Bar */}
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search for any location..."
                    style={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={(e) => {
                        e.target.style.border = '2px solid #0802A3';
                        e.target.style.boxShadow = '0 0 0 3px rgba(8, 2, 163, 0.1)';
                    }}
                    onBlur={(e) => {
                        e.target.style.border = '2px solid #e0e0e0';
                        e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                    }}
                />
                <button 
                    style={styles.searchButton}
                    onClick={handleSearch}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(8, 2, 163, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(8, 2, 163, 0.3)';
                    }}
                >
                    Search 🔍
                </button>
            </div>
            
            {/* Map */}
            <div 
                style={styles.mapContainer}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
            >
                <iframe
                    src={currentLocation.url}
                    style={styles.mapFrame}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${currentLocation.name}`}
                />
                <div style={styles.overlay}></div>
            </div>

            {/* Info Card */}
            <div style={styles.infoCard}>
                <h3 style={styles.infoTitle}>
                    📍 {currentLocation.name}
                </h3>
                <p style={styles.infoText}>
                    🏢 <strong>Currently Viewing:</strong> {currentLocation.name}
                </p>
                <p style={styles.infoText}>
                    📞 <strong>Support:</strong> +62-XXX-XXXX-XXXX
                </p>
                <p style={styles.infoText}>
                    🕒 <strong>Business Hours:</strong> Mon-Fri 9:00 AM - 6:00 PM
                </p>
                <p style={styles.infoText}>
                    📧 <strong>Email:</strong> info@pt-international-mandiri.com
                </p>
                
                <div>
                    <button 
                        style={styles.contactButton}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(8, 2, 163, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 15px rgba(8, 2, 163, 0.3)';
                        }}
                        onClick={handleGetDirections}
                    >
                        Get Directions to {currentLocation.name} 📍
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default BusinessLocationMap;