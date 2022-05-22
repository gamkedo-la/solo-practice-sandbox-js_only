var canvas, canvasContext;
  
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
    
  jumperReset();
  loadImages();
}

function moveEverything() {
  jumperMove();
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  drawBackGround();
  drawBricks();
  
  canvasContext.fillStyle = 'white';
  canvasContext.fillText("Arrow keys to run, spacebar to jump",8,14);

  colorCircle(jumperX, jumperY, JUMPER_RADIUS, 'white');
}