import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';

export const purchaseItemsSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.PURCHASE_ITEMS_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseItemsFail = ( error ) => {
    return {
        type: actionTypes.PURCHASE_ITEMS_FAIL,
        error: error
    };
}

export const purchaseItemsStart = () => {
    return {
        type: actionTypes.PURCHASE_ITEMS_START
    };
};

export const purchaseItems = ( orderData, token, uuid) => {
    return dispatch => {
        dispatch( purchaseItemsStart() );
        axios.put( `/orders/${uuid}.json?auth=` + token, orderData )
            .then( response => {
                console.log( response.data );
                dispatch( purchaseItemsSuccess( response.data.name, orderData ) );
            } )
            .catch( error => {
                dispatch( purchaseItemsFail( error ) );
            } );
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId+ '"';
        axios.get( '/orders.json' + queryParams)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};
export const fetchOrdersToAdmin = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        
        axios.get( '/orders.json?auth='+ token)
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};

export const changeOrderStatus = (orders, token, id, status) => {
   return dispatch => {
    let updatedOrder = null;
    for(let key in orders){
        if(orders[key].id === id){
            updatedOrder = orders[key];
        }
    }
    updatedOrder.status = status;
     console.log('changeOrderStatus');
    axios.put(`/orders/${id}.json?auth=` + token, updatedOrder)
    .then(res => console.log(res));
   }
};