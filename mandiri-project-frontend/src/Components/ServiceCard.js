import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react';
const useStyles = makeStyles({
    root: {
        maxWidth: 550,
        height: 670,
        border : '3px solid #0802A3',
        padding : '0px 0px 25px',
    },
    media: {
        height: 300,
    },
    cardContent: {
        height: 315,
        textAlign: 'justify',
        '& .MuiTypography-h5': {
            color: '#0802A3',
            fontWeight: 500,
            textDecoration: 'underline',
            fontFamily: 'Roboto',
            margin : '8px 0px 15px'
        },
        '& .MuiTypography-body2': {
            fontSize: 14,
            fontFamily: 'Roboto',
        }
    }
});

const ServiceCard = (props) => {
    const classes = useStyles();
    const { serviceData } = props;

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={serviceData.imgSrc}
                    title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {serviceData.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {serviceData.detail}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ServiceCard
