// PLAYER VARIABLES
let playerScores = [[],[]];
let activePlayer;
let winner;
let winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// DOM ELEMENTS
let gameboard = document.querySelector('.gameboard');
let title = document.querySelector('.main__header');
let newGame = document.querySelector('.newgame');
let newGameBtn = document.querySelector('.newgame__prompt');
let gameboardBoxes = document.querySelectorAll('.gameboard__box');

// EVENT LISTENER ON GAMEBOARD
gameboard.addEventListener('click', updateUI);

// Game Init
function init() {
    activePlayer = 0;
}
init();

function updateUI(e) {
    // let selectedBox = e.target.closest('.gameboard__box--content');
    let selectedBox = e.target;
    // console.log(selectedBox);
    
    // Check to see if the box has not been previously selected & that it is a valid gameboard box
    if(selectedBox.dataset = 'false' && selectedBox.classList.contains('gameboard__box')) {
        // Check to see which player turn it is
        if(activePlayer === 0) {
            selectedBox.innerHTML = `
                <div class="gameboard__x">&#215;</div>
            `;
        } else if (activePlayer === 1) {
            selectedBox.innerHTML = `
                <div class="gameboard__o"></div>
            `;
        }

        // Add the selected box to the activeplayer's turn array
        playerScores[activePlayer].push(parseInt(selectedBox.dataset.box));

        // Check to see if either player's score matches any subset of the winning combo array
        checkWinner();
        

        // Change activeplayer
        if(activePlayer === 0) {
            activePlayer += 1;
        } else {
            activePlayer -= 1;
        }
    }

    // Update gameboard box - change data attribute of each previously selected box to TRUE
    selectedBox.dataset.select = 'true';
}

function checkWinner() {
    let winners = [];
    // Loop through winning combinations and check to see if there is a match
    for(let i = 0; i < winningCombos.length; i++) {
        // First, check to see if player 1's score includes any winning combos
        if(playerScores[0].includes(winningCombos[i][0]) && playerScores[0].includes(winningCombos[i][1]) && playerScores[0].includes(winningCombos[i][2])) {
            // Save the winning combos in a separate array
            winners.push(...winningCombos[i]);
            // Loop through each winning boxes and change color to red on game win
            gameboardBoxes.forEach((el, i) => {
                if(el.dataset.box.includes(winners[0]) || el.dataset.box.includes(winners[1]) || el.dataset.box.includes(winners[2])) {
                    el.style.color = 'palevioletred';
                }
            });
            // End the game
            winner = true;
            endGame('Player 1 Wins!');       

        // Second, check to see if player 2's score includes any winning combos
        } else if(playerScores[1].includes(winningCombos[i][0]) && playerScores[1].includes(winningCombos[i][1]) && playerScores[1].includes(winningCombos[i][2])) {
            // Save the winning combos in a separate array
            winners.push(...winningCombos[i]);
            // Loop through each winning boxes and change color to red on game win
            gameboardBoxes.forEach((el, i) => {
                if(el.dataset.box.includes(winners[0]) || el.dataset.box.includes(winners[1]) || el.dataset.box.includes(winners[2])) {
                    el.querySelector('.gameboard__o').style.border = '6px solid palevioletred';
                    
                    // console.log(winningBoxes);
                }
            });

            // End the game
            winner = true;
            endGame('Player 2 Wins!');

        // Last, check to see if there is a tie
        } else if(playerScores[0].length + playerScores[1].length === 9 && !winner) {
            // End the game
            endGame('Tie game!');
        }
    }
}

function endGame(winner) {
    // Update title to show winner
    title.textContent = `${winner}`;
    // Remove event listner from gameboard to stop further play
    gameboard.removeEventListener('click', updateUI);
    // Show the play again option
    newGame.style.display = 'block';
    // Event listener to reload game on play again btn
    newGameBtn.addEventListener('click', () => {
        window.location.reload();
    });
}
