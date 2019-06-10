function titleScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX, mousePosY);
	if(mousePosX > 200 && mousePosX < 300 && mousePosY > 400 && mousePosY < 450){
		vehicleList[0].computerPlayer = false;
		vehicleList[1].computerPlayer = true;
		titleScreen = false;
	} else if(mousePosX > 500 && mousePosX < 600 && mousePosY > 400 && mousePosY < 450){
		console.log('2 Players');
		vehicleList[0].computerPlayer = false;
		vehicleList[1].computerPlayer = false;
		titleScreen = false;
	}
}

function drawTitleScreen(){
	colorRect(0,0,canvas.width,canvas.height, 'black');	
	colorText("Little Racers", 310, 200, 'white', font = "24px Arial Black");
	colorRect(200,400,100,50, 'white');	
	colorRect(500,400,100,50, 'white');	
	colorText("1 Player", 215, 430, 'black', font = "14px Arial Black");
	colorText("2 Players", 515, 430, 'black', font = "14px Arial Black");
}