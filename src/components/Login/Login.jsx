import React, { Component } from 'react';
import Aux from '../../hoc/Auxialiary';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import Input from '../UI/Input/Input';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const login = (props) => {
    

    

  

        let form = (
            <form className={classes.LoginForm}>
            <Input type="email" label="E-mail" />
            <Input type="password" label="Password"/>
            <Button>Log In</Button>
            </form>
        );


        return (
            <Aux>
                {form}
            </Aux>
        );
    }


export default login;