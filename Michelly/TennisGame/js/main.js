let canvas, canvasContext;

let ballX = 75;
let ballY = 75;
let ballSpeedX = -2;
let ballSpeedY = 2;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
let playerPaddleY = 250;

function calculateMousePosition(e) {
  // getBoundingClientRect returns the size of an element and its position relative to the viewport
  let canvasBoundaries = canvas.getBoundingClientRect();
  let rootElement = document.documentElement;

  // Account for the margins, canvas position on page, scroll amount
  let mouseX = e.clientX - canvasBoundaries.left - rootElement.scrollLeft;
  let mouseY = e.clientY - canvasBoundaries.top - rootElement.scrollTop;

  return {
    x: mouseX,
    y: mouseY,
  };
}

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

  // Call the update function around 30 times per second
  const framesPerSecond = 30;

  setInterval(updateGame, 1000 / framesPerSecond);

  canvas.addEventListener("mousemove", (e) => {
    let mousePos = calculateMousePosition(e);

    // Center mouse on paddle's center
    playerPaddleY = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

function updateGame() {
  moveEverything();
  drawEverything();
}

function moveEverything() {
  if (ballX >= canvas.width) {
    ballReset();
  }

  if (ballX <= 0) {
    if (ballY > playerPaddleY && ballY < playerPaddleY + PADDLE_HEIGHT) {
      ballSpeedX *= -1;
    } else {
      ballReset();
    }
  }

  if (ballY >= canvas.height || ballY <= 0) {
    ballSpeedY *= -1;
  }

  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

function ballReset() {
  ballX = canvas.width / 2 + 10;
  ballY = canvas.height / 2 + 10;
}

function drawEverything() {
  // Clear the game view - fill with black
  drawRect(0, 0, canvas.width, canvas.height, "black");

  drawRect(0, playerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

  drawCircle(ballX, ballY, 10, "white");
}
