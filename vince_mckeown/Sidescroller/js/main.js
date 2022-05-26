var canvas, canvasContext;
var player = new playerClass();
  
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
    
  player.reset();
  loadImages();
}

function moveEverything() {
  player.move();
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  drawBackGround();
  drawMiddleGround();
  drawBricks();
  
  player.draw();
}