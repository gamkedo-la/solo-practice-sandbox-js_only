// canvas variables
let canvas, canvasContext;

let blueCar = new carClass();
let greenCar = new carClass();

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  loadImages();
}

function imageLoadingDoneSoStartGame(){
  let framesPerSecond = 30; 
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();

  loadLevel(levelOne);
}

function loadLevel(whichLevel){
  trackGrid = whichLevel.slice();
  blueCar.reset(blueCarPic, "Blue Player");
  greenCar.reset(greenCarPic, "Green Player");
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  blueCar.move();
  greenCar.move();
}

function drawAll() {
  drawTracks();
  blueCar.draw();
  greenCar.draw();
}    
