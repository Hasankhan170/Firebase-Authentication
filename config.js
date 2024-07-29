import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
 
 const firebaseConfig = {
   apiKey: "AIzaSyCdBY-uSfyHegP4lgbgpPUjl8udnzWDecs",
   authDomain: "fir-authentication-9f772.firebaseapp.com",
   projectId: "fir-authentication-9f772",
   storageBucket: "fir-authentication-9f772.appspot.com",
   messagingSenderId: "744029323114",
   appId: "1:744029323114:web:8f11edf2e6775d63a4ef13",
   measurementId: "G-ZKSQH73R88"
 };

 const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);