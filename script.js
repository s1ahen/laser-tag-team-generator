function generateTeams() {
    // Get input values
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    const playerNamesInput = document.getElementById('playerNames').value.trim();
    const spawnPointsInput = document.getElementById('spawnPoints').value.trim();
    const spawnNamesInput = document.getElementById('spawnNames').value.trim();
    
    // Check if inputs are valid
    if (!playerNamesInput || !spawnPointsInput || !spawnNamesInput) {
        alert('Please fill in all fields.');
        return;
    }
    
    const playerNames = playerNamesInput.split(',').map(name => name.trim()).filter(name => name);
    const spawnPoints = parseInt(spawnPointsInput);

    if (playerNames.length < 2) {
        alert('Please enter at least two player names.');
        return;
    }

    if (spawnPoints < 1) {
        alert('Please enter at least one spawn point.');
        return;
    }

    const spawnNames = spawnNamesInput.split(',').map(name => name.trim()).filter(name => name);

    if (spawnNames.length < spawnPoints) {
        alert('Please enter names for all spawn points.');
        return;
    }

    // Shuffle players
    const shuffledPlayers = playerNames.sort(() => Math.random() - 0.5);

    // Shuffle spawn points
    const shuffledSpawns = spawnNames.sort(() => Math.random() - 0.5);

    // Create teams
    const teams = [];
    for (let i = 0; i < numPlayers; i += 3) {
        const team = shuffledPlayers.slice(i, i + 3);
        teams.push(team);
    }

    // Assign spawn points to teams
    const teamDisplay = document.getElementById('teamDisplay');
    teamDisplay.innerHTML = '';

    teams.forEach((team, index) => {
        const spawnPoint = shuffledSpawns[index % shuffledSpawns.length];
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `<h2>Team ${index + 1} (Spawn Point: ${spawnPoint})</h2><ul>${team.map(player => `<li>${player}</li>`).join('')}</ul>`;
        teamDisplay.appendChild(teamDiv);
    });
}
