import React from 'react';
import classes from './Checkbox.module.css';
const checkbox = (props)=>(
      <div className={classes.Container}>
          <input type="checkbox" className={classes.CheckBox} value={props.value} onClick={props.filter}/> 
        <label>{props.label}</label>
        
      </div>
      
  
);

export default checkbox;