import React from 'react';
import Aux from '../../hoc/Auxialiary';
import classes from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const productCard = (props) => {
   /* const style = {
    backgroundImage: `url(${require('../../img/' + props.imageLink)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
    position: 'relative',
    margin: '20px'
    };*/

    const ProductCard = styled.div`
    background-image: url(${require('../../img/' + props.imageLink)});
    background-size: cover;
    background-position: center;
    height: 400px;
    position: relative;
    margin: 20px;

    @media only screen and (max-width: 600px) {
        background-image: url(${require('../../img/' + props.imageLink.replace('large', 'small'))});
    }
    `;

    return (
        <div className={classes.Container}>
            <ProductCard>
            <Link to={`/product-details?id=${props.id}&name=${props.name}&description=${props.description}&imageLink=${props.imageLink}&price=${props.price}&quantity=${props.quantity}`}><div className={classes.ProductAction}><div className={classes.ProductAction__Item}>&rarr;</div><div className={classes.ProductAction__Item}>View Details</div><div className={classes.ProductAction__Item}>&rarr;</div></div></Link>
            </ProductCard>
    <h3 className={classes.ProductName}>{props.name}</h3>
        </div>
        

    );
} 


export default productCard;