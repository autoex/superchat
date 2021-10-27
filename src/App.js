import React, {useState, useRef} from 'react';
import './App.css'
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";

import firebase from "firebase/compat";


firebase.initializeApp({
    apiKey: "AIzaSyD2CPpLMIcfvESvWK1kBt34RwxtMmOjof0",
    authDomain: "superchat-d3481.firebaseapp.com",
    databaseURL: "https://superchat-d3481-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "superchat-d3481",
    storageBucket: "superchat-d3481.appspot.com",
    messagingSenderId: "986628952113",
    appId: "1:986628952113:web:56a48557404db8f05a0510"
});


const firestore = firebase.firestore();
const auth = firebase.auth();


const App = () => {
    const [user] = useAuthState(auth)
    return (<div className='App'>
            <header>
<SignOut/>
            </header>
            <section>
                {user ? <ChatRoom/> : <SignIn/>}
            </section>
        </div>
    );
};

const SignIn = () => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
    }
    return (
        <div>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    );
};

const SignOut = () => {
    return auth.currentUser && (
        <button onClick={()=>auth.signOut()}>Sign Ont</button>
    )

}

const ChatRoom = () => {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField: 'id'});
    const [formValue, setFormValue] = useState('');
    const sendMessage = async (e) => {
        e.preventDefault();
        const {uid, photoURL} = auth.currentUser;
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });
        dummy.current.scrollIntoView({behavior: 'smooth'});
        setFormValue('');

    };
    return (
        <>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
                <div ref={dummy}></div>
            </main>
            <form onSubmit={sendMessage}>
                <input type="text" value={formValue} onChange={e => setFormValue(e.target.value)}/>
                <button>Send</button>
            </form>
        </>
    );
};


const ChatMessage = (props) => {
    const {text, uid, photoURL} = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    return (
        <p>
            <div className={`message ${messageClass}`}>
                <img src={photoURL} alt=""/>
                <p>
                    {text}
                </p>
            </div>
        </p>
    );
};


export default App;