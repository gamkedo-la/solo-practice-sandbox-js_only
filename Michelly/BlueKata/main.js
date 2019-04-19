// Create the canvas element
let canvas;
let canvasContext;

// Just a number we will increase to show change over time
let posX = 0; 
let growHeight = 0; 

// Box data
let boxTopY = 20;
let boxWidth = 30;
let boxGowRate = 1;
let boxMoveSpeed = 1;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const FRAMES_PER_SECOND = 30;
const MS_PER_SECOND = 1000;

// Automatically called after file finishes loading
window.onload = function() {
    // Initializes canvas we will draw to
    canvas = document.createElement("canvas");
    // Add the canvas to the page
    document.body.appendChild(canvas);

    // Set up canvas's size
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Grab this to call draw operations on
    canvasContext = canvas.getContext('2d');

    // Call frameUpdate 30 times per 1000ms(1sc)
    setInterval(frameUpdate, MS_PER_SECOND/FRAMES_PER_SECOND);
}

function frameUpdate() {
    // Move code
    moveBox();

    // Draw code
    drawEverything();
}

function moveBox() {
    posX += boxMoveSpeed;
    growHeight += boxGowRate;

    // Boudary check
    boundaryCheck();
}

function drawEverything() {
    // Canvas
    colorRect(0,0, canvas.width, canvas.height, "black");
    // Box
    colorRect(posX, boxTopY, boxWidth, growHeight, "#00BEEF");
}

function boundaryCheck() {
    if(posX > canvas.width-boxWidth) { // Right edge
        boxMoveSpeed *= -1;
    }
    if(growHeight < 0) { // Top edge
        boxGowRate *= -1;
    }
    if(posX < 0) { // Left edge
        boxMoveSpeed *= -1;
    }
    if(growHeight > canvas.height-boxTopY) { // Bottom edge
        boxGowRate *= -1;
    }
}

function colorRect(drawX, drawY, drawWidth, drawHeight, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(drawX,drawY, drawWidth, drawHeight);
}