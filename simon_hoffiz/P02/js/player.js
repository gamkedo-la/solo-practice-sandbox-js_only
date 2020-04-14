const PLAYER_SHIP_WIDTH = 150; //current width of pixel art
const PLAYER_SHIP_HEIGHT = 150; //current height of pixel art 
const PLAYER_POS_Y = 600 - PLAYER_SHIP_HEIGHT - 15;
const PLAYE_POS_X = 400 - PLAYER_SHIP_WIDTH/2;
const WIN_SCORE = 2;
var playerScore = 0;
var shieldRotationSpeed = 0;

function playerClass() {

	this.x = PLAYE_POS_X;
	this.y = PLAYER_POS_Y;
	this.speedBuffer = false;
	this.shield01 = true;

	this.draw = function() {
		//space ship
		if(spaceshipPicLoaded){
			ctx.drawImage(spaceshipPic, this.x, this.y);
		}

		//ship shield
		if(this.shield01) {
			drawBitmapCenteredAtLocationWithRotation(shieldPic, this.x + PLAYER_SHIP_WIDTH/2, this.y + PLAYER_SHIP_HEIGHT/2, shieldRotationSpeed);
		}
	}

	this.moveShield = function() {
		shieldRotationSpeed += .01;
	}

	this.playerLose = function() {
		mode = GAME_OVER;
	}

	this.spaceshipAutoReverse = function() {
		if(this.y <= PLAYER_POS_Y && this.speedBuffer) {
			this.y += 1;
		}
	}

	this.playerScoring = function() {
		playerScore ++;
		if(playerScore >= WIN_SCORE){
			mode = WIN_SCREEN;
		}
	}

	this.playerScore = function() {
		colorText("Score: " + playerScore, 700, 560, "15px arial", "white");
	}
}