// أدوات مساعدة
const utils = {
    // تنسيق الأرقام
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // توليد أرقام عشوائية بنسب ذكية
    smartRandom: (changeCount) => {
        const improvement = Math.min(changeCount * 0.5, 40);
        const chances = {
            low: 60 - improvement,
            medium: 30 + (improvement * 0.6),
            high: 10 + (improvement * 0.4)
        };

        const random = Math.random() * 100;
        
        if (random < chances.low) {
            return Math.floor(Math.random() * 33) + 1; // 1-33
        } else if (random < chances.low + chances.medium) {
            return Math.floor(Math.random() * 34) + 34; // 34-67
        } else {
            return Math.floor(Math.random() * 33) + 68; // 68-100
        }
    },

    // حساب القيمة الفعلية للتعديل
    calculateUpgradeValue: (randomValue, playerLevel) => {
        return Math.round(randomValue * playerLevel * 0.24);
    },

    // تحويل التاريخ إلى تنسيق مقروء
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // إظهار رسالة للمستخدم
    showMessage: (message, type = 'info') => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px;
            border-radius: 8px;
            color: white;
            z-index: 1000;
            font-weight: bold;
            max-width: 300px;
            background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4CAF50' : '#2196F3'};
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
};
