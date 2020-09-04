import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import classes from './Login.module.css';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Auxialiary';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';

class Login extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        error: false
    }


    checkValidity(value, rules) {
        let isValid = true;

        if(!rules){
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.isEmail){
            const pattern = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; 
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        let  updatedControls = {
            ...this.state.controls
        };
    

        
        const updatedControlsElement = {
            ...updatedControls[inputIdentifier]
        };
        updatedControlsElement.value = event.target.value;
        updatedControlsElement.valid = this.checkValidity(updatedControlsElement.value, updatedControlsElement.validation);
        updatedControlsElement.touched = true;
        updatedControls[inputIdentifier] = updatedControlsElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        

        
            this.setState({
                controls: {
                    ...updatedControls
               },
               formIsValid: formIsValid
        });

    }  

    submitHandler = (event)=> {
        console.log('submitHandler');
        event.preventDefault();
        if(this.state.controls.email.value !== 'christian.tirado2@upr.edu'){
            this.setState({error: true});
        } else {
            
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, true);
        }
        
    }

render(){

   
    let authRedirect = null;
    if(this.props.isAuthenticated)
        authRedirect = <Redirect to={this.props.authRedirectPath}/>;

    const formElementsArray = [];

    
        
    for (let key in this.state.controls) {
        formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        });
    }
     

        

        /* let form = (
            <form className={classes.LoginForm}>
            <Input type="email" label="E-mail" />
            <Input type="password" label="Password"/>
            <Button disabled={!this.state.formIsValid} type='submit'>Login</Button>
            </form>
        ); */

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
            <p>{this.props.error.message}</p>
            )
        } else if(this.state.error) {
            errorMessage = "This acoount does not have Admin access";
        }

        let form = (
            <Aux>
           
            <form onSubmit={(event) => this.submitHandler(event, true)}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id, true)}
                    />
                ))}
               <Button disabled={!this.state.formIsValid} type='submit'>Login</Button>
            </form>
            
            </Aux>
        );
        if(this.props.loading){
            form = <Spinner/>;
        }



        return (
            <div className={classes.Container}>
                {authRedirect}
                <h1>Floune - Admin Login</h1>
                {errorMessage}
                {form}
            </div>
                
            
        );
    };
    };


    const mapStateToProps = state => {
        return {
            loading: state.auth.loading,
            error: state.auth.error,
            isAuthenticated: state.auth.token !== null,
            purchasing: state.cart.purchasing,
            authRedirectPath: '/admin-panel'
        }
    }
    
    const mapDispatchToProps = dispatch => {
        return {
            onAuth: (email, password, isLogin)=> dispatch(actions.auth(email, password, isLogin)),
            
        };
    };
    
    
    export default connect(mapStateToProps, mapDispatchToProps)(Login);