

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCStfJIfKooR4dg-XzED13pfZ9K7NSbMds",
  authDomain: "kiet-kimoonpets.firebaseapp.com",
  databaseURL: "https://kiet-kimoonpets-default-rtdb.firebaseio.com",
  projectId: "kiet-kimoonpets",
  storageBucket: "kiet-kimoonpets.appspot.com",
  messagingSenderId: "894644624846",
  appId: "1:894644624846:web:d6192934b407ef8c705f9f",
  measurementId: "G-3X477KT57L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
