import firebase from '../config/firebase';
import {LOGGED_IN, LOGGED_IN_ERROR} from './types';
import AsyncStorage from '@react-native-community/async-storage';
const db = firebase.database();
export const login = (studentID) => {
  return async (dispatch) => {
    const ref = await db.ref('/possibleIDs').once('value');
    console.log(studentID);
    console.log(ref.hasChild(studentID));
    console.log(ref.val());
    if (ref.hasChild(studentID)) {
      try {
        await AsyncStorage.setItem('STUDENTID', studentID);
        await db.ref(`/users/${studentID}`).set({
          info: {
            id: studentID,
            firstName: 'John',
            lastName: 'Doe',
            age: 0,
            gender: 'M',
            major: 'Computer Science',
            covidStatus: 'Vaccinated',
            interests: ['Sports', 'Videogames'],
            classes: ['PHYS 2074, CSCE 2004, CSCE 2014', 'CHEM 1103'],
          },
          invitedChats: [],
          location: {
            latitude: 0,
            longitude: 0,
          },
          online: false,
          radius: 200,
        });
        dispatch({type: LOGGED_IN, payload: studentID});
      } catch (error) {
        dispatch({type: LOGGED_IN_ERROR});
      }
    } else {
      dispatch({type: LOGGED_IN_ERROR});
    }
  };
};

export const checkLoginPersistence = () => {
  return async (dispatch) => {
    try {
      const ref = await db.ref('/possibleIDs').once('value');
      let sID = await AsyncStorage.getItem('STUDENTID');
      console.log(JSON.stringify('SID IS: ' + sID));
      if (ref.hasChild(sID)) {
        dispatch({type: LOGGED_IN, payload: sID});
      } else {
        dispatch({type: 'nada'});
      }
    } catch (error) {
      dispatch({type: 'nada'});
    }
  };
};
