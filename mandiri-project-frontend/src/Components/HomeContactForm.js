import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import worldDeliveryImg from '../Images/worldDeliveryImg.jpg';
import ToastMessage from './ToastMessage';

const useStyles = makeStyles(() => ({
    HomeContactForm: {
        width: '100%',
        height: 710,
        display: 'flex',
        justifyContent: 'space-between',
    },
    formImg: {
        width: '58%',
        height: '100%',
    },
    contactForm: {
        width: '42%',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formSection: {
        borderRadius: 10,
        '& h2': {
            fontSize: 22,
            textTransform: "uppercase",
            color: '#0802A3',
        }
    },
    fieldBox: {
        display: 'flex',
        flexDirection: 'column',
        '& label': {
            textAlign: 'left',
            fontSize: 18,
            color: '#0000008a'
        },
        "& input": {
            width: '400px',
            padding: "8px 15px",
            fontSize: 20,
            margin: '12px 0px 10px',
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
            padding: '15px 25px',
            backgroundColor: '#0802A3',
            borderColor: '#e60329',
            color: '#fff',
            cursor: 'pointer',
            border: 'none',
            borderRadius: 5,
            fontSize: 15,
            fontWeight: 600,
        }
    }

}));
const HomeContactForm = (props) => {
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

        if (checkAllFeildValue) {
            try {
               const userApiRes = await fetch(`http://localhost:5001/users`, {
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
                })
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
           return {...elm, value : ''};
        })
        setFormFieldData(emptyValue);
    };

    return (
        <div className={classes.HomeContactForm}>

            <img src={worldDeliveryImg} alt="worldDeliveryImg" className={classes.formImg} />
            <div className={classes.contactForm}>
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
                        <button onClick={handleContactFormSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HomeContactForm