import axios from '../../axios/axios';
import * as actionTypes from './actionTypes';

export const setProducts = ( products) => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products: products
    };
};
export const setFilteredProducts = (filteredProducts) => {
    return {
        type: actionTypes.SET_FILTERED_PRODUCTS,
        filteredProducts: filteredProducts
    };
};


export const fetchProductsSuccess = ( products ) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: products,
        productsFetched: true
    };
};

export const fetchProductsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FAIL,
        error: error,
        productsFetched: false
    };
};

export const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    };
};


export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductsStart());
        axios.get( '/products.json' )
            .then( res => {
                const fetchedProducts = [];
                for ( let key in res.data ) {
                    fetchedProducts.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                console.log('action:' + fetchedProducts);
                dispatch(fetchProductsSuccess(fetchedProducts));
            } )
            .catch( err => {
                dispatch(fetchProductsFail(err));
                
            } );
    };
};