import {
  CREATED_ROOM,
  DESTROYED_ROOM,
  JOINED_ROOM,
  JOINED_ROOM_ERROR,
} from '../actions/types';
import randomString from '../utils/Random';
const INITIAL_STATE = {
  chatRoomCode: '',
  inRoom: false,
  uniqueID: '',
  chatRoomsToDelete: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATED_ROOM:
      let chatRoomsToDelete = [...state.chatRoomsToDelete];
      chatRoomsToDelete.push(action.payload);
      return {
        ...state,
        chatRoomCode: action.payload,
        inRoom: true,
        uniqueID: randomString(10),
        chatRoomsToDelete: chatRoomsToDelete,
      };
    case DESTROYED_ROOM:
      let chatRoomCodestoDelete = state.chatRoomsToDelete.filter(
        (c) => c !== action.payload,
      );
      return {
        ...state,
        chatRoomCode: '',
        inRoom: false,
        chatRoomsToDelete: chatRoomCodestoDelete,
      };
    case JOINED_ROOM:
      return {
        ...state,
        chatRoomCode: action.payload,
        inRoom: true,
        uniqueID: randomString(10),
      };
    case JOINED_ROOM_ERROR:
      return {...state, errorMessage: "Can't join room", inRoom: false};
    default:
      return state;
  }
};
