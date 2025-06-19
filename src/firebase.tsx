// firebaseConfig.js or firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAccEMLG-owYzMTcrucQOBrlB0h1vrsPjI",
  authDomain: "esnan-digital-10a7b.firebaseapp.com",
  databaseURL: "https://esnan-digital-10a7b-default-rtdb.firebaseio.com",
  projectId: "esnan-digital-10a7b",
  storageBucket: "esnan-digital-10a7b.firebasestorage.app",
  messagingSenderId: "507967480135",
  appId: "1:507967480135:web:36f6da99c18c0feb55ac62",
  measurementId: "G-29RZH2JRDB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export    {storage} ;
