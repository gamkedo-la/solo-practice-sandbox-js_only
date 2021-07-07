function drawLineRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColour, lineColour) {
    ctx.fillStyle = fillColour;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
    ctx.strokeStyle = lineColour;
    ctx.strokeWidth = 1;
    ctx.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function drawFillRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColour) {
    ctx.fillStyle = fillColour;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}
    
function drawCircle(centerX, centerY, radius, fillColour) {
    ctx.fillStyle = fillColour;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    ctx.fill();
}

function drawText(content, textX, textY, fillColour, font) {
	ctx.font = '24px Arial';
	ctx.fillStyle = fillColour;
	ctx.fillText(content, textX, textY);
}

function drawBitmapWithRotationCenteredXY(img, atX, atY, withAngle) {
  ctx.translate(atX,atY); // sets the point where our image will go
  ctx.rotate(withAngle); // sets the rotation
  ctx.drawImage(img, -img.width/2, -img.height/2); // center, draw
  ctx.save(); // allows us to undo translate movement and rotate spin
  ctx.restore(); // undo the translation movement and rotation since save()
}

function drawBitmapCenteredXY(img, x, y) {
  ctx.save(); // allows us to undo translate movement and rotategr spin
  ctx.translate(atX,atY); // sets the point where our image will go
  ctx.drawImage(img, -img.width/2, -img.height/2); // center, draw
  ctx.restore(); // undo the translation movement and rotation since save()
}