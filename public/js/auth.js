// نظام المصادقة
class AuthSystem {
    constructor() {
        this.user = null;
        this.init();
    }

    init() {
        // مراقبة حالة المستخدم
        auth.onAuthStateChanged((user) => {
            this.user = user;
            this.onAuthStateChange(user);
        });
    }

    // تسجيل الدخول
    async login(email, password) {
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // إنشاء حساب
    async register(email, password, displayName) {
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password);
            await result.user.updateProfile({ displayName });
            
            // إنشاء بيانات اللاعب الجديد
            await this.createPlayerData(result.user.uid, displayName);
            
            return { success: true, user: result.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // إنشاء بيانات اللاعب الجديد
    async createPlayerData(userId, displayName) {
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
                lastDailyReset: new Date()
            },
            createdAt: new Date(),
            lastLogin: new Date()
        };

        await db.collection('players').doc(userId).set(playerData);
    }

    // تسجيل الخروج
    async logout() {
        try {
            await auth.signOut();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // تحديث حالة المصادقة
    onAuthStateChange(user) {
        const app = document.getElementById('app');
        if (user) {
            // المستخدم مسجل الدخول - عرض اللعبة
            this.showGame();
        } else {
            // المستخدم غير مسجل - عرض صفحة الدخول
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

    showGame() {
        // سيتم تنفيذ هذا في app.js
        window.gameApp.init();
    }
}

// إنشاء instance من نظام المصادقة
const authSystem = new AuthSystem();
