import React, { Component } from 'react';
import classes from './AddProduct.module.css'
import Aux from '../../../../hoc/Auxialiary';
import Spinner from '../../../UI/Spinner/Spinner';
import axios from '../../../../axios/axios';
class AddProduct extends Component {
   
state= {
   
        name: '',
        price: '',
        quantity: null,
        category: '',
        imageLink: '',
        description: '',
        loading: false

}



addProductHandler = () => {
       
    const product = {
        name: this.state.name,
        price: Number(this.state.price),
        quantity: Number(this.state.quantity),
        category: this.state.category,
        imageLink: this.state.imageLink,
        description: this.state.description
    }
  
     axios.put(`/products/${this.props.amountOfProducts}.json`, product)
    .then(res => console.log(res))
    .catch(error => console.log(error)) 

    this.props.closeModal();

     

    


 }


    render(){
        


        let inputs = <Spinner/>;
        
        if(!this.state.loading){
            
            inputs = 
            <Aux>
            <div className={classes.Row}>
            <input className={classes.InputElement} name="name" type="text" value={this.state.name} placeholder="Name" onChange={(event)=> this.setState({name: event.target.value})}/>
            <input className={classes.InputElement}  name="price" type="text" value={this.state.price} placeholder="price" onChange={(event)=> this.setState({price: event.target.value})}/>
            </div>
            <div className={classes.Row}>
            <input className={classes.InputElement} name="category" type="text" value={this.state.category} placeholder="Category" onChange={(event)=> this.setState({category: event.target.value})}/>
            <input className={classes.InputElement} name="quantity" type="text" value={this.state.quantity} placeholder="Quantity" onChange={(event)=> this.setState({quantity: event.target.value ? event.target.value : event.target.value})}/>
            </div>
            <input className={classes.InputElement} name="image-link" type="text" value={this.state.imageLink} placeholder="Image Link" onChange={(event)=> this.setState({imageLink: event.target.value})}/>
            <textarea rows="5" className={classes.Textarea}  value={this.state.description}  onChange={(event)=> this.setState({description: event.target.value})}/>
            <div className={classes.BtnContainer}>
            <button className={classes.SaveBtn} onClick={this.addProductHandler}>Add</button>

            </div>
            </Aux>
        }
        // SHOW SPINNER WHEN COMPONENT IS FIRST RENDERED
        return(
            <div className={classes.AddProduct}>
                {inputs}
            </div>
        );
    }

};

export default AddProduct;