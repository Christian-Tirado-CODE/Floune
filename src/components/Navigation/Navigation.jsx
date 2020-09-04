import React, { Component } from 'react';
import classes from './Navigation.module.css';
import Logo from '../UI/Logo/Logo';
import NavigationItem from '../Navigation/NavigationItem/NavigationItem';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import NavContext from '../../context/nav-context';
import NavigationIcons from './NavigationIcons/NavigationIcons';
import { Link, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

class Navigation extends Component {

    state = {
        
    }

    
    render() {
        console.log('Navigation: render()');
        return (
            <nav className={classes.Nav}>
               <Link className={classes.Link} to="/"><Logo /></Link> 
                <div style={{height: '30px', margin: 'auto 0'}}>
                    <ul className={classes.NavLinks}>
                    <NavLink to="/categories" style={{textDecoration: 'none'}}><li className={classes.NavLink}>Categories</li></NavLink>
                    <NavLink to="/blog" style={{textDecoration: 'none'}}><li className={classes.NavLink}>Blog</li></NavLink>
                    <NavLink to="/contact" style={{textDecoration: 'none'}}><li className={classes.NavLink}>Contact Us</li></NavLink>
                    </ul>
                    
                    
                </div>
                <NavigationIcons isAuthenticated={this.props.isAuthenticated}/>
            </nav>
        );
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Navigation);