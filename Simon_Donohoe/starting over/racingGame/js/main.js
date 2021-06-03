// canvas variables
let canvas, canvasContext;

// car variables/constants
let carX = 75, carY = 75;
let carSpeed = 0;
let carPic = document.createElement("img"); // make the car an image
let carPicLoaded = false;
let carAng = 0; // angle of car rotation

// track variables/constants
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 1;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
let trackGrid =
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
  1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// arrow keys for player1 car movement
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

// keyboard hald state variables, to use keys more like buttons
let keyHeld_Gas = false;
let keyHeld_Reverse = false;
let keyHeld_TurnLeft = false;
let keyHeld_TurnRight = false;


function calculateMousePos(evt) {
  let rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;

  // console.log(mouseX, mouseY);
  return{
    x: mouseX,
    y: mouseY
  };
}

function keyPressed(evt) {
  document.getElementById("debugText").innerHTML = "KeyCode Pushed: " + evt.keyCode;

  if(evt.keyCode == KEY_UP_ARROW){
    keyHeld_Gas = true;
  }
  if(evt.keyCode == KEY_DOWN_ARROW){
    keyHeld_Reverse = true;
  }
  if(evt.keyCode == KEY_LEFT_ARROW){
    keyHeld_TurnLeft = true;
  }
  if(evt.keyCode == KEY_RIGHT_ARROW){
    keyHeld_TurnRight = true;  
  }

  evt.preventDefault();
}
function keyReleased(evt) {
  document.getElementById("debugText").innerHTML = "KeyCode Released: " + evt.keyCode;

  if(evt.keyCode == KEY_UP_ARROW){
    keyHeld_Gas = false;
  }
  if(evt.keyCode == KEY_DOWN_ARROW){
    keyHeld_Reverse = false;
  }
  if(evt.keyCode == KEY_LEFT_ARROW){
    keyHeld_TurnLeft = false;
  }
  if(evt.keyCode == KEY_RIGHT_ARROW){
    keyHeld_TurnRight = false;  
  }
}

window.onload = function(){
  // game canvas
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  // load car image
  carPic.onload = function(){
    carPicLoaded = true; // don't try to display until it's loaded
  }
  carPic.src = "./img/player1.png";

  let framesPerSecond = 60;
  setInterval(function(){ 
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);
  carReset();

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

function moveEverything(){
  if(carX > canvas.width || carX < 0 || carY > canvas.height || carY < 0){ // if the car hits the left or right edge
    // carSpeed *= -1; // reverse the cars direction
    carSpeed = 0;
  }

  if(keyHeld_Gas){
    carSpeed += 0.5;
  }
  if(keyHeld_Reverse){
    carSpeed += -0.5;
  }
  if(keyHeld_TurnLeft){
    carAng += -0.03 * Math.PI; // same as: carAng -= 0.03* Math.PI;
  }
  if(keyHeld_TurnRight){
    carAng += 0.03 * Math.PI; 
  }

  // bounceOffTrackAtPixelCoord(carX, carY);

  // move the car to the right
  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

// function colorCircle(centerX, centerY, radius, fillColor){
//   canvasContext.fillStyle = fillColor;
//   canvasContext.beginPath();
//   canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
//   canvasContext.fill();
// }

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX, atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); //sets the rotation
  canvasContext.drawImage(graphic, -graphic.width / 2, -graphic.height / 2); // center, draw
  canvasContext.restore(); //undo the translation movement and rotation since save()
}

function carDraw() {
  // carAng += 0.2;
  if(carPicLoaded) {
    drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAng);
  }
}

function drawTrack(){
  for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){
    for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
      if(isTrackAtTileCoord(eachCol, eachRow)){
        let trackLeftEdgeX = eachCol * TRACK_W;
        let trackTopEdgeY = eachRow * TRACK_H;
        
        colorRect(trackLeftEdgeX, trackTopEdgeY, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, 'blue');
      }
    }
  }
}

function drawEverything(){
  // fill game canvas with black
  colorRect(0, 0, canvas.width, canvas.height, "black");

  // draw a circle(game car)
  // colorCircle(carX, carY, 10, "white");
  carDraw();

  // draw track field
  drawTrack();
}

function trackTileToIndex(trackColumn, trackRow){
  return (trackColumn + TRACK_COLS * trackRow);
}

function isTrackAtTileCoord(trackTileCol, trackTileRow){
  let trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
  return(trackGrid[trackIndex] == 1);
}

function bounceOffTrackAtPixelCoord(pixelX, pixelY) {
  // two variables to find out which track was hit
  let trackColumn = pixelX / TRACK_W; 
  let trackRow = pixelY / TRACK_H;

  // using Math.floor to round the number down
  trackColumn = Math.floor(trackColumn); 
  trackRow = Math.floor(trackRow);

  if(trackColumn < 0 || trackColumn >= TRACK_COLS || trackRow < 0 || trackRow >= TRACK_ROWS){
    return false;
  }

  let trackIndex = trackTileToIndex(trackColumn, trackRow);

  if(trackGrid[trackIndex] == 1){
    // ok, so we know we overlap a track now
    // let's backtrack to see whether we changed rows or cols on way in
    let prevCarX = carX - carSpeedX;
    let prevCarY = carY - carSpeedY;
    let prevTrackColumn = Math.floor(prevCarX / TRACK_W);
    let prevTrackRow = Math.floor(prevCarY / TRACK_H);

    let bothTestsFailed = true;

    if(prevTrackColumn != trackColumn){// must have come in horizontally
      let adjacentTrackIndex = trackTileToIndex(prevTrackColumn, trackRow);
      // make sure the side we want to reflect off isn't blocked!
      if(trackGrid[adjacentTrackIndex] != 1){
        carSpeedX *= -1;
        bothTestsFailed = false;
      }
    }
    if(prevTrackRow != trackRow){// must have come in vertically
      let adjacentTrackIndex = trackTileToIndex(trackColumn, prevTrackRow);
      // make sure the side we want to reflect off isn't blocked!
      if(trackGrid[adjacentTrackIndex] != 1){
        carSpeedY *= -1;
        bothTestsFailed = false;
      }
    }
    // we hit an "armpit" on the inside corner, flip both to avoid going into it
    if(bothTestsFailed){
      carSpeedX *= -1;
      carSpeedY *= -1;
    }
  }
}

function carReset(){
  carX = canvas.width/2+50;
  carY = canvas.width/2;
}

// page 147