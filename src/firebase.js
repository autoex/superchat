import firebase from "firebase/compat";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2CPpLMIcfvESvWK1kBt34RwxtMmOjof0",
    authDomain: "superchat-d3481.firebaseapp.com",
    projectId: "superchat-d3481",
    storageBucket: "superchat-d3481.appspot.com",
    messagingSenderId: "986628952113",
    appId: "1:986628952113:web:7dea34b298a68bf65a0510"
};

// Initialize Firebase
export const fire = firebase.initializeApp(firebaseConfig);