

function basicAlienClass() {

	this.x = 50;
	this.y = 50;
	this.h = 50;
	this.w = 50;
	this.sx = 4;
	this.sy = 4;
	this.bottomLine = 300;
	this.screenBuffer = 20;

	this.alienActive = true;
	this.respawnTimer = 60;

	this.shotX;
	this.shotY;
	this.shotW = 5;
	this.shotH = 10;
	this.shotActive = false;
	this.shotSpeed = 5;


	this.draw = function() {
		if(this.alienActive == true) {
			colorRect(this.x, this.y, this.w, this.h, 'green');

			if(this.shotActive == true) {
				colorRect(this.shotX, this.shotY, this.shotW, this.shotH, 'green');
			}
		}
	}

	this.move = function() {
		this.x += this.sx;
		this.y += this.sy;

		//movement ai

		if(this.y >= this.bottomLine ) {
			this.sy = 0;
		}

		if(this.x >= c.width - this.w - this.screenBuffer) {
			this.sx = -this.sx;
		}

		if(this.x <= 0 + this.screenBuffer) {
			this.sx = -this.sx;
		}

		if(this.y >= this.bottomLine) {
			this.rn = Math.round(Math.random() * (25 - 1) + 1);
			if(this.rn == 1) {
				this.sy = -4;
			}
		}

		if(this.y <= 0 + this.screenBuffer) {
			this.sy = 0;
			this.rn = Math.round(Math.random() * (25 - 1) + 1);
			if(this.rn == 1) {
				this.sy = 4;
			}
		}

		if(this.shotActive == true) {
			this.shotY += this.shotSpeed;
		}
	}

	this.basicShot = function() {
		if(this.shotActive == false) {
			this.rn = Math.round(Math.random() * (15 - 1) + 1);
			if(this.rn == 1) {
				this.shotActive = true;
				this.shotY = this.y;
				this.shotX = this.x;
			} 
		}

		if(this.shotY >= c.height) {
			this.shotActive = false;
		}
	}

	this.shotCheck = function() {

		if(playerShields != 0) {
			if(this.shotY >= p1.y - 20 && this.shotY <= p1.y + PLAYER_SHIP_HEIGHT/2 && this.shotX >= p1.x - 20 && this.shotX <= p1.x + PLAYER_SHIP_WIDTH + 20) {
				this.shotActive = false;
				this.shotY = this.y;
				p1.substractShield();
			}
		}

		if(playerShields == 0) {
			if(this.shotY >= p1.y - 20 && this.shotY <= p1.y + PLAYER_SHIP_HEIGHT/2 && this.shotX >= p1.x - 20 && this.shotX <= p1.x + PLAYER_SHIP_WIDTH + 20) {
				this.shotActive = false;
				p1.playerLose();
			}
		}
	}

	this.respawnAlien = function() {
		if(this.alienActive == false) {
			this.respawnTimer--;
			if(this.respawnTimer == 0) {
				this.alienActive = true;
				this.respawnTimer = 30;
				this.y = Math.random()* (c.height - 300);
			}
		}
	}
}