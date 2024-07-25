function updateGameMode() {
    const gameMode = document.getElementById('gameMode').value;
    const teamSizeInput = document.getElementById('teamSizeInput');
    const vipInput = document.getElementById('vipInput');
    const hostageInput = document.getElementById('hostageInput');

    // Hide all extra inputs initially
    teamSizeInput.style.display = 'none';
    vipInput.style.display = 'none';
    hostageInput.style.display = 'none';

    if (gameMode === 'teamBattle') {
        teamSizeInput.style.display = 'block';
    } else if (gameMode === 'protectVIP') {
        vipInput.style.display = 'block';
    } else if (gameMode === 'rescueMission') {
        hostageInput.style.display = 'block';
    }
}

function generateTeams() {
    const gameMode = document.getElementById('gameMode').value;
    const numPlayers = parseInt(document.getElementById('numPlayers').value);
    const playerNamesInput = document.getElementById('playerNames').value.trim();
    const spawnPointsInput = document.getElementById('spawnPoints').value.trim();
    const spawnNamesInput = document.getElementById('spawnNames').value.trim();
    
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

    // Game Mode Handling
    const teamDisplay = document.getElementById('teamDisplay');
    teamDisplay.innerHTML = '';

    if (gameMode === 'freeForAll') {
        if (playerNames.length !== spawnPoints) {
            alert('For Free-For-All, the number of spawn points must equal the number of players.');
            return;
        }

        const shuffledPlayers = playerNames.sort(() => Math.random() - 0.5);
        const shuffledSpawns = spawnNames.sort(() => Math.random() - 0.5);

        shuffledPlayers.forEach((player, index) => {
            const spawnPoint = shuffledSpawns[index % shuffledSpawns.length];
            const teamDiv = document.createElement('div');
            teamDiv.classList.add('team');
            teamDiv.innerHTML = `<h2>${player} (Spawn Point: ${spawnPoint})</h2>`;
            teamDisplay.appendChild(teamDiv);
        });

    } else if (gameMode === 'teamBattle') {
        const teamSize = parseInt(document.getElementById('teamSize').value);

        if (isNaN(teamSize) || teamSize < 1) {
            alert('Please enter a valid team size.');
            return;
        }

        const shuffledPlayers = playerNames.sort(() => Math.random() - 0.5);
        const teams = [];

        for (let i = 0; i < shuffledPlayers.length; i += teamSize) {
            teams.push(shuffledPlayers.slice(i, i + teamSize));
        }

        teams.forEach((team, index) => {
            const spawnPoint = spawnNames[index % spawnNames.length];
            const teamDiv = document.createElement('div');
            teamDiv.classList.add('team');
            teamDiv.innerHTML = `<h2>Team ${index + 1} (Spawn Point: ${spawnPoint})</h2><ul>${team.map(player => `<li>${player}</li>`).join('')}</ul>`;
            teamDisplay.appendChild(teamDiv);
        });

    } else if (gameMode === 'protectVIP') {
        if (playerNames.length < 4) {
            alert('Protect the VIP requires at least 4 players.');
            return;
        }

        const vipName = document.getElementById('vip').value.trim();
        if (!vipName || !playerNames.includes(vipName)) {
            alert('Please enter a valid VIP name that is among the players.');
            return;
        }

        const remainingPlayers = playerNames.filter(name => name !== vipName);
        const shuffledPlayers = remainingPlayers.sort(() => Math.random() - 0.5);

        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `<h2>VIP: ${vipName}</h2><h3>Guards</h3><ul>${shuffledPlayers.slice(0, 2).map(player => `<li>${player}</li>`).join('')}</ul><h3>Assassin</h3><ul><li>${shuffledPlayers[2]}</li></ul>`;
        teamDisplay.appendChild(teamDiv);

    } else if (gameMode === 'rescueMission') {
        if (playerNames.length < 4) {
            alert('Rescue Mission requires at least 4 players.');
            return;
        }

        const hostageName = document.getElementById('hostage').value.trim();
        if (!hostageName || !playerNames.includes(hostageName)) {
            alert('Please enter a valid hostage name that is among the players.');
            return;
        }

        const remainingPlayers = playerNames.filter(name => name !== hostageName);
        const shuffledPlayers = remainingPlayers.sort(() => Math.random() - 0.5);

        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team');
        teamDiv.innerHTML = `<h2>Hostage: ${hostageName}</h2><h3>Hostage Taker</h3><ul><li>${shuffledPlayers[0]}</li></ul><h3>Rescuers</h3><ul>${shuffledPlayers.slice(1, 3).map(player => `<li>${player}</li>`).join('')}</ul>`;
        teamDisplay.appendChild(teamDiv);
    }
}
