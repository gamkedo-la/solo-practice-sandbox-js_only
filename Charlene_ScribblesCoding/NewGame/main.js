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
  canvasContext.beginPath();
  canvasContext.strokeStyle = "Black";
  canvasContext.lineWidth = 10;
  canvasContext.rect(0, 0, canvas.width, canvas.height);
  canvasContext.stroke();

  canvasContext.fillStyle = "Red";
  canvasContext.beginPath();
  canvasContext.arc(canvas.width / 2, canvas.height / 2, 150, 0, Math.PI * 2);
  canvasContext.fill();
}