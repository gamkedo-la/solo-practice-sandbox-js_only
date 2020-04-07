var c;
var ctx;
var fps = 30;

var playerScore = 0;
const WIN_SCORE = 1;

var shotActive = false;
var shotY;
var shotY;
const PLAYER_SHOT_SPEED = 10;

var angle = 0;
var screenBuffer = 20;

var p1 = new playerClass();
	
window.onload = function () {
	imageLoading();

	setInterval (function() {
		drawEverything(),
		moveEverything()},
		1000/fps);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
}	

function drawEverything() {

	//canvas
	c = document.getElementById ('gameCanvas');
	ctx = c.getContext ('2d');
	ctx.fillStyle = 'black';
	ctx.fillRect (0, 0, c.width, c.height);

	//game screen
	if(mode == GAME_SCREEN){
		gameMode();
		}

	//win screen
	if(mode == WIN_SCREEN) {
		winScreen();
		}

	//game over screen
	if(mode == GAME_OVER) {
		gameOverScreen();
		}

	//title screen
	if(mode == TITLE_SCREEN) {
		titleScreen();
	}

	//main menu
	if(mode == MAIN_MENU) {
		mainMenuScreen();
	}
	
	//credits
	if(mode == CREDIT_SCREEN) {
		creditScreen();
	}

}

function moveEverything() {
	moveShot();
	moveAlien();
	angle += .01;
}

function gameMode() {

	//player shot
	if(shotActive) {
		colorCircle(shotX, shotY, 3, 'white'); 
		//colorRect(shotX, shotY, 4, 10,'white');
	}

	//alien
	if(alienDestroyed == false) {
		ctx.drawImage(alienShipPic, alienPosX, alienPosY);
		//colorRect(alienPosX, alienPosY, ALINE_WIDTH, ALIEN_HEIGHT, alienColor);
	}

	if(alienShotActive) {
		colorRect(alienShotX, alienShotY, 4, 10, 'white');
	}


	p1.draw();
	p1.spaceshipAutoReverse();

	
	//player score
	colorText("Score: " + playerScore, 700, 560, "15px arial", "white");

	respawnAlien();

}

function moveShot() {
	if(shotActive) {
		shotY -= PLAYER_SHOT_SPEED;
		p1.shotCheck();
	}
	if(alienShotActive){
		alienShotY += ALIEN_SHOT_SPEED;
		alienShotCheck();
	}
}



