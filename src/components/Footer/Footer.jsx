import React, { Component } from 'react';
import Copyright from '../UI/Copyright/Copyright';
import classes from './Footer.module.css';
import FooterColumn from './FooterColumn/FooterColumn';

const footer = () => {
    const footerColumnsData = [
        {
            title: 'About Us',
            links: ['About us', 'Store location', 'Contact', 'Orders tracking']
        },
        {
            title: 'Useful links',
            links: ['Returns', 'Support Policy', 'Size guide', 'FAQs','Visit Admin Panel']
        },
        {
            title: 'Follow Us',
            links: ['Facebook', 'Twitter', 'Instagram', 'Youtube']
        },
    ];


        const footerColumns = footerColumnsData.map(column => {
        return <FooterColumn title={column.title} links={column.links}/>
    });

    return (
        <footer className={classes.Footer}>
            <Copyright/>
            <div className={classes.FooterColumns}>
            {footerColumns}
            </div>
            
            <div>Email Subscription</div>
        </footer>
    );

}
    

export default footer;