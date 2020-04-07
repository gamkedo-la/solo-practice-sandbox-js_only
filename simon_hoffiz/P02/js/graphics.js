//Common Graphics Functions
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	ctx.fillStyle = fillColor;
	ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    ctx.fill();
}

function colorEmptyCircle(centerX, centerY, radius, strokeColor) {
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
	ctx.strokeStyle = strokeColor;
	ctx.stroke();
}

function colorText(text, posX, posY, font, color) {
	ctx.fillStyle = color;
	ctx.font = font;
	ctx.fillText (text, posX, posY);
}

function colorLine(startX, startY, endX, endY, lineWidth, fillColor) {
	ctx.strokeStyle = fillColor;
	ctx.lineWidth = lineWidth;
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
	ctx.save(); // allows us to undo translate movement and rotate spin
	ctx.translate(atX,atY); // sets the point where our graphic will go
	ctx.rotate(withAngle); // sets the rotation
	ctx.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
	ctx.restore(); // undo the translation movement and rotation since save()
}
