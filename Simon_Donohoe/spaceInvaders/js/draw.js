
function drawNet() {
  for (let i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, "white");
  }
}

function drawEverything() {
  // draws the canvas(the playfield) in black
  colorRect(0, 0, canvas.width, canvas.height, "black");

  if (showingWinScreen) {
    canvasContext.fillStyle = "white";
    if (player1Score >= WINNING_SCORE) {
      canvasContext.fillText("Left Player Won", 350, 150);
    } else if (player2Score >= WINNING_SCORE) {
      canvasContext.fillText("Right Player Won", 350, 150);
    }

    canvasContext.fillText("Click to start a new game", 340, 250);
    return;
  }

  drawNet();

  // left player paddle
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

  // right computer paddle
  colorRect(
    canvas.width - PADDLE_THICKNESS,
    paddle2Y,
    PADDLE_THICKNESS,
    PADDLE_HEIGHT,
    "white"
  );

  // draws the ball
  colorCircle(ballX, ballY, 10, "white");

  // scoreboard text
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

// function to draw a circle/ball
function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

//function to draw a rectangle/paddle
function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}