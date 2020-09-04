import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import classes from './Checkout.module.css';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import CheckoutInfo from './CheckoutInfo/CheckoutInfo';
import {CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import { v4 as generateUniqueKey } from 'uuid';
import {Redirect} from 'react-router-dom';

class Checkout extends Component {
    state = {
        orderForm: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Puerto Rico', displayValue: 'Puerto Rico'},
                        {value: 'United States', displayValue: 'United States'}
                    ]
                },
                value: 'Country',
                validation: {},
                valid: true
            },

            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        
        formIsValid: false,
        itemsOrdered: []
    }

    componentDidMount(){
        if(localStorage.getItem('cart')){
            if(localStorage.getItem('cart')){
                const cartItems = JSON.parse(localStorage.getItem('cart'));
                let totalPrice = 0;
                for(let key in cartItems){
                    totalPrice += cartItems[key].price * cartItems[key].quantity;
                    this.state.itemsOrdered.push(
                        {name: cartItems[key].name, 
                            quantity: cartItems[key].quantity, 
                            price:  cartItems[key].price});
                }
                
            this.props.onSetCartItems(JSON.parse(localStorage.getItem('cart')), totalPrice);
            this.props.getOrders(localStorage.getItem('token'));
        }
        
   }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    orderHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const date = new Date()
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date ) 
const orderDate = `${month} ${day}, ${year }`;
        const uuid = generateUniqueKey();
        const order = {
            id: uuid,
            items: this.state.itemsOrdered,
            price: this.props.totalPrice,
            orderData: formData,
            status: 'Confirmed',
            userId: this.props.userId,
            orderDate: orderDate
        }

        this.props.onOrderItems(order, this.props.token, uuid);
       this.props.history.push('/thank-you');
    }

    formSubmitHandler = async event =>{
        event.preventDefault();

        const billingDetails = {
            firstName: this.state.orderForm.firstName.value,
            lastName: this.state.orderForm.lastName.value,
            country: this.state.orderForm.country.value,
            street: this.state.orderForm.street.value,
            city: this.state.orderForm.city.value,
            email: this.state.orderForm.email.value,
            phone: this.state.orderForm.phone.value,
            
        };

        console.log(billingDetails);

        var response = fetch('/secret').then(function(response) {
            return response.json();
          }).then(function(responseJson) {
            var clientSecret = responseJson.client_secret;
            // Call stripe.confirmCardPayment() with the client secret.
          });
    }


    render () {
        console.log(this.props.orders.length);

        const CardElementOptions = {
            style: {
                base: {
                    fontSize: '16px'
                    
                },
                invalid: {

                }
            },
            hidePostalCode: true
        }

      

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler} className={classes.CheckoutForm}>
                {formElementsArray.map(formElement => {

                    
                    return <Input 
                        key={formElement.id}
                        id={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    })}
            <div className={classes.CardElementContainer}>
            <CardElement options={CardElementOptions}/>
            </div>
            </form>
        );
        let authRedirect = null;
        if(this.props.isAuthenticated)
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;

        return (
            <div className={classes.Checkout}>
                {authRedirect}
                <div>
                {form}
                </div>
                <div>
                <CheckoutInfo 
                cartItems={this.props.cartItems}
                orderHandler={this.orderHandler} // Change this
                />
                </div>

                
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cart.cartItems,
        totalPrice: state.cart.totalPrice,
        token: state.auth.token,
        userId: state.auth.userId,
        orders: state.order.orders,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSetCartItems: (cartItems, totalPrice)=> dispatch(actions.setCartItems(cartItems, totalPrice)),
        onOrderItems: (orderData, token, uuid) => dispatch(actions.purchaseItems(orderData, token, uuid)),
        getOrders: (userId) => dispatch(actions.fetchOrdersToAdmin(userId))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);