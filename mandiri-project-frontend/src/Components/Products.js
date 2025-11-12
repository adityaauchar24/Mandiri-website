import React, { useState, useEffect } from 'react';
import coconutBriquettesImgs from '../Images/coconutBriquettesImgs.jpeg';
import charcoalShellImg from '../Images/charcoalShellImg.jpeg';
import coconutCharcoalBuss from '../Images/coconutCharcoalBuss.jpg';
import productCoalImg from '../Images/productCoalImg.jpeg';
import coalDetailImg from '../Images/coalDetailImg.jpeg';

const Products = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    // Animation on component mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Enhanced responsive styles
    const styles = {
        // Main Container
        productContainer: {
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#ffffff',
            fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
            overflow: 'hidden'
        },

        // Hero Section
        productImgSection: {
            width: '100%',
            height: 'clamp(400px, 50vh, 600px)',
            position: 'relative',
            overflow: 'hidden'
        },

        heroImage: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: 'brightness(0.7)',
            transition: 'transform 0.5s ease'
        },

        heroOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(8,2,163,0.8) 0%, rgba(74,0,224,0.6) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        },

        heroTitle: {
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: '800',
            color: '#ffffff',
            textTransform: 'uppercase',
            textShadow: '3px 3px 12px rgba(0,0,0,0.5)',
            margin: 0,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.2s'
        },

        // Main Content Section
        productDetailSection: {
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 3vw, 3rem)',
            boxSizing: 'border-box'
        },

        // Product Main Section
        productMainSection: {
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(2rem, 4vw, 4rem)',
            marginBottom: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
            justifyContent: 'center'
        },

        productLeftSection: {
            flex: '1 1 600px',
            minWidth: 'min(100%, 600px)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.6s ease 0.3s'
        },

        productTitle: {
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            margin: '0 0 2rem 0',
            textAlign: 'left',
            color: '#0802A3',
            textTransform: 'uppercase',
            fontWeight: '800',
            fontFamily: "'Inter', sans-serif",
            lineHeight: '1.2',
            position: 'relative',
            paddingBottom: '1rem'
        },

        productParaSection: {
            width: "100%",
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            textAlign: 'left'
        },

        paraTitle: {
            color: '#000000',
            fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
            textTransform: 'uppercase',
            fontWeight: '700',
            fontFamily: "'Inter', sans-serif",
            textAlign: 'left',
            margin: '0 0 1rem 0',
            lineHeight: '1.4'
        },

        paraText: {
            fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
            textAlign: 'left',
            fontFamily: "'Inter', sans-serif",
            wordSpacing: '1px',
            lineHeight: '1.7',
            color: '#444',
            marginBottom: '1rem'
        },

        // Image Section
        charcoalImg: {
            flex: '1 1 400px',
            minWidth: 'min(100%, 400px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.6s ease 0.4s'
        },

        productImage: {
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            borderRadius: '15px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            border: '3px solid rgba(8, 2, 163, 0.1)'
        },

        // Additional Data Section
        productData: {
            marginTop: '2rem',
            textAlign: 'left',
            padding: 'clamp(2rem, 4vw, 3rem)',
            backgroundColor: '#f8f9ff',
            borderRadius: '15px',
            border: '2px solid rgba(8, 2, 163, 0.1)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.5s'
        },

        dataText: {
            fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
            textAlign: 'left',
            fontFamily: "'Inter', sans-serif",
            wordSpacing: '1px',
            lineHeight: '1.7',
            color: '#444',
            margin: 0
        },

        // Detail Images Section
        coconutDetailImg: {
            width: '100%',
            textAlign: 'center',
            marginTop: 'clamp(3rem, 6vw, 6rem)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease 0.6s'
        },

        detailTitle: {
            color: '#0802A3',
            margin: '0 0 3rem 0',
            fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontWeight: '800',
            textTransform: 'uppercase',
            position: 'relative',
            paddingBottom: '1rem'
        },

        detailImage: {
            width: '100%',
            maxWidth: '900px',
            height: 'auto',
            border: '3px solid #0802A3',
            borderRadius: '12px',
            boxShadow: '0 20px 50px rgba(8, 2, 163, 0.2)',
            transition: 'all 0.3s ease'
        },

        // Features Grid
        featuresGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)',
            margin: '3rem 0',
            padding: '2rem',
            backgroundColor: '#f8f9ff',
            borderRadius: '15px'
        },

        featureItem: {
            textAlign: 'center',
            padding: '1.5rem'
        },

        featureIcon: {
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#0802A3'
        },

        featureText: {
            fontSize: '1rem',
            color: '#444',
            fontWeight: '600'
        }
    };

    // Enhanced CSS animations
    const enhancedStyles = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .product-image:hover {
            transform: scale(1.02);
            box-shadow: 0 25px 60px rgba(8, 2, 163, 0.3);
        }
        
        .detail-image:hover {
            transform: scale(1.01);
            box-shadow: 0 25px 60px rgba(8, 2, 163, 0.25);
        }
        
        .feature-item:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(8, 2, 163, 0.1);
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
            .product-main-section {
                flex-direction: column;
            }
            
            .product-left-section,
            .charcoal-img {
                min-width: 100%;
            }
            
            .charcoal-img {
                order: -1;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
                padding: 1rem;
            }
        }
        
        @media (max-width: 480px) {
            .product-detail-section {
                padding: 1.5rem 1rem;
            }
            
            .product-data {
                padding: 1.5rem;
            }
            
            .detail-image {
                border-width: 2px;
            }
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            .product-left-section,
            .charcoal-img,
            .product-data,
            .coconut-detail-img {
                transition: none;
            }
            
            .product-image,
            .detail-image {
                transition: none;
            }
        }
    `;

    // Features data
    const featuresData = [
        { icon: '🔥', text: 'Higher Burning Point' },
        { icon: '⏱️', text: 'Longer Burning Time' },
        { icon: '💨', text: 'Less Smoke Production' },
        { icon: '🌿', text: 'Natural Scent' }
    ];

    return (
        <div style={styles.productContainer}>
            <style>{enhancedStyles}</style>
            
            {/* Hero Section */}
            <section style={styles.productImgSection}>
                <img 
                    src={productCoalImg} 
                    alt="Premium Coconut Products" 
                    style={styles.heroImage}
                />
                <div style={styles.heroOverlay}>
                    <h1 style={styles.heroTitle}>
                        Our Premium Products
                    </h1>
                </div>
            </section>

            {/* Main Content */}
            <section style={styles.productDetailSection}>
                {/* Coconut Charcoal Briquette Section - ADDED ID */}
                <div 
                    style={styles.productMainSection} 
                    className="product-main-section" 
                    id="coconut-charcoal-briquette"  // ADDED THIS ID
                >
                    <div style={styles.productLeftSection} className="product-left-section">
                        <h2 style={styles.productTitle}>
                            Coconut Charcoal Briquette
                        </h2>
                        
                        <div style={styles.productParaSection}>
                            <h4 style={styles.paraTitle}>
                                What is Coconut Charcoal Briquette?
                            </h4>
                            <p style={styles.paraText}>
                                Coconut Charcoal Briquette is a briquette charcoal with coconut shell as the raw material. 
                                One of the main functions of Coconut Charcoal Briquette is for sisha or hookah burner. 
                                Moreover, people also use the lower grade for barbecue purposes.
                            </p>
                            <p style={styles.paraText}>
                                There are many benefits to use coconut charcoal compare to other type of charcoal. 
                                Firstly, coconut charcoal briquette have relatively higher burning point and longer burning time 
                                compare to the other type of charcoal. Furthermore, it produces less smokes and natural scent 
                                which is a best choice for your sisha/hookah companion. Moreover, you can also use coconut charcoal 
                                briquette to cook your food, such as barbeque. Because it has higher burning point, thus it will 
                                not easily make your food become over burnt. Due to these tremendous benefits compare to other type 
                                of charcoal, the demand of coconut charcoal briquette is keep increasing over the years. 
                                Consequently, we have been exporting our coconut charcoal briquette worldwide.
                            </p>
                        </div>
                        
                        <div style={styles.productParaSection}>
                            <h4 style={styles.paraTitle}>
                                Our Coconut Charcoal Briquette
                            </h4>
                            <p style={styles.paraText}>
                                As the leading supplier of Coconut Charcoal Briquette from Indonesia, hence we commit to deliver 
                                the best quality of products based on its grade and requirement. We can supply for both sisha/hookah 
                                grade and also barbecue grade, depending on your needs. Firstly, the process of making Coconut Charcoal 
                                Briquette begin with the burning process of coconut shell. After that, we crush and mold the coconut 
                                shell charcoal into briquette shape. In the molding process, we also add small amount of tapioca starch 
                                as the binder. Then, we heat the coconut charcoal briquette in the oven machine for several hours. 
                                Lastly, we do quality check of the final products before the packaging process. In addition, we can 
                                customize the packing details in accordance with our clients' requirement.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div style={styles.featuresGrid}>
                            {featuresData.map((feature, index) => (
                                <div key={index} style={styles.featureItem} className="feature-item">
                                    <div style={styles.featureIcon}>{feature.icon}</div>
                                    <div style={styles.featureText}>{feature.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div style={styles.charcoalImg} className="charcoal-img">
                        <img 
                            src={coconutBriquettesImgs} 
                            alt="Coconut Briquettes" 
                            style={styles.productImage}
                            className="product-image"
                        />
                    </div>
                </div>

                {/* Additional Information */}
                <div style={styles.productData}>
                    <p style={styles.dataText}>
                        Coconut Charcoal Briquette Indonesia PT.International Mandiri Expo
                        We, PT.International Mandiri Expo are the best supplier and exporter of Coconut Charcoal Briquette from Indonesia. 
                        Therefore, many partners have trusted us to supply their needs of Coconut Charcoal Briquette. We have three basic 
                        grades for sisha/hookah, which are grade A, grade B, and grade C. Moreover, we also provide special grades for 
                        barbecue purpose. Moreover, We are open to customize the specification and packaging depends on your requirement. 
                        For further information and discussion, feel free to contact us through Whatsapp, Email or the Contact Form.
                    </p>
                </div>

                {/* Coconut Shell Charcoal Section - ADDED ID */}
                <div 
                    style={styles.productMainSection} 
                    className="product-main-section" 
                    id="coconut-shell-charcoal"  // ADDED THIS ID
                >
                    <div style={styles.productLeftSection} className="product-left-section">
                        <h2 style={{...styles.productTitle, marginTop: '2rem'}}>
                            Coconut Shell Charcoal
                            <div style={styles.titleUnderline}></div>
                        </h2>
                        
                        <div style={styles.productParaSection}>
                            <h4 style={styles.paraTitle}>
                                What is Coconut Shell Charcoal?
                            </h4>
                            <p style={styles.paraText}>
                                Coconut shell charcoal is simply charcoal product that are originally from coconut shell. 
                                Previously, people think that coconut shell is waste and they throw it away. However, actually 
                                we can process it further to be useful products, such as charcoal. Like other types of charcoal, 
                                coconut shell charcoal can be used energy. Coconut shell charcoal is also often to be processed 
                                further to be briquette (Coconut Shell Charcoal Briquette) or activated carbon products. People 
                                can use coconut charcoal briquette for sisha/hookah or barbecue purpose. While the activated carbon 
                                has the functions as water purification, deodorization and purification of air, and catalyst.
                            </p>
                            <p style={styles.paraText}>
                                Coconut charcoal provides several benefits to its users. First, it has higher burning point and 
                                relatively longer burning time. Thus, it is suitable for barbecue purposes since it will not easily 
                                make your food to be over burnt. Furthermore, it also produces less smokes and have natural scent, 
                                which make it convenient to use for various application.
                            </p>
                        </div>
                        
                        <div style={styles.productParaSection}>
                            <h4 style={styles.paraTitle}>
                                Our Coconut Shell Charcoal
                            </h4>
                            <p style={styles.paraText}>
                                We, PT.International Mandiri Expo is one of the leading supplier of Coconut Shell Charcoal from Indonesia. 
                                Thus, our team ensure to deliver only high quality products to our customers. The production of coconut 
                                shell charcoal is simply by burning the coconut shell in a closed furnace. The burning may take several hours. 
                                After that, our team sift and filter the coconut shell charcoal to remove the unnecessary ash. Then, our team 
                                check the quality of coconut shell charcoal and pack it to the bulk packaging. The demand of coconut shell 
                                charcoal is increasing over the years due to its tremendous benefits, various application and affordable price. 
                                It has been one of the best alternatives of charcoal products.
                            </p>
                        </div>
                    </div>
                    
                    <div style={styles.charcoalImg} className="charcoal-img">
                        <img 
                            src={charcoalShellImg} 
                            alt="Coconut Shell Charcoal" 
                            style={styles.productImage}
                            className="product-image"
                        />
                    </div>
                </div>

                {/* Detail Images */}
                <div style={styles.coconutDetailImg} className="coconut-detail-img">
                    <h4 style={styles.detailTitle}>
                        Briquette Details
                        <div style={styles.titleUnderline}></div>
                    </h4>
                    <img 
                        src={coconutCharcoalBuss} 
                        alt="Coconut Charcoal Business Details" 
                        style={styles.detailImage}
                        className="detail-image"
                    />
                </div>

                <div style={{...styles.coconutDetailImg, marginTop: '4rem'}} className="coconut-detail-img">
                    <img 
                        src={coalDetailImg} 
                        alt="Coal Detailed Information" 
                        style={{...styles.detailImage, maxWidth: '1000px'}}
                        className="detail-image"
                    />
                </div>
            </section>
        </div>
    );
};

export default Products;