import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
  apiKey: "AIzaSyA00ZgmXjfAyvlqhMsohkrtyPm21_mLUv0",

  authDomain: "sujetmemoire-ae626.firebaseapp.com",

  projectId: "sujetmemoire-ae626",

  storageBucket: "sujetmemoire-ae626.appspot.com",

  messagingSenderId: "371096323926",

  appId: "1:371096323926:web:ca8ea732e584b69a92b8f7",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
