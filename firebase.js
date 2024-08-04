// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA32tHKsrZSHXXODORdxjP2ABbcEZrbSGo",
  authDomain: "inventory-manage-f59c0.firebaseapp.com",
  projectId: "inventory-manage-f59c0",
  storageBucket: "inventory-manage-f59c0.appspot.com",
  messagingSenderId: "784653562856",
  appId: "1:784653562856:web:86735974500424044a2a5d",
  measurementId: "G-3E0MCM31TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
 
export { firestore };