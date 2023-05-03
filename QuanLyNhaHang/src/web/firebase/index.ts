import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAUyayvv8OyfXUN6bo5ovHqhMHfKWVzpHo',
  authDomain: 'doan-8d7a4.firebaseapp.com',
  databaseURL: 'https://doan-8d7a4-default-rtdb.firebaseio.com',
  projectId: 'doan-8d7a4',
  storageBucket: 'doan-8d7a4.appspot.com',
  messagingSenderId: '283621549036',
  appId: '1:283621549036:web:01372a2a60800c7effd6c9',
  measurementId: 'G-5V35ZVDWWY',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
