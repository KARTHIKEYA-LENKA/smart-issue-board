import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdNrHpns5WzJKbB-9uhqaVbyDaerXD5g0",
  authDomain: "smart-issue-board-cd57a.firebaseapp.com",
  projectId: "smart-issue-board-cd57a",
  storageBucket: "smart-issue-board-cd57a.firebasestorage.app",
  messagingSenderId: "207122279636",
  appId: "1:207122279636:web:de9767817fecc3ed375f41"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
