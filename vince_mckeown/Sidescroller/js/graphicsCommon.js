function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}
  
function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor, font = "14px Arial Black") {
    canvasContext.textAlign = "left";
    canvasContext.fillStyle = fillColor;
    canvasContext.font = font;
    canvasContext.fillText(showWords, textX, textY);
  }