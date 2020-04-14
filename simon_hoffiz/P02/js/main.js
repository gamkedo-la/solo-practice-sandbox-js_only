var c;
var ctx;
var fps = 30;



var shotActive = false;
var shotY;
var shotX;

var angle = 0;
var screenBuffer = 20;

var p1 = new playerClass();
var w1 = new playerBasicShotClass();
var a1 = new alienClass();
	
window.onload = function () {
	c = document.getElementById ('gameCanvas');
	ctx = c.getContext ('2d');
	imageLoading();

	setInterval (function() {
		drawEverything(),
		moveEverything()},
		1000/fps);

	initInput();
}	

function drawEverything() {

	//canvas
	
	ctx.fillStyle = 'black';
	ctx.fillRect (0, 0, c.width, c.height);

	//game screens
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
	//player basic shot
	w1.move();
	
	//others
	moveShot();
	a1.moveAlien();
	angle += .01; // shield rotation speed

}

function gameMode() {
	//player ship
	p1.draw();
	p1.spaceshipAutoReverse();
	//player basic shot
	w1.draw();
	w1.weaponReset();
	w1.shotCheck();

	//alien shot
	if(alienShotActive) {
		colorRect(alienShotX, alienShotY, 4, 10, 'white');
	}

	a1.draw();
	a1.respawnAlien();
	
	//player score
	p1.playerScore();
}

function moveShot() {
	if(alienShotActive){
		alienShotY += ALIEN_SHOT_SPEED;
		a1.alienShotCheck();
	}
}



