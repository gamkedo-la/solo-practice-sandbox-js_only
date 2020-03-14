let canvas, canvasCtx;
let board = [];

const BOARD_PIECES = 9;
const BOARD_PIECE_WIDTH = 20;
const BOARD_PIECE_HEIGHT = 15;
const BOARD_GAP = 5;
const BOARD_PIECE_COLOR = 'white';
const BOARD_ROWS = 3;
const BOARD_COLUMNS = 3;
const offsetX = 130;
const offsetY = 50;

function colorRect(leftX, topY, width, height, drawColor) {
	canvasCtx.fillStyle = drawColor;
	canvasCtx.fillRect(leftX, topY, width, height);
}

window.onload = function() {
    canvas = document.querySelector('#canvas');
    canvasCtx = canvas.getContext('2d');

    // Create the board pieces -> each piece is an object with its own state
    createBoardPieces();

    // Draw Board
    drawBoard();

    // Listen for a click on the board -> base of the game
    // Check if the piece is empty -> if it's, add X/O
    // If isn't empty, warn the player and tell to choose again
    // Check for end of the game -> who won? was a tie?
}

function createBoardPieces() {
    for(let i = 0; i < BOARD_PIECES; i++) {
        board[i] = {
            occupied: false,
            content: '',
            index: i
        };
    }
}

function drawBoard() {
    for(let row = 0; row < BOARD_ROWS; row++) {
        for(let col = 0; col < BOARD_COLUMNS; col++) {
            colorRect(
                BOARD_PIECE_WIDTH * col + offsetX,
                BOARD_PIECE_HEIGHT * row + offsetY,
                BOARD_PIECE_WIDTH - BOARD_GAP,
                BOARD_PIECE_HEIGHT - BOARD_GAP,
                BOARD_PIECE_COLOR);
        }
    }
}