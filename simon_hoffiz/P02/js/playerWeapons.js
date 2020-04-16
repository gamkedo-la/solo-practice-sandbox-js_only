const SHOT_DISPLAY_RADIUS = 3.0;
const PLAYER_SHOT_SPEED = 10;


function playerBasicShotClass() {

	this.x = p1.x + PLAYER_SHIP_WIDTH/2;
	this.y = p1.y;
	this.basicWeaponActive = false;

	this.draw = function() {


		if(this.basicWeaponActive == true) {
			colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'white');
		}		
	}

	this.move = function() {
		if(this.basicWeaponActive == true) {
			this.y -= PLAYER_SHOT_SPEED;
		}		
	}

	this.shotCheck = function() {
		if(this.y <= z1.y + z1.h && this.x >= z1.x && this.x <= z1.x + z1.w) {
			this.basicWeaponActive = false;
			this.y = p1.y;
			z1.alienActive = false;
			p1.playerScoring();		
		}

		if(this.y <= 0) {
			this.basicWeaponActive = false;
			this.y = p1.y;			
		}

		if(this.y <= powerUp1.y + powerUp1.h && this.y >= powerUp1.y && this.x >= powerUp1.x && this.x <= powerUp1.x + powerUp1.w) {
			powerUp1.powerUpAccesible = true;
			this.basicWeaponActive = false;
			this.y = p1.y;
		}
	}

}// end of player basic shot class