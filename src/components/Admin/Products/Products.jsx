import React, {Component} from 'react';
import classes from './Products.module.css';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import Modal from '../../UI/Modal/Modal';
import EditProduct from './EditProduct/EditProduct';
import Aux from '../../../hoc/Auxialiary';
import AddProduct from '../Products/AddProduct/AddProduct';
import axios from '../../../axios/axios';
import Spinner from '../../UI/Spinner/Spinner';

class Products extends Component {

    state= {
        editing: false,
        component: null,
        isEditProduct: null,
        key: null
    }

    componentDidMount(){
        this.props.onFetchProducts();
        
       
        
    }
    //======== SHOULD COMPONENT UPDATE ===========

    openModalHandler = (id) => {
        

       this.props.products.map(product => {
        

            if(product.id === id){
                
                this.state.component = (
                    
                       
                        <EditProduct
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        quantity={product.quantity}
                        products={this.props.products}
                        description={product.description}
                        category={product.category}
                        closeModal={this.editProductCancelHandler}
                        
                    />
                )
            }
       });
        this.setState({editing: true, isEditProduct: true});
        
    }
    editProductCancelHandler = () => {
        this.setState({editing: false, isEditProduct: null})
    }


    deleteProductHandler = (id)=> {
        axios.delete(`/products/${id}.json`)
    .then(res => {
    console.log(res);
    
})
    .catch(error => console.log(error))
    

    }
   

   
    render(){
        

        let productList = this.props.products.map(product => (
        <tr>
            <td>{product.name}</td>
            <td><button className={classes.EditProductBtn} onClick={() => this.openModalHandler(product.id)}>Edit</button></td>
            <td><button className={classes.DeleteProductBtn} onClick={() => this.deleteProductHandler(product.id)}>Delete</button></td>
            </tr>
        ));

            if(this.props.loading){
                productList = <Spinner/>;
            }

        return (
            <div className={classes.Products}>
                <Modal key={1} show={this.state.editing} modalClosed={this.editProductCancelHandler} >
                    {this.state.isEditProduct ? 
                    this.state.component:
                    <AddProduct closeModal={this.editProductCancelHandler} amountOfProducts={this.props.products.length}/>}
                </Modal>
                
                
                
                
                
                
                <h1 className={classes.Title}>Products</h1>
                <div className={classes.AddBtnContainer}>
                    <button className={classes.AddBtn}  onClick={()=> this.setState({editing: true, isEditProduct: false })}>Add Product</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>--</th>
                            <th>--</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList}
                    </tbody>
                </table>
               
            </div>
        );
    }
};


const mapStateToProps = state => {
    return {
        products: state.products.products,
        loading: state.products.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProducts: () => dispatch( actions.fetchProducts() )
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Products);