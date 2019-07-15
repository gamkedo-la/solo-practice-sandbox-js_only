var canvas, canvasContext;
var gameScreenStates = {
		mainMenu: true,
	};

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	loadImages();
}

function loadingDoneSoStartGame(){	
	var framesPerSecond = 30;
	setInterval(function() {
		updateAll();
	}, 1000/framesPerSecond);
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('mouseup', ballServe);
	brickReset();
}

function updateAll() {
	if (gameScreenStates.mainMenu) {
		mainMenuManager();
		return;
	}
	moveAll();
	drawAll();
}	

function drawAll() {
	drawBitmap(backgroundPic, 0, 0);
	drawBall();
	drawPaddle();
	drawBricks();
	drawLives();
	colorText(score, 25, 25, "white", "30px Arial");			
}

function moveAll() {
	ballMove();
	
	ballBrickHandling();
	
	ballPaddleHandling();
}

function gameReset() {
	if (lives <= -1) {
		lastRoundScore = score;
		gameScreenStates.mainMenu = true;
		score = 0;
		lives = 2;
		brickReset();
	}
}