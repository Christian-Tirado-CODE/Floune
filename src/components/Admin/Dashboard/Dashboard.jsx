import React from 'react';
import classes from './Dashboard.module.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Aux from '../../../hoc/Auxialiary';
const dashboard = props => {
    
    return (
        
        <div className={classes.Dashboard}>
            
            <h1>Dashboard will be implemented in future versions.</h1></div>
    );
};

const mapStateToProps = state => {
    return {
       
    }
}


export default connect(mapStateToProps, null)(dashboard);