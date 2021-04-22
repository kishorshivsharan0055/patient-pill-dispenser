import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBj1x2aTWjebDEt9njdokoh3swLoh6p28g',
  authDomain: 'pill-dispenser-289e4.firebaseapp.com',
  databaseURL: 'https://pill-dispenser-289e4-default-rtdb.firebaseio.com',
  projectId: 'pill-dispenser-289e4',
  storageBucket: 'pill-dispenser-289e4.appspot.com',
  messagingSenderId: '655973360543',
  appId: '1:655973360543:web:35cfa96ff40a72259cd3aa',
  measurementId: 'G-0W6CY6101L',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, auth};
