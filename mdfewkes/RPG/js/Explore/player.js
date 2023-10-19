class Player {
	constructor() {
		this.pos = {x:200, y:200};
		this.vel = {x:0, y:0};

		this.speed = 100;
	}

	Update() {
		if (Key.isDown(Key.UP) || Key.isDown(Key.W)) {
			this.vel.y -= 1;
		}
		if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) {
			this.vel.y += 1;
		}
		if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) {
			this.vel.x -= 1;
		}
		if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) {
			this.vel.x += 1;
		}

		this.vel = scaleVector(normalizeVector(this.vel), deltaTime * this.speed);
		this.pos = addVectors(this.pos, this.vel);

		this.vel.x = 0;
		this.vel.y = 0;
	}

	Draw() {
		colorCircle(this.pos.x, this.pos.y, 16, 'white');
	}
}