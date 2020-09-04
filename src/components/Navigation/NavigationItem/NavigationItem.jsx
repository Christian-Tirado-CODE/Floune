import React from 'react';
import Aux from '../../../hoc/Auxialiary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NavContext from '../../../context/nav-context';
import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
    let navItem = null;
if(props.subCategories){
    navItem = <li className={classes.NavigationItem}><a>{props.name}</a><FontAwesomeIcon icon="chevron-down"/></li>;
} else if(props.blogTypes){
    navItem = <li className={classes.NavigationItem}><a>{props.name}</a><FontAwesomeIcon icon="chevron-down"/></li>;
} else {
    navItem = <li className={classes.NavigationItem}><a>{props.name}</a></li>;
}
    

    return (
        <Aux>
           {navItem}
        </Aux>
    );
}

export default navigationItem;


/**
 * possible solutions:
 * Navigation Items iterates the context and decides if item has a arrow icon, and subcategories dropdown.
 * Nav item takes the props and decides what to render.
 * 
 * 
 */