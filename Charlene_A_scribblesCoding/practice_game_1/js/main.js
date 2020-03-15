var canvas, canvasContext;
var framesPerSecond = 30;

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  setInterval(function() {    
    drawEverything();
  }, 1000/framesPerSecond);
}

function drawEverything() {
  // <-- background --> //
  // canvasContext.fillStyle = 'black';
  // x coord, y coord, width of canvas, height of canvas //
  // canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  // temp character
  colorRect(80, 400, 20, 30, 'white');
}