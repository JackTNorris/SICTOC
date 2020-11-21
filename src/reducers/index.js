import {combineReducers} from 'redux';
import ChatReducer from './ChatReducer';
import ChatRoomReducer from './ChatRoomReducer';
import GeolocationReducer from './GeolocationReducer';
export default combineReducers({
  chat: ChatReducer,
  chatRoom: ChatRoomReducer,
  geolocation: GeolocationReducer,
});
