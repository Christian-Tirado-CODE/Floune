import React from 'react';

import classes from './InfoBar.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const InfoBar = (props) => (
  <div className={classes.InfoBar}>
   <div className={classes.TopBar}>
     <div className={classes.LeftInnerContainer}>


    </div>
    <div className={classes.RightInnerContainer}>
    <div onClick={() => props.closeBox(false)}><FontAwesomeIcon icon="chevron-down" style={{color: "white"}}/></div>
    </div>
   </div>
  </div>
);

export default InfoBar;