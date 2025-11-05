import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
    bussinessLocationTitle: {
        color: "#0802A3",
        fontSize: 30,
        fontWeight: 900,
        fontFamily: 'Roboto',
        textTransform: 'uppercase',
        margin: '35px 0px',
    },
    bussinessLocationContainer: {
        width: '100%',
        height: 450,
        padding: '0px 40px',
        boxSizing: 'border-box',
    },

}));

const BussinessLocationMap = () => {
    const classes = useStyles();

    return (
        <>
            <h4 className={classes.bussinessLocationTitle}>GET IN TOUCH</h4>

            <div className={classes.bussinessLocationContainer}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9255834.19956805!2d107.87880694789179!3d-2.1938246893598436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f72f421b40d7%3A0xa2260e416b98e583!2sWerkspace%20Soho%20Capital!5e0!3m2!1sen!2sin!4v1694671763536!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </>
    )
}

export default BussinessLocationMap
