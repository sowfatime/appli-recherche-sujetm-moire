// import firebase from 'firebase/app';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrWtMAiuA8SAFRBiOmyllBD7AVylcekN4",
  authDomain: "mon-premier-projet-fireb-10252.firebaseapp.com",
  projectId: "mon-premier-projet-fireb-10252",
  storageBucket: "mon-premier-projet-fireb-10252.appspot.com",
  messagingSenderId: "10128445868",
  appId: "1:10128445868:web:47ada908e6c43822b1aa09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };



