// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDSZeXa5sbGEy4mAcWRvewzNsIq8RRJmuA',
//   authDomain: 'testing-f13b7.firebaseapp.com',
//   databaseURL: 'https://testing-f13b7-default-rtdb.firebaseio.com',
//   projectId: 'testing-f13b7',
//   storageBucket: 'testing-f13b7.appspot.com',
//   messagingSenderId: '543308361416',
//   appId: '1:543308361416:web:f67e6bc432f16a62fb3ffd',
//   measurementId: 'G-DKHD3J1LGG',
// };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
