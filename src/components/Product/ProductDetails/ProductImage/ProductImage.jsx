import React from 'react';
import classes from './ProductImage.module.css';


const productImage = (props)=> {
    
    
     
    return (
        <div>
        {props.imageLink ? 
        <img src={`${require('../../../../img/' + props.imageLink)}`}/> :
            null
        }
        </div>
        
    );
}
export default productImage;