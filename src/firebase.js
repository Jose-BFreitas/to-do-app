// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf9vjuuEc3BQnGgenv9bm1bul-Fssqt80",
  authDomain: "to-do-app-990.firebaseapp.com",
  projectId: "to-do-app-990",
  storageBucket: "to-do-app-990.appspot.com",
  messagingSenderId: "399822358015",
  appId: "1:399822358015:web:a22107a88917c91b7853ca",
  measurementId: "G-GL2WJHSH4C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const analytics = getAnalytics(app);
