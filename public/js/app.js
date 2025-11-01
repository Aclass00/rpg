// التطبيق الرئيسي
class GameApp {
    constructor() {
        this.playerData = null;
        this.init();
    }

    async init() {
        if (authSystem.user) {
            await this.loadPlayerData();
            this.showMainPage();
        }
    }

    async loadPlayerData() {
        try {
            const doc = await db.collection('players').doc(authSystem.user.uid).get();
            if (doc.exists) {
                this.playerData = doc.data();
                this.checkDailyReset();
            }
        } catch (error) {
            console.error('Error loading player data:', error);
        }
    }

    // التحقق من إعادة تعيين البطاقات اليومية
    checkDailyReset() {
        const now = new Date();
        const lastReset = new Date(this.playerData.progress.lastDailyReset);
        
        if (this.isNewDay(lastReset, now)) {
            this.resetDailyCards();
        }
    }

    isNewDay(date1, date2) {
        return date1.getDate() !== date2.getDate() || 
               date1.getMonth() !== date2.getMonth() || 
               date1.getFullYear() !== date2.getFullYear();
    }

    async resetDailyCards() {
        this.playerData.resources.dailyCards = 100;
        this.playerData.progress.lastDailyReset = new Date();
        await this.savePlayerData();
    }

    async savePlayerData() {
        try {
            await db.collection('players').doc(authSystem.user.uid).update(this.playerData);
        } catch (error) {
            console.error('Error saving player data:', error);
        }
    }

    showMainPage() {
        document.getElementById('app').innerHTML = `
            <div class="main-container">
                <header class="game-header">
                    <h1>🎮 ${this.playerData.displayName}</h1>
                    <button id="logoutBtn">تسجيل الخروج</button>
                </header>
                
                <div class="player-stats">
                    <h2>📊 إحصائياتك</h2>
                    <div class="stats-grid">
                        <div class="stat">❤️ الصحة: ${this.playerData.stats.health}</div>
                        <div class="stat">⚔️ الهجوم: ${this.playerData.stats.physicalAttack}</div>
                        <div class="stat">🛡️ الدفاع: ${this.playerData.stats.physicalDefense}</div>
                        <div class="stat">🎯 الحرج: ${this.playerData.stats.criticalChance}%</div>
                    </div>
                </div>

                <div class="resources">
                    <h2>🎴 البطاقات: ${this.playerData.resources.dailyCards}/100</h2>
                    <h3>💰 الذهب: ${this.playerData.resources.gold}</h3>
                </div>

                <div class="actions">
                    <button class="action-btn" onclick="gameApp.showGates()">🎯 البوابات الأربع</button>
                    <button class="action-btn" onclick="gameApp.showMines()">⛏️ المناجم</button>
                    <button class="action-btn" onclick="gameApp.showGear()">⚔️ العتاد</button>
                    <button class="action-btn" onclick="gameApp.showLeaderboard()">🏆 المتصدرين</button>
                </div>
            </div>
        `;

        this.setupMainEvents();
    }

    setupMainEvents() {
        document.getElementById('logoutBtn').addEventListener('click', () => {
            authSystem.logout();
        });
    }

    showGates() {
        // سيتم تنفيذ هذا لاحقاً
        alert('🎯 نظام البوابات قريباً!');
    }

    showMines() {
        alert('⛏️ نظام المناجم قريباً!');
    }

    showGear() {
        alert('⚔️ نظام العتاد قريباً!');
    }

    showLeaderboard() {
        alert('🏆 لوحة المتصدرين قريباً!');
    }
}

// تهيئة التطبيق عند تحميل الصفحة
let gameApp;
document.addEventListener('DOMContentLoaded', () => {
    gameApp = new GameApp();
});
