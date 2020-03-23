var canvas, canvasContext;
var framesPerSecond = 30;

var p1 = new player();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  
  
  setInterval(function() {    
    drawEverything();
    moveEverything();
  }, 1000/framesPerSecond);
  initInput();
}

function moveEverything() {
  p1.move();
}

function drawEverything() {
  // <-- background --> //
  // canvasContext.fillStyle = 'black';
  // x coord, y coord, width of canvas, height of canvas //
  // canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  colorRect(0, 0, canvas.width, canvas.height, 'black');
  p1.draw();
}