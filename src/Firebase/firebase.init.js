// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk1ZzCohoxjlPll7L91cvbR5zRst9nA_0",
  authDomain: "krishilink-01.firebaseapp.com",
  projectId: "krishilink-01",
  storageBucket: "krishilink-01.firebasestorage.app",
  messagingSenderId: "88749125416",
  appId: "1:88749125416:web:01d64a6fe540d7f17f6a1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);