import React, { Component } from 'react';
import Aux from '../../../hoc/Auxialiary';
import classes from './Chats.module.css';
import ChatInfo from './ChatInfo/ChatInfo';
import {withRouter} from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import axios from '../../../axios/axios';

class Chats extends Component {


    componentDidMount(){
        this.props.onFetchUserChats();
    }


displayChatBox = (id)=> {
    this.props.history.push(this.props.location.pathname + '/chat-box/' + id);
   
   
}

deleteProductHandler = (id)=> {
    axios.delete(`/chats/${id}.json`)
.then(res => {
console.log(res);
    
})
.catch(error => console.log(error))

}
    
    render(){
        
        
        console.log('chats: ' + this.props.chats);
        const chatList = this.props.chats.map(chat => {
            /* let style= {
                backgroundImage: `url(../../img/${product.imageLink})`,
                
                
            }; */
            
            

            return (
            <ChatInfo
                key={chat.room}
                room={chat.room}
                message={chat.text}
                click={this.displayChatBox}
                delete={this.deleteProductHandler}
            />);
    });



    

    return (
        <Aux>
            <h2 className={classes.Title}>Help Chats</h2>
            <div className={classes.Chats}>
            {chatList}
            </div>
            
        </Aux>
            
        
    );




    }
}   

const mapStateToProps = state => {
    return {
        chats: state.chat.chats
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserChats: () => dispatch(actions.fetchUserChats())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Chats));