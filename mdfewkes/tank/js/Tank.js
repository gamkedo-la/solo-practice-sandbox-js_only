function tankClass() {
	this.x = 400;
	this.y = 300;
	this.angle = 90;
	this.power = 75;
	this.health = 100;
	this.color = "White";
	this.player = "Player";
	this.weapon = 0;

	var w = 20;
	var h = 10;

	this.myTurn = false;
	this.active = true;

	this.update = function update(frameTime) {
		this.y = canvas.height - UI_HEIGHT - map.getHeightAtX(this.x);

		if (this.myTurn) {
			if (this.active) {
				if (Key.isJustPressed(Key.SPACE)){
					var newProjectile;
					switch (this.weapon) {
						case 0:
							newProjectile = new basicShotClass();
							break;
						case 1:
							newProjectile = new threeShotClass();
							break;
						case 2:
							newProjectile = new sniperShotClass();
							break;
					}
					newProjectile.x = this.x;
					newProjectile.y = this.y - 10;
					newProjectile.tank = this;
					newProjectile.launch(this.angle, this.power*2.65);
					arrayOfProjectiles.push(newProjectile);

					this.myTurn = false;
				}
				if (Key.isDown(Key.LEFT)){
					this.angle += 45 * frameTime;
				}
				if (Key.isDown(Key.RIGHT)){
					this.angle -= 45 * frameTime;
				}
				if (Key.isDown(Key.UP)){
					this.power += 20 * frameTime;
				}
				if (Key.isDown(Key.DOWN)){
					this.power -= 20 * frameTime;
				}
				if (Key.isJustPressed(Key.COMMA)){
					this.weapon--;
				}
				if (Key.isJustPressed(Key.PERIOD)){
					this.weapon++;
				}

				if (this.angle >= 360) {
					this.angle -= 360;
				} else if (this.angle <= 0) {
					this.angle += 360;
				}

				if (this.power > 100) {
					this.power = 100;
				} else if (this.power < 1) {
					this.power = 1;
				}

				if (this.weapon > 2) {
					this.weapon = 0;
				} else if (this.weapon < 0) {
					this.weapon = 2;
				}

			} else {
				incrementTurn = true;
			}
		}
	}

	this.draw = function draw(frameTime) {
		colorRect(this.x-w/2, this.y-h, w, h+2, "Black");
		colorRect(this.x-w/2+1, this.y-h+1, w-2, h, this.color);
		var cannonX, cannonY, radians;
		radians = degreesToRadians(this.angle);
		cannonX = Math.cos(radians) * 10;
		cannonY = -Math.sin(radians) * 10;
		colorLine(this.x, this.y - h, this.x + cannonX, this.y + cannonY - 10, 5, "Black");
		colorLine(this.x, this.y - h, this.x + cannonX, this.y + cannonY - 10, 3, this.color);
	}

	this.isPointColliding = function isPointColliding(x, y) {
		if (x >= this.x - w/2 && x <= this.x + w/2 &&
			y >= this.y - h && y <= this.y) {
			return true;
		} else {
			return false;
		}
	}

	this.takeDamage = function takeDamage(amount) {
		this.health -= amount;
		if (this.health <= 0) {
			this.destroy();
		}
	}

	this.destroy = function destroy() {
		if (this.active) {
			this.color = "Black"
			this.active = false;
			console.log("Destroy Player " + (playerTurn+1));
		}
	}
}