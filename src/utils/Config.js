// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7YI7lwyK5hE7aoqTGngD0ledfW97Ftag",
  authDomain: "fluted-citizen-419810.firebaseapp.com",
  projectId: "fluted-citizen-419810",
  storageBucket: "fluted-citizen-419810.appspot.com",
  messagingSenderId: "1018157976055",
  appId: "1:1018157976055:web:256b1c533b57391a27c6f2",
  measurementId: "G-EV73W98LEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };