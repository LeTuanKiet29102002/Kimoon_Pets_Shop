// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBPh1skJuDDGdfGPW2o52GNYggA4uwbLpI",
//   authDomain: "longpets-50c17.firebaseapp.com",
//   projectId: "longpets-50c17",
//   storageBucket: "longpets-50c17.appspot.com",
//   messagingSenderId: "558660784736",
//   appId: "1:558660784736:web:0a34eb3780dbd1ba9ee905"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export default app;



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
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
  measurementId: "G-3X477KT57L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;