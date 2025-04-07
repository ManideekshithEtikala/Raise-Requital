// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvNsfCfMDoiRkQggRE5rJPRJV6sqIBTrY",
    authDomain: "raiserequital-6c8a9.firebaseapp.com",
    projectId: "raiserequital-6c8a9",
    storageBucket: "raiserequital-6c8a9.firebasestorage.app",
    messagingSenderId: "909662690768",
    appId: "1:909662690768:web:bc4775919fa9de461e2dd5",
    measurementId: "G-9YQ9Q1TBTG"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
