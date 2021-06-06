var canvas, canvasContext;
var player = new playerClass();

window.onload = function () {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  imageLoadingDone();
}

function imageLoadingDone() {
  var framesPerSecond = 30;
  
  setInterval(function () {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);
  
  player.init(playerPic, "Blue");
  initInput();
}

function moveEverything() {
  player.move();
}

function drawEverything() {
  drawWorld();

  drawRect(10, 0, 0, canvas.width, canvas.height, "Black");
  colorCircle(canvas.width / 2, canvas.height / 2, 150, "Red");
  player.draw();
}