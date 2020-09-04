import React from 'react';
import classes from './CartInfo.module.css';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';



const cartInfo = (props) => {
    return(
        <div className={classes.CartInfo}>
            <div className={classes.TitleWrap}>
            <h2 className={classes.CartInfoTitle}>Cart Total</h2>
            </div>
            
        <div className={classes.Container}>
            
            <p className={classes.Text}>Total Products</p>
            <p className={classes.Price}>${(props.totalPrice).toFixed(2)}</p>
            <p className={classes.Total}>Grand Total</p>
    <p className={[classes.Price, classes.Total].join(' ')}>${(props.totalPrice).toFixed(2)}</p>
            </div>
                 <button className={classes.CheckOutBtn} onClick={props.redirect}>{props.isAuthenticated ? "Proceed To Checkout" : "Sign In To Purchase"}</button>
                
            
        </div>
    );
}




export default cartInfo;

