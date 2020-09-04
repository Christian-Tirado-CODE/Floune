import React from 'react';

import './ChatInput.module.css';
import classes from './ChatInput.module.css';

const ChatInput = ({ setMessage, sendMessage, message }) => (
  <form className={classes.Form}>
      <div className={classes.ControlsContainer}>
      <input
      className={classes.Input}
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className={classes.SendButton} onClick={e => sendMessage(e)}>Send</button>
      </div>
    
  </form>
)

export default ChatInput;