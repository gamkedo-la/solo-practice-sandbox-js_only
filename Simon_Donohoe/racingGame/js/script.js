// canvas variables
let canvas, canvasContext;

window.onload = function () {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  let framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();

  carImageLoad();
  carReset();
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  carMove();
  carTrackHandling();
}

function clearScreen(){
  colorRect(0, 0, canvas.width, canvas.height, "black"); //clear screen
}

function drawAll() {
  clearScreen();
  carDraw();
  drawTracks();
}    
