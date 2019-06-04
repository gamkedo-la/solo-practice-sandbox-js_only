function titleScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX, mousePosY);
	if(mousePosX > 200 && mousePosX < 300 && mousePosY > 400 && mousePosY < 450){
		playerOne.computerPlayer = false;
		playerTwo.computerPlayer = true;
		titleScreen = false;
	} else if(mousePosX > 500 && mousePosX < 600 && mousePosY > 400 && mousePosY < 450){
		console.log('2 Players');
		playerOne.computerPlayer = false;
		playerTwo.computerPlayer = false;
		titleScreen = false;
	}
}