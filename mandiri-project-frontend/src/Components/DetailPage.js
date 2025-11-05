import { makeStyles } from '@material-ui/core';
import React from 'react';
import detailCoalImg from "../Images/detailCoalImg.jpg";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  detailPage: {
    width: '100%',
    height: '100%',
    position: 'relative',
    margin: '50px 0 0px',
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
  },
  titleBox: {
    width: '100%',
    // height : 500,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    "& h4": {
      color: '#fff',
      textTransform: 'uppercase',
      marginTop: '0px',
      marginBottom: '15px',
      fontSize: 30,
      fontFamily: "Roboto"
    },
    "& h6": {
      color: '#fff',
      fontSize: 45,
      textTransform: 'uppercase',
      marginTop: '0px',
      marginBottom: '15px',
      fontWeight: '600',
      fontFamily: "Roboto"
    },
    '& h2': {
      fontSize: '22px',
      color: '#fff',
      fontWeight: '600',
      textTransform: 'uppercase',
    }
  },
  contactBtn: {
    display: 'inline-block',
    color: '#fff',
    borderRadius: '4px',
    textTransform: 'uppercase',
    fontSize: '15px',
    backgroundColor: '#0802A3',
    padding: '12px 30px',
    border: '0px',
    fontWeight: 600,
    marginTop: 10,
    "&:hover": {
      textDecoration: 'none',
      backgroundColor: '#f5f5f5',
      color: '#0802A3',
      cursor: 'pointer',
    }
  },
  seaImage: {
    width: '100%',
    height: 500,
    opacity: 0.3,
  },
}));

const DetailPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.detailPage}>
      <img className={classes.seaImage} src={detailCoalImg} alt="detailCoalImg" />
      <div className={classes.titleBox}>
        <h4>We are</h4>
        <h6>The Best Supplier of Coconut Products from Indonesia.</h6>
        <h2>To Book Your Shipping From any Country</h2>
        <button className={classes.contactBtn} onClick={() => navigate('about')}>About us</button>
      </div>
    </div>
  )
}

export default DetailPage
