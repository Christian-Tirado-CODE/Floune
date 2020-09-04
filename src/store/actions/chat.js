import * as actionTypes from './actionTypes';
import axios from '../../axios/axios';



export const fetchUserChatsSuccess = ( chats ) => {
    return {
        type: actionTypes.FETCH_USER_CHATS_SUCCESS,
        chats: chats
    };
};


export const fetchUserChats = () => {
    return dispatch => {
        
        axios.get( '/chats.json')
            .then( response => {
                
                let fetchedChats = [];
                for(let key in response.data){
                
                    fetchedChats.push({
                        id: key,
                        text:response.data[key].text,
                        room: response.data[key].room
                    });
                }
                console.log('action:' + fetchedChats);
                dispatch(fetchUserChatsSuccess(fetchedChats));
            } )
            .catch( error => {
               console.log(error);
            } );
    };
};