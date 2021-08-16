'use strict';
function colourCircle(x, y, radius, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI*2, true); 
    canvasContext.fill();
}

function colourRectangle(x, y, width, height, colour) {
    canvasContext.fillStyle = colour;
    canvasContext.fillRect(x, y, width, height); 
}

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