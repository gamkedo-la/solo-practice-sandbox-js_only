var eCanvas, eCanvasContext;

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	eCanvasContext.fillStyle = fillColor;
	eCanvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
	eCanvasContext.fillStyle = fillColor;
	eCanvasContext.beginPath();
	eCanvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	eCanvasContext.fill();
}

function colorEmptyCircle(centerX, centerY, radius, strokeColor) {
	eCanvasContext.beginPath();
	eCanvasContext.arc(centerX, centerY, radius, 0, Math.PI*2);
	eCanvasContext.strokeStyle = strokeColor;
	eCanvasContext.stroke();
}

function colorLine(startX, startY, endX, endY, lineWidth, fillColor) {
	eCanvasContext.strokeStyle = fillColor;
	eCanvasContext.lineWidth = lineWidth;
	eCanvasContext.beginPath();
	eCanvasContext.moveTo(startX, startY);
	eCanvasContext.lineTo(endX, endY);
	eCanvasContext.stroke();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
	eCanvasContext.save(); // allows us to undo translate movement and rotate spin
	eCanvasContext.translate(atX,atY); // sets the point where our graphic will go
	eCanvasContext.rotate(withAngle); // sets the rotation
	eCanvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
	eCanvasContext.restore(); // undo the translation movement and rotation since save()
}

function colorText(showWords, textX,textY, fillColor, font = "30px Arial", alignmant = "left") {
	eCanvasContext.textAlign = alignmant;

	eCanvasContext.font = font;
	eCanvasContext.fillStyle = fillColor;
    eCanvasContext.fillText(showWords, textX, textY);
}


var pCanvas, pCanvasContext;

function pColorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	pCanvasContext.fillStyle = fillColor;
	pCanvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}