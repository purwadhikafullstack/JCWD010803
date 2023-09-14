import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAT6SrzBfHbxy6jWEKgxQYdn66RBGdHKis",
    authDomain: "final-project-9a51e.firebaseapp.com",
    projectId: "final-project-9a51e",
    storageBucket: "final-project-9a51e.appspot.com",
    messagingSenderId: "242884867093",
    appId: "1:242884867093:web:0f40897357bb6be732ca1c",
    measurementId: "G-33BF277N3F"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export default auth

export const googleAuth = async () => {
    const userAuth = await signInWithPopup(auth, provider)
    return userAuth;
}