import firebase from '../config/firebase';
import {
  CREATED_ROOM,
  JOINED_ROOM,
  DESTROYED_ROOM,
  JOINED_ROOM_ERROR,
} from './types';
const db = firebase.database();

export const createRoom = (askerID, nearbyStudentID) => {
  return async (dispatch) => {
    const ref = await db.ref('/chats').push();
    const key = ref.key;
    //we'll see
    ref.update({participants: 1});
    await ref.push({
      sender: 'server',
      message: `Hello! Welcome to Chattie! Your room code is: ${key}`,
    });
    await db.ref(`/users/${nearbyStudentID}/invitedChats`).update([
      {
        requestID: askerID,
        roomCode: key,
      },
    ]);
    dispatch({type: CREATED_ROOM, payload: key});
  };
};

export const destroyRoom = (chatRoomCode) => {
  return async (dispatch) => {
    await db.ref(`/chats/${chatRoomCode}`).off('child_added');
    dispatch({type: DESTROYED_ROOM});
  };
};

export const joinRoom = (chatRoomCode) => {
  return async (dispatch) => {
    const ref = await db.ref('/chats').once('value');
    if (ref.hasChild(chatRoomCode)) {
      dispatch({type: JOINED_ROOM, payload: chatRoomCode});
    } else {
      dispatch({type: JOINED_ROOM_ERROR});
    }
  };
};
