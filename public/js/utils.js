// أدوات مساعدة
const utils = {
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    smartRandom: (changeCount) => {
        const improvement = Math.min(changeCount * 0.5, 40);
        const chances = {
            low: 60 - improvement,
            medium: 30 + (improvement * 0.6),
            high: 10 + (improvement * 0.4)
        };

        const random = Math.random() * 100;
        
        if (random < chances.low) {
            return Math.floor(Math.random() * 33) + 1;
        } else if (random < chances.low + chances.medium) {
            return Math.floor(Math.random() * 34) + 34;
        } else {
            return Math.floor(Math.random() * 33) + 68;
        }
    },

    calculateUpgradeValue: (randomValue, playerLevel) => {
        return Math.round(randomValue * playerLevel * 0.24);
    },

    formatDate: (date) => {
        return new Date(date).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    showMessage: (message, type = 'info') => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = message;
        messageDiv.style.background = type === 'error' ? '#f44336' : type === 'success' ? '#4CAF50' : '#2196F3';
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
};
