import React from 'react';
import Aux from '../../../hoc/Auxialiary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classes from './CartItem.module.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

const cartItem = props => {
    return (       
        <tr className={classes.CartItem}>
        <td><img className={classes.CartImage} src={`${require('../../../img/' + props.imageLink)}`}/></td>
         <td><p>{props.name}</p> </td>
        <td><p>{props.price}</p> </td>
    <td><div className={classes.OrderControls}><button className={classes.OrderControl}  onClick={() => props.onCartUpdateQuantity(props.id, false)} ><FontAwesomeIcon icon="minus"/></button>{props.quantity}<button className={classes.OrderControl} onClick={() => props.onCartUpdateQuantity(props.id, true)}><FontAwesomeIcon icon="plus"/></button></div></td>
    <td className={classes.SubTotal}>{(props.price * props.quantity).toFixed(2)}</td>
        <td onClick={() => props.onCartRemoveItem(props.id)}><FontAwesomeIcon icon="window-close" className={classes.RemoveCartItem}/></td>
        </tr>
        
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onCartUpdateQuantity: (id, increaseQty) => dispatch(actions.updateCartItemQuantity(id, increaseQty)),
        onCartRemoveItem: (id) => dispatch(actions.removeCartItem(id)),
    };
};


export default connect(null, mapDispatchToProps)(cartItem);
