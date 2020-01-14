function basicShotClass() {
	this.x = 0;
	this.y = 0;
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
		colorRect(this.x-1, this.y-1, 2, 2, "Grey");
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
		newExplosion.size = 20;
		newExplosion.damage = 20;
		newExplosion.color = "White";
		newExplosion.active = true;
		arrayOfExplosions.push(newExplosion);
	}
}