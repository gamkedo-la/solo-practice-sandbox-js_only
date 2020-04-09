//alien variables
const ALINE_WIDTH = 100;
const ALIEN_HEIGHT = 30;
const ALIEN_SHOT_SPEED = 10;
var alienShotActive = false;
var alienShotX;
var alienShotY;
var alienDestroyed = false;

function alienClass() {

	var this.x = 100;
	var this.y = 100;
	var this.sx = 4;
	var this.respawnTimer = 0;

	this.draw = function() {
		if(alienDestroyed == false) {
			ctx.drawImage(alienShipPic, this.x, this.y);
		}
	}


	this.alienShotCheck = function() {
		if(p1.shield01 && alienShotY >= p1.y - 20 && alienShotX >= p1.x - 20 && alienShotX <= p1.x + PLAYER_SHIP_WIDTH + 20){
			p1.shield01 = false;
			alienShotActive = false;
		}

		if(alienShotY >= p1.y && this.x >= p1.x && this.x <= p1.x + PLAYER_SHIP_WIDTH){
			alienShotActive = false;
			p1.playerLose();
		}
		if(alienShotY >= c.height) {
			alienShotActive = false;
		}
	}

	this.moveAlien = function() {
		this.x = this.x - this.sx;
		
		if(this.x > c.width - ALINE_WIDTH - screenBuffer) {
			this.sx = -this.sx;
		}
		
		if(this.x < 0 + screenBuffer) {
			this.sx = -this.sx;
		}
	}

	this.respawnAlien = function() {
		if(alienDestroyed == true){
			this.respawnTimer++;
			if(this.respawnTimer >= 60) {
				alienDestroyed = false;
				this.respawnTimer = 0;
			}
		}
	}

	this.alienReload = function(){
		if(alienShotActive == false) {
			alienShotX = this.x + ALINE_WIDTH/2;
			alienShotY = this.y + ALIEN_HEIGHT;
			alienShotActive = true;
		}
	}

}

