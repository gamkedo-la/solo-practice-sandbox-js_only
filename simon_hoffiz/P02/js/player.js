const PLAYER_SHIP_WIDTH = 60; //current width of pixel art
const PLAYER_SHIP_HEIGHT = 80; //current height of pixel art 
const WIN_SCORE = 2;
var playerScore = 0;

function playerClass() {

	this.x = 380;
	this.y = 460;
	this.speedBuffer = false;
	this.shield01 = true;

	this.draw = function() {
		//space ship
		if(spaceshipPicLoaded){
			ctx.drawImage(spaceshipPic, this.x, this.y);
		}

		//ship shield
		if(this.shield01) {
			drawBitmapCenteredAtLocationWithRotation(shieldPic, this.x + PLAYER_SHIP_WIDTH/2, this.y + PLAYER_SHIP_HEIGHT/2, angle);
		}
	}

	this.playerLose = function() {
		mode = GAME_OVER;
	}

	this.spaceshipAutoReverse = function() {
		if(this.y <= 495 && this.speedBuffer) {
			this.y += 1;
		}
	}

	this.playerReload = function() {
		if(shotActive == false) {
			shotX = this.x + 30;
			shotY = this.y;
			shotActive = true;
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