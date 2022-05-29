var canvas, canvasContext;
var player = new playerClass();
var slime = new slimeClass();
  
window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  initInput();
  
  // these next few lines set up our game logic and render to happen 30 times per second
  var framesPerSecond = 30;
  setInterval(function() {
      moveEverything();
      drawEverything();
    }, 1000/framesPerSecond);
  
  slime.reset();
  player.reset();
  loadImages();
}

function moveEverything() {
  slime.move();
  player.move();
  updatedCameraPosition();
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  drawBackGround();
  shiftForCameraPan();
    drawMiddleGround();
    drawBricks();
    slime.draw();
    player.draw();
  finishedCameraPan();
}