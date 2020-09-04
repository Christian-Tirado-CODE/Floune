import React from 'react';
import Aux from '../../../../hoc/Auxialiary'
import classes from './ChatBox.module.css';
import ChatBox from '../../../ChatBox/ChatBox';
import {withRouter} from 'react-router-dom';
const AdminChatBox = (props)=> {
   const room = props.match.params.room;
   console.log(room);

    return (
        
        <ChatBox isAdmin={true}
         roomId={room}
        />
    );
};

export default withRouter(AdminChatBox);