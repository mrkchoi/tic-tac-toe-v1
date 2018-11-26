// It should have a tic tac toe board
// It should accept logic for (2) players
// It should keep track of each player’s score
// It should display each player’s move when clicking on a particular square
// It should display the correct sign [‘o’ or ‘x’] depending on the player’s turn
// It should stop the game when a player gets (3) in a row, and notify the user via UI elements the winning player


// PLAYER VARIABLES
let playerScores = [[],[]];
let activePlayer;
let winner;
let title = document.querySelector('.main__header');
let newGame = document.querySelector('.newgame');
let newGameBtn = document.querySelector('.newgame__prompt');
let gameboardBoxes = document.querySelectorAll('.gameboard__box');
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
        // If there is a match, the that player becomes the winner
        

        // Change activeplayer
        if(activePlayer === 0) {
            activePlayer += 1;
        } else {
            activePlayer -= 1;
        }
    }

    // Update gameboard box to data select TRUE
    selectedBox.dataset.select = 'true';
}

function checkWinner() {
    let winners = [];
    // Loop through winning combinations and check to see if there is a match
    for(let i = 0; i < winningCombos.length; i++) {
        if(playerScores[0].includes(winningCombos[i][0]) && playerScores[0].includes(winningCombos[i][1]) && playerScores[0].includes(winningCombos[i][2])) {
            winners.push(...winningCombos[i]);
            gameboardBoxes.forEach((el, i) => {
                if(el.dataset.box.includes(winners[0]) || el.dataset.box.includes(winners[1]) || el.dataset.box.includes(winners[2])) {
                    el.style.color = 'palevioletred';
                }
            });
            
            
            console.log(winners);
            // End the game
            winner = true;
            endGame('Player 1 Wins!');
        } else if(playerScores[1].includes(winningCombos[i][0]) && playerScores[1].includes(winningCombos[i][1]) && playerScores[1].includes(winningCombos[i][2])) {
            winners.push(...winningCombos[i]);
            gameboardBoxes.forEach((el, i) => {
                if(el.dataset.box.includes(winners[0]) || el.dataset.box.includes(winners[1]) || el.dataset.box.includes(winners[2])) {
                    el.querySelector('.gameboard__o').style.border = '6px solid palevioletred';
                    
                    // console.log(winningBoxes);
                }
            });

            // End the game
            winner = true;
            endGame('Player 2 Wins!');
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
