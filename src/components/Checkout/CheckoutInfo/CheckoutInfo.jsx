import React from 'react';
import classes from './CheckoutInfo.module.css';
import { Container } from 'reactstrap';

const checkoutInfo = props => {

    const orderItems = props.cartItems.map(productItem => (
        <div className={classes.FlexContainer}>
            <span>{productItem.name} ({productItem.quantity})</span>
            <span>{(productItem.price * productItem.quantity).toFixed(2)}</span>
        </div>
    ));



    return(
        <div className={classes.CheckoutInfoContainer}>
            <h2>Your Order</h2>
            <div className={classes.CheckoutInfo}>
                <div className={classes.FlexContainerWB}>
                    <span>Product</span>
                    <span>Total</span>
                </div>
                {orderItems}
                <div className={classes.FlexContainerWB}>
                    <span>Product</span>
                    <span>Total</span>
                </div>
            </div>
            <button className={classes.PlaceOrderBtn} onClick={props.orderHandler}>Place Order</button>


        </div>

    );
}

export default checkoutInfo;