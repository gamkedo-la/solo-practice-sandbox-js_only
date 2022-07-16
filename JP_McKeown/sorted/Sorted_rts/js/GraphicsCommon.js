function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}
function outlineRect(topLeftX, topLeftY, boxWidth, boxHeight, strokeColor) {
  canvasContext.strokeStyle = strokeColor;
  canvasContext.fillStyle = 'white';
  canvasContext.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function colorTriangle(x, y, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.moveTo(x, y);
  canvasContext.lineTo(x - HAT_WIDTH/2, y + HAT_HEIGHT);
  canvasContext.lineTo(x + HAT_WIDTH/2, y + HAT_HEIGHT);
  canvasContext.closePath();
  canvasContext.fill();
}
function drawHat(x, y, fillColor) {
  canvasContext.save();
  setShadow(4, 4, 5);
  colorTriangle(x, y, fillColor);
  canvasContext.restore();
}

function setShadow(x, y, blur) {
  canvasContext.shadowColor="rgba(100,0,100,0.5)";
  canvasContext.shadowOffsetX = x;
  canvasContext.shadowOffsetY = y;
  canvasContext.shadowBlur= blur;
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  canvasContext.restore(); // undo the translation movement and rotation since save()
}

function drawText(txt, x, y, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillText(txt, x, y);
}
