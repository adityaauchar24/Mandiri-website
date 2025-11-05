import { makeStyles } from '@material-ui/core';
import React from 'react';
import coconutCoal from '../Images/coconutCoal.jpg';
import AboutImg1 from '../Images/AboutImg1.jpeg';
import AboutImg2 from '../Images/AboutImg2.jpeg';
import AboutImg3 from '../Images/AboutImg3.jpeg';
import AboutImg4 from '../Images/AboutImg4.jpeg';

// AboutImg1
import charcoalVideo1 from '../Videos/charcoalVideo1.mp4';
import charcoalVideo2 from '../Videos/charcoalVideo2.mp4';
import charcoalVideo3 from '../Videos/charcoalVideo3.mp4';

const useStyles = makeStyles(() => ({
  aboutContainer: {
    width: "100%",
    height: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    // '& img': {
    //   width: "65%",
    //   height: 550,
    //   marginTop: 25
    // },
  },
  aboutImgConatiner : {
    width : '100%',
    display : 'grid',
    gap : 20,
    gridTemplateColumns : '600px 600px',
    gridTemplateRows : '300px 300px',
    placeContent : 'center',
    '& img': {
      width: "100%",
      height: '100%',
      marginTop: 25,
      borderRadius : 5,
      border : '3px solid #0802A3',
    },
  },
  aboutDetail: {
    width: "65%",
    '& h2': {
      color: '#0802A3',
      margin: '55px 0px 20px',
      fontSize: '30px',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    "& p": {
      fontSize: 16,
      fontFamily: 'Roboto',
      textAlign: 'justify',
      wordSpacing: 2,
      lineHeight: 1.3,
      color: '#0000008a'
    }
  },
  videoContainer : {
    width : '100%',
    '& h2': {
      color: '#0802A3',
      margin: '25px 0px 35px',
      fontSize: '30px',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
  },
  visionAndMissionContainer : {
    width : '100%',
    '& h2': {
      color: '#0802A3',
      margin: '25px 0px',
      fontSize: '30px',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
  },
  visMisSection : {
    width : '100%',
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'start',
    padding: '0px 70px',
    '& h4' : {
      color: '#0802A3',
      fontSize: '30px',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: '600',
      textTransform: 'uppercase',
      margin : '10px 0px 20px'
    },
    '& p' : {
      color: '#0000008a',
      fontSize: '16px',
      fontFamily: 'Roboto',
    }
  },
  videoSection : {
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
    gap : 20,
    // padding : 80,
    flexWrap : 'wrap',
    boxSizing : 'border-box',
    marginBottom : 20,
    '& video' : {
      width : '30%',
      height : '500px',
      border : '3px solid #0802A3',
      borderRadius : 8,
      cursor : 'pointer',
    }
  }
}));

const AboutUs = () => {
  const classes = useStyles();

  return (
    <div className={classes.aboutContainer}>
      <div className={classes.aboutImgConatiner}>
      <img src={AboutImg2} alt="AboutImg1" />
      <img src={AboutImg3} alt="AboutImg2" />
      <img src={AboutImg1} alt="AboutImg3" />
      <img src={AboutImg4} alt="AboutImg4" />
      </div>
      <div className={classes.aboutDetail}>
        <h2>About US</h2>
        <p>
          Welcome to PT.International Mandiri Expo your gateway to global trade!
          Our commitment to sustainability and innovation drives us to produce high-quality coal briquettes that provide an efficient and eco-friendly alternative to traditional coal consumption. With a dedicated team of experts and state-of-the-art manufacturing processes, we aim to meet the growing global demand for clean and reliable energy sources. At our core, we are driven by a passion for environmental responsibility and a desire to contribute to a greener future for generations to come.
          As a coal briquette company founded in 2020, we have embarked on a mission to transform the energy landscape. Committed to addressing the challenges of environmental sustainability, we have harnessed cutting-edge technology and innovation to produce coal briquettes that offer a cleaner and more efficient alternative to traditional coal. Our dedicated team brings together expertise and passion, striving to meet the increasing global demand for eco-conscious energy solutions. We take pride in being at the forefront of the transition towards greener energy sources, firmly believing in our role in shaping a more sustainable future. With each briquette we produce, we are making a significant stride towards a cleaner, brighter tomorrow.
        </p>
      </div>

      <div className={classes.videoContainer}>
        <h2> Company Videos </h2>
        <div className={classes.videoSection}>
        <video src={charcoalVideo1}  controls="controls" />
        <video src={charcoalVideo2}  controls="controls" />
        <video src={charcoalVideo3}  controls="controls" />
        </div>
      </div>

      <div className={classes.visionAndMissionContainer}>
        <h2> VISION & MISSION </h2>
        <div className={classes.visMisSection}>
          <h4>VISION</h4>
        <p>&#x2022; Strengthen the domination of Indonesia in exporting coconut and its derivative products throughout the world as well as maintaining sustainable business activities. </p>
        </div>
        <div className={classes.visMisSection}>
        <h4>MISSION</h4>
        <p>&#x2022; Consistent in delivering high quality, healthy and useful coconut products to our valuable customers through out the world. </p>
        <p>&#x2022; To have long lasting business by respecting and maintaining great relationship with all of our partners. </p>
        <p>&#x2022; Commit on sustainable business by being responsible to the environment.</p>
        </div>
      </div>


    </div>
  )
}

export default AboutUs
