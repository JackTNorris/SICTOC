import {
  UPDATED_LOCATION,
  UPDATED_NEARBY_STUDENTS,
  STOPPED_UPDATING,
  UPDATED_RADIUS,
} from './types';
import firebase from '../config/firebase';
import Haversine from '../utils/Haversine';
const db = firebase.database();

export const updateLocation = (lat, long, studentID) => {
  return async (dispatch) => {
    try {
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
    } catch (error) {
      dispatch({type: 'none'});
    }
  };
};
export const updateNearbyStudents = (lat, long, rad, studentID) => {
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
          let nearbyStudentRadiusCriteria = item.val().radius;
          //less thatn 2000 ft
          if (
            distanceBetween <= rad &&
            distanceBetween <= nearbyStudentRadiusCriteria &&
            studentID !== item.key //&&
            //item.val().online === true
          ) {
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

export const updatedRadius = (studentID, radius) => {
  return async (dispatch) => {
    try {
      db.ref(`/users/${studentID}`).update({
        radius: radius,
      });
      dispatch({type: UPDATED_RADIUS, payload: radius});
    } catch (error) {
      dispatch({type: 'none'});
    }
  };
};
