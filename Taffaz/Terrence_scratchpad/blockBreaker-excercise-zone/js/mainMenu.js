var R = 0;
var G = 0;
var B = 0;
var incrementing = true;
var lastRoundScore = 0;

function mainMenuManager() {
	var mainMenuColor = "rgb(" + R + ", " + G + ", " + B + "," + 255 + ")";
	changeMainMenuColor();
	colorRect(0,0,canvas.width,canvas.height, mainMenuColor);
	mainMenuText();
}

function changeMainMenuColor() {
	if (incrementing) {
		B++;
		if (B > 100) {
			R++;
		} 
		if (R > 75) {
			G++;
		}
	}

	if (B >= 255) {
		incrementing = false;
	}

	if (!incrementing) {
		R--;
		G--;
		B--;
		if (B <= 0) {
			B = 0;
		}
		if (G <= 0) {
			G = 0;
		}
		if (R <= 0) {
			R = 0;
		}
		if (B == 0) {
			incrementing = true;
		}
	}
}

function mainMenuText() {
	var clickText = "Click to Start!";
	canvasContext.font = "30px Stalinist One";
	var clickTextMetrics = canvasContext.measureText(clickText);
	colorText(clickText, canvas.width/2 - clickTextMetrics.width/2,canvas.height/2, "white");
	//console.log("lastRoundScore: " + lastRoundScore);
	if (lastRoundScore == 0) {
		return;
	}
	var scoreText = "LAST ROUND SCORE: " + lastRoundScore;
	canvasContext.font = "18px Stalinist One";
	var scoreTextMetrics = canvasContext.measureText(scoreText);
	colorText(scoreText, canvas.width/2 - scoreTextMetrics.width/2,canvas.height*(2/3), "white");	
}
























