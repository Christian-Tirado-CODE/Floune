import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import classes from './Messages.module.css';

const Messages = ({ messages, name, isAdmin}) => (

  <ScrollToBottom className={classes.Messages}>
    {console.log('Messages: ' + isAdmin, messages)}
    {messages.map((message, i) => <div key={i}><Message message={message} name={name} isAdmin={isAdmin}/></div>)}
  </ScrollToBottom>
);

export default Messages;