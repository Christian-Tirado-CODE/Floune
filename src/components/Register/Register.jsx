import React, { Component } from 'react';
import Aux from '../../hoc/Auxialiary';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Input from '../UI/Input/Input';
import classes from './Register.module.css';
import Button from '../UI/Button/Button';
import CheckBox from '../UI/Checkbox/Checkbox';

const register = ()=> {
    
        let form = (
            <form className={classes.LoginForm}>
            <Input type="text" label="Name" />
            <Input type="email" label="E-mail" />
            <Input type="password" label="Password"/>
            <Input type="password" label="Password"/>
            <div className={classes.GridContainer}>
            <CheckBox label="Remember me"/>
            <p className={classes.ForgotPwd}>Forgot Password?</p>
            <Button>Register</Button>
            </div>
            
            </form>
        );


        return (
            <Aux>
                
                {form}
            
            </Aux>
        );
    }


export default register;