import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCZsoZuE77iSyIAntaouQreUGbe8za4bZ4",
  authDomain: "e-commerce-bcbd9.firebaseapp.com",
  projectId: "e-commerce-bcbd9",
  storageBucket: "e-commerce-bcbd9.firebasestorage.app",
  messagingSenderId: "382049739392",
  appId: "1:382049739392:web:3d006c652b3cddd8bf3c65",
  measurementId: "G-YQEF1C2YPG"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;