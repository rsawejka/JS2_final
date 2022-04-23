import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDIvoCgqkWkK7RoxFUgUiW3PY_Lg4H-UD4",
  authDomain: "finaldatabase-9c8c9.firebaseapp.com",
  databaseURL: "https://finaldatabase-9c8c9.firebaseio.com",
  projectId: "finaldatabase-9c8c9",
  storageBucket: "finaldatabase-9c8c9.appspot.com",
  messagingSenderId: "680373774504",
  appId: "1:680373774504:web:7b5096fb551da1a0967a9d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();