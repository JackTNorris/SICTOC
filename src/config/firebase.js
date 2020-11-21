import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyAB-1QB4ppX5Bj66Ucm7TabmDp1tFhd5Lc',
  authDomain: 'cercascholar.firebaseapp.com',
  databaseURL: 'https://cercascholar.firebaseio.com',
  projectId: 'cercascholar',
  storageBucket: 'cercascholar.appspot.com',
  messagingSenderId: '1089821103321',
  appId: '1:1089821103321:web:9ea715d6c3807a08c3dac8',
  measurementId: 'G-4XXFH8WDRG',
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase;
