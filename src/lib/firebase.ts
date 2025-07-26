import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "connectsphere-gj634",
  appId: "1:956771297930:web:5bc3357090f8e733179b73",
  storageBucket: "connectsphere-gj634.firebasestorage.app",
  apiKey: "AIzaSyDPxp5L9ws89_XTR9cVmWFS8TaGltbC8Lg",
  authDomain: "connectsphere-gj634.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "956771297930",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
