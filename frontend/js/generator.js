class TeamGenerator {
    constructor() {
        this.players = JSON.parse(localStorage.getItem('players')) || [];
        this.rankings = JSON.parse(localStorage.getItem('rankings')) || {};
        this.initializeUI();
    }

    initializeUI() {
        document.getElementById('generateTeams').addEventListener('click', () => this.generateTeams());
    }

    calculatePlayerAverageRank(playerId) {
        let total = 0;
        let count = 0;
        
        Object.values(this.rankings).forEach(ranking => {
            if (ranking[playerId]) {
                total += ranking[playerId];
                count++;
            }
        });

        return count > 0 ? total / count : 3; // Default to 3 if no rankings
    }

    generateTeams() {
        const teamCount = parseInt(document.getElementById('teamCount').value);
        
        // Calculate average rank for each player
        const playersWithRanks = this.players.map(player => ({
            ...player,
            averageRank: this.calculatePlayerAverageRank(player.id)
        }));

        // Sort players by rank
        playersWithRanks.sort((a, b) => b.averageRank - a.averageRank);

        // Distribute players to teams
        const teams = Array(teamCount).fill().map(() => []);
        
        // Distribute players using snake draft to balance teams
        playersWithRanks.forEach((player, index) => {
            const teamIndex = index % teamCount;
            teams[teamIndex].push(player);
        });

        this.displayTeams(teams);
    }

    displayTeams(teams) {
        const container = document.getElementById('teamResults');
        container.innerHTML = teams.map((team, index) => `
            <div class="team">
                <h3>Team ${index + 1}</h3>
                ${team.map(player => `
                    <div>${player.name} (Avg Rank: ${player.averageRank.toFixed(1)})</div>
                `).join('')}
            </div>
        `).join('');
    }
}

new TeamGenerator(); 