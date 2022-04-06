//migrated to version 9




//-----version 9 modular style import

import { initializeApp } from "firebase/app"
import {getAuth} from 'firebase/auth';
import { getFirestore, collection, getDoc, query, where, getDocs } from 'firebase/firestore';


//------version 9 compat imports

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

//------pre-version 9 import - DOES NOT WORK ANYMORE

// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/database';
// import 'firebase/storage';
// import 'firebase/messaging';



// Fill this in with your firebase details - instructions:
// https://support.google.com/firebase/answer/7015592
const config = {
  apiKey: "AIzaSyDsAdMU_mrLV25NAyYJchNsHQQOkmVtJgU",
  authDomain: "fir-project-714af.firebaseapp.com",
  projectId: "fir-project-714af",
  storageBucket: "fir-project-714af.appspot.com",
  messagingSenderId: "313180306855",
  appId: "1:313180306855:web:d854c478e3b5cf69e5ca82",
  measurementId: "G-7G2CBL0F29"
};

//-----Initialize Firebase for version 9----------------------------------

const app = initializeApp(config);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);

// firestore init services
export const firestoreDB = getFirestore(app);

// firestore collection ref
export const userRef = collection(firestoreDB, "Users");



//-----Initialize Firebase for version 8----------------------------------

// !firebase.apps.length ? firebase.initializeApp(config) : '';

// export const auth = firebase.auth();
// export const persistencetype = firebase.auth.Auth.Persistence.LOCAL;

// Comment this out if not using local emulator
// firebase.firestore().settings({
//   host: 'localhost:8080',
//   ssl: false,
// });

//Specify the link to firestoreDB collection that you will be using, feel free to change, add, delete.
// export const firestoreDB = firebase.firestore()

// export const storage = firebase.app().storage('gs://YOUR_BUCKET_HERE');
// export const messaging = firebase.messaging();
// // Set VAPID KEY
// messaging.usePublicVapidKey(
//   'BDYE2EYHdIp8qHjTKcJYPvO4PgaAH2pSruP55FOtNs5jWsgdeg7YK6OgJ0daSu21kN7aSzU19NRXRqC4bfITZYQ'
// );
// export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
// export const FacebookProvider = new firebase.auth.FacebookAuthProvider()
// export const LinkedInProvider = new firebase.auth.OAuthProvider('linkedin.com');
// LinkedInProvider.addScope('r_liteprofile');
// LinkedInProvider.addScope('r_emailaddress');

// export default firebase;
