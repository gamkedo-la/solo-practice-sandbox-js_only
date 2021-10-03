function drawBitmapCenteredWithRotation(bitmap, xPos, yPos, angle)
{
    canvasContext.save();
    canvasContext.translate(xPos, yPos);
    canvasContext.rotate(angle);
    canvasContext.drawImage(bitmap, -bitmap.width/2, -bitmap.height/2);
    canvasContext.restore();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor)
{
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor)
{
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 10, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor)
{
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX, textY);
}