import { makeStyles } from '@material-ui/core';
import React from 'react';
import Services from './Services';
import DetailPage from './DetailPage';
import HomeContactForm from './HomeContactForm';
import BussinessLocationMap from './BussinessLocationMap';
import { useNavigate } from 'react-router-dom';
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'
import CarouselSlider from './CarouselSlider';

const useStyles = makeStyles(() => ({
    homeContainer: {
        width: '100%',
        height: '100%',
        // position: 'relative',
        // '&::before': {
        //     content: '""',
        //     position: 'absolute',
        //     top: 0,
        //     left: 0,
        //     width: '100%',
        //     height: '100%',
        //     backgroundColor: 'rgba(0,0,0,0.9)',
        //     zIndex: -1, // Place the pseudo-element below the button's content
        // },
    },
    homeBgImg: {
        width: "100%",
        height: 680,
        opacity: 0.5,
    },
    homeTitle: {
        width : 800,
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        padding: "10px",
        "& h4": {
            color: '#0802A3',
            textTransform: 'capitalize',
            marginTop: '24px',
            marginBottom: '15px',
            fontSize: 20,
            fontFamily: "Roboto",
            textAlign : 'justify',
        },
        "& h1": {
            color: '#fff',
            fontSize: 42,
            textTransform : 'uppercase',
            marginTop: '0px',
            marginBottom: '15px',
            fontWeight: '600',
            fontFamily: "Roboto"
        },
        '& p': {
            width: 822,
            fontSize: '16px',
            color: '#fff',
            textAlign: 'justify',
            wordSpacing: 2,
            lineHeight: 1.3,
        }
    },
    contactBtn: {
        display: 'inline-block',
        color: '#fff',
        borderRadius: '4px',
        textTransform: 'uppercase',
        fontSize: '15px',
        backgroundColor: '#0802A3',
        padding: '15px 30px',
        border: '0px',
        fontWeight: 600,
        marginTop: 15,
        "&:hover": {
            textDecoration: 'none',
            backgroundColor: '#f5f5f5',
            color: '#0802A3',
            cursor: 'pointer',
        }
    }

}));

const Home = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { showMessage, setShowMessage } = props;

    return (
        <>
            {/* <div > */}

                {/* <img className={classes.homeBgImg} src={coconutFarm} alt="coconutFarm" /> */}
                {/* <div className={classes.homeTitle}>
                    <h1>INTERNATIONAL MANDIRI EXPO</h1>
                    <h4> At PT International Mandiri Expo, we believe in long-term success built on a solid foundation of trust, integrity, and unwavering commitment.  </h4>
                    <p>
                        Welcome to PT.International Mandiri Expo your gateway to global trade!
                        We are a pioneering coal briquette company, established in 2020 with a vision to revolutionize the energy industry. Our commitment to sustainability and innovation drives us to produce high-quality coal briquettes that provide an efficient and eco-friendly alternative to traditional coal consumption. With a dedicated team of experts and state-of-the-art manufacturing processes, we aim to meet the growing global demand for clean and reliable energy sources. At our core, we are driven by a passion for environmental responsibility and a desire to contribute to a greener future for generations to come.
                    </p>
                    <button className={classes.contactBtn} onClick={() => navigate('contact')}> Contact with us </button>
                </div> */}



             {/* </div> */}
             <CarouselSlider />
            <Services />
            <DetailPage />
            <HomeContactForm showMessage={showMessage} setShowMessage={setShowMessage} />
            <BussinessLocationMap />
        </>
    )
}

export default Home
