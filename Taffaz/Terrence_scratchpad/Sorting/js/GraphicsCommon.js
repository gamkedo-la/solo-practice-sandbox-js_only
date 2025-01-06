function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorText(showWords, textX,textY, fillColor = 'black',align = 'left', font = '14px Times New Roman') {
	var originalColour = canvasContext.fillStyle;
	var originalFont = canvasContext.font;
	var originalAlignment = canvasContext.textAlign;

	canvasContext.fillStyle = fillColor;
	canvasContext.font = font;
	canvasContext.textAlign = align;
	canvasContext.fillText(showWords, textX,textY);
	
	canvasContext.fillStyle = originalColour;
	canvasContext.font = originalFont;
	canvasContext.textAlign = originalAlignment;
}