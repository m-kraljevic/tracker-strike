import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBw7SptYT2jKo6IblD6zCnjOX1qQPzpf78",
    authDomain: "tracker-strike.firebaseapp.com",
    databaseURL: "https://tracker-strike.firebaseio.com",
    projectId: "tracker-strike",
    storageBucket: "tracker-strike.appspot.com",
    messagingSenderId: "167547322406",
    appId: "1:167547322406:web:86d62186d991dbb6cde6e7"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;