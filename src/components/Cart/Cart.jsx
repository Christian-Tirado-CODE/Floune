import React from 'react';
import { Component } from 'react';
import Aux from '../../hoc/Auxialiary';
import CartItem from './CartItem/CartItem';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import classes from './Cart.module.css';
import CartInfo from './CartInfo/CartInfo';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import productImage from '../Product/ProductDetails/ProductImage/ProductImage';
import { Link } from 'react-router-dom';
import ChatBox from '../ChatBox/ChatBox';
class Cart extends Component {
    
     componentDidMount(){
         if(localStorage.getItem('cart')){
            const cartItems = JSON.parse(localStorage.getItem('cart'));
            let totalPrice = 0;
            for(let key in cartItems){
                totalPrice += cartItems[key].price * cartItems[key].quantity;
            }
            
             this.props.onSetCartItems(JSON.parse(localStorage.getItem('cart')), totalPrice);
         }
    }
    
    purchaseHandler = ()=> {
        if(this.props.isAuthenticated){
            //Proceed to checkout
            this.props.history.push('/checkout');

        } else {
            this.props.onSigningInToPurchase();
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/login-register');
        }
    }
  

    render(){
        let cartItems = null;
        if(this.props.cartItems){
             cartItems = this.props.cartItems.map((cartItem, index) => (
            
                <CartItem 
                    key={cartItem.id}
                    imageLink={cartItem.imageLink}
                    name={cartItem.name}
                    price={cartItem.price}
                    quantity={cartItem.quantity}
                    id={cartItem.id}
                    
                />
            ));
        }
        

           

        return (
               <Aux>
                  
                   <ChatBox render={true}/>
                <div className={classes.Container}>
                <table className={classes.Table}>
                    <tr className={classes.TableHeading}>
                        <th className={classes.ColumnHeading}>image</th>
                        <th className={classes.ColumnHeading}>product name</th>
                        <th className={classes.ColumnHeading}>unit price</th>
                        <th className={classes.ColumnHeading}>QTY</th>
                        <th className={classes.ColumnHeading}>SUBTOTAL</th>
                        <th className={classes.ColumnHeading}>ACTION</th>
                    </tr>
                    <tbody className={classes.TableBody}>
                    {cartItems}
                    </tbody>
                    
                </table>
                
                <div className={classes.CartButtons}>
                <Link to="/"><button className={classes.CartButton}>Continue Shopping</button></Link>
                <button className={classes.CartButton} onClick={this.props.onRemoveAllCartItems}>Clear Shopping Cart</button>
                </div>
                <CartInfo  
                isAuthenticated={this.props.isAuthenticated}
                redirect={this.purchaseHandler}
                totalPrice={this.props.totalPrice}
                />
                
                </div>
                
               
                
                </Aux>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems,
        isAuthenticated: state.auth.token !== null,
        totalPrice: state.cart.totalPrice,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSetCartItems: (cartItems, totalPrice)=> dispatch(actions.setCartItems(cartItems, totalPrice)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
        onSigningInToPurchase: () => dispatch(actions.signingInToPurchase()),
        onRemoveAllCartItems: () => dispatch(actions.removeAllCartItems())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);

/**
 * 
 * https://stackoverflow.com/questions/63118267/warning-cannot-update-a-component-connectfunction-while-rendering-a-differe
 */
