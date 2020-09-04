import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios/axios';
import {updateObject} from '../utility';
import { setProducts } from '../actions/products';

const initialState = {
    products: [],
    filteredProducts: [],
    loading: false,
    error: false,
    productsFetched: false
}

/* const setProducts = (state, action) => {
    return updateObject( state, {
        products: action.products,
        error: false,
        loading: false
    } );

}; */




const setFilteredProducts = ( state, action ) => {
    return updateObject( state, { filteredProducts: action.filteredProducts } );
};




const fetchProductsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};


const fetchProductsSuccess = ( state, action ) => {
    return updateObject( state, {
        products: action.products,
        loading: false,
        productsFetched: true
    } );
};

const fetchProductsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_PRODUCTS: return setProducts(state, action);
        break;
        case actionTypes.SET_FILTERED_PRODUCTS: return setFilteredProducts(state, action);
        break;
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart( state, action );
            break;
        case actionTypes.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess( state, action );
            break;
        case actionTypes.FETCH_PRODUCTS_FAIL: return fetchProductsFail( state, action );
            break;
        default: return state;
    }
};

export default reducer;