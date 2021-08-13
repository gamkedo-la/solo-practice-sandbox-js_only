
var canvas;
var canvasContext;

// loader
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    init();

    var framesPerSecond = 30;
    setInterval(function() {
        update();
        draw();
    }, 1000/framesPerSecond);  
}

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 5;
var paddleX = canvas.width - PADDLE_THICKNESS;

function init() {
    console.log("hi timmy");

}

function update() {

}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "black");
    drawPaddle();
    drawCicle(200, 400, 50, "red")
}

function drawPaddle() {
    drawRect(PADDLE_WIDTH, PADDLE_THICKNESS, 50, 200, "white");
}


// in window.onload
// canvas.addEventListener('mousedown', handleMouseClick);
function handleMouseClick(evt) {
    var mousePos = calculateMousePosition(evt);
    if (DEBUG) {
        txt = 'Click position' + mousePos.x + ' ' + mousePos.y
        drawText(300, 100, txt)
    }
}

// in window.onload
// canvas.addEventListener('mousemove', handleMouseClick);
function calculateMousePosition(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    }
}

function handleMouseMove(evt) {
    var mousePos = calculateMousePosition(evt);
    if (DEBUG) {
        txt = 'Current posision' + mousePos.x + ' ' + mousePos.y
        drawText(100, 100, txt)
    }
}

function drawText(leftX, topY, text, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillText(text, leftX, topY);
}

function drawCicle(centerX, centerY, radius, drawColor) {
    // ball
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function drawRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}




