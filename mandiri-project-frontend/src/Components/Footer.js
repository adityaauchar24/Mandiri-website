import { makeStyles } from '@material-ui/core';
import React from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import bussLogo from '../Images/bussLogo.jpeg';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    footerContainer: {
        width: '100%',
        // height : 200,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        // justifyContent : 'space-between',
        padding: '30px 35px',
        boxSizing: 'border-box',
        marginTop: 50
    },
    footerCompanyDetail: {
        width: '25%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        '& img': {
            width: 100,
            height: 75,
            borderRadius : '50%'
        },
        '& span': {
            marginTop: 10,
            fontSize: 16,
            fontWeight: 600,
            color: '#0802A3'
        }
    },
    footerNavLink: {
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        marginTop: 15,
    },
    link : {
        margin: 5,
        fontSize: 16,
        color: '#0000008a',
    },
    footerLeftSection: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        '& h4': {
            fontSize: 20,
            textAlign: 'start',
            color: '#0802A3',
            fontWeight: 700,
            fontFamily: 'Roboto',
            margin: '0px 0 20px 5px',
        }
    },
    footerDetail: {
        display: 'flex',
        marginBottom: 25,
        '& span': {
            fontSize: 15,
            // fontWeight : 700,
            fontFamily: 'Roboto',
            marginLeft: 15,
            textAlign: 'initial',
            color: '#0000008a'
        }
    },
    contactUsIcon :{
        color : '#0802A3',
    },
    footerRightSection: {
        width: '45%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& h4': {
            fontSize: 20,
            textAlign: 'start',
            color: '#0802A3',
            fontWeight: 700,
            fontFamily: 'Roboto',
            margin: '0px 0px 10px',
        },
        '& p': {
            fontSize: 16,
            fontFamily: 'Roboto',
            textAlign: 'justify',
            padding: '0 30px',
            color: '#0000008a'
        }
    },
    socialMediaIcons: {
        display: 'flex',
        gap: 20,
        '& img': {
            width: 50,
            height: 50,
        }
    },
    socialIcons: {
        width: 35,
        height: 35,
        color : '#000000',
        '&:hover' : {
            color : '#0802A3'
        }
    },

}));

const Footer = () => {
    const classes = useStyles();

    return (
        <div className={classes.footerContainer}>
            <div className={classes.footerCompanyDetail}>
                <img src={bussLogo} alt="bussLogo" />
                <span>PT.International Mandiri Expo</span>
                <div className={classes.footerNavLink}>
                    {/* <ul> */}
                        <Link className={classes.link} to="/home"> Home </Link> |
                        <Link className={classes.link} to="/products"> Products </Link> |
                        <Link className={classes.link} to="/about"> About </Link> |
                        <Link className={classes.link} to="/contact"> Contact </Link> |
                    {/* </ul> */}
                </div>
            </div>
            <div className={classes.footerLeftSection}>
                <h4> Contact us </h4>
                <div className={classes.footerDetail}>
                    <LocationOnIcon className={classes.contactUsIcon}/>
                    <span> Address : SOHO CAPITAL LT.32 UNIT 7 JL. LETJEN PARMAN KAV 28 TANJUNG DUREN SELATAN GROGOL PETAMBURAN JAKARTA BARAT DKI JAKARTA, 11470 </span>
                </div>
                <div className={classes.footerDetail}>
                    <PhoneIcon className={classes.contactUsIcon}/>
                    <span> Telephone No : +62 813 1193 2441 </span>
                </div>
                <div className={classes.footerDetail}>
                    <EmailIcon className={classes.contactUsIcon}/>
                    <span> Email : ptinternationalmandiriexpo@gmail.com </span>
                </div>
            </div>
            <div className={classes.footerRightSection}>
                <h4>
                    About my company
                </h4>
                <p>
                    Welcome to PT.International Mandiri Expo your gateway to global trade!
                    We are a pioneering coal briquette company, established in 2020 with a vision to revolutionize the energy industry. Our commitment to sustainability and innovation drives us to produce high-quality coal briquettes that provide an efficient and eco-friendly alternative to traditional coal consumption. With a dedicated team of experts and state-of-the-art manufacturing processes, we aim to meet the growing global demand for clean and reliable energy sources. At our core, we are driven by a passion for environmental responsibility and a desire to contribute to a greener future for generations to come.
                </p>
                <div className={classes.socialMediaIcons}>
                <Link to="https://www.facebook.com/people/Ptime-Cro/pfbid0WS4sfd7GURwVR1RFMXzUthAqdCWm4MNY939ABdDTZ69wVGZPt8r1vKUJdwYcbrrUl/?mibextid=7cd5pb"> <FacebookIcon className={classes.socialIcons} /></Link>
                <Link to="https://api.whatsapp.com/send/?phone=6281311932441&text&type=phone_number&app_absent=0"> <WhatsAppIcon className={classes.socialIcons} /></Link>
                <Link to="https://www.instagram.com/ptime91/?igshid=NGVhN2U2NjQ0Yg%3D%3D"> <InstagramIcon className={classes.socialIcons} /> </Link>
                <Link to="https://www.linkedin.com/in/pt-ime-350b34290"> <LinkedInIcon className={classes.socialIcons} /> </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer
