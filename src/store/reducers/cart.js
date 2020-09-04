import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

//{id: 5, imageLink: '', name:'lorem1', price: 0.00, quantity: 1},
//{id: 6, imageLink: '', name:'lorem2', price: 0.00, quantity: 1}
const initialState = {
    cartItems: [], 
    totalPrice: 0,
    error: null,
    loading: null,
    purchasing: false,
}
/* 
const addToCartStart = (state, action) => {
    return updateObject(state, {loading: true});
}; */

const setCartItems = (state, action) => {
        return updateObject( state, {
            cartItems: action.cartItems,
            error: false,
            loading: false,
            totalPrice: action.totalPrice
        } );
   
};

const addToCartFail = ( state, action ) => {
    return updateObject( state, { error: true, loading: false } );
};




// parameters: id, increaseQty
const updateCartItemQuantity = (state, action)=> {
    const itemIndex = state.cartItems.findIndex(p => {
         return p.id === action.id;
     });

     
     const updatedItem = {
         ...state.cartItems[itemIndex]
     }
     let updatedTotalPrice = state.totalPrice;
     console.log(updatedTotalPrice);

     if(action.increaseQty){
        updatedItem.quantity >= 1 ? updatedItem.quantity = (updatedItem.quantity+1) : updatedItem.quantity = 1;
        updatedTotalPrice += updatedItem.price;

     }
     else{
        updatedItem.quantity > 1 ? updatedItem.quantity = (updatedItem.quantity-1) : updatedItem.quantity = 1;
        updatedTotalPrice -= updatedItem.price;
     }

     const updatedCartItems = [...state.cartItems];
     updatedCartItems[itemIndex] = updatedItem; 
     
     const updatedState = {
         cartItems: updatedCartItems,
         totalPrice: updatedTotalPrice 
     }
    console.log(updatedTotalPrice);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
     return updateObject(state, updatedState);
     
 }

 const removeCartItem = (state, action) => {
     const itemIndex = state.cartItems.findIndex(p => {
         return p.id === action.id;
     });
      

     const updatedCartItems = [...state.cartItems];
     updatedCartItems.splice(itemIndex, 1);

     // DEDUCT FROM TOTAL PRICE


     const updatedState = {
        cartItems: updatedCartItems
    }
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    if(updatedCartItems.length === 0){
        localStorage.removeItem('cart');
    }
    return updateObject(state, updatedState);

 }

 const removeAllCartItems = (state) => {
     localStorage.removeItem('cart');

     const updatedState = {
        cartItems: []
    }

    return updateObject(state, updatedState);
 }

const signingInToPurchase = (state, action) => {
    return updateObject(state, {
        purchasing: true
    });

}

 const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_CART_ITEMS: return setCartItems(state, action);
        case actionTypes.ADD_TO_CART_FAIL: return addToCartFail();
        case actionTypes.UPDATE_CART_ITEM_QUANTITY: return updateCartItemQuantity( state, action);
        case actionTypes.REMOVE_CART_ITEM: return removeCartItem(state, action);
        case actionTypes.REMOVE_ALL_CART_ITEMS: return removeAllCartItems(state);
        case actionTypes.SIGNING_IN_TO_PURCHASE: return signingInToPurchase(state, action);
        default: return state;
    }
};

export default reducer;

/**
 * Check if cart is stored locally
 * If it is, parse it, append and insert back locally.
 * If not, create a new cart
 * 
 * 
 */