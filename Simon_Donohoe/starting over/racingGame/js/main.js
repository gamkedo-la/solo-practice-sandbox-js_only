// canvas variables
let canvas, canvasContext;

let p1 = new carClass();

window.onload = function(){
  // game canvas
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  loadImages();
}

function loadingDoneSoStartGame() {
  // set up our game logic and render to happen 30 times per second
  let framesPerSecond = 30;
  setInterval(function(){ 
    moveEverything();
    drawEverything();
  }, 1000/framesPerSecond);

  p1.carInit();
  initInput();
}

function moveEverything(){
  p1.moveCar();
}

function drawEverything(){
  // // fill game canvas with black
  // colorRect(0, 0, canvas.width, canvas.height, "black");

  // draw track field
  drawTrack();

  // draw a circle(game car)
  // colorCircle(carX, carY, 10, "white");
  p1.drawCar();
}

// page 195