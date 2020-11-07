function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor)
{
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor)
{
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(string, textX,textY, fillColor, font)
{
	canvasContext.fillStyle = fillColor;
	canvasContext.font = font;
	canvasContext.fillText(string, textX,textY);
}

function drawImageAfterPivotedRotation(image, sourceX,sourceY, sourceWidth,sourceHeight, destinationX,destinationY,
									   destinationWidth,destinationHeight, pivotX,pivotY, angle)
{
	canvasContext.save();
	canvasContext.translate(pivotX,pivotY);
	canvasContext.rotate(angle);
	//(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	canvasContext.drawImage(image, sourceX,sourceY, sourceWidth,sourceHeight, 
							-destinationWidth/2,-destinationHeight/2, destinationWidth,destinationHeight);
	canvasContext.restore();
}