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
	spaceshipAutoReverse();
	angle += .01;
}


function moveShot() {
	if(shotActive) {
		shotY -= PLAYER_SHOT_SPEED;
		playerShotCheck();
	}
	if(alienShotActive){
		alienShotY += ALIEN_SHOT_SPEED;
		alienShotCheck();
	}
}



