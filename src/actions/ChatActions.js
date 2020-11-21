import firebase from '../config/firebase';
import {SENT_MESSAGE, RECEIVED_MESSAGE, CLEARED_MESSAGES} from './types';
const db = firebase.database();

export const sendMessage = (chatRoomCode, sender, message) => {
  return async (dispatch) => {
    await db.ref(`/chats/${chatRoomCode}`).push({
      message: message,
      sender: sender,
    });
    return {type: SENT_MESSAGE};
  };
};

export const receiveMessages = (chatRoomCode) => {
  return (dispatch) => {
    db.ref(`/chats/${chatRoomCode}`).on('child_added', (message) => {
      console.log('Added Item');
      dispatch({type: RECEIVED_MESSAGE, payload: message.val()});
    });
  };
};

export const clearMessages = () => {
  return {type: CLEARED_MESSAGES};
};
