// نظام المصادقة
class AuthSystem {
    constructor() {
        this.user = null;
        this.gameApp = new GameApp();
        this.init();
    }

    init() {
        console.log('🔐 تهيئة نظام المصادقة...');
        auth.onAuthStateChanged((user) => {
            console.log('👤 حالة المستخدم:', user ? 'مسجل' : 'غير مسجل');
            this.user = user;
            this.onAuthStateChange(user);
        });
    }

    async register(email, password, displayName) {
        try {
            console.log('📝 إنشاء حساب جديد...');
            const result = await auth.createUserWithEmailAndPassword(email, password);
            await result.user.updateProfile({ displayName });
            
            await this.createPlayerData(result.user.uid, displayName);
            
            return { success: true, user: result.user };
        } catch (error) {
            console.error('❌ خطأ في إنشاء الحساب:', error);
            return { success: false, error: this.getArabicError(error.code) };
        }
    }

    async createPlayerData(userId, displayName) {
        console.log('💾 إنشاء بيانات اللاعب...');
        const playerData = {
            displayName: displayName,
            stats: {
                health: 1000,
                physicalAttack: 100,
                magicalAttack: 80,
                physicalDefense: 80,
                magicalDefense: 60,
                criticalChance: 5,
                speed: 10,
                luck: 5
            },
            resources: {
                dailyCards: 100,
                gold: 500,
                commonStones: 10,
                qualityStones: 5
            },
            gear: {
                helmet: null,
                amulet: null,
                ring: null,
                weapon: null,
                boots: null,
                chest: null
            },
            progress: {
                level: 1,
                totalUpgrades: 0,
                mineEntries: 0,
                lastDailyReset: new Date().toISOString()
            },
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        await db.collection('players').doc(userId).set(playerData);
        console.log('✅ تم إنشاء بيانات اللاعب');
    }

    async login(email, password) {
        try {
            console.log('🔑 تسجيل الدخول...');
            const result = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: result.user };
        } catch (error) {
            console.error('❌ خطأ في تسجيل الدخول:', error);
            return { success: false, error: this.getArabicError(error.code) };
        }
    }

    onAuthStateChange(user) {
        if (user) {
            console.log('✅ المستخدم مسجل الدخول');
            this.gameApp.init(user);
        } else {
            console.log('ℹ️ عرض صفحة الدخول');
            this.showLogin();
        }
    }

    showLogin() {
        document.getElementById('app').innerHTML = `
            <div class="login-container">
                <div class="login-form">
                    <h1>🎮 لعبة الأبطال</h1>
                    <form id="authForm">
                        <input type="email" id="email" placeholder="البريد الإلكتروني" required>
                        <input type="password" id="password" placeholder="كلمة المرور" required>
                        <input type="text" id="displayName" placeholder="اسم اللاعب (للمستخدمين الجدد)">
                        <button type="submit" id="loginBtn">تسجيل الدخول</button>
                        <button type="button" id="registerBtn">إنشاء حساب</button>
                    </form>
                    <div id="authMessage"></div>
                </div>
            </div>
        `;

        this.setupAuthEvents();
    }

    setupAuthEvents() {
        document.getElementById('loginBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('registerBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
    }

    async handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            this.showAuthMessage({ success: false, error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' });
            return;
        }

        const result = await this.login(email, password);
        this.showAuthMessage(result);
    }

    async handleRegister() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const displayName = document.getElementById('displayName').value;
        
        if (!displayName) {
            this.showAuthMessage({ success: false, error: 'يرجى إدخال اسم اللاعب' });
            return;
        }

        if (password.length < 6) {
            this.showAuthMessage({ success: false, error: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
            return;
        }

        const result = await this.register(email, password, displayName);
        this.showAuthMessage(result);
    }

    showAuthMessage(result) {
        const messageDiv = document.getElementById('authMessage');
        if (result.success) {
            messageDiv.innerHTML = '<p class="success">✅ تم بنجاح!</p>';
        } else {
            messageDiv.innerHTML = `<p class="error">❌ ${result.error}</p>`;
        }
    }

    getArabicError(errorCode) {
        const errors = {
            'auth/invalid-email': 'البريد الإلكتروني غير صحيح',
            'auth/user-disabled': 'هذا الحساب معطل',
            'auth/user-not-found': 'المستخدم غير موجود',
            'auth/wrong-password': 'كلمة المرور غير صحيحة',
            'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
            'auth/weak-password': 'كلمة المرور ضعيفة جداً',
            'auth/network-request-failed': 'خطأ في الاتصال بالإنترنت'
        };
        return errors[errorCode] || 'حدث خطأ: ' + errorCode;
    }
}
