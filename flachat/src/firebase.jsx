import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyB_VxwPxeprXLKc40P_pSSEdEI0BW7tAiM',
  authDomain: 'chat-68e74.firebaseapp.com',
  projectId: 'chat-68e74',
  storageBucket: 'chat-68e74.appspot.com',
  messagingSenderId: '188559949568',
  appId: '1:188559949568:web:ed6492b919faeb35cdbde5',
  measurementId: 'G-8PQVT53Z9S',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();