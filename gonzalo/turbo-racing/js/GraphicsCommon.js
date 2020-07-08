function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle) {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAngle);
  canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2);
  canvasContext.restore();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = 'white';
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function colorTextCentered(showWords, textX, textY, fillColor, font = "14px Arial Black") {
  canvasContext.save();
  canvasContext.textAlign = "center";
  canvasContext.fillStyle = fillColor;
  canvasContext.font = font;
  canvasContext.fillText(showWords, textX, textY);
  canvasContext.restore();
}
