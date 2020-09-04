import React from 'react';

import classes from './Message.module.css';

//import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name, isAdmin }) => {
  let isSentByCurrentUser = false;



  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className={[classes.MessageContainer, classes.JustifyEnd].join(' ')}>
          <p className={[classes.SentText, classes.Pr10].join(' ')}>{trimmedName}</p>
          <div className={[classes.MessageBox, classes.BackgroundBlue].join(' ')}>
            <p className={[classes.MessageText,classes.ColorWhite].join(' ')}>{/*ReactEmoji.emojify(text)*/ text}</p>
          </div>
        </div>
        )
        : (
          <div className={[classes.MessageContainer, classes.JustifyStart].join(' ')}>
            <div className={[classes.MessageBox, classes.BackgroundLight].join(' ')}>
              <p className={[classes.MessageText,classes.ColorDark].join(' ')}>{/*ReactEmoji.emojify(text)*/ text}</p>
            </div>
            
        <p className={[classes.SentText,classes.Pl10].join(' ')}>{!isAdmin ? 'admin' : 'user'}</p>
          </div>
        )
  );
}

export default Message;