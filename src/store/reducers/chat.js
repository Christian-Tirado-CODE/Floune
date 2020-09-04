import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { notifyAdminOfMessage} from '../actions/chat';


const initialState = {
    chats: [],
    loading: false
};

const fetchUserChatsSuccess = ( state, action ) => {
    console.log('reducer' + action.chats);
    return updateObject( state, {
        chats: action.chats,
        loading: false
    } );
};



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_USER_CHATS_SUCCESS: return fetchUserChatsSuccess(state, action);
        
        default: return state;
    }
};

export default reducer;