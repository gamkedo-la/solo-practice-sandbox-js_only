'use strict';
function colourCircle(x, y, radius, colour) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true); 
    ctx.fill();
}

function colourRectangle(x, y, width, height, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, width, height); 
}

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

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle) {
  ctx.save(); // allows undo of translate and rotate
  ctx.translate(atX, atY); // sets point where graphic will go
  ctx.rotate(withAngle); // sets rotation
  ctx.drawImage(graphic, -graphic.width/2, -graphic.height/2); // center, draw
  ctx.restore(); // undo translation and rotation since save()
}