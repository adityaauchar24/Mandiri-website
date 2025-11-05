import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import HomeProCoalImg from "../Images/HomeProCoalImg.jpeg";
import truckTransportImg from "../Images/truckTransportImg.jpeg";
import coconutShellImg from "../Images/coconutShellImg.jpeg";

const useStyles = makeStyles(() => ({
    serviceContainer: {
        marginTop: 30,
        '& h1': {
            color: '#0802A3'
        },
        '& img': {
            width: "100%",
            height: 800,
            backgroundSize: 'cover',
        },
        '& p': {
            color: '#0000008a'
        }
    },
    serviceCardContainer: {
        width: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 50,
        marginTop: 50,
        fontFamily: 'Roboto'
    }
}));

const Service = () => {
    const classes = useStyles();
    // state
    const [servicesData, setServicesData] = useState([
        {
            imgSrc: HomeProCoalImg,
            title: 'COCONUT CHARCOAL BRIQUETTE',
            detail: "Coconut Charcoal Briquette is a briquette charcoal with coconut shell as the raw material. One of the main functions of Coconut Charcoal Briquette is for sisha or hookah burner. Moreover, people also use the lower grade for barbecue purposes.There are many benefits to use coconut charcoal compare to other type of charcoal. Firstly, coconut charcoal briquette have relatively higher burning point and longer burning time compare to the other type of charcoal. Furthermore, it produces less smokes and natural scent which is a best choice for your sisha/hookah companion. Moreover, you can also use coconut charcoal briquette to cook your food, such as barbeque. Because it has higher burning point, thus it will not easily make your food become over burnt. Due to these tremendous benefits compare to other type of charcoal, the demand of coconut charcoal briquette is keep increasing over the years. Consequently, we have been exporting our coconut charcoal briquette worldwide."
        },
        {
            imgSrc: coconutShellImg,
            title: 'COCONUT SHELL CHARCOAL',
            detail: "Coconut shell charcoal is simply charcoal product that are originally from coconut shell. Previously, people think that coconut shell is waste and they throw it away. However, actually we can process it further to be useful products, such as charcoal. Like other types of charcoal, coconut shell charcoal can be used energy. Coconut shell charcoal is also often to be processed further to be briquette (Coconut Shell Charcoal Briquette) or activated carbon products. People can use coconut charcoal briquette for sisha/hookah or barbecue purpose. While the activated carbon has the functions as water purification, deodorization and purification of air, and catalyst.Coconut charcoal provides several benefits to its users. First, it has higher burning point and relatively longer burning time. Thus, it is suitable for barbecue purposes since it will not easily make your food to be over burnt. Furthermore, it also produces less smokes and have natural scent, which make it convenient to use for various application."
        }
    ])

    return (
        <div className={classes.serviceContainer}>
            <h1> OUR PRODUCTS </h1>
            <p> Explore our comprehensive import-export solutions, designed to streamline your global trade operations and boost your business's success. </p>
            <div className={classes.serviceCardContainer}>
                {servicesData.map(serviceData => (
                    <ServiceCard serviceData={serviceData} />
                ))}
            </div>
        </div>
    )
}

export default Service
