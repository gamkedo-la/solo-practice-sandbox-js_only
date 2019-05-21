var boxTopLeft = 540;

function drawLevelEditor(){
	colorRect(0,0,canvas.width,canvas.height, 'green');	
	for(var i = 0; i < 7; i++) {
		colorRect((i * 100 + 75), 540, 50, 50, 'grey')
	}
	drawBitmapCenteredAtLocationWithRotation(arrowPic, 100, boxTopLeft+25, 0);
	drawBitmapCenteredAtLocationWithRotation(arrowPic, 700, boxTopLeft+25, 3.14);
	colorText('Left', 90, boxTopLeft - 10, 'black', font = "14px Arial Black");
	colorText('Right', 685, boxTopLeft - 10, 'black', font = "14px Arial Black");
	for(var i = 1; i < 6; i++) {
		colorText(i, i * 100 + 95, boxTopLeft - 10, 'black', font = "14px Arial Black");
	}
}