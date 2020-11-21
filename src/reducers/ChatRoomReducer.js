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
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATED_ROOM:
      return {
        ...state,
        chatRoomCode: action.payload,
        inRoom: true,
        uniqueID: randomString(10),
      };
    case DESTROYED_ROOM:
      return {
        ...state,
        chatRoomCode: '',
        inRoom: false,
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
