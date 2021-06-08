// canvas variables
let canvas, canvasContext;

// car variables/constants
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = -0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;
let carX = 75, carY = 75;
let carSpeed = 0;
let carAng = -0.5 * Math.PI; // angle of car rotation
let carPic = document.createElement("img"); // make the car an image
let carPicLoaded = false;

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
  1, 2, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const TRACK_ROAD = 0;
  const TRACK_WALL = 1;
  const TRACK_PLAYER = 2;

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
function setKeyHoldState(thisKey, setTo) {
  if(thisKey == KEY_UP_ARROW){
    keyHeld_Gas = setTo;
  }
  if(thisKey == KEY_DOWN_ARROW){
    keyHeld_Reverse = setTo;
  }
  if(thisKey == KEY_LEFT_ARROW){
    keyHeld_TurnLeft = setTo;
  }
  if(thisKey == KEY_RIGHT_ARROW){
    keyHeld_TurnRight = setTo;
  }
}

function keyPressed(evt) {
  // document.getElementById("debugText").innerHTML = "KeyCode Pushed: " + evt.keyCode;

  setKeyHoldState(evt.keyCode, true);

  evt.preventDefault(); // without this, arrow keys scroll the browser
}
function keyReleased(evt) {
  // document.getElementById("debugText").innerHTML = "KeyCode Released: " + evt.keyCode;

  setKeyHoldState(evt.keyCode, false);
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
  // if(carX > canvas.width || carX < 0 || carY > canvas.height || carY < 0){ // if the car hits the left or right edge
  //   // carSpeed *= -1; // reverse the cars direction
  //   carSpeed = 0;
  // }

  if(keyHeld_Gas){
    carSpeed += DRIVE_POWER;
  }
  if(keyHeld_Reverse){
    carSpeed += REVERSE_POWER;
  }

  if(Math.abs(carSpeed) >= MIN_TURN_SPEED) {
    if(keyHeld_TurnLeft){
    carAng += -TURN_RATE * Math.PI; // same as: carAng -= 0.03* Math.PI;
    }
    if(keyHeld_TurnRight){
      carAng += TURN_RATE * Math.PI; 
    }
  }

  let nextX = carX + Math.cos(carAng) * carSpeed;
  let nextY = carY + Math.sin(carAng) * carSpeed; 

  if(checkForTrackAtPixelCoord(nextX, nextY)){
    carX = nextX;
    carY = nextY;
  } else {
    carSpeed = -0.5 * carSpeed;
  }

  // move the car to the right
  // carX += Math.cos(carAng) * carSpeed;
  // carY += Math.sin(carAng) * carSpeed;

  carSpeed = carSpeed * GROUNDSPEED_DECAY_MULT;
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

function drawCar() {
  // carAng += 0.2;
  if(carPicLoaded) {
    drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAng);
  }
}

function drawTrack(){
  for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){
    for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
      if(isWallAtTileCoord(eachCol, eachRow)){
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
  drawCar();

  // draw track field
  drawTrack();
}

function trackTileToIndex(trackColumn, trackRow){
  return (trackColumn + TRACK_COLS * trackRow);
}

function isWallAtTileCoord(trackTileCol, trackTileRow){
  let trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
  return(trackGrid[trackIndex] == TRACK_WALL);
}

function checkForTrackAtPixelCoord(pixelX, pixelY) {
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

  return (trackGrid[trackIndex] == TRACK_ROAD);
}

function carReset(){
  for(let i = 0; i < trackGrid.length; i++){
    if(trackGrid[i] == TRACK_PLAYER) {
      let tileRow = Math.floor(i/TRACK_COLS);
      let tileCol = i%TRACK_COLS;
      carX = tileCol * TRACK_W + 0.5*TRACK_W;
      carY = tileRow * TRACK_H + 0.5*TRACK_H;
      trackGrid[i] = TRACK_ROAD;
      document.getElementById("debugText").innerHTML = "Car starting at tile: ("+tileCol+", "+tileRow+") " + "Pixel coordinate: ("+carX+", "+carY+")";
      break; //found it so no need to keep searching
    }
  }
}

// page 159