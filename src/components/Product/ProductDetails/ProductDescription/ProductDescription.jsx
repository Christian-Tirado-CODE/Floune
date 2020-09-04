import React from 'react';
import classes from './ProductDescription.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
const productDescription = props => {
    const btnText = props.itemAlreadyAdded ? 'Already Added' : 'Add To Cart';


    return (
        <div className={classes.Container}>
            <h2 className={classes.ProductName}>{props.name}</h2>
    <div><span className={classes.Price}>{props.price}</span></div>
            <p className={classes.ProductDescription}>{props.description}</p>
                <div className={classes.CartControls}>
                    <div className={classes.QuantityControls}>
                        <button className={classes.QuantityControl} onClick={()=> props.updateQuantity(false)}  ><FontAwesomeIcon icon="minus"/></button>
                        {props.itemQuantity}
                        <button className={classes.QuantityControl} onClick={()=> props.updateQuantity(true)}><FontAwesomeIcon icon="plus"/></button></div>
                        <button disabled={props.itemAlreadyAdded} className={classes.AddToCart} onClick={props.addItemToCart}>{btnText}</button>
                </div>
                
        </div>
    );
};
export default withRouter(productDescription);