// state machine, first effort
// arrow keys switch between 4 states

const STATE_ORANGE = 2
const STATE_GREEN = 1
const STATE_YELLOW = 3
const STATE_CYAN = 0

let gameState = STATE_ORANGE;

const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

var canvas, canvasContext;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function () {
        drawAll();
    }, 1000 / framesPerSecond);

    inputHandler();
}

inputHandler = function() {
    document.addEventListener('keydown', keyPressed);
}

function keyPressed(evt) {
    var key = evt.keyCode;
    switch (key) {
        case 37:
            gameState = 0;
            break;
        case 38:
            gameState = 1;
            break;
        case 39:
            gameState = 2;
            break;
        case 40:
            gameState = 3;
            break;
    
        default:
            break;
    }
    evt.preventDefault();
  }

drawAll = function() {
    switch (gameState) {
        case 0:
            showState('cyan');
            break;
        case 1:
            showState('green');
            break;
        case 2:
            showState('orange');
            break;
        case 3:
            showState('yellow');
            break;
    
        default:
            break;
    }
}

function showState(color) {
    colorRect(0,0,800,600, color);
    canvasContext.font = "48px Arial";
    canvasContext.fillStyle = 'black';
    var str = 'State = ' + color; 
    canvasContext.fillText(str, 100, 100);
    document.querySelector('p').innerText = 'State ' + color;
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}