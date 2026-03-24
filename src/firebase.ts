import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBts9SRSCZBdqX4WYIjl1BGc84_mQO7bLs",
  authDomain: "omnitool-webapp.firebaseapp.com",
  projectId: "omnitool-webapp",
  storageBucket: "omnitool-webapp.firebasestorage.app",
  messagingSenderId: "96123643278",
  appId: "1:96123643278:web:875f974d44b24d4923b0df",
  measurementId: "G-7X8GSX5KSE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
