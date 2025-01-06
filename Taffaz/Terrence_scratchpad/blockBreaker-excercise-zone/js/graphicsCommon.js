function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor, font) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX,textY);
	canvasContext.font = "Stalinist One";
}

function drawBitmap(graphic, atX, atY) {
  canvasContext.drawImage(graphic,atX,atY);
}

function drawBitmapCenteredAtLocation(graphic, atX, atY) {
  canvasContext.drawImage(graphic,atX-graphic.width/2,atY-graphic.height/2);
}