import {
  SENT_MESSAGE,
  RECEIVED_MESSAGE,
  CLEARED_MESSAGES,
} from '../actions/types';

const INITIAL_STATE = {
  messages: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SENT_MESSAGE:
      return {...state};
    case RECEIVED_MESSAGE:
      return {...state, messages: [...state.messages, action.payload]};
    case CLEARED_MESSAGES:
      return {...state, messages: []};
    default:
      return state;
  }
};
