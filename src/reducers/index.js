import {combineReducers} from 'redux';
import ChatReducer from './ChatReducer';
import ChatRoomReducer from './ChatRoomReducer';
export default combineReducers({
  chat: ChatReducer,
  chatRoom: ChatRoomReducer,
});
