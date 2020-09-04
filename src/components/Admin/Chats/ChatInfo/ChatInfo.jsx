import React from 'react';
import classes from './ChatInfo.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const chatInfo = props => {
    return(
        <div className={classes.ChatInfo} >
            <div className={classes.Text} onClick={(id) => props.click(props.room)}>
            <h2 className={classes.User}>Chat ID: {props.room}</h2>
            <p>Message: {props.message}</p>
            </div>
            <div className={classes.RemoveChat} onClick={(id) => props.delete(props.room)}><FontAwesomeIcon icon="window-close" className={classes.RemoveCartItem}/></div>
        </div>
    );
};

export default chatInfo;