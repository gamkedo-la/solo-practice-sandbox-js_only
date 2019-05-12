let canvas, canvasContext;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// Default defined so not on screen corner like (0,0)
let mouseX = -100;
let mouseY = -100;

// Rectangle that doesn't follow the mouse
let boxCornerX = 150;
let boxCornerY = 80;
let boxWidth = 50;
let boxHeight = 20;
let boxColor;

function handleClick() {
    /*
    // Set the box's position where the mouse clicked 
    boxLeft = mouseX;
    boxTop = mouseY;
    */

    // Reposition the bottom-right corner
    boxWidth = mouseX - boxCornerX;
    boxHeight = mouseY - boxCornerY;
}

function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
}

window.onload = function() {
    // Create the canvas 
    canvas = document.createElement("canvas");
    // Add the canvas to HTML
    document.body.appendChild(canvas);
    // Get the context to draw to
    canvasContext = canvas.getContext('2d');

    // Set the canvas properties
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Get the events from mouse
    canvas.addEventListener('mousedown', handleClick);
    canvas.addEventListener('mousemove', calculateMousePos);

    // Kata loop
    let framesPerSecond = 30;
    let msPerSecond = 1000;
    setInterval(frameUpdate, msPerSecond/framesPerSecond);
}

function frameUpdate() {
    let boxLeft, boxRight, boxTop,boxBottom;

    clearScreen();
    insideOut();
    isOverlapping();
    drawEverything();
}

function insideOut() {
    // Grow to the right
    if(boxWidth > 0) {
        boxLeft = boxCornerX;
        boxRight = boxCornerX + boxWidth;
    } 
    // Grow to the left
    else {
        boxRight = boxCornerX;
        boxLeft = boxCornerX + boxWidth;
    }
    // Grow to the top
    if(boxHeight > 0) {
        boxTop = boxCornerY;
        boxBottom = boxCornerY + boxHeight;
    } 
    // Grow to the bottom
    else {
        boxBottom = boxCornerY;
        boxTop = boxCornerY + boxHeight;
    }
}

function isOverlapping() {
    // Rect that doesn't follow the mouse and rect that follows the mouse
    if(mouseX > boxLeft && mouseX < boxRight &&
       mouseY > boxTop && mouseY < boxBottom) {
        boxColor = 'white';
    } else {
        boxColor = "#EFBE00";
    }
}

function drawEverything() {
    // Small Rectangle that follows the mouse
    colorRect(mouseX-3,mouseY-3, 7,7, '#EFBE00');

    //Small Rectangle doesn't follow mouse
    colorRect(boxCornerX,boxCornerY, boxWidth,boxHeight, boxColor);
}

function clearScreen() {
    colorRect(0,0, canvas.width,canvas.height, 'black');
}

function colorRect(leftX, topY, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}