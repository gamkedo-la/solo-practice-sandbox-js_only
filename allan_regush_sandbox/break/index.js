let canvas;
let canvasContext;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 100;

const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;

let brickGrid = new Array(BRICK_COLS * BRICK_ROWS);

function getCenter() {
    return canvas.width / 2;
}

const ball = {
    x:75,
    y:75,
    deltaX: -2,
    deltaY: 2,
}

const paddle1 = {
    y: 580,
    x: 0,
}


const score = {
    player1: 0
}

function init() {
    canvas.addEventListener('mousemove', function(evt) {
        const mousePos = calculateMousePos(evt);
        paddle1.x = mousePos.x - (PADDLE_HEIGHT / 2);
    });

    paddle1.x = getCenter();
    resetBricks();
}


window.onload = function() {
    canvas = document.getElementById('canvas');
    canvasContext = canvas.getContext('2d');
    init();
    const fps = 30;
    setInterval(main, 1000/fps);
}

function main() {
    update();
    render();
}

function calculateMousePos(evt) {
    const root = document.documentElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = evt.clientX - rect.left - root.scrollLeft;
    const mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function ballReset() {
    const value = Math.random();
    if  (value < 0.5) {
        ball.deltaX *= -1;
        ball.deltaY *= -1;
    } 
    ball.y = canvas.height / 2;
    ball.x = canvas.width / 2;
}

function update() {
    if(ball.y < 0) {
        ball.deltaY *= -1;
    }
    if(ball.x > canvas.width || ball.x < 0) {
        ball.deltaX *=-1;
    }
    if(ball.y > canvas.height - 15) {
        if (ball.x > paddle1.x && ball.x < paddle1.x + PADDLE_WIDTH) {
            ball.deltaY *= -1;
            calculateBallDeltaSpeed(paddle1.y);
        }
    }
    if(ball.y > canvas.height) {
        ballReset();
    }

    ball.y += ball.deltaY;
    ball.x += ball.deltaX;
}

function drawBricks() {
    for(let col = 0; col < BRICK_COLS; ++col) {
        for(let row = 0; row < BRICK_ROWS; ++row) {
            const brickLeftEdgeX = col * BRICK_WIDTH;
            const brickTopEdgeY = row *  BRICK_HEIGHT;
            const arrIndex = brickTileToIndex(col, row);
            if(brickGrid[arrIndex]) {
                drawRectangle(brickLeftEdgeX, brickTopEdgeY,
                            BRICK_WIDTH - BRICK_GAP, BRICK_HEIGHT - BRICK_GAP, 'blue');
            }
        }
    }
}

function drawText(text, x, y) {
    canvasContext.font = '48px serif';
    canvasContext.fillStyle = 'White';
    canvasContext.fillText(text, x, y);
}

function calculateBallDeltaSpeed(paddleY) {
    const centerOfPaddle = paddleY + PADDLE_HEIGHT / 2;
    const ballDistFromCenterOfPaddle = ball.y - centerOfPaddle;
    ball.deltaX = ballDistFromCenterOfPaddle * 0.35;
}

function removeBrickAtPixelCoord(px, py) {
    const col = Math.floor(px / BRICK_WIDTH);
    const row = Math.floor(py / BRICK_HEIGHT);

    if (col < 0 || col >= BRICK_COLS ||
        row < 0 || row >= BRICK_ROWS) {
        return;
    }

    const index = brickTileToIndex(col, row);

    brickGrid[index] = 0;
}

function brickTileToIndex(col, row) {
    return (col + BRICK_COLS * row);
}

function isBrickAtTileCoord(col, row) {
    const index = brickTileToIndex(col, row);
    return brickGrid[index] == 1;
}

function resetBricks() {
    for(let i = 0; i < BRICK_COLS * BRICK_ROWS; ++i) {
        brickGrid[i] = true;
    }
}

function render() {
    blackoutCanvas();
    drawCircle('white', 10);
    drawRectangle(paddle1.x, paddle1.y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
    drawBricks();
    drawScore();
}
/*
function drawScore() {
    drawText(score.player1.toString(), 680, 80);
}
*/
function blackoutCanvas() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0, canvas.width, canvas.height);
}


function drawRectangle(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function drawCircle(color, size) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, size, 0, Math.PI*2, true);
    canvasContext.fill();
}