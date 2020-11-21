import {
  UPDATED_LOCATION,
  UPDATED_NEARBY_STUDENTS,
  UPDATED_RADIUS,
} from '../actions/types';

const INITIAL_STATE = {
  latitude: '',
  longitude: '',
  nearbyStudents: [],
  radius: 200,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATED_LOCATION:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATED_NEARBY_STUDENTS:
      return {
        ...state,
        nearbyStudents: action.payload,
      };
    case UPDATED_RADIUS:
      return {
        ...state,
        radius: action.payload,
      };
    default:
      return state;
  }
};
