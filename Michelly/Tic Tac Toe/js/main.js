// Get some elements that will be necessary
const boardContainer = document.querySelector('#board-container');
const restartBtn = document.querySelector('#restart');
let msg = document.querySelector('#msg');
let displayInfo = document.querySelector('#display-info');
let pieces = document.querySelectorAll('#piece');

// Board related variables
let board = [];
const BOARD_LENGTH = 9;

window.onload = function() {
    // Create the board pieces
    createBoardPieces();
    
    // Listen for a click on the board pieces
    pieces.forEach(piece => piece.addEventListener('click', handleClick));

    // Listen for a click on the restart button
    restartBtn.addEventListener('click', restartGame);
}

function createBoardPieces() {
    for(let i = 0; i < BOARD_LENGTH; i++) {
        board[i] = {
            // Connect the array with the elements on the screen through the index
            index: i,
            content: ''
        };
    }
}

function handleClick(e) {
    const pieceElement = e.target;
    const boardPiece = board[this.dataset.index];

    // Check if the piece is available, if it is, place the 'X' there
    // If it isn't warn the player
    if(isPieceAvailable(boardPiece)) {
        // Update the object
        boardPiece.content = 'X';
        // pieceElement.classList.add('active');
        boardPiece.occupied = true;
        // Display on screen
        pieceElement.innerHTML = 'X';
    } else {
        displayInfo.innerHTML = 'Place is taken. Choose again';
        return;
    }

    displayInfo.innerHTML = 'Click to choose a place';

    // Check end of the game
    if(isGameOver()) {
        return;
    }

    // Computer move
    computerMove();

    // Check end of the game
    if(isGameOver()) {
        return;
    }
}

function computerMove() {
    // Choose a random place
    const place = randomRange(1,9);
    const boardPiece = board[place-1];
    const pieceElement = pieces[place-1];
    
    // Check if that place is occupied
    if(isPieceAvailable(boardPiece)) {
        // Update the object
        boardPiece.content = 'O';
        boardPiece.occupied = true;
        // Display on the screen
        pieceElement.innerHTML = 'O';
    } else {
        computerMove();
    }
}

function isGameOver() {
    // Check if someone completed a row
    for(let i = 0; i < 9; i += 3) {
        if(board[i].content == board[i+1].content && board[i].content == board[i+2].content && board[i].content != '') {
            boardContainer.style.display = 'none';
            restartBtn.style.display = 'block';
            msg.innerHTML = `${board[i].content} won!`;
            return true;
        }
    }

    // Check if someone completed a column
    for(let i = 0; i < 3; i++) {
        if(board[i].content == board[i+3].content && board[i].content == board[i+6].content && board[i].content != '') {
            boardContainer.style.display = 'none';
            restartBtn.style.display = 'block';
            msg.innerHTML = `${board[i].content} won!`;
            return true;
        }
    }

    // Check if someone completed a diagonal
    if( (board[0].content == board[4].content && board[0].content == board[8].content && board[0].content != '') || (board[2].content == board[4].content && board[2].content == board[6].content && board[2].content != '') ) {
        boardContainer.style.display = 'none';
        restartBtn.style.display = 'block';
        msg.innerHTML = `${board[4].content} won!`;
        return true;
    }

    // If there's one empty place, the game is not over yet
    for(let i = 0; i < BOARD_LENGTH; i++) {
        if(board[i].content == '') {
            return false;
        }
    }

    // All places are taken and no one won(all the tests above failed) - tie
    boardContainer.style.display = 'none';
    restartBtn.style.display = 'block';
    msg.innerHTML = 'GAME OVER!';
    return true;
} 

function isPieceAvailable(piece) {
    return piece.content == '' ? true : false;
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function restartGame() {
    for(let i = 0; i < BOARD_LENGTH; i++) {
        board[i].content = '';
        pieces[i].innerHTML = '';
    }


    boardContainer.style.display = 'grid';
    restartBtn.style.display = 'none';
    msg.innerHTML = '';
}