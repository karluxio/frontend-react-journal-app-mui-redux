// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// console.log(import.meta.env);
// const env = getEnvironments()
// console.log(env);

// Your web app's Firebase configuration

// karlux.sistemas@gmail.com free plan exceeded
// const firebaseConfig = {
//   apiKey: "AIzaSyCmDg-dfdvFSVG9hHYoa8D8KR-2X_E5pSs",
//   authDomain: "react-journal-app-749da.firebaseapp.com",
//   projectId: "react-journal-app-749da",
//   storageBucket: "react-journal-app-749da.appspot.com",
//   messagingSenderId: "982469049834",
//   appId: "1:982469049834:web:7955ecac9354292546c693"
// };

// lumusika@gmail.com - Prod
// const firebaseConfig = {
//   apiKey: "AIzaSyB9keoE22zeS0ZBdt-52D0Z6JBYocSVljQ",
//   authDomain: "react-app-cursos-b3d19.firebaseapp.com",
//   projectId: "react-app-cursos-b3d19",
//   storageBucket: "react-app-cursos-b3d19.appspot.com",
//   messagingSenderId: "909935816098",
//   appId: "1:909935816098:web:dbc7965369089f6bf456fb"
// };

// karlux.sistemas@gmail.com - testing
// const firebaseConfig = {
//   apiKey: "AIzaSyBAbbWEYmfGzFJyvrHCf1K6XoybGJsZnUo",
//   authDomain: "testing-journal-app-db.firebaseapp.com",
//   projectId: "testing-journal-app-db",
//   storageBucket: "testing-journal-app-db.appspot.com",
//   messagingSenderId: "846045832216",
//   appId: "1:846045832216:web:2f93fbf77ac145d21d0f6d"
// };

const {
  VITE_API_KEY,
  VITE_AUTH_DOMAIN,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
} = getEnvironments()

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDB = getFirestore(firebaseApp)