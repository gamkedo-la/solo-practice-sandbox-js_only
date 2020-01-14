function basicShotClass() {
	this.x = 0;
	this.y = 0;
	this.size = 20;
	this.damage = 20;
	this.tank;

	var xVel = 0;
	var yVel = 0;

	this.active = false;

	this.update = function update(frameTime) {
		if (this.active) {
			yVel += 1.5;

			this.x += xVel * frameTime;
			this.y += yVel * frameTime;

			for (var i = 0; i < numberOfPlayers; i++) {
				if (arrayOfPlayers[i].isPointColliding(this.x, this.y)) {
					if (this.tank != arrayOfPlayers[i]) {
						this.hit();
					}
				}
			}

			if (this.y >= canvas.height - 100) {
				this.hit();
			}
		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, 2, "Black")
	}

	this.launch = function launch(angle, power) {
		var radians = degreesToRadians(angle);
		xVel = Math.cos(radians) * power;
		yVel = -Math.sin(radians) * power;
		this.active = true;
	}

	this.hit = function hit() {
		yVel = 0;
					
		incrementTurn = true;
		this.active = false;

		var newExplosion = new basicExplosionClass();
		newExplosion.x = this.x;
		newExplosion.y = this.y;
		newExplosion.size = this.size;
		newExplosion.damage = 20;
		newExplosion.color = "White";
		newExplosion.tank = this.tank;
		newExplosion.active = true;
		arrayOfExplosions.push(newExplosion);
	}
}

function threeShotClass() {
	this.x = 0;
	this.y = 0;
	this.size = 20;
	this.damage = 10;
	this.tank;

	var xVel = 0;
	var yVel = 0;

	this.active = false;

	this.update = function update(frameTime) {
		if (this.active) {
			this.active = false;
		}
	}

	this.draw = function draw(frameTime) {
		return;
	}

	this.launch = function launch(angle, power) {
		var newProjectileC = new basicShotClass();
		newProjectileC.x = this.x;
		newProjectileC.y = this.y - 10;
		newProjectileC.size = this.size;
		newProjectileC.tank = this;
		newProjectileC.launch(angle, power);
		arrayOfProjectiles.push(newProjectileC);

		var newProjectileL = new basicShotClass();
		newProjectileL.x = this.x;
		newProjectileL.y = this.y - 10;
		newProjectileL.size = this.size/2;
		newProjectileL.tank = this;
		newProjectileL.launch(angle+2, power);
		arrayOfProjectiles.push(newProjectileL);

		var newProjectileR = new basicShotClass();
		newProjectileR.x = this.x;
		newProjectileR.y = this.y - 10;
		newProjectileR.size = this.size/2;
		newProjectileR.tank = this;
		newProjectileR.launch(angle-2, power);
		arrayOfProjectiles.push(newProjectileR);
	}
}