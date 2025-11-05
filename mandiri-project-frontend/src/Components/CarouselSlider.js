import { makeStyles } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import AboutCoconutImg from '../Images/AboutCoconutImg.jpeg';
import coconutFarm from '../Images/coconutFarm.jpg';
import productCharcoalBri from '../Images/productCharcoalBri.jpeg';

const useStyles = makeStyles(() => ({
  carouselContainer : {
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
  },
  carouselImg : { 
    width: "100%",
    height: 700,
    opacity: 0.5,
  },
  carouselTitle : {
    fontSize : 50,
    fontWeight : 900,
    color : '#fff',
    textTransform : 'uppercase',
    margin : '10px 0px 25px'
  },
  carouselPara : {
    fontSize : 18,
    fontWeight : 600,
    color : '#fff',
    textTransform : 'uppercase',
    margin : '10px 0px 30px'
  }
}));


const CarouselSlider = () => {
  const classes = useStyles();

    const imgAry = [
        { src : coconutFarm},
        { src : AboutCoconutImg},
        { src : productCharcoalBri}
    ]

    return (
      <Carousel className={classes.carouselContainer}>
        {imgAry.map((elm) => (
          <Carousel.Item>
          <img
          className={classes.carouselImg}
            src={elm.src}
          />
          {/* <Carousel.Caption> */}
          {/* <h3 className={classes.carouselTitle}>{elm.title}</h3> */}
          {/* <p className={classes.carouselPara}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        {/* </Carousel.Caption> */}
        </Carousel.Item>
        ))}
      </Carousel>
    );
  
  }

export default CarouselSlider
