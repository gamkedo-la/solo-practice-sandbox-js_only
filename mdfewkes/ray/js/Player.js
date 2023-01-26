class PlayerClass extends Entity{
	constructor() {
		super();

		this._lookSpeed = 0.75;
		this._moveSpeed = 50;
	}

	update() {
		//player look
		this.ang += mouseMovementX * deltaTime * this._lookSpeed;
		if (this.ang > 2*pi) this.ang -= 2*pi;
		if (this.ang < 0) this.ang += 2*pi;

		//calculate forward vector
		this.forward.x = Math.cos(this.ang);
		this.forward.y = Math.sin(this.ang);

		//player move and collision checking
		var newX = this.pos.x;
		var newY = this.pos.y;
		var moving = false;
		if (Key.isDown(Key.W)) {
			newX += this.forward.x * deltaTime * this._moveSpeed;
			newY += this.forward.y * deltaTime * this._moveSpeed;
			moving = true;
		}
		if (Key.isDown(Key.S)) {
			newX -= this.forward.x * deltaTime * this._moveSpeed;
			newY -= this.forward.y * deltaTime * this._moveSpeed;
			moving = true;
		}
		if (Key.isDown(Key.A)) {
			newX += this.forward.y * deltaTime * this._moveSpeed;
			newY -= this.forward.x * deltaTime * this._moveSpeed;
			moving = true;
		}
		if (Key.isDown(Key.D)) {
			newX -= this.forward.y * deltaTime * this._moveSpeed;
			newY += this.forward.x * deltaTime * this._moveSpeed;
			moving = true;

		}
		if (moving) {
			for (var i in walls) {
				if (isLineIntersecting(this.pos, {x:newX, y:newY}, walls[i].p1, walls[i].p2)) {
					newX = this.pos.x;
					newY = this.pos.y;
					break;
				}
			}
		}
		this.pos.x = newX;
		this.pos.y = newY;

		super.update();
	}

	draw2D() {
		colorLine(this.pos.x, this.pos.y, this.pos.x + this.forward.x * 10, this.pos.y +this.forward.y * 10, 2, "darkgrey");
		colorEmptyCircle(this.pos.x, this.pos.y, 5, "darkgrey");
	}
}