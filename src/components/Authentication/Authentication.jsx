import React, { Component } from 'react';
import Aux from '../../hoc/Auxialiary';
import { Link, Route, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import classes from './Authentication.module.css';
import Input from '../UI/Input/Input';
import CheckBox from '../UI/Checkbox/Checkbox';
import Button from '../UI/Button/Button';
import * as actions from '../../store/actions/index';
import{connect} from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';

class Authentication extends Component {
    state = {
        showLogin: true,
        controls: {
            login: {
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
            register: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name',
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
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
                }, confirmPassword: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Confirm Password',
                    },
                    value: '',
                    validation: {
                        required: true,
                        isSamePwd: null
                    },
                    valid: false,
                    touched: false
                }
            }

        },
        formIsValid: false
    }


    componentDidMount(){
        if(!this.props.purchasing && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    showLogin = (login) => {
        this.setState({ showLogin: login});
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

    inputChangedHandler = (event, inputIdentifier, login) => {
        let updatedControls = null;
    if(login){
         updatedControls = {
            ...this.state.controls.login,
        };
    } else {
        updatedControls = {
            ...this.state.controls.register,
        };
    }

        
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
        

        
        //this.setState({ controls: updatedControls, formIsValid: formIsValid });
        if(login){
            this.setState( prevState => ({
                showLogin: prevState.showLogin,
                controls: {
                     login: {
                        ...updatedControls
                     },
                     register: {
                        ...prevState.controls.register
                     }
                    
                },
                formIsValid: formIsValid
            }));

        } else {
            this.setState( prevState => ({
                showLogin: prevState.showLogin,
                controls: {
                     login: {
                        ...prevState.controls.login
                     },
                     register: {
                        ...updatedControls
                     }
                    
                },
                formIsValid: formIsValid
            }));
        }
    }

    submitHandler = (event, isLogin)=> {
        event.preventDefault();
        
        this.props.onAuth(this.state.controls.login.email.value, this.state.controls.login.password.value, isLogin);
        
    }

    

    render() { 

        let authRedirect = null;
        if(this.props.isAuthenticated)
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;

        const formElementsArray = [];

        if(this.state.showLogin){
            
        for (let key in this.state.controls.login) {
            formElementsArray.push({
                id: key,
                config: this.state.controls.login[key]
            });
        }
        } else {
            for (let key in this.state.controls.register) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls.register[key]
                });
            }
        }


       let submitControls = (
       <div className={classes.GridContainer}>
        <CheckBox label="Remember me"/>
        <p className={classes.ForgotPwd}>Forgot Password?</p>
        <Button disabled={!this.state.formIsValid} type='submit'>Login</Button>
        </div>);

        if(!this.state.showLogin){
            submitControls = (
                <Button disabled={!this.state.formIsValid} type='submit'>Register</Button>
            )
        }

       

      

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
            <p>{this.props.error.message}</p>
            )
        };

        let form = (
            <Aux>
            {errorMessage}
            <form onSubmit={(event) => this.submitHandler(event, this.state.showLogin)}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id, this.state.showLogin)}
                    />
                ))}
               {submitControls}
            </form>
            </Aux>
        );
        if(this.props.loading){
            form = <Spinner/>;
        }



        let content = (
            <Aux>
                <div className={classes.SwitchLinks}><button className={[classes.SwitchLink, 'active'].join(' ')} onClick={this.changeShowLogin}>Login</button><span className={classes.Divider}>|</span> <button className={classes.SwitchLink} onClick={this.changeShowLogin}>Register</button></div>
                <Login />
            </Aux>
        );

        if (!this.state.showLogin) {
            content = (<Aux>
                <div className={classes.SwitchLinks}><button className={classes.SwitchLink} onClick={this.changeShowLogin}>Login</button> | <button className={[classes.SwitchLink, 'active'].join(' ')} onClick={this.changeShowLogin}>Register</button></div>
                <Register />

            </Aux>);
        }

        // <Button  disabled={!thsi.state.formIsValid}/>

        return (
            <Aux>
                {authRedirect}
                <div className={classes.SwitchLinks}><button className={classes.SwitchLink} onClick={() => this.showLogin(true)}>Login</button> | <button className={[classes.SwitchLink, 'active'].join(' ')} onClick={() => this.showLogin(false)}>Register</button></div>

<div className={classes.FormContainer}>
    {form}
</div>
            </Aux>
            

        );
    }


}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        purchasing: state.cart.purchasing,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isLogin)=> dispatch(actions.auth(email, password, isLogin)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Authentication);