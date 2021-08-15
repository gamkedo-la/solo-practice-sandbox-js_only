// Tim Chase
// Aug 14, 2020
// Racing game


const MOUSE_CHEAT = false;

var carPic = document.createElement('img');
var carPicLoaded = false;

var carX = 75;
var carY = 73;
var carAng = 0;
var carSpeed = 2;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_GAP = 2;
const TRACK_ROWS = 15;
var trackGrid = [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var canvas, canvasContext;

var mouseX = 0; 
var mouseY = 0;

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

    //canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove', updateMousePos);

    carPic.onload = function() {
        carPicLoaded = true;
    }
    carPic.src = "player1car.png";

    carReset();
}



function init() {
    console.log("init");
}

function update() {
    carMove();
    carTrackHandling();
}

function draw() {
    // background
    drawRect(0, 0, canvas.width, canvas.height, "black"); 
    // car
    // drawCicle(carX, carY, 10, "white");    
    if(carPicLoaded) {
        drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
    }    

    drawTracks();

    // mouse debug
    // drawText(mouseX+","+mouseY, mouseX, mouseY, "yellow");
    // var mouseXoffset = 4;
    // var mouseYoffset = -4;
    // var mouseTrackCol = Math.floor(mouseX / TRACK_W);
    // var mouseTrackRow = Math.floor(mouseY / TRACK_H);
    // var trackIndexUnderMouse = rowColToArrayIndex(mouseTrackCol, mouseTrackRow);
    //drawText(mouseTrackCol+","+mouseTrackRow+": "+trackIndexUnderMouse, mouseX+mouseXoffset, mouseY+mouseYoffset, "yellow");
    
}

// track functions
function rowColToArrayIndex(col, row) {
    return col + (TRACK_COLS * row)
}

function drawTracks() {
    for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(trackGrid[arrayIndex] == 1) {
                drawRect(TRACK_W*eachCol, TRACK_H*eachRow, TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, 'blue');
            } // draw if turned on
        } // draw rows
    } // draw cols
}


// car functions 
function carReset() {
    for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(trackGrid[arrayIndex] == 2) {
                trackGrid[arrayIndex] = 0;  // found the start location, make it a road tile
                carX = eachCol * TRACK_W;
                carY = eachRow * TRACK_H;
            }
        } // end cols
    } // end rows
} // end carReset

function carMove() {
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;
    carAng += 0.02;


}

function isTrackAtColRow(col, row) {
    if(col >= 0 && col < TRACK_COLS && 
       row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return trackGrid[trackIndexUnderCoord] == 1;
    } else {
        return false;
    }
}

function carTrackHandling() {
    // collision
    var carTrackCol = Math.floor(carX / TRACK_W);
    var carTrackRow = Math.floor(carY / TRACK_H);
    //var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    if(carTrackCol >=0 && carTrackCol < TRACK_COLS && 
       carTrackRow >=0 && carTrackRow < TRACK_ROWS) {
        if(isTrackAtColRow(carTrackCol, carTrackRow)) {
            carSpeed *= -1;
        } // end track found
    } // end valid col row
} // carTrackHandling


// mouse functions
function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    // mouse cheat
    if(MOUSE_CHEAT) {
        carX = mouseX;
        carY = mouseY;
        carSpeed = 4;
    }
}

// drawing functions
function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    canvasContext.restore();
}


// function drawText(words, textX, textY, drawColor) {
//     canvasContext.fillStyle = drawColor;
//     canvasContext.fillText(words, textX, textY);
// }

// function drawCicle(centerX, centerY, radius, drawColor) {
//     // car
//     canvasContext.fillStyle = drawColor;
//     canvasContext.beginPath();
//     canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
//     canvasContext.fill();
// }

function drawRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}
