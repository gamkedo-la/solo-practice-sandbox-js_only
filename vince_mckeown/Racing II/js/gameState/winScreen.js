var winScreenTime = 0;

function drawWinScreen(){
	colorRect(0,0,canvas.width,canvas.height, 'black');	
	colorText("Little Racers", 310, 200, 'white', font = "24px Arial Black");
	colorText("1st Place: ", 100, 250, 'white', font = "20px Arial Black");
	colorText("2nd Place: ", 100, 270, 'white', font = "20px Arial Black");
	colorText("3rd Place: ", 100, 290, 'white', font = "20px Arial Black");
	colorText("4th Place: ", 100, 310, 'white', font = "20x Arial Black");
	colorText("5th Place: ", 100, 330, 'white', font = "20px Arial Black");
	colorText("6th Place: ", 100, 350, 'white', font = "20px Arial Black");
	colorText("7th Place: ", 100, 370, 'white', font = "20px Arial Black");
	colorText("8th Place: ", 100, 390, 'white', font = "20x Arial Black");
}

function winScreenTimer(){
	winScreenTime++;
	if(winScreenTime == 300){
		winScreenTime = 0;
		winScreen = false;
	}
	
}
