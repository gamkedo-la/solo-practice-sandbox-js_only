// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;
var player = new Player();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  var framesPerSecond = 30;
  setInterval(function() {
    drawEverything();
    moveEverything();
  }, 1000/framesPerSecond);
  initInput();
}

function moveEverything() {
  player.move();
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'lightblue');
  player.init();
}