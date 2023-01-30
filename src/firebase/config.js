// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// lumusika@gmail.com
const firebaseConfig = {
  apiKey: "AIzaSyB9keoE22zeS0ZBdt-52D0Z6JBYocSVljQ",
  authDomain: "react-app-cursos-b3d19.firebaseapp.com",
  projectId: "react-app-cursos-b3d19",
  storageBucket: "react-app-cursos-b3d19.appspot.com",
  messagingSenderId: "909935816098",
  appId: "1:909935816098:web:dbc7965369089f6bf456fb"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDB = getFirestore(firebaseApp)