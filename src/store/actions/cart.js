
import * as actionTypes from './actionTypes';




export const setCartItems = ( cartItems, totalPrice ) => {
    return {
        type: actionTypes.SET_CART_ITEMS,
        cartItems: cartItems,
        totalPrice: totalPrice
    };
};

export const addToCartFail = ( error ) => {
    return {
        type: actionTypes.ADD_TO_CART_FAIL,
        error: error
    };
};





export const removeCartItem = ( id ) => {
    
    return {
        type: actionTypes.REMOVE_CART_ITEM,
        id: id
    };
};
export const removeAllCartItems = () => {
    
    return {
        type: actionTypes.REMOVE_ALL_CART_ITEMS
        
    };
};
export const updateCartItemQuantity = ( id, increaseQty ) => {
    return {
        type: actionTypes.UPDATE_CART_ITEM_QUANTITY,
        id: id,
        increaseQty: increaseQty
    };
};

export const signingInToPurchase = () => {
return {
    type: actionTypes.SIGNING_IN_TO_PURCHASE,
};
    

};




 

export const addToCart =  (products, id, qty) => {
   
    return dispatch => {
        
        const itemIndex = products.findIndex(p => p.id === id);
        const product = products[itemIndex];
        product.quantity = qty;
        
        let cart; 
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            cart.push(product);

            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
             cart = [];
             cart.push(product);
             localStorage.setItem('cart', JSON.stringify(cart));
        }
    

        
        
    };
   
};



