// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAjfPHpR3ZnsThRcvEXP-ELydjfGfesfyA',
  authDomain: 'nutritely-6e10c.firebaseapp.com',
  projectId: 'nutritely-6e10c',
  storageBucket: 'nutritely-6e10c.appspot.com',
  messagingSenderId: '335876420068',
  appId: '1:335876420068:web:e8e544e978843188d417f1',
  measurementId: 'G-FJWQ2RCWKZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
