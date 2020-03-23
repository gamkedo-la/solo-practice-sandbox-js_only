function basicExplosionClass() {
	this.x = 0;
	this.y = 0;
	this.size = 0;
	this.damage = 0;
	this.color = "White";
	this.tank;
	this.countDown = 0.5;

	var damageDone = false;

	this.active = false;

	this.update = function update(frameTime) {
		if (this.active) {
			if (!damageDone) {
				for (var i = 0; i < numberOfPlayers; i++) {
					if (this.tank != arrayOfPlayers[i]) {
						this.calculateDamage(arrayOfPlayers[i]);
					}
				}
				map.createImpactAtXandY(this.x, this.y, this.size);
				damageDone = true;
			}
			if (this.countDown >= 0) {
				this.countDown -= frameTime;
			} else {
				this.active = false;
			}


		}
	}

	this.draw = function draw(frameTime) {
		colorCircle(this.x, this.y, this.size, this.color);
	}

	this.calculateDamage = function calculateDamage(tank) {
		var dist = distance(tank, this);
		if (dist <= this.size) {
			tank.takeDamage(dist/this.size * this.damage);
		}
	}
}