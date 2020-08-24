function drawRect(x, y, w, h, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, w, h);
}

function colorText(showWords, textX, textY, fillColor) {
  canvasContext.font = "16px Georgia";
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}
