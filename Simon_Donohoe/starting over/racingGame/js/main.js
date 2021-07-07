// canvas variables
let canvas, canvasContext;

let p1 = new carClass();
let p2 = new carClass();

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

  p2.carInit(car2Pic, "Green Car");
  p1.carInit(carPic, "Blue Car");
  
  initInput();
}

function moveEverything(){
  p1.moveCar();
  p2.moveCar();
}

function drawEverything(){
  // draw track field
  drawTrack();

  // draw cars
  p1.drawCar();
  p2.drawCar();
}

// page 198