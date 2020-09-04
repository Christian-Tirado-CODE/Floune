import React, { Component } from 'react';
import classes from './EditProduct.module.css'
import Aux from '../../../../hoc/Auxialiary';
import Spinner from '../../../UI/Spinner/Spinner';
import axios from '../../../../axios/axios';
class EditProduct extends Component {
   
state={
   
        name: '',
        price: '',
        quantity: 0,
        category: '',
        description: '',
        loading: false

}

componentDidMount(){
const name = this.props.name;
const price = this.props.price;
const quantity = this.props.quantity;
const category = this.props.category;
const description = this.props.description;

 this.setState({
    name: name,
    price: price,
    quantity: quantity,
    category: category,
    description: description
 })
}

editProductHandler = (id) => {
       
    const products = this.props.products;
    const imageLink = products[id].imageLink;
    products[id] = {imageLink, ...this.state};
  
    axios.put(`/products/${id}.json`, products[id])
    .then(res => console.log(res))
    .catch(error => console.log(error))

    this.props.closeModal();
 }


    render(){
        console.log(this.state.description)
        let inputs = <Spinner/>;
        
        if(!this.state.loading){
            
            inputs = 
            <Aux>
            <div className={classes.Row}>
            <input className={classes.InputElement} name="name" type="text" value={this.state.name} placeholder="Name" onChange={(event)=> this.setState({name: event.target.value})}/>
            <input className={classes.InputElement}  name="price" type="text" value={this.state.price} placeholder="price" onChange={(event)=> this.setState({ price: parseFloat(event.target.value)})}/>
            </div>
            <div className={classes.Row}>
            <input className={classes.InputElement} name="category" type="text" value={this.state.category}  placeholder="Category" onChange={(event)=> this.setState({category: event.target.value})}/>
            <input className={classes.InputElement} name="quantity" type="text" value={this.state.quantity} placeholder="Quantity" onChange={(event)=> this.setState({quantity: event.target.value ? parseInt(event.target.value) : event.target.value})}/>
            </div>
            <textarea rows="5" className={classes.Textarea} value={this.state.description} onChange={(event)=> this.setState({description: event.target.value})}/>
                
            
            <div className={classes.BtnContainer}>
            <button className={classes.SaveBtn} onClick={() => this.editProductHandler(this.props.id)}>Save</button>

            </div>
            </Aux>
        }
        // SHOW SPINNER WHEN COMPONENT IS FIRST RENDERED
        return(
            <div className={classes.EditProduct}>
                {inputs}
            </div>
        );
    }

};

export default EditProduct;