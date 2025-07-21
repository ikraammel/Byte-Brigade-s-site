// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARGllb5keGGQZQhzk3UKu5IrBp9rQV6_4",
  authDomain: "byte-brigade-24.firebaseapp.com",
  projectId: "byte-brigade-24",
  storageBucket: "byte-brigade-24.appspot.com",
  messagingSenderId: "672449477181",
  appId: "1:672449477181:web:1de751d1040ce8b814c854",
  measurementId: "G-LLC8L856BC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };


