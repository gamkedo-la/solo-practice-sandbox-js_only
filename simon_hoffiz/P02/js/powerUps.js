
function basicPowerUpClass() {

	this.x = 200; //Math.random() * c.width;
	this.y = -50;
	this.w = 20;
	this.h = 20;
	this.sy = 5;
	this.powerUp = true;
	this.powerUpAccesible = false;
	this.powerUpSpawnRate = 15;


	this.draw = function() {
		if(this.powerUp == true) {
			if(this.powerUpAccesible == false) {
				colorRect(this.x, this.y, this.w, this.h, 'gray');	
			}

			if(this.powerUpAccesible == true) {
				colorRect(this.x, this.y, this.w, this.h, 'blue');	
			}	
		}		
	}

	this.move = function(){
		this.y += this.sy;

		if(this.y >= c.height) {
			this.powerUp = false;
		}
	}

	this.shieldPowerUp = function() {
		if(this.powerUpAccesible == true && this.y >= p1.y && this.x >= p1.x && this.x <= p1.x + PLAYER_SHIP_WIDTH) {
			p1.shield01 = true;
			this.powerUp = false;
			this.powerUpAccesible = false;
			p1.addShield();			
		}
	}

	this.respawn = function() {
		if(this.powerUp == false) {
			this.rn = Math.round(Math.random() * (this.powerUpSpawnRate - 1) + 1);
			if(this.rn == 1) {
				this.powerUp = true;
				this.y = -50;
				this.x = Math.random() * c.width - 20;
			}
		}
	}	
}