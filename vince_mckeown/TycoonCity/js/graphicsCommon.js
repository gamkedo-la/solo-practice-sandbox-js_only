function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}
			
function colorCircle(centerX, centerY, radius, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
	canvasContext.fill();
}

function drawBitmapAtLocation(graphic, atX, atY){
	canvasContext.save();
	canvasContext.translate(atX,atY); //sets the point where the car graphic goes
	canvasContext.drawImage(graphic, 0, 0); //center, draws car
	canvasContext.restore();
}