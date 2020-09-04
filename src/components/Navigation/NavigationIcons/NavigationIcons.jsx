import React,{useState} from 'react';
import Aux from '../../../hoc/Auxialiary';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import classes from './NavigationIcons.module.css';
import {Link} from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import ProductDescription from '../../Product/ProductDetails/ProductDescription/ProductDescription';

const NavigationIcons = (props)=> {

    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);

    const toggle1 = () => setDropdownOpen1(prevState => !prevState);
    const toggle2 = () => setDropdownOpen2(prevState => !prevState);
console.log(props.isAuthenticated);

    return (
        <div className={classes.NavIcons}>
           



             <Dropdown isOpen={dropdownOpen1} toggle={toggle1} >
      <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen1}
      >
        <FontAwesomeIcon icon="shopping-cart"/>
      </DropdownToggle>
      <DropdownMenu style={{marginTop: '50px'}}>
        <div onClick={toggle1}><Link to="/cart" style={{padding: '5px'}}>View Cart</Link></div>
        
        
      </DropdownMenu>
    </Dropdown>

            <Dropdown isOpen={dropdownOpen2} toggle={toggle2} style={{marginRight:"60px", width: "80px"}}>
      <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen1}
      >
        <FontAwesomeIcon icon="user"/>
      </DropdownToggle>
      <DropdownMenu style={{marginTop: '50px'}}>
          {!props.isAuthenticated
           ? <div onClick={toggle2} style={{fontSize:"16px", padding:"5px"}}><Link to="/login-register">Login</Link></div>
           :<div onClick={toggle2} style={{fontSize:"16px", padding:"5px"}}><Link to="/logout">Logout</Link></div>}
        
        <div onClick={toggle2} style={{fontSize:"16px",  padding:"5px"}}><Link to="/user-settings">Account</Link></div>
        
      </DropdownMenu>
    </Dropdown>
            
        </div>
            
        
    );
}



export default NavigationIcons;
