var winScreenTime = 0;

function drawWinScreen(){
	colorRect(0,0,canvas.width,canvas.height, 'black');	
	colorText("Little Racers", 310, 200, 'white', font = "24px Arial Black");
	colorText("1st Place: " + firstPlace, 100, 250, 'white', font = "20px Arial Black");
	colorText("2nd Place: " + secondPlace, 100, 270, 'white', font = "20px Arial Black");
	colorText("3rd Place: " + thirdPlace, 100, 290, 'white', font = "20px Arial Black");
	colorText("4th Place: " + fourthPlace, 100, 310, 'white', font = "20x Arial Black");
	colorText("5th Place: " + fifthPlace, 100, 330, 'white', font = "20px Arial Black");
	colorText("6th Place: " + sixthPlace, 100, 350, 'white', font = "20px Arial Black");
	colorText("7th Place: " + seventhPlace, 100, 370, 'white', font = "20px Arial Black");
	colorText("8th Place: " + eigthPlace, 100, 390, 'white', font = "20x Arial Black");
}

function winScreenTimer(){
	winScreenTime++;
	if(winScreenTime == 200){
		winScreenTime = 0;
		winScreen = false;
		carUpgradeScreen = true;
	}
	
}
