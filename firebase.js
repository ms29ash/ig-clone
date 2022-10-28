// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDctJjCiHMmkEcKSnMb0S-Pr06eao1g00Q",
  authDomain: "rn-instagram-53cb8.firebaseapp.com",
  projectId: "rn-instagram-53cb8",
  storageBucket: "rn-instagram-53cb8.appspot.com",
  messagingSenderId: "1033541287959",
  appId: "1:1033541287959:web:7b7fde8aa25fd0e137dc52",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authentication Firebase
const auth = getAuth(app);

//Firebase firestore
const db = getFirestore(app);

export { app, auth, db };
