// نظام اللعبة
class GameApp {
    constructor() {
        this.playerData = null;
    }

    async init(user) {
        console.log('🎮 تحميل بيانات اللاعب...');
        try {
            await this.loadPlayerData(user);
            this.showMainPage();
        } catch (error) {
            console.error('❌ خطأ في تحميل البيانات:', error);
            utils.showMessage('❌ خطأ في تحميل البيانات', 'error');
        }
    }

    async loadPlayerData(user) {
        const doc = await db.collection('players').doc(user.uid).get();
        if (doc.exists) {
            this.playerData = doc.data();
            console.log('✅ تم تحميل بيانات اللاعب');
        } else {
            throw new Error('بيانات اللاعب غير موجودة');
        }
    }

    showMainPage() {
        console.log('✅ عرض الصفحة الرئيسية');
        document.getElementById('app').innerHTML = `
            <div class="main-container">
                <header class="game-header">
                    <h1>🎮 ${this.playerData.displayName}</h1>
                    <button id="logoutBtn">تسجيل الخروج</button>
                </header>
                
                <div class="player-stats">
                    <h2>📊 إحصائياتك</h2>
                    <div class="stats-grid">
                        <div class="stat">❤️ الصحة: ${utils.formatNumber(this.playerData.stats.health)}</div>
                        <div class="stat">⚔️ الهجوم: ${utils.formatNumber(this.playerData.stats.physicalAttack)}</div>
                        <div class="stat">🛡️ الدفاع: ${utils.formatNumber(this.playerData.stats.physicalDefense)}</div>
                        <div class="stat">🎯 الحرج: ${this.playerData.stats.criticalChance}%</div>
                    </div>
                </div>

                <div class="resources">
                    <h2>🎴 البطاقات: ${this.playerData.resources.dailyCards}/100</h2>
                    <h3>💰 الذهب: ${utils.formatNumber(this.playerData.resources.gold)}</h3>
                </div>

                <div class="actions">
                    <button class="action-btn" id="gatesBtn">🎯 البوابات الأربع</button>
                    <button class="action-btn" id="minesBtn">⛏️ المناجم</button>
                    <button class="action-btn" id="gearBtn">⚔️ العتاد</button>
                    <button class="action-btn" id="leaderboardBtn">🏆 المتصدرين</button>
                </div>
            </div>
        `;

        this.setupMainEvents();
    }

    setupMainEvents() {
        document.getElementById('logoutBtn').addEventListener('click', () => {
            auth.signOut();
        });

        document.getElementById('gatesBtn').addEventListener('click', () => {
            utils.showMessage('🎯 نظام البوابات قريباً!', 'info');
        });

        document.getElementById('minesBtn').addEventListener('click', () => {
            utils.showMessage('⛏️ نظام المناجم قريباً!', 'info');
        });

        document.getElementById('gearBtn').addEventListener('click', () => {
            utils.showMessage('⚔️ نظام العتاد قريباً!', 'info');
        });

        document.getElementById('leaderboardBtn').addEventListener('click', () => {
            utils.showMessage('🏆 لوحة المتصدرين قريباً!', 'info');
        });
    }
}
