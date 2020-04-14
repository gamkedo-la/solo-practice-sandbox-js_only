const SHOT_DISPLAY_RADIUS = 3.0;
const PLAYER_SHOT_SPEED = 10;



function playerBasicShotClass() {

	this.x = p1.x;
	this.y = p1.y;
	this.basicWeaponActive = false;

	this.draw = function() {
		colorCircle( this.x, this.y, SHOT_DISPLAY_RADIUS, 'white');
	}

	this.move = function() {
		this.x = p1.x + PLAYER_SHIP_WIDTH/2;
		if(this.basicWeaponActive == true) {
			this.y -= PLAYER_SHOT_SPEED;
		}
	}

	this.weaponReset = function() {
		if(this.y < 0) {
			this.basicWeaponActive = false;
			this.y = p1.y;
		}
	}

	this.shotCheck = function() {
		if(this.y <= a1.y + ALIEN_HEIGHT && this.x >= a1.x && this.x <= a1.x + ALINE_WIDTH) {
			this.basicWeaponActive = false;
			alienDestroyed = true;
			p1.playerScoring();
			
		}
		if(this.y < 0) {
			this.basicWeaponActive = false;
		}
	}


}// end of player basic shot class