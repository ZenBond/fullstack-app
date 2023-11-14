const teamBtn = document.querySelector('.all-teams')
const playerBtn = document.querySelector('.all-players')
const playerIndex = document.querySelector('#player-index')
const teamIndex = document.querySelector('#team-index')
const createTeam = document.querySelector('#create-team')
const createPlayer = document.querySelector('#create-player')
const createPlayerBox = document.querySelector('#create-player-box')
const createTeamBox = document.querySelector('#create-team-box')
const deletePlayer = document.querySelector('#delete-player')
const updatePlayer = document.querySelector('#update-player')
const updatePlayerBtn = document.querySelector('#update-btn')
const updateBox = document.querySelector('#update-box')
const updateTeamBtn = document.querySelector('#teamupdate-btn')
const updateTeam = document.querySelector('#update-team')
const allTeams = document.querySelector('#all-teams-box')
const allPlayers = document.querySelector('#all-players-box')
const playerIndexBox = document.querySelector('#player-index-box')
const teamIndexBox = document.querySelector('#team-index-box')
const deletePlayerBox = document.querySelector('#delete-player-box')
const deleteTeamBox = document.querySelector('#delete-team-box')
const deleteTeamBtn = document.querySelector('#delete-team')

let isTeamTableVisible = false;
let isPlayerTableVisible = false;
const getAllTeamData = () => {
    if (isTeamTableVisible) {
        allTeams.innerHTML = '';
        isTeamTableVisible = false;
    } else {

        $.get(`http://localhost:8000/api/team`, (data) => {
            const table = document.createElement('table');
            table.border = '2';
            const headerRow = table.insertRow();
            headerCell1 = headerRow.insertCell(0)
            headerCell2 = headerRow.insertCell(1)
            headerCell3 = headerRow.insertCell(2)
            headerCell1.textContent = 'Team ID'
            headerCell2.textContent = 'City'
            headerCell3.textContent = 'Team Name'
            
            data.forEach((team) => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0)
                const cell2 = row.insertCell(1)
                const cell3 = row.insertCell(2)
                cell1.textContent = team.id
                cell2.textContent = team.city
                cell3.textContent = team.name
            });
            
            allTeams.append(table)
            isTeamTableVisible = true;
        })
    }
}
const getAllPlayerData = () => {
    if (isPlayerTableVisible) {
        allPlayers.innerHTML = '';
        isPlayerTableVisible = false;
    } else {
    $.get(`http://localhost:8000/api/player`, (data) => {
        const table = document.createElement('table');
        table.border = '2';
        const headerRow = table.insertRow();
        headerCell1 = headerRow.insertCell(0)
        headerCell2 = headerRow.insertCell(1)
        headerCell3 = headerRow.insertCell(2)
        headerCell4 = headerRow.insertCell(3)
        headerCell1.textContent = 'Player ID'
        headerCell2.textContent = 'Name'
        headerCell3.textContent = 'Age'
        headerCell4.textContent = 'Team Id'
       
        data.forEach((player) => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0)
            const cell2 = row.insertCell(1)
            const cell3 = row.insertCell(2)
            const cell4 = row.insertCell(3)
            cell1.textContent = player.id
            cell2.textContent = player.name
            cell3.textContent = player.age
            cell4.textContent = player.team_id
    })

    allPlayers.append(table)
    isPlayerTableVisible = true;
});
}
    
}


const getPlayerByIndex = () => {
    if (isPlayerTableVisible) {
        playerIndexBox.innerHTML = '';
        isPlayerTableVisible = false;
    } else {
    $.get(`http://localhost:8000/api/player/${playerIndex.value}`, (data) => {
        const table = document.createElement('table');
        table.border = '2';
        const headerRow = table.insertRow();
        headerCell1 = headerRow.insertCell(0)
        headerCell2 = headerRow.insertCell(1)
        headerCell3 = headerRow.insertCell(2)
        headerCell4 = headerRow.insertCell(3)
        headerCell1.textContent = 'Player ID'
        headerCell2.textContent = 'Name'
        headerCell3.textContent = 'Age'
        headerCell4.textContent = 'Team Id'
       
        data.forEach((player) => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0)
            const cell2 = row.insertCell(1)
            const cell3 = row.insertCell(2)
            const cell4 = row.insertCell(3)
            cell1.textContent = player.id
            cell2.textContent = player.name
            cell3.textContent = player.age
            cell4.textContent = player.team_id
    })

    playerIndexBox.append(table)
    isPlayerTableVisible = true;
    })
}
}
const getTeamByIndex = () => {
    if (isTeamTableVisible) {
        teamIndexBox.innerHTML = '';
        isTeamTableVisible = false;
    } else {
    $.get(`http://localhost:8000/api/team/${teamIndex.value}`, (data) => {
        const table = document.createElement('table');
        table.border = '2';
        const headerRow = table.insertRow();
        headerCell1 = headerRow.insertCell(0)
        headerCell2 = headerRow.insertCell(1)
        headerCell3 = headerRow.insertCell(2)
        headerCell1.textContent = 'Team ID'
        headerCell2.textContent = 'City'
        headerCell3.textContent = 'Team Name'
        
        data.forEach((team) => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0)
            const cell2 = row.insertCell(1)
            const cell3 = row.insertCell(2)
            cell1.textContent = team.id
            cell2.textContent = team.city
            cell3.textContent = team.name
        });
        
        teamIndexBox.append(table)
        isTeamTableVisible = true;
    })
}
}



//GET ALL ROUTES
teamBtn.addEventListener('click', () => {
    getAllTeamData()
})

playerBtn.addEventListener('click', () => {
    getAllPlayerData()
})
//GET 1 ROUTES
playerIndex.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getPlayerByIndex()
    }
})
teamIndex.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getTeamByIndex()
    }
})

//Create team data
createTeam.addEventListener('click', () => {
    const input1 = document.createElement('input');
    input1.type = 'text'
    input1.placeholder = 'Enter City'
    const input2 = document.createElement('input');
    input2.type = 'text'
    input2.placeholder = 'Enter Team Name'
    const submit = document.createElement('button')
    submit.innerHTML = 'Submit'
    createTeamBox.append(input1)
    createTeamBox.append(input2)
    createTeamBox.append(submit)
    const teamData = {
        city: '',
        name: ''
    }

    input1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            teamData.city = input1.value
            console.log(teamData.city)
        }
    })
    input2.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            teamData.name = input2.value
            console.log(teamData.name)
        }
    })

    submit.addEventListener('click', () => {
        console.log(JSON.stringify(teamData))
        
    
        $.ajax({
            url: 'http://localhost:8000/api/team',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(teamData),
            success: (data) => {
                const table = document.createElement('table');
                table.border = '2';
                const headerRow = table.insertRow();
                headerCell1 = headerRow.insertCell(0)
                headerCell2 = headerRow.insertCell(1)
                headerCell3 = headerRow.insertCell(2)
                headerCell1.textContent = 'Team ID'
                headerCell2.textContent = 'City'
                headerCell3.textContent = 'Team Name'
                
                data.forEach((team) => {
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0)
                    const cell2 = row.insertCell(1)
                    const cell3 = row.insertCell(2)
                    cell1.textContent = team.id
                    cell2.textContent = team.city
                    cell3.textContent = team.name
                });
                
                createTeamBox.append(table)
                console.log('Team Created:', data)
            },
            error: (error) => {
                console.error('Error creating team:', error)
            }
        })

    })

    
})

//create a player
createPlayer.addEventListener('click', () => {
    const input1 = document.createElement('input');
    input1.type = 'text'
    input1.placeholder = 'Enter Name'
    const input2 = document.createElement('input');
    input2.type = 'text'
    input2.placeholder = 'Enter Age'
    const input3 = document.createElement('input');
    input3.type = 'text'
    input3.placeholder = 'Enter Team ID'
    const submit = document.createElement('button')
    submit.innerHTML = 'Submit'
    createPlayerBox.append(input1)
    createPlayerBox.append(input2)
    createPlayerBox.append(input3)
    createPlayerBox.append(submit)
    const playerData = {
        name: '',
        age: '',
        team_id: ''
    }

    input1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            playerData.name = input1.value
            console.log(playerData.name)
        }
    })
    input2.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            playerData.age = input2.value
            console.log(playerData.age)
        }
    })
    input3.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            playerData.team_id = input3.value
            console.log(playerData.team_id)
        }
    })

    submit.addEventListener('click', () => {
        console.log(JSON.stringify(playerData))
        
    
        $.ajax({
            url: 'http://localhost:8000/api/player',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(playerData),
            success: (data) => {
                const table = document.createElement('table');
                table.border = '2';
                const headerRow = table.insertRow();
                headerCell1 = headerRow.insertCell(0)
                headerCell2 = headerRow.insertCell(1)
                headerCell3 = headerRow.insertCell(2)
                headerCell4 = headerRow.insertCell(3)
                headerCell1.textContent = 'Player ID'
                headerCell2.textContent = 'Name'
                headerCell3.textContent = 'Age'
                headerCell4.textContent = 'Team Id'

                data.forEach((player) => {
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0)
                    const cell2 = row.insertCell(1)
                    const cell3 = row.insertCell(2)
                    const cell4 = row.insertCell(3)
                    cell1.textContent = player.id
                    cell2.textContent = player.name
                    cell3.textContent = player.age
                    cell4.textContent = player.team_id
                })
                createPlayerBox.append(table)
                console.log('Player Created:', data)
            },
            error: (error) => {
                console.error('Error creating player:', error)
            }
        })

    })

    
})

//Update Player
updatePlayerBtn.addEventListener('click', () => {
    const playerIndex = prompt(`Enter the id of the player you want to edit.`)
    const input1 = document.createElement('input');
    input1.type = 'text'
    input1.placeholder = 'Enter New Name'
    const input2 = document.createElement('input');
    input2.type = 'text'
    input2.placeholder = 'Enter New Age'
    const input3 = document.createElement('input');
    input3.type = 'text'
    input3.placeholder = 'Enter New Team ID'
    const submit = document.createElement('button')
    submit.innerHTML = 'Submit'
    updatePlayer.append(input1)
    updatePlayer.append(input2)
    updatePlayer.append(input3)
    updatePlayer.append(submit)
    const playerData = {
        name: '',
        age: '',
        team_id: ''
    }

    input1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            playerData.name = input1.value
            console.log(playerData.name)
        }
    })
    input2.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            playerData.age = input2.value
            console.log(playerData.age)
        }
    })
    input3.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            playerData.team_id = input3.value
            console.log(playerData.team_id)
        }
    })

    submit.addEventListener('click', () => {
        console.log(JSON.stringify(playerData))
        
    
        $.ajax({
            url: `http://localhost:8000/api/player/${playerIndex}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(playerData),
            success: (data) => {
                const table = document.createElement('table');
                table.border = '2';
                const headerRow = table.insertRow();
                headerCell1 = headerRow.insertCell(0)
                headerCell2 = headerRow.insertCell(1)
                headerCell3 = headerRow.insertCell(2)
                headerCell4 = headerRow.insertCell(3)
                headerCell1.textContent = 'Player ID'
                headerCell2.textContent = 'Name'
                headerCell3.textContent = 'Age'
                headerCell4.textContent = 'Team Id'

                data.forEach((player) => {
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0)
                    const cell2 = row.insertCell(1)
                    const cell3 = row.insertCell(2)
                    const cell4 = row.insertCell(3)
                    cell1.textContent = player.id
                    cell2.textContent = player.name
                    cell3.textContent = player.age
                    cell4.textContent = player.team_id
                })
                updatePlayer.append(table)
                console.log('Player Edit Complete:', data)
            }
        })

    })
})

//Update Team
updateTeamBtn.addEventListener('click', () => {
    const teamIndex = prompt(`Enter the id of the team you want to edit.`)
    const input1 = document.createElement('input');
    input1.type = 'text'
    input1.placeholder = 'Enter New City'
    const input2 = document.createElement('input');
    input2.type = 'text'
    input2.placeholder = 'Enter New Team Name'
    const submit = document.createElement('button')
    submit.innerHTML = 'Submit'
    updateTeam.append(input1)
    updateTeam.append(input2)
    updateTeam.append(submit)
    const teamData = {
        city: '',
        name: '',
    }

    input1.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            teamData.city = input1.value
            console.log(teamData.city)
        }
    })
    input2.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            teamData.name = input2.value
            console.log(teamData.name)
        }
    })

    submit.addEventListener('click', () => {
        console.log(JSON.stringify(teamData))
        
    
        $.ajax({
            url: `http://localhost:8000/api/team/${teamIndex}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(teamData),
            success: (data) => {
                const table = document.createElement('table');
                table.border = '2';
                const headerRow = table.insertRow();
                headerCell1 = headerRow.insertCell(0)
                headerCell2 = headerRow.insertCell(1)
                headerCell3 = headerRow.insertCell(2)
                headerCell1.textContent = 'Team ID'
                headerCell2.textContent = 'City'
                headerCell3.textContent = 'Team Name'
                
                data.forEach((team) => {
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0)
                    const cell2 = row.insertCell(1)
                    const cell3 = row.insertCell(2)
                    cell1.textContent = team.id
                    cell2.textContent = team.city
                    cell3.textContent = team.name
                });
                
                updateTeam.append(table)
                console.log('Team Edit Complete:', data)
            }
           
        })

    })
})

//DELETE ROUTE
deletePlayer.addEventListener('click', () => {
   const playerIndex = parseInt(prompt(`Enter a index to delete.`))
   console.log(playerIndex)
   if(!isNaN(playerIndex) || playerIndex !== null) {
    $.ajax({
        url: `http://localhost:8000/api/player/${playerIndex}`,
        type: 'DELETE',
        success: (data) => {
            const table = document.createElement('table');
                table.border = '2';
                const headerRow = table.insertRow();
                headerCell1 = headerRow.insertCell(0)
                headerCell2 = headerRow.insertCell(1)
                headerCell3 = headerRow.insertCell(2)
                headerCell4 = headerRow.insertCell(3)
                headerCell1.textContent = 'Player ID'
                headerCell2.textContent = 'Name'
                headerCell3.textContent = 'Age'
                headerCell4.textContent = 'Team Id'

                data.forEach((player) => {
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0)
                    const cell2 = row.insertCell(1)
                    const cell3 = row.insertCell(2)
                    const cell4 = row.insertCell(3)
                    cell1.textContent = player.id
                    cell2.textContent = player.name
                    cell3.textContent = player.age
                    cell4.textContent = player.team_id
                })
                deletePlayerBox.append(table)
            console.log('Team Deleted:', data)
        }
    })
   }
})

deleteTeamBtn.addEventListener('click', () => {
    const teamIndex = parseInt(prompt(`Enter a index to delete.`))
    console.log(teamIndex)
    if(!isNaN(teamIndex) || teamIndex !== null) {
     $.ajax({
         url: `http://localhost:8000/api/team/${teamIndex}`,
         type: 'DELETE',
         success: (data) => {
            const table = document.createElement('table');
            table.border = '2';
            const headerRow = table.insertRow();
            headerCell1 = headerRow.insertCell(0)
            headerCell2 = headerRow.insertCell(1)
            headerCell3 = headerRow.insertCell(2)
            headerCell1.textContent = 'Team ID'
            headerCell2.textContent = 'City'
            headerCell3.textContent = 'Team Name'
            
            data.forEach((team) => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0)
                const cell2 = row.insertCell(1)
                const cell3 = row.insertCell(2)
                cell1.textContent = team.id
                cell2.textContent = team.city
                cell3.textContent = team.name
            });
             deleteTeamBox.append(table)
             console.log('Team Deleted:', data)
         }
     })
    }
 })
 