// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA902tKfOdGhYvA35ADjsXMXK-1kMQB3OM",
  authDomain: "react-reels-backend.firebaseapp.com",
  projectId: "react-reels-backend",
  storageBucket: "react-reels-backend.appspot.com",
  messagingSenderId: "438564099368",
  appId: "1:438564099368:web:b0801cbb2ef1680e29ac1d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//authenticate user with Firebase
const auth = firebase.auth();

//firestore database
const firestore = firebase.firestore();
//database schema for firestore
const database = {
  users: firestore.collection("users"),
  posts:firestore.collection("posts"),
  comments: firestore.collection("comments"),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
};

const storage = firebase.storage();

export { auth, database, storage };
