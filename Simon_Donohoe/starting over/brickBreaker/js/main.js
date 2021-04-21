let ballX = 75, ballY = 75;
let canvas, canvasContext;

window.onload = function(){
  // game canvas
  canvas = document.createElement('gameCanvas');
  canvasContext = canvas.getContext('2d');

  setInterval(drawEverything, 1000);
}

function drawEverything(){
  // fill game canvas with black
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0,0, canvas.width, canvas.height);

  ballX += 50;
  console.log("ballX is now: " + ballX);

  // draw a circle(game ball)
  canvasContext.fillStyle = "white";
  canvasContext.beginPath();
  canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
  canvasContext.fill();
}

// page 53