function setPlayerCount(count) {
    const playerNamesDiv = document.getElementById('player-names');
    playerNamesDiv.innerHTML = ''; // Clear existing inputs
    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Player ${i + 1} Name`;
        playerNamesDiv.appendChild(input);
    }
}

function setSpawnPointInputs() {
    const spawnPointsCount = parseInt(document.getElementById('spawn-points-count').value) || 0;
    const spawnPointsDiv = document.getElementById('spawn-points-names');
    spawnPointsDiv.innerHTML = ''; // Clear existing inputs
    for (let i = 0; i < spawnPointsCount; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Spawn Point ${i + 1} Name`;
        spawnPointsDiv.appendChild(input);
    }
}

function generateTeams() {
    const playerNames = Array.from(document.querySelectorAll('#player-names input'))
        .map(input => input.value)
        .filter(name => name);
    const spawnPoints = Array.from(document.querySelectorAll('#spawn-points-names input'))
        .map(input => input.value)
        .filter(name => name);

    if (playerNames.length < 2 || spawnPoints.length < 1) {
        alert('Please enter at least two player names and at least one spawn point.');
        return;
    }

    // Shuffle players and spawn points
    const shuffledPlayers = playerNames.sort(() => Math.random() - 0.5);
    const shuffledSpawnPoints = spawnPoints.sort(() => Math.random() - 0.5);

    // Divide players into two teams
    const team1 = shuffledPlayers.slice(0, Math.ceil(shuffledPlayers.length / 2));
    const team2 = shuffledPlayers.slice(Math.ceil(shuffledPlayers.length / 2));

    // Randomly assign spawn points to each team
    const team1SpawnPoint = shuffledSpawnPoints[0];
    const team2SpawnPoint = shuffledSpawnPoints[1] || 'Not Assigned'; // Handle case where there's only one spawn point

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="team">
            <h2>Team 1</h2>
            <p>${team1.join('<br>')}</p>
            <p><strong>Spawn Point:</strong> ${team1SpawnPoint}</p>
        </div>
        <div class="team">
            <h2>Team 2</h2>
            <p>${team2.join('<br>')}</p>
            <p><strong>Spawn Point:</strong> ${team2SpawnPoint}</p>
        </div>
        <div class="team">
            <h2>Available Spawn Points</h2>
            ${shuffledSpawnPoints.map((point, index) => `<p>Spawn Point ${index + 1}: ${point}</p>`).join('')}
        </div>
    `;
}

