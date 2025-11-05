import { makeStyles } from '@material-ui/core';
import React from 'react';
import coconutBriquettesImgs from '../Images/coconutBriquettesImgs.jpeg';
import charcoalShellImg from '../Images/charcoalShellImg.jpeg';
import coconutCharcoalBuss from '../Images/coconutCharcoalBuss.jpg';
import productCoalImg from '../Images/productCoalImg.jpeg';
import coalDetailImg from '../Images/coalDetailImg.jpeg';

const useStyles = makeStyles(() => ({
    productContainer: {
        width: '100%',
    },
    productImgSection: {
        width: '100%',
        height: 500,
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: -1, // Place the pseudo-element below the button's content
        },
        '& img': {
            width: "100%",
            height: 500,
            opacity: 0.5,
        },
        '& h2': {
            fontSize: 45,
            fontWeight: 600,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: '#fff',
            textTransform: 'uppercase',
        }
    },
    productDetailSection: {
        width: '100%',
        padding: 25,
        boxSizing: 'border-box',
    },
    productMainSection: {
        width: '100%',
        display: 'flex',
    },
    productLeftSection: {
        width: '60%',
        marginTop: 25,
        '& h2': {
            fontSize: 30,
            margin: '18px 0px 35px',
            textAlign: 'left',
            color: '#0802A3',
            textTransform: 'uppercase',
            fontWeight: '600',
            fontFamily: "Roboto",
        }
    },
    productParaSection: {
        width: "100%",
        marginBottom: 60,
        textAlign: 'left',
        '& h4': {
            color: '#000000',
            fontSize: 22,
            textTransform: 'uppercase',
            fontWeight: '600',
            fontFamily: "Roboto",
            textAlign: 'left'
        },
        '& span': {
            fontSize: 16,
            textAlign: 'left',
            fontFamily: 'Roboto',
            wordSpacing: 2,
            lineHeight: 1.3,
            color: '#0000008a',
        }
    },
    charcoalImg: {
        width: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        '& img': {
            width: 600,
            height: 450,
            borderRadius : 5
        }
    },
    productData: {
        marginTop: 5,
        textAlign: 'left',
        '& span': {
            fontSize: 16,
            textAlign: 'left',
            fontFamily: 'Roboto',
            wordSpacing: 2,
            lineHeight: 1.3,
            color: '#0000008a'
        }
    },
    coconutDetailImg: {
        '& h4': {
            color: '#0802A3',
            margin: '18px 0px 35px',
            fontSize: '30px',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontWeight: '600',
            textTransform: 'uppercase'
        },
        '& img': {
            width: '80%',
            height: 700,
            border : '3px solid #0802A3',
            borderRadius : 8
        }
    },
}));

const Products = () => {
    const classes = useStyles();

    return (
        <div className={classes.productContainer}>
            <div className={classes.productImgSection}>
                <img src={productCoalImg} alt="productCoalImg" />
                <h2>
                    Our Products
                </h2>
            </div>
            <div className={classes.productDetailSection}>
                <div className={classes.productMainSection}>
                    <div className={classes.productLeftSection}>
                        <h2>Coconut Charcoal Briquette</h2>
                        <div className={classes.productParaSection}>
                            <h4>
                                What is Coconut Charcoal Briquette?
                            </h4>
                            <span>
                                Coconut Charcoal Briquette is a briquette charcoal with coconut shell as the raw material. One of the main functions of Coconut Charcoal Briquette is for sisha or hookah burner. Moreover, people also use the lower grade for barbecue purposes.
                            </span>
                            <span>
                                There are many benefits to use coconut charcoal compare to other type of charcoal. Firstly, coconut charcoal briquette have relatively higher burning point and longer burning time compare to the other type of charcoal. Furthermore, it produces less smokes and natural scent which is a best choice for your sisha/hookah companion. Moreover, you can also use coconut charcoal briquette to cook your food, such as barbeque. Because it has higher burning point, thus it will not easily make your food become over burnt. Due to these tremendous benefits compare to other type of charcoal, the demand of coconut charcoal briquette is keep increasing over the years. Consequently, we have been exporting our coconut charcoal briquette worldwide.
                            </span>
                        </div>
                        <div className={classes.productParaSection}>
                            <h4>
                                Our Coconut Charcoal Briquette
                            </h4>
                            <span>
                                As the leading supplier of Coconut Charcoal Briquette from Indonesia, hence we commit to deliver the best quality of products based on its grade and requirement. We can supply for both sisha/hookah grade and also barbecue grade, depending on your needs. Firstly, the process of making Coconut Charcoal Briquette begin with the burning process of coconut shell. After that, we crush and mold the coconut shell charcoal into briquette shape. In the molding process, we also add small amount of tapioca starch as the binder. Then, we heat the coconut charcoal briquette in the oven machine for several hours. Lastly, we do quality check of the final products before the packaging process. In addition, we can customize the packing details in accordance with our clients’ requirement.
                            </span>
                        </div>
                    </div>
                    <div className={classes.charcoalImg}>
                        <img src={coconutBriquettesImgs} alt="coconutBriquettesImgs" />
                    </div>
                </div>

                <div className={classes.productData}>
                    <span>
                        Coconut Charcoal Briquette Indonesia PT.International Mandiri Expo
                        We, PT.International Mandiri Expo are the best supplier and exporter of Coconut Charcoal Briquette from Indonesia. Therefore, many partners have trusted us to supply their needs of Coconut Charcoal Briquette. We have three basic grades for sisha/hookah, which are grade A, grade B, and grade C (please refer to below table for further information). Moreover, we also provide special grades for barbecue purpose. Moreover, We are open to customize the specification and packaging depends on your requirement. For further information and discussion, feel free to contact us through Whatsapp, Email or the Contact Form.
                    </span>
                </div>

                <div className={classes.productMainSection}>
                    <div className={classes.productLeftSection}>
                        <h2 style={{ marginTop: 30 }}>Coconut Shell Charcoal</h2>
                        <div className={classes.productParaSection}>
                            <h4>
                                What is Coconut Shell Charcoal?
                            </h4>
                            <span>
                                Coconut shell charcoal is simply charcoal product that are originally from coconut shell. Previously, people think that coconut shell is waste and they throw it away. However, actually we can process it further to be useful products, such as charcoal. Like other types of charcoal, coconut shell charcoal can be used energy. Coconut shell charcoal is also often to be processed further to be briquette (Coconut Shell Charcoal Briquette) or activated carbon products. People can use coconut charcoal briquette for sisha/hookah or barbecue purpose. While the activated carbon has the functions as water purification, deodorization and purification of air, and catalyst.
                            </span>
                            <span>
                                Coconut charcoal provides several benefits to its users. First, it has higher burning point and relatively longer burning time. Thus, it is suitable for barbecue purposes since it will not easily make your food to be over burnt. Furthermore, it also produces less smokes and have natural scent, which make it convenient to use for various application.
                            </span>
                        </div>
                        <div className={classes.productParaSection}>
                            <h4>
                                Our Coconut Shell Charcoal
                            </h4>
                            <span>
                                We, PT.International Mandiri Expo is one of the leading supplier of Coconut Shell Charcoal from Indonesia. Thus, our team ensure to deliver only high quality products to our customers. The production of coconut shell charcoal is simply by burning the coconut shell in a closed furnace. The burning may take several hours. After that, our team sift and filter the coconut shell charcoal to remove the unnecessary ash. Then, our team check the quality of coconut shell charcoal and pack it to the bulk packaging. The demand of coconut shell charcoal is increasing over the years due to its tremendous benefits, various application and affordable price. It has been one of the best alternatives of charcoal products.
                            </span>
                        </div>
                    </div>
                    <div className={classes.charcoalImg}>
                        <img src={charcoalShellImg} alt="charcoalShellImg" />
                    </div>
                </div>

                <div className={classes.coconutDetailImg}>
                    <h4> Briquette Details </h4>
                    <img src={coconutCharcoalBuss} alt="coconutCharcoalBuss" />
                </div>

                <div className={classes.coconutDetailImg} style={{marginTop : 60}}>
                    <img src={coalDetailImg} alt="coalDetailImg" style={{height : 900}} />
                </div>
            </div>
        </div>
    )
}

export default Products
