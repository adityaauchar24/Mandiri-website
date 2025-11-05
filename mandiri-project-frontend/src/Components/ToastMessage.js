import { makeStyles } from '@material-ui/core';
import React from 'react';
import successMessIcon from '../Images/successMessIcon.svg'
import discardMessIcon from '../Images/discardMessIcon.svg'

const useStyles = makeStyles(() => ({
  ToastMessageSection: {
    height: 50,
    maxWidth: 510,
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 8,
    position: 'fixed',
    zIndex: 999,
    top: 20,
    left: 500,
    padding: '0px 60px 0px 25px',
    overflowY: 'scroll',
    fontFamily: 'Roboto',
    "&::-webkit-scrollbar": {
      display: "none",
    },
    '& img': {
      width: 25,
      height: 25,
      marginRight: 12,
    },
    '& p': {
      fontWeight: 600,
      fontSize: 14,
      fontFamily: 'Roboto',
    }
  }
}))

const ToastMessage = (props) => {
  const { error, message, success } = props.showMessage;
  const classes = useStyles();

  return (
    <div className={classes.ToastMessageSection}
      style={{
        backgroundColor: success ? '#6dae4378' : '#eb00288f',
        border: success ? '2px solid #6dae4378' : '2px solid #eb00288f',
        color: success ? '#000000' : '#000000'
      }}>
      <img src={success ? successMessIcon : discardMessIcon} alt="ToastMessIcon" />
      <p> {message} </p>
    </div>
  )
}

export default ToastMessage
