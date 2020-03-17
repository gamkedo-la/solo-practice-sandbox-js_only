let pieces = document.querySelectorAll('#piece');

let board = [];
const BOARD_LENGTH = 9;

window.onload = function() {
    // Create the board pieces
    createBoardPieces();
    
    pieces.forEach(piece => piece.addEventListener('click', handleClick));
}

function createBoardPieces() {
    for(let i = 0; i < BOARD_LENGTH; i++) {
        board[i] = {
            // Connect the array with the elements on the screen through the index
            index: i,
            content: '',
            occupied: false
        };
    }
}

function handleClick(e) {
    const pieceElement = e.target;
    const pieceIndex = this.dataset.index;
    const boardPiece = board[pieceIndex];

    // Check if the piece is available, if it is, place the 'X' there
    // If it isn't warn the player
    if(isPieceAvailable(boardPiece)) {
        boardPiece.content = 'X';
        boardPiece.occupied = true;
        pieceElement.innerHTML = 'X';
    } else {
        console.log('Place is taken. Choose again');
    }

    // Check end of the game

    // Computer move
    computerMove();
    
    console.log(e.target)
}

function isPieceAvailable(piece) {
    return piece.occupied == false ? true : false;
}

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}