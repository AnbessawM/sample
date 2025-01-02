// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0kPGYJ0AZe5mssuyF1OLEeiwedJ8QQzg",
  authDomain: "sample-7b0f2.firebaseapp.com",
  projectId: "sample-7b0f2",
  storageBucket: "sample-7b0f2.firebasestorage.app",
  messagingSenderId: "727574333629",
  appId: "1:727574333629:web:d0e2df65a6e976ce5f4fd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { app, auth };
