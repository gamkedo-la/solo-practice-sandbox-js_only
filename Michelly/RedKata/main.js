let canvas, canvasContext;
let CANVAS_WIDTH = 800;
let CANVAS_HEIGHT = 600;

// Input
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;

let holdLeft = false, holdRight = false;
let holdUp = false, holdDown = false;

// Red box
let corner1X = 250, corner1Y = 300;
let box1W = 150, box1H = 50;
let box1VelX = 0, box1VelY = 0;

// 95%; every frame shave 5% of its speed
const MOTION_DECAY = 0.95;

// White boxes
let otherBoxList = [
    {x:500, y:100, w: 20, h: 200,},
    {x:300, y:260, w: 20, h: 20},
    {x:250, y:400, w: 200, h: 20},
    {x:20, y:300, w: 200, h: 200}
];

let moveSpeed = 2;

window.onload = function() {
    // Create the canvas
    canvas = document.createElement('canvas');
    // Append the canvas to the body
    document.body.appendChild(canvas);
    // Add the context
    canvasContext = canvas.getContext('2d');

    // Set the size of the canvas
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Add a event listener to the page
    document.addEventListener('keydown', handleKey);
    document.addEventListener('keyup', releaseKey);

    // Set the kata loop
    let framesPerSecond = 30;
    let msPerSecond = 1000;
    setInterval(frameUpdate, msPerSecond/framesPerSecond);
}

function handleKey(evt) {
    let keyUsedByGame = true;

    switch(evt.keyCode) {
        case KEY_LEFT:
            holdLeft = true;
            break;
        case KEY_UP:
            holdUp = true;
            break;
        case KEY_RIGHT:
            holdRight = true;
            break;
        case KEY_DOWN:
            holdDown = true;
            break;
        default:
            keyUsedByGame = false;
            break;
    }

    // Avoid browser scroll from arrow key
    if(keyUsedByGame) {
        evt.preventDefault(); 
    }
}

function releaseKey(evt) {
    switch(evt.keyCode) {
        case KEY_LEFT:
            holdLeft = false;
            break;
        case KEY_UP:
            holdUp = false;
            break;
        case KEY_RIGHT:
            holdRight = false;
            break;
        case KEY_DOWN:
            holdDown = false;
            break;
    }
}

function frameUpdate() {
    move();
    draw();
}

function move() {
    if(holdLeft) {
        box1VelX = -moveSpeed;
    }
    if(holdUp) {
        box1VelY = -moveSpeed;
    }
    if(holdRight) {
        box1VelX = moveSpeed;
    }
    if(holdDown) {
        box1VelY = moveSpeed;
    }

    // Add speed every frame
    corner1X += box1VelX;
    corner1Y += box1VelY;

    // Slow down to a stop
    box1VelX *= MOTION_DECAY;
    box1VelY *= MOTION_DECAY;
}

function draw() {
    // 2%; graphics	calls after that line will be only 2% opaque(98% transparent)
    // Clear screen
    colorRect(0,0, canvas.width, canvas.height, 'black', 0.02);

    // Draw at 100% opacity
    // Red box
    colorRect(corner1X,corner1Y,box1W,box1H, '#FF0000', 1.0);

    // White boxes
    for(let i = 0; i < otherBoxList.length; i++) {
        if(doBoxesOverlap(otherBoxList[i].x,otherBoxList[i].y,otherBoxList[i].w,otherBoxList[i].h)) {
            colorRect(otherBoxList[i].x,otherBoxList[i].y,otherBoxList[i].w,otherBoxList[i].h, 'green');
        } else {
            colorRect(otherBoxList[i].x,otherBoxList[i].y,otherBoxList[i].w,otherBoxList[i].h, 'white');
        }
    }
}

function doBoxesOverlap(box2X, box2Y, box2Width, box2Height) {
    // Red box
    let box1Left = corner1X, box1Top = corner1Y;
    let box1Right = corner1X + box1W, box1Bottom = corner1Y + box1H;

    // White box
    let box2Left = box2X, box2Top = box2Y;
    let box2Right = box2X + box2Width, box2Bottom = box2Y + box2Height;

    // The boxes overlap if the conditions are false
    if(box1Left > box2Right || box1Right < box2Left ||
       box1Bottom < box2Top || box1Top > box2Bottom) {
        return false;
    } else {
        return true;;
    }
}

function colorRect(leftX, topY, width, height, color, opacity) {
    canvasContext.fillStyle = color;
    canvasContext.globalAlpha = opacity;
    canvasContext.fillRect(leftX, topY, width, height);
}