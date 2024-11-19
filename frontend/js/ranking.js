class RankingManager {
    constructor() {
        this.players = JSON.parse(localStorage.getItem('players')) || [];
        this.currentRankerId = this.getQueryParam('playerId');
        this.initializeUI();
    }

    getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    initializeUI() {
        const container = document.getElementById('rankingContainer');
        
        this.players.forEach(player => {
            if (player.id != this.currentRankerId) {
                const playerDiv = document.createElement('div');
                playerDiv.className = 'player-ranking';
                playerDiv.innerHTML = `
                    <span>${player.name}</span>
                    <div class="ranking-buttons">
                        ${[1,2,3,4,5].map(num => `
                            <button class="rank-btn" data-player="${player.id}" data-rank="${num}">${num}</button>
                        `).join('')}
                    </div>
                `;
                container.appendChild(playerDiv);
            }
        });

        document.getElementById('submitRankings').addEventListener('click', () => this.submitRankings());
    }

    submitRankings() {
        const rankings = {};
        document.querySelectorAll('.rank-btn.selected').forEach(btn => {
            rankings[btn.dataset.player] = parseInt(btn.dataset.rank);
        });

        // Store rankings in localStorage
        const rankingsData = JSON.parse(localStorage.getItem('rankings')) || {};
        rankingsData[this.currentRankerId] = rankings;
        localStorage.setItem('rankings', JSON.stringify(rankingsData));

        alert('Rankings submitted successfully!');
    }
}

new RankingManager(); 