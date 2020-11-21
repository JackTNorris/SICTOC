import {
  UPDATED_LOCATION,
  UPDATED_NEARBY_STUDENTS,
  STOPPED_UPDATING,
} from './types';
import firebase from '../config/firebase';
import Haversine from '../utils/Haversine';
const db = firebase.database();
export const updateLocation = (lat, long, studentID) => {
  return async (dispatch) => {
    db.ref(`/users/${studentID}`).update({
      location: {
        latitude: lat,
        longitude: long,
      },
      online: true,
    });
    dispatch({
      type: UPDATED_LOCATION,
      payload: {latitude: lat, longitude: long},
    });
  };
};
export const updateNearbyStudents = (lat, long) => {
  return async (dispatch) => {
    db.ref('/users')
      .once('value')
      .then((snapshot) => {
        let nearbyStudents = [];
        snapshot.forEach((item) => {
          let distanceBetween = Haversine(
            lat,
            long,
            item.val()?.location?.latitude,
            item.val()?.location?.longitude,
          );
          //less thatn 2000 ft
          if (distanceBetween < 2000) {
            nearbyStudents.push(item.val());
          }
        });
        dispatch({type: UPDATED_NEARBY_STUDENTS, payload: nearbyStudents});
      });
  };
};

export const stopUpdating = (studentID) => {
  return async (dispatch) => {
    db.ref(`/users/${studentID}`).update({
      online: false,
    });
    dispatch({type: STOPPED_UPDATING, payload: {}});
  };
};
