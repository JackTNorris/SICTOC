import {UPDATED_LOCATION, UPDATED_NEARBY_STUDENTS} from './types';
import firebase from '../config/firebase';
import Haversine from '../utils/Haversine';
const db = firebase.database();
export const updateLocation = (lat, long) => {
  return {type: UPDATED_LOCATION, payload: {latitude: lat, longitude: long}};
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
            item.val().location.latitude,
            item.val().location.longitude,
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
