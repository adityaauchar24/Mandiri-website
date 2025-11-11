import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import aboutUsCoconutImg from '../Images/aboutUsCoconutImg.jpg';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(() => ({
    contactContainer: {
        width: "100%",
        height: "100%"
    },
    contactUsTitle: {
        width: '100%',
        height: '100%',
        position: 'relative',
        fontFamily: 'Roboto',
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
            height: "450px",
            opacity: 0.5,
        }
    },
    contactText: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        padding: '0px 50px',
        boxSizing: 'border-box',
        '& h2': {
            fontSize: 30,
            fontWeight: 800,
            textAlign: 'left',
            textTransform: 'uppercase',
            color: '#fff',
            margin: '0',
            fontFamily: 'Roboto'
        },
        '& h1': {
            fontSize: 45,
            fontWeight: 600,
            textAlign: 'left',
            textTransform: 'uppercase',
            color: '#fff',
            margin: '20px 0px 0px',
            fontFamily: 'Roboto'
        },
        '& p': {
            fontSize: 22,
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: "2",
            color: '#fff',
            fontFamily: 'Roboto',
        }
    },
    formInput: {
        // width: '50%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontFamily: 'Roboto'
    },
    formContainer: {
        width: '100%',
        // height: 625,
        marginTop: 30,
        boxSizing: 'border-box',
        display: "flex",
        // alignItems: 'center',
        gap: 50,
        justifyContent: 'center',
        fontFamily: 'Roboto'
    },
    formSection: {
        width: '40%',
        // height : 500,
        border: '3px solid #0802A3',
        borderRadius: 10,
        padding: 20,
        '& h2': {
            fontSize: 22,
            textTransform: "uppercase",
            color: '#0802A3',
            fontFamily: 'Roboto',
            fontWeight : 900,
            margin : '10px 0px 20px'
        }
    },
    fieldBox: {
        display: 'flex',
        flexDirection: 'column',
        '& label': {
            textAlign: 'left',
            fontSize: 18,
            fontFamily: 'Roboto',
            color: '#0000008a'
        },
        "& input": {
            padding: "8px 15px",
            fontSize: 20,
            margin: '12px 0px',
            color: '#0000008a'
        },
        '& span': {
            fontSize: 14,
            fontWeight: 500,
            color: '#0802A3',
            textAlign: 'start',
            paddingBottom: 8,
        }
    },
    submitBtn: {
        margin: '15px 0',
        textAlign: 'start',
        "& button": {
            padding: '10px 25px',
            backgroundColor: '#0802A3',
            borderColor: '#e60329',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            borderRadius: 5,
            fontSize: 15,
            fontFamily: 'Roboto',
            fontWeight: 600,
        }
    },
    contactRightContainer: {
        width: '35%',
        height: 'auto',
        // display: 'flex',
        // flexDirection: 'column',
        padding: 20,
        boxSizing: 'border-box',
        border: '3px solid #0802A3',
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        fontFamily: 'Roboto'
    },
    contactBoxHeader: {
        width: '100%',
        height: 150,
        backgroundColor: '#0802A3',
        color: '#fff',
        fontSize: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        fontWeight: 900,
        borderRadius: 5,
        marginBottom: 25
    },
    contactBoxContainer: {
        display: 'flex',
        width: '100%',
        // height : '100%',
        flexDirection: 'column',
        padding: 15,
        boxSizing: 'border-box',
    },
    contactFieldBox: {
        display: 'flex',
        gap: 20,
        textAlign: 'start',
        marginBottom: 35,
        "& span": {
            color: '#0000008a'
        }
    },
    contactEmailBox: {
        width: '100%',
        display: 'flex',
        fontSize : 18,
    },
    addressLable : {
        width: 100,
    },
    phoneNumLable: {
        width: 155,
    },
    phoneNum : {
        width: '100%',
    },
    emailLable: {
        width: 70,
    },
    emailId: {
        width: '100%',
    }
}));

const ContactUs = (props) => {
    const classes = useStyles();
    const { setShowMessage, showMessage } = props;
    const [formFieldData, setFormFieldData] = useState([
        {
            title: 'Full Name',
            type: 'text',
            value: '',
            error: false,
            mess: '',
        },
        {
            title: 'Email',
            type: 'email',
            value: '',
            error: false,
            mess: ''
        },
        {
            title: 'Phone Number',
            type: 'number',
            value: '',
            error: false,
            mess: ''
        },
        {
            title: 'Company Name',
            type: 'text',
            value: '',
            error: false,
            mess: ''
        },
        {
            title: 'Message',
            type: 'text',
            value: '',
            error: false,
            mess: ''
        }
    ]);

    // feild on change function
    const handleFormOnChange = (title, val) => {
        const finalData = formFieldData && formFieldData.map(elm => {
            if (elm.title === title) {
                elm.value = val
            }
            return elm;
        })
        setFormFieldData(finalData);
    }

    // form validation
    const handleFormValidation = () => {
        const validationData = formFieldData && formFieldData.map(elm => {
            if (elm.value === '') {
                elm.error = true;
                elm.mess = `${elm.title} is required`
            } else {
                elm.error = false;
                elm.mess = ''
            }
            return elm;
        })

        setFormFieldData(validationData);
    }

    // users post api
    const handleContactFormSubmit = async (e) => {
        e.preventDefault();
        handleFormValidation();
        const checkAllFeildValue = formFieldData && formFieldData.every(elem => elem.value !== '');

        const fullName = formFieldData && formFieldData.filter(elm => elm.title === 'Full Name')[0].value;
        const email = formFieldData && formFieldData.filter(elm => elm.title === 'Email')[0].value;
        const phoneNumber = formFieldData && formFieldData.filter(elm => elm.title === 'Phone Number')[0].value;
        const companyName = formFieldData && formFieldData.filter(elm => elm.title === 'Company Name')[0].value;
        const message = formFieldData && formFieldData.filter(elm => elm.title === 'Message')[0].value;
        const API_BASE = process.env.REACT_APP_API_URL;

        if (checkAllFeildValue) {
            try {
                const userApiRes = await fetch(`${API_BASE}/api/users`, {
                    method: 'POST',
                    body: JSON.stringify({
                        fullName,
                        email,
                        phoneNumber,
                        companyName,
                        message,
                    }),
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }) .then(response => response.json())
                
                if (userApiRes.status === 200) {
                    const responseData = await userApiRes.json();
                    setShowMessage({ ...showMessage, success: true, message: responseData._message });
                } else {
                    const errorData = await userApiRes.json();
                    setShowMessage({ ...showMessage, error: true, message: errorData._message });
                }
            } catch (error) {
                console.log(error, 'error');
            }
        } else {
            setShowMessage({ ...showMessage, error: true, message: 'please fill the form Data, every field is required' });
        }

        const emptyValue = formFieldData && formFieldData.map(elm => {
            return { ...elm, value: '' };
        })
         setFormFieldData(emptyValue);
    };


    return (
        <div className={classes.contactContainer}>
            <div className={classes.contactUsTitle}>
                <img src={aboutUsCoconutImg} alt="aboutUsCoconutImg" />
                <div className={classes.contactText}>
                    <h2>Contact us</h2>
                    <h1>We are always with you :)</h1>
                    <p>
                    If you have any inquiry, feel free to contact us. Our team will response your inquiry soon.
                    </p>
                </div>
            </div>

            <div className={classes.formContainer}>
                <form className={classes.formSection}>
                    <h2>Contact Form</h2>

                    {formFieldData && formFieldData.map((elem) => (
                        <div className={classes.fieldBox}>
                            <label>{elem.title}</label>
                            <input
                                type={elem.type}
                                value={elem.value}
                                onChange={(e) => handleFormOnChange(elem.title, e.target.value)}
                            />
                            {elem.error && <span> {elem.mess} </span>}
                        </div>
                    ))}

                    <div className={classes.submitBtn}>
                        <button type="submit" onClick={handleContactFormSubmit}>Submit</button>
                    </div>
                </form>

                <div className={classes.contactRightContainer}>
                    <div className={classes.contactBoxHeader}>
                        <span> Corporate Office </span>
                    </div>
                    <div className={classes.fullName}>
                        <div className={classes.contactFieldBox}>
                            <LocationOnIcon />
                            {/* <span> Address : SOHO CAPITAL LT.32 UNIT 7 JL. LETJEN PARMAN KAV 28 TANJUNG DUREN SELATAN GROGOL PETAMBURAN JAKARTA BARAT DKI JAKARTA, 11470 </span> */}
                            <div className={classes.contactEmailBox}>
                                <div className={classes.addressLable}>
                                    <span>Address : </span>
                                </div>
                                <div className={classes.phoneNum}>
                                    <span> SOHO CAPITAL LT.32 UNIT 7 JL. LETJEN PARMAN KAV 28 TANJUNG DUREN SELATAN GROGOL PETAMBURAN JAKARTA BARAT DKI JAKARTA, 11470 </span> 
                                </div>
                            </div>
                        </div>
                        <div className={classes.contactFieldBox}>
                            <PhoneIcon />
                            <div className={classes.contactEmailBox}>
                                <div className={classes.phoneNumLable}>
                                    <span>Telephone No : </span>
                                </div>
                                <div className={classes.phoneNum}>
                                <span> +62 813-1193-2441 </span> <br />
                                <span> +62878-1788-3677 </span> 
                                </div>
                            </div>
                        </div>
                        <div className={classes.contactFieldBox}>
                            <EmailIcon />
                            <div className={classes.contactEmailBox}>
                                <div className={classes.emailLable}>
                                    <span>Email : </span>
                                </div>
                                <div className={classes.emailId}>
                                    <span> Ceo@ptinternationalmandiriexpo.com </span>
                                    <span> Admin@ptinternationalmandiriexpo.com </span>
                                    <span> Sales@ptinternationalmandiriexpo.com </span>
                                    <span> Info@ptinternationalmandiriexpo.com </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs