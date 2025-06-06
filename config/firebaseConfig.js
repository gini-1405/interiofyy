import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: "slack-react-clone-68ab6.firebaseapp.com",
  databaseURL: "https://slack-react-clone-68ab6-default-rtdb.firebaseio.com",
  projectId: "slack-react-clone-68ab6",
  storageBucket: "slack-react-clone-68ab6.appspot.com",
  messagingSenderId: "729110853608",
  appId: "1:729110853608:web:f3f46712f2d386bb9b165d",
  measurementId: "G-73JFFTW0YV",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);