import React from 'react';
import Aux from '../../hoc/Auxialiary';
import classes from './ProductCard.module.css';
import { Link } from 'react-router-dom';
const productCard = (props) => {
    const style = {
    backgroundImage: `url(${require('../../img/' + props.imageLink)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px',
    position: 'relative',
    margin: '20px'
    };

    return (
        <div className={classes.Container}>
            <div style={style} className={classes.ProductCard}>
            <Link to={`/product-details?id=${props.id}&name=${props.name}&description=${props.description}&imageLink=${props.imageLink}&price=${props.price}&quantity=${props.quantity}`}><h3 className={classes.AddToCart}>View Details</h3></Link>
        </div>
    <h3 className={classes.ProductName}>{props.name}</h3>
        </div>
        

    );
} 


export default productCard;