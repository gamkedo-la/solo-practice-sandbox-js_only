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
  canvasContext.lineTo(x-10, y+24);
  canvasContext.lineTo(x+10, y+24);
  canvasContext.closePath();
  canvasContext.fill();
}
function drawHat(x, y, fillColor) {
  canvasContext.save();
  //canvasContext.fillStyle = fillColor;
  canvasContext.shadowColor="rgba(100,0,100,0.5)";
  canvasContext.shadowOffsetX = 4;
  canvasContext.shadowOffsetY = 4;
  canvasContext.shadowBlur= 5;
  colorTriangle(x, y, fillColor);
  canvasContext.restore();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  canvasContext.restore(); // undo the translation movement and rotation since save()
}

