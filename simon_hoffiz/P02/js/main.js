var c;
var ctx;
var fps = 30;

var screenBuffer = 20;

var p1 = new playerClass();
var w1 = new playerBasicShotClass();
var z1 = new basicAlienClass();
var powerUp1 = new basicPowerUpClass();
var starList = [];

window.onload = function () {
	c = document.getElementById ('gameCanvas');
	ctx = c.getContext ('2d');
	imageLoading();
	starInit();

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
	//player
	p1.moveShield();
	starMove();	
}

function gameMode() {
	starDraw();
	//player ship
	p1.draw();
	p1.spaceshipAutoReverse();


	//player basic shot
	if(w1.basicWeaponActive == true) {
		w1.draw();
		w1.move();
		w1.shotCheck();
	}

	//basic enemy 
	z1.draw();
	z1.move();
	z1.basicShot();
	z1.shotCheck();
	z1.respawnAlien();
	
	//player score
	p1.playerScore();

	//power ups
	powerUp1.draw();
	powerUp1.move();
	powerUp1.shieldPowerUp();
	powerUp1.respawn();
}




