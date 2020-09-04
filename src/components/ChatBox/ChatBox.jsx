import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import axios from '../../axios/axios';
import Aux from '../../hoc/Auxialiary';
import ChatInput from './ChatInput/ChatInput';
import InfoBar from './InfoBar/InfoBar';
import classes from './ChatBox.module.css';
import Messages from './Messages/Messages';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

let socket;

const Chat = React.memo(({ location , isAdmin, roomId, render}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showChatBox, setShowChatBox] = useState(false);
  const ENDPOINT = 'https://floune.herokuapp.com/';
  const token = JSON.stringify(localStorage.getItem('token')).replace(/"/g, '');
  const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length)
  const userId = JSON.stringify(localStorage.getItem('userId')).replace(/"/g, '');
  let chatRoom;


  if(localStorage.getItem('room')){
    chatRoom = JSON.stringify(localStorage.getItem('room'))
  } else {
    chatRoom = generateRandomString().replace(/"/g, '');
    localStorage.setItem('room', chatRoom);
  }
  useEffect(() => {
    let name = 'You';
    let room;
   
    if(isAdmin){
      name='admin';
      room = roomId;
      setName(name);
      setRoom(room);
     
    } else {
      room = chatRoom;
      setName(name);
      setRoom(room);
    }

  
    
    socket = io(ENDPOINT);

    
    
    if(room){
      
      socket.emit('join', { name, room }, (error) => {

      if(error) {
        alert(error);
      }
    });
  }
  }, [ENDPOINT, userId]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
      // send only the first message: the userId and text 
      
    });


    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  const notifyAdminOfMessage = () => {
   
    if(messages.length === 2 && message === ''){
      console.log('notifyAdminOfMessage()');
      console.log(room, messages[1].text);
      const data = {text: messages[1].text, room: room};
      
      
      axios.put( `/chats/${room}.json`, data)
      .then( response => {
          
          
      } )
      .catch( error => {
         console.log(error);
      } );
    }
  }


  
  notifyAdminOfMessage();
  const content = showChatBox ? (
    <div className={classes.Container}>
    <InfoBar room={room} closeBox={setShowChatBox}/>
   <Messages messages={messages} name={name} isAdmin={isAdmin}/>
   <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage}/>
</div>
  ) : <div className={classes.MessageIconContainer} onClick={()=> setShowChatBox(true)}>
        <FontAwesomeIcon icon="comments"
         style={{color: "white", fontSize: "30px", position: "relative", top: "20",left: "20"}}/>
  </div>

    
  return (
          <Aux>
            {isAdmin ? 
             <div className={classes.CenterContent}>
             <InfoBar room={room} closeBox={setShowChatBox}/>
            <Messages messages={messages} name={name} isAdmin={isAdmin} />
            <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage}/>
         </div>    : 
            content}
            
          </Aux>
  );
})

export default Chat;


