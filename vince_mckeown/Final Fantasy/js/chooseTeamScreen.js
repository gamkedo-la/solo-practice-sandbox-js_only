function drawChooseTeamScreen(){
	drawChooseTeamScreenBackground();
}

function drawChooseTeamScreenBackground(){
	let border = 1;
	let topScreenHeight = 50;
	let player1and2Height = 275;
	let player3and4Height = 275
	//create boxes
	colorRect(0, 0, canvas.width, canvas.height, 'black'); //background
	colorRect(border, border, canvas.width - (2 * border), topScreenHeight - (2 * border), 'white'); //top
	colorRect(border, topScreenHeight + border, (canvas.width * 1/2) - (2 * border), player1and2Height - (2 * border), 'white'); //player 1	
	colorRect((2*border) + (canvas.width * 1/2), topScreenHeight + border, (canvas.width * 1/2) - (2 * border), player1and2Height - (2 * border), 'white'); //player 2
	colorRect(border, topScreenHeight + player1and2Height + (2*border), (canvas.width * 1/2) - (2 * border), player1and2Height - (2 * border), 'white'); //player 3	
	colorRect((2*border) + (canvas.width * 1/2), topScreenHeight + player1and2Height + (2*border), (canvas.width * 1/2) - (2 * border), player1and2Height - (2 * border), 'white'); //player 4
	//label boxes
	colorText("Player 1", 150, 75, "black", "10px Arial Black");
	colorText("Player 2", 600, 75, "black", "10px Arial Black");
	colorText("Player 3", 150, 350, "black", "10px Arial Black");
	colorText("Player 4", 600, 350, "black", "10px Arial Black");
}



