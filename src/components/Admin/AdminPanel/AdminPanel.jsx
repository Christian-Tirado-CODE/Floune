
import React, { Component } from 'react';
import classes from './AdminPanel.module.css';
import {Link} from 'react-router-dom';
import Styled from 'styled-components';

class AdminPanel extends Component {
   

    render(){
      
        const StyledLink = Styled(Link)`
            color: white;
            font-size: 16px;
            
            &:hover {
                text-decoration: none;
                color: white;
            }
        `
        return (
            <div className={classes.Container}>
                <div className={classes.SideMenu}>
                    <h1 className={classes.SideMenuLogo}><Link to="/admin-panel" style={{textDecoration: 'none', color: 'white'}}>Floune</Link></h1>
                    <ul>
                        <StyledLink to="/admin-panel/chats"><li>Help Chats</li></StyledLink>
                        <StyledLink to="/admin-panel/products"><li>Products</li></StyledLink>
                        <StyledLink to="/admin-panel/orders"><li>Orders</li></StyledLink>
                    </ul>
                </div>
                    <div className={classes.Main}>
                    {this.props.children} 
                    </div>
            </div>
        )
    }


}

export default AdminPanel;