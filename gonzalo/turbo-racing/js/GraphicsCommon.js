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

function colorCircle(centerX, centerY, radius, fillColor, alpha) {
  if (typeof(alpha) == 'undefined') {
	alpha = 1;
  }
  const oldAlpha = canvasContext.globalAlpha;
  canvasContext.globalAlpha = alpha;
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
  canvasContext.globalAlpha = oldAlpha;
}

function colorTextCentered(showWords, textX, textY, fillColor, font = "14px Arial Black") {
  canvasContext.save();
  canvasContext.textAlign = "center";
  canvasContext.fillStyle = fillColor;
  canvasContext.font = font;
  canvasContext.fillText(showWords, textX, textY);
  canvasContext.restore();
}
