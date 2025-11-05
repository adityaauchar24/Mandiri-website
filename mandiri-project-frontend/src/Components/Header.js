import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import bussLogo from '../Images/bussLogo.jpeg';

const useStyles = makeStyles(() => ({
    headerContainer: {
        width: '100%',
        height: 100,
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '0px 50px',
        boxSizing: 'border-box',
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        '& img': {
            width: 100,
            height: 100,
        }
    },
    logoBox: {
        display: 'flex',
        alignItems: 'center',
        '& img' : {
            width : 100,
            height : 75,
            borderRadius : '50%'
        },
        '& span': {
            color: "#0802A3",
            fontSize: 17,
            fontWeight: 900,
            fontFamily: 'Roboto'
        }
    },
    navLink: {
        color: '#242424',
        textDecoration: 'none',
        fontFamily: "Roboto",
        fontSize: 18,
        display: 'inline',
        padding: '30px 50px',
        borderRadius: 10,
        marginRight: 8,
        '&:hover': {
            backgroundColor: '#f5f5f5'
        },
    }
}));

const Header = () => {
    const classes = useStyles();

    const [navLinkData, setNavLinkData] = useState([
        {
            route: "/",
            name: "Home"
        },
        {
            route: "/products",
            name: "Products"
        },
        {
            route: "/about",
            name: "About Us"
        },
        {
            route: "/contact",
            name: "Contact Us"
        }
    ])

    return (
        <div className={classes.headerContainer}>
            <div className={classes.logoBox}>
                <img src={bussLogo} alt="bussLogo" />
                <span>PT.International Mandiri Expo</span>
            </div>
            <nav className={classes.headerNav}>
                {navLinkData.map(elem => (
                    <NavLink className={classes.navLink} to={elem.route}
                        style={({ isActive, isPending }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isActive ? "#0802A3" : "#242424",
                                backgroundColor: isActive ? '#f5f5f5' : ''
                            };
                        }}
                    >{elem.name}
                    </NavLink>
                ))
                }
            </nav>
        </div>
    )
}

export default Header
