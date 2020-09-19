let canvas, canvasContext;

let ballX = 75;
let ballY = 75;

function drawRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
  canvasContext.fillStyle = color;

  // a new separate shape, not a continuation of a previous shape
  canvasContext.beginPath();

  // Draw circle
  // 0, Math.PI * 2 = draw a full circle
  //  true = draw counterclockwise
  canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);

  // Add color to circle
  canvasContext.fill();
}

window.onload = () => {
  canvas = document.querySelector("#gameCanvas");
  canvasContext = canvas.getContext("2d");

  setInterval(drawEverything, 1000);
};

function drawEverything() {
  // Clear the game view - fill with black
  drawRect(0, 0, canvas.width, canvas.height, "black");

  ballX += 50;

  drawCircle(ballX, ballY, 10, "white");
}
