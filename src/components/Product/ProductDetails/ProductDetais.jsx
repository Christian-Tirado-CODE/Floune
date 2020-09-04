import React, { Component } from 'react';
import Aux from '../../../hoc/Auxialiary';
import classes from './ProductDetails.module.css';
import ProductImage from './ProductImage/ProductImage';
import ProductDescription from './ProductDescription/ProductDescription';
import Navigation from '../../Navigation/Navigation';
import Footer from '../../Footer/Footer';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class ProductDetails extends Component {

    state = {
        itemQuantity: 1,
        productId: null,
        productInfo: []
    }
    

    componentDidMount(){
        this.props.onFetchProducts();
        const query = new URLSearchParams(this.props.location.search);
        
        for (let param of query.entries()) {
           
            const [key,value] = param;
            if(key === 'id'){
                this.setState({productId: value});
                (console.log(key, value))
            }
            const obj = {};
            obj[key] = value;
           this.state.productInfo.push(obj);
        }
        
        
        
    }

    addToCartHandler = () => {
        
       console.log('addToCartHandler');
        let productId; 
        this.state.productInfo.forEach(obj => obj.hasOwnProperty('id') ? productId= obj.id : null);
       this.props.onAddToCart(this.props.products, productId, this.state.itemQuantity);        
       this.props.history.push(`/cart`);
    }

updateItemQuantity = (increaseQty) => {
    
        this.setState((prevState, props) => {
            const updateItemQuantity = increaseQty ? prevState.itemQuantity + 1 : prevState.itemQuantity - 1;
            
             if(updateItemQuantity < 1)
                return;
            return {
                 itemQuantity: updateItemQuantity
            }        
        });

        
}

inCartCheck = () => {
   if(localStorage.getItem('cart')){
    const cart = JSON.parse(localStorage.getItem('cart'));
    const productIndex = cart.findIndex(p => p.id === this.state.productId);
        const inCart = productIndex < 0 ?  false : true;
       return inCart; 
   }
    

}

orderHandler = ( event ) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
        cartItems: this.props.cartItems,
        price: this.props.price,
        orderData: formData
    }

    this.props.onOrderBurger(order);
    
}

   

    render(){
        let imageLink, name, description, price;
        this.state.productInfo.forEach(function (obj) { 
            if(obj.hasOwnProperty('imageLink'))
            imageLink  = obj.imageLink;
            if(obj.hasOwnProperty('name'))
            name  = obj.name;
            if(obj.hasOwnProperty('description'))
            description  = obj.description;
            if(obj.hasOwnProperty('price'))
            price  = obj.price;
            
        });
        
    
          
        return(
            <Aux>
               
                <div className={classes.Container}>

                
                <div className={classes.ProductImage}>
                 <ProductImage
                   imageLink={imageLink}
                 />
                </div>
                <div className={classes.ProductDescription}>
                    <ProductDescription
                    updateQuantity={this.updateItemQuantity}
                    itemQuantity={this.state.itemQuantity}
                    productId={this.state.productId}
                    products={this.props.products}
                    addItemToCart={this.addToCartHandler}
                    itemAlreadyAdded={this.inCartCheck()}
                    price={price}
                    name={name}
                    description={description}
                    />
                </div>
                </div>
                
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        
        products: state.products.products,
        productsFetched: state.products.productsFetched
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (products, id, qty) => dispatch( actions.addToCart(products, id, qty)),
        onFetchProducts: () => dispatch( actions.fetchProducts() )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);