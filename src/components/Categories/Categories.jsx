import React, { Component } from 'react';
import classes from './Categories.module.css';
import CheckBox from '../UI/Checkbox/Checkbox';
import ProductCard from '../Product/ProductCard';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
class Categories extends Component{




componentDidMount(){
    this.props.onFetchProducts();
}


filterProducts = (event) => {
    if(event.target.checked){
        let productsToAdd = [];
         
        this.props.products.map(product => {
            if(product.category === event.target.value){
                
                productsToAdd.push(product);
                
            }
               
        });
        console.log(productsToAdd);
        this.props.onSetFilteredProducts([...this.props.filteredProducts, ...productsToAdd]);
    } else {
        //WEIRD BUG: THE ARRAY DESTRUCTURING DID NOT COPY ALL ELEMENTS
        let productsThatStay = [];
        this.props.filteredProducts.map((product, index) => {
            if(product.category !== event.target.value){
                productsThatStay.push(product);
                
            }
        });
        console.log(productsThatStay)
        this.props.onSetFilteredProducts([...productsThatStay]);

    }
       
}


    render(){
         let ProductCards;
        if(this.props.filteredProducts.length > 0){
            
             ProductCards = this.props.filteredProducts.map(product => (
                <ProductCard
                key={product.id}
                imageLink={product.imageLink}
                name={product.name}
                id={product.id}
                price={product.price}
                quantity={product.quantity}
                description={product.description}
            />
                        
                ));
        }
       else { 
           
            ProductCards = this.props.products.map(product => {
            
            return (
            <ProductCard
                key={product.id}
                imageLink={product.imageLink}
                name={product.name}
                description={product.description}
                id={product.id}
                price={product.price}
                quantity={product.quantity}
            />);
    });

}
   if(this.props.loading){
       ProductCards = <Spinner />;
   }


        return(
                <div className={classes.Categories}>
                    <div className={classes.CategoriesOptions}>
                        <h2>Categories</h2>
                        <ul>
                            <li className={classes.Category}><CheckBox value="Men" filter={this.filterProducts}/>Men</li>
                            <li className={classes.Category}><CheckBox value="Women" filter={this.filterProducts}/>Women</li>
                            <li className={classes.Category}><CheckBox value="Kids" filter={this.filterProducts}/>Kids</li>
                        </ul>

                    </div>
                    <div className={classes.CategoriesList}>
                        {ProductCards}
                    </div>
                </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products.products,
        filteredProducts: state.products.filteredProducts,
        loading: state.products.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => dispatch( actions.fetchProducts() ),
        onSetFilteredProducts: (filteredProducts) => dispatch( actions.setFilteredProducts(filteredProducts) ),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Categories);