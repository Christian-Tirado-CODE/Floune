import React from 'react';
import classes from './ProductImage.module.css';


const productImage = (props)=> {
    
    
     
    return (
        <React.Fragment>
        {props.imageLink ? 
        <img className={classes.ProductImage} src={`${require('../../../../img/' + props.imageLink)}`} srcSet={`${require('../../../../img/' + props.imageLink.replace('large', 'small'))} 600w,  ${require('../../../../img/' + props.imageLink)} 1200w`}
        sizes="(max-width: 600px) 78vw, (min-width: 1200px) 46vw, 640px"/> :
        // <img src={`${require('../../../../img/' + props.imageLink)}`}/> 
            null
        }
        </React.Fragment>
        
    );
}
export default productImage;