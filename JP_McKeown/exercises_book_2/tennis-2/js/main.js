var canvas;
var ctx;

let ballX = 75;
let ballY = 75;
const _INIT_SPEED_X = 4;
const _INIT_SPEED_Y = 3.0;
let ballSpeedX = _INIT_SPEED_X;
let ballSpeedY = _INIT_SPEED_Y * ( Math.random() * 2 - 1);

const _AI_MOVE_SPEED = 3;
let hitCount = 0;
speedXincreased =false;

let player1score = 0;
let player2score = 0;
const _WIN_SCORE = 5;
let winner;

let gameLaunched = false;
let gameOver = false;

window.onload = function() {
    // window.onload gets run automatically when the page finishes loading
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    ctx.textAlign = 'center';

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - _PADDLE_HEIGHT/2;
    } );

    loadImages();
    // requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
    moveAll();
    drawAll();
    requestAnimationFrame(gameLoop);
}

function moveAll() {
    if(!gameLaunched) { return; }
    if(gameOver) { return; }
    
    moveComputerPaddle();

    moveBall();
}

function drawAll() {
    blankCanvas(ctx);
    drawScore1(player1score, 'white');
    drawScore2(player2score, 'white');

    if(!gameLaunched) {
        ctx.fillText('Tennis for one human', canvas.width/2, 100);
        ctx.fillText('Click on green area to start', canvas.width/2, 150);
    } else if(gameOver) {
        ctx.fillText('Player ' + winner + ' won', canvas.width/2, 100);
        ctx.fillText('Click here to continue', canvas.width/2, 150);
    } else {
        drawNet();
        drawPaddle();
        drawPaddleR();
        drawBall();
    }
}

function drawNet() {
    var leftX = canvas.width/2;
    var rightX = canvas.width/2;
    var bottomY = canvas.height;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.setLineDash([5,5]);
    ctx.beginPath();
    ctx.moveTo(leftX, 0);
    ctx.lineTo(rightX, bottomY);
    ctx.stroke();
}