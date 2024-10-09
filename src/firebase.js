
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCVpTughzvfEuAl0T7Nf6Xi0sntiv-_Lh8',
  authDomain: 'coba-9817d.firebaseapp.com',
  projectId: 'coba-9817d',
  storageBucket: 'coba-9817d.appspot.com',
  messagingSenderId: '186799304426',
  appId: '1:186799304426:web:850fa634354d892a33f193',
  measurementId: 'G-XE7HW4T01G',
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();