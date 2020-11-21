import firebase from '../config/firebase';
import {LOGGED_IN, LOGGED_IN_ERROR} from './types';
import {AsyncStorage} from '@react-native-community/async-storage';
const db = firebase.database();
export const login = (studentID) => {
  return async (dispatch) => {
    try {
      let sID = AsyncStorage.getItem('STUDENTID');
      dispatch({type: LOGGED_IN, payload: sID});
    } catch (error) {
      const ref = await db.ref('/possibleIDs').once('value');
      if (ref.hasChild(studentID)) {
        await AsyncStorage.setItem('STUDENTID', studentID);
        dispatch({type: LOGGED_IN, payload: studentID});
      } else {
        dispatch({type: LOGGED_IN_ERROR});
      }
    }
  };
};

export const checkLoginPersistence = () => {
  return async (dispatch) => {
    try {
      let sID = AsyncStorage.getItem('STUDENTID');
      dispatch({type: LOGGED_IN, payload: sID});
    } catch (error) {}
  };
};
