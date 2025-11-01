// تكوين Firebase
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// تهيئة Firebase
try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        console.log("✅ Firebase تم التهيئة بنجاح");
        
        // تهيئة الخدمات
        const auth = firebase.auth();
        const db = firebase.firestore();
        
        // جعلها متاحة عالمياً إذا لزم الأمر
        window.firebaseAuth = auth;
        window.firebaseDb = db;
        
    } else {
        console.error("❌ Firebase غير معرّف - تأكد من تحميل مكتبة Firebase أولاً");
    }
} catch (error) {
    console.error("❌ خطأ في تهيئة Firebase:", error);
}

// دالة للتحقق من حالة Firebase
function checkFirebaseStatus() {
    if (typeof firebase === 'undefined') {
        console.error("🚨 Firebase غير محمل!");
        return false;
    }
    if (!firebase.apps.length) {
        console.error("🚨 تطبيق Firebase غير مهيئ!");
        return false;
    }
    console.log("✅ حالة Firebase جيدة");
    return true;
}

// استدعاء دالة التحقق عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkFirebaseStatus, 1000);
});
