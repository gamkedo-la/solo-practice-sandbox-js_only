const PLAYER_SHIP_WIDTH = 60; //current width of pixel art
const PLAYER_SHIP_HEIGHT = 80; //current height of pixel art 

function playerClass() {


	this.spaceShipPosX = 380;
	this.spaceShipPosY = 460;
	this.speedBuffer = false;
	this.shield01 = true;

	this.shotCheck = function() {
		if(shotY <= alienPosY + ALIEN_HEIGHT && shotX >= alienPosX && shotX <= alienPosX + ALINE_WIDTH) {
			shotActive = false;
			alienDestroyed = true;
			playerScoring();
		}
		if(shotY < 0) {
			shotActive = false;
		}
	}

	this.draw = function() {
		//space ship
		if(spaceshipPicLoaded){
			ctx.drawImage(spaceshipPic, this.spaceShipPosX, this.spaceShipPosY);
		}

		//ship shield
		if(this.shield01) {
			drawBitmapCenteredAtLocationWithRotation(shieldPic, this.spaceShipPosX + PLAYER_SHIP_WIDTH/2, this.spaceShipPosY + PLAYER_SHIP_HEIGHT/2, angle);
		}
	}

	function playerScoring() {
		playerScore ++;
		
		if(playerScore >= WIN_SCORE){
			mode = WIN_SCREEN;
		}
	}

	this.playerLose = function() {
		mode = GAME_OVER;
	}

	this.spaceshipAutoReverse = function() {
		if(this.spaceShipPosY <= 495 && this.speedBuffer) {
			this.spaceShipPosY += 1;
		}
	}

	this.playerReload = function() {
		if(shotActive == false) {
			shotX = this.spaceShipPosX + 30;
			shotY = this.spaceShipPosY;
			shotActive = true;
		}
	}
}