const teamBtn = document.querySelector('.all-teams')
const playerBtn = document.querySelector('.all-players')
const playerIndex = document.querySelector('#player-index')
const teamIndex = document.querySelector('#team-index')
const createTeam = document.querySelector('#create-team')
const createPlayer = document.querySelector('#create-player')
const createPlayerBox = document.querySelector('#create-player-box')
const createTeamBox = document.querySelector('#create-team-box')
const deletePlayer = document.querySelector('#delete-player')


const getAllTeamData = () => {
    $.get(`http://localhost:8000/api/team`, (data) => {
        console.log(data)
    })
}
const getAllPlayerData = () => {
    $.get(`http://localhost:8000/api/player`, (data) => {
        console.log(data)
    })
}

const getPlayerByIndex = () => {
    $.get(`http://localhost:8000/api/player/${playerIndex.value}`, (data) => {
        console.log(data)
    })
}
const getTeamByIndex = () => {
    $.get(`http://localhost:8000/api/team/${teamIndex.value}`, (data) => {
        console.log(data)
    })
}

// const deletePlayerByIndex = (playerIndex) => {
//     $.ajax({
//         url: `http://localhost:8000/api/player/${playerIndex}`,
//         type: 'DELETE',
//         success: (data) => {
//             console.log('Team Deleted:', data)
//         }
//     })
// }

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
                console.log('Player Created:', data)
            },
            error: (error) => {
                console.error('Error creating player:', error)
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
            console.log('Team Deleted:', data)
        }
    })
   }
})