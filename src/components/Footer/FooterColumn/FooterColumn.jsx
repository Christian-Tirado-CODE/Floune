import React from 'react';
import Aux from '../../../hoc/Auxialiary';
import classes from './FooterColumn.module.css';
import {Link} from 'react-router-dom';
const footerColumn = (props) => (
    <div className={classes.footerColumn}>
        <h1 className={classes.FooterColumnTitle}>{props.title}</h1>
        <ul className={classes.FooterColumnLinks}>
{props.links.map(link => {
        if(link === 'Visit Admin Panel'){
                return <Link to="admin-login"><li className={classes.FooterColumnLink}>{link}</li></Link>
        }else {

                return <li className={classes.FooterColumnLink}>{link}</li>
        }
         
})}
        </ul>
        </div>
)

export default footerColumn;