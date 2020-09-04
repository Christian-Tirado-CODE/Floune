import React from 'react';
import { Component } from 'react';
import Aux from '../../hoc/Auxialiary';
import classes from './UserSettings.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';
class UserSettings extends Component {

state = {
    ordersFetched: false
}

componentDidMount(){
    this.props.onFetchOrders(localStorage.getItem('token'), localStorage.getItem('userId'));

}

    render(){
        const orders = this.props.orders.map(order => {
            let itemsOrdered = 0;
            order.items.map(item => itemsOrdered += item.quantity)
            return <tr>
                <td>{itemsOrdered}</td>
        <td>{order.orderDate}</td>
            </tr>
        });

        if(this.props.loading){
            orders = <Spinner/>;
        }
        return(
            <Aux>
<h1 style={{marginTop: '50px'}}>User Settings</h1>
            <table className={classes.Table}>
                <thead>
                    <th>items ordered</th>
                    <th>Order Date</th>
                     
                </thead>
                <tbody>
                    {orders}
                </tbody>
            </table>
            </Aux>
            
        );
    };
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.products.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch( actions.fetchOrders(token, userId) )
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);