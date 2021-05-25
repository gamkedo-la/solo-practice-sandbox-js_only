// canvas variables
let canvas, canvasContext;

// car variables/constants
let carX = 400, carY = 400;
let carSpeedX = 2, carSpeedY = 5;
const CARDIAMETER = 10;

// track variables/constants
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 1;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
let trackGrid = new Array(TRACK_COLS * TRACK_ROWS);
let totalTrackCount;

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

window.onload = function(){
  // game canvas
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  let framesPerSecond = 60;
  setInterval(function(){ 
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  resetTracks();
}

function moveEverything(){
  if(carX > canvas.width || carX < 0){ // if the car hits the left or right edge
    carSpeedX *= -1; // reverse the cars direction
  }

  if(carY < 0){ // if the car hits the top
    carSpeedY *= -1; // reverse the cars direction
  }

  if(carY > canvas.height){ // if the car passes the bottom of the canvas
    carX = 400, carY = 400; // reset the car
  }

  if(carSpeedY > 0) {
    
  }

  breakAndBounceOffTrackAtPixelCoord(carX, carY);

  // move the car to the right
  carX += carSpeedX;
  carY += carSpeedY;
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor){
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function drawTracks(){
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
  colorCircle(carX, carY, CARDIAMETER, "white");

  // draw track field
  drawTracks();
}

function resetTracks() {
  totalTrackCount = 0;

  for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){
    for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
      let arrayIndex = trackTileToIndex(eachCol, eachRow);
        trackGrid[arrayIndex] = 1;
        totalTrackCount++;
    }
  }
}

function trackTileToIndex(trackColumn, trackRow){
  return (trackColumn + TRACK_COLS * trackRow);
}

function isTrackAtTileCoord(trackTileCol, trackTileRow){
  let trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
  return(trackGrid[trackIndex] == 1);
}

function breakAndBounceOffTrackAtPixelCoord(pixelX, pixelY) {
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
    trackGrid[trackIndex] = 0; // remove track that got hit
    totalTrackCount--;
    console.log(totalTrackCount);
  }
}

// page 125