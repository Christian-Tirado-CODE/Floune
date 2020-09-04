import React, { Component } from 'react';
import Aux from '../../../hoc/Auxialiary';
import NavigationItem from '../NavigationItem/NavigationItem';
import NavContext from '../../../context/nav-context';
import classes from './NavigationItems.module.css';


class NavigationItems extends Component {


    static contextType = NavContext;



    render() {

        return (
            <ul className={classes.NavigationItems}>

                {this.context.navLinks.map(navLink => {

           if(navLink.subCategories){
               // Place arrow down and place a dropdown component
           return (<NavigationItem name={navLink.name} subCategories={navLink.subCategories} icon />);
           } else if(navLink.blogTypes){
               // Place arrow down and place a dropdown component
               return (<NavigationItem name={navLink.name} subCategories={navLink.blogTypes} icon />);
           } else {
               return (<NavigationItem name={navLink.name} />);
           }
       })}

            </ul>


        )






    }
}





export default NavigationItems;