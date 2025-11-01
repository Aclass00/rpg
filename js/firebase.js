// إعدادات Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBQIcqbTtJY0xoaeL2FN1L-Zf5IGw59H3w",
    authDomain: "rpg-browser-game-ece4b.firebaseapp.com",
    databaseURL: "https://rpg-browser-game-ece4b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rpg-browser-game-ece4b",
    storageBucket: "rpg-browser-game-ece4b.firebasestorage.app",
    messagingSenderId: "609571218561",
    appId: "1:609571218561:web:7c92d009bac5a047c2d980",
    measurementId: "G-EK6K14SXM7"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// المراجع الأساسية
const auth = firebase.auth();
const db = firebase.firestore();

console.log('✅ Firebase configured successfully!');
