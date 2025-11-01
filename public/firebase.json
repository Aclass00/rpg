// إعدادات Firebase - استخدم الإعدادات الخاصة بك
const firebaseConfig = {
    apiKey: "AIZaSyB0IccqbTtJV8xoael2FN1L-Zf5IGW59H3w",
    authDomain: "rpg-browser-game-ece4b.firebaseapp.com",
    projectId: "rpg-browser-game-ece4b",
    storageBucket: "rpg-browser-game-ece4b.firebasestorage.app",
    messagingSenderId: "609571218561",
    appId: "1:609571218561:web:7c92d009bac5a047c2d980"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// المراجع الأساسية
const auth = firebase.auth();
const db = firebase.firestore();

console.log('✅ Firebase configured successfully!');

// دالة للحصول على إعدادات اللعبة
async function getGameSettings() {
    try {
        const doc = await db.collection('gameSettings').doc('config').get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error('Error getting game settings:', error);
        return null;
    }
}
