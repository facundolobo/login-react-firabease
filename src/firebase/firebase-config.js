import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCtRldd52G5euPO-oum4txBHU0RbOvuLzA",
    authDomain: "react-login-facundo.firebaseapp.com",
    projectId: "react-login-facundo",
    storageBucket: "react-login-facundo.appspot.com",
    messagingSenderId: "920800058008",
    appId: "1:920800058008:web:301894b4fc0422234a8eed"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  
  
  export {
      db,
      firebase
  }