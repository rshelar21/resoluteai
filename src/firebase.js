// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALpYKnWmARZWLiq-_m1Ebd3IEHPvXWirE",
  authDomain: "resoluateai.firebaseapp.com",
  projectId: "resoluateai",
  storageBucket: "resoluateai.appspot.com",
  messagingSenderId: "84301619358",
  appId: "1:84301619358:web:819334fb65e549346f5b8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default db;
export { auth };