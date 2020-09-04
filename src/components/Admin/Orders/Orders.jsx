import React, { Component } from 'react';
import classes from './Orders.module.css';
import {connect} from 'react-redux';
import axios from '../../../axios/axios';
import * as actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';

class Orders extends Component {
    
    componentDidMount(){
        this.props.onFetchOrders(localStorage.getItem('token'));
    }

    disableButton = (btnType, status)=> {
      
        if(btnType === 'ship'){
            if(status === 'Confirmed'){
                return false;
            }
                

        }else if(btnType === 'deliver'){
            if(status === 'Shipped' || status === 'Confirmed')
                return false;
        
        } else if(btnType === 'cancel') {
            if(status === 'Shipped' || status === 'Confirmed')
                return false;
           
        } 

            return true;
        
    }
    
    changeOrderStatusHandler = (orders, token, id, status)=> {
        
        this.props.onChangeOrderStatus(orders, token, id, status);
    }

    render(){

        const orders = this.props.orders.map(order => {
            let itemsOrdered = 0;
            order.items.map(item => itemsOrdered += item.quantity)
            return <tr>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td><button disabled={this.disableButton('ship', order.status)} className={[classes.ShipBtn,classes.StatusBtn].join(' ')} onClick={() => this.changeOrderStatusHandler(this.props.orders, localStorage.getItem('token'), order.id, 'Shipped')}>Ship</button></td>
                <td><button disabled={this.disableButton('deliver', order.status)} className={[classes.DeliverBtn,classes.StatusBtn].join(' ')} onClick={() => this.changeOrderStatusHandler(this.props.orders,  localStorage.getItem('token'), order.id, 'Delivered')}>Delivered</button></td>
                <td><button disabled={ this.disableButton('cancel', order.status)} className={[classes.CancelBtn, classes.StatusBtn].join(' ')} onClick={() => this.changeOrderStatusHandler(this.props.orders,  localStorage.getItem('token'), order.id, 'Cancelled')}>Cancel</button></td>
            </tr>
        });

        if(this.props.loading){
            orders = <Spinner/>;
        }

        return(
            <div className={classes.Container}>
            <h1>Orders</h1>
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>--</th>
                    <th>--</th>
                    <th>--</th>
                    </tr>
                </thead>
                <tbody>
                    {orders}
                </tbody>
            </table>
            </div>
        );
    };

    


}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.products.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch( actions.fetchOrdersToAdmin(token, userId)),
        onChangeOrderStatus: (orders, token, id, status) => dispatch(actions.changeOrderStatus(orders, token, id, status))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Orders);
