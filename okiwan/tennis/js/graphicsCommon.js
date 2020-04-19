function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(leftX, topY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(leftX, topY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function drawNet() {
  for (var i=0; i < canvas.height; i+=40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
  }
}

function printScore(drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.font = "50px sans-serif";
    canvasContext.fillText(paddle1Score, canvas.width / 5, 100);
    canvasContext.fillText(paddle2Score, canvas.width - (canvas.width / 4), 100);
}

