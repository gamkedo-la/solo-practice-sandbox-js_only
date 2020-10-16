let carPic = document.createElement("img"); // variable for image of car
let carPicLoaded = false; // variable to later see if car image is loaded

// ball starting position variables
let ballX = 75;
let ballY = 75;

// ball speed variables
let ballSpeedX = 5;
let ballSpeedY = 7;

// track constants and variables
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

// track layout
let trackGrid = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
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

// canvas variables
let canvas, canvasContext;

let mouseX = 0;
let mouseY = 0;

function updateMousePos(evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  //cheat / hack to test ball in any position
    // ballX = mouseX;
    // ballY = mouseY;
    // ballSpeedX = 3;
    // ballSpeedY = -4;
}

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", updateMousePos);

  carPic.onload = function(){
    carPicLoaded = true; // Car image set after this function, so set to true
  }
  carPic.src = "playerOneCar.png"; // Car image

  ballReset();
}

function updateAll() {
  moveAll();
  drawAll();
}

function ballReset() {
  for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
    for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){

      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if(trackGrid[arrayIndex] == 2){
        trackGrid[arrayIndex] = 0;
        ballX = eachCol * TRACK_W + TRACK_W/2;
        ballY = eachRow * TRACK_H + TRACK_H/2;
      }
    }
  }
}

function ballMove(){
  // updates the ball position
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // changes the direction when it reaches the boundary
  
  if (ballY < 0 && ballSpeedY < 0.0) { //top
    ballSpeedY *= -1;
  }
  if (ballX > canvas.width && ballSpeedX > 0.0) { // right
    ballSpeedX *= -1;
  }
  if (ballY > canvas.height) { // bottom
    ballReset();
    trackReset();
    // ballSpeedY *= -1;
  }
  if (ballX < 0 && ballSpeedX < 0.0) { //left
    ballSpeedX *= -1;
  }
}

function isTrackAtColRow(col, row){
  if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS){  
    let trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return (trackGrid[trackIndexUnderCoord] == 1);
  }else{
    return false;
  }
}

function ballTrackHandling(){
  let ballTrackCol = Math.floor(ballX / TRACK_W); //Math.floor removes the decimal places from the cursor. Rounds down.
  let ballTrackRow = Math.floor(ballY / TRACK_H);
  let trackIndexUnderBall = rowColToArrayIndex(ballTrackCol, ballTrackRow);

  if(ballTrackCol >= 0 && ballTrackCol < TRACK_COLS && ballTrackRow >= 0 && ballTrackRow < TRACK_ROWS){

    if(isTrackAtColRow(ballTrackCol, ballTrackRow)){

      let prevBallX = ballX - ballSpeedX;
      let prevBallY = ballY - ballSpeedY;
      let prevTrackCol = Math.floor(prevBallX / TRACK_W);
      let prevTrackRow = Math.floor(prevBallY / TRACK_H);
      let bothTestsFailed = true;

      if(prevTrackCol != ballTrackCol){
        if(isTrackAtColRow(prevTrackCol, prevTrackRow) == false){
          ballSpeedX *= -1;
          bothTestsFailed = false;
        }
      }
      if(prevTrackRow != ballTrackRow){
        if(isTrackAtColRow(ballTrackCol, ballTrackRow) == false){
          ballSpeedY *= -1;
          bothTestsFailed = false;
        }
      }
      if(bothTestsFailed){ //armpit case prevents ball from going right through
        ballSpeedX *= -1;
        ballSpeedY *= -1;
      }
    
    } //end of track found
  } // end of valid col and row
} // end of ballTrackHandling func

function moveAll() {
  //ballMove();
  ballTrackHandling();
}

function rowColToArrayIndex(col, row){
return col + TRACK_COLS * row;
}

function drawTracks(){

  for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
    for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){

      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);

      if(trackGrid[arrayIndex] == 1){
        colorRect(TRACK_W * eachCol, TRACK_H * eachRow, TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, 'blue');
      } //end of is this track here
    } // end of for each track
  } // end of drawTrack function
}

function drawAll() {
  // drawing the canvas
  colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen

  //colorCircle(ballX, ballY, 10, "white"); // drawing the ball
  if(carPicLoaded){
    canvasContext.drawImage(carPic, ballX - carPic.width/2, ballY - carPic.height/2);
  }
  drawTracks();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, 8, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor){
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}