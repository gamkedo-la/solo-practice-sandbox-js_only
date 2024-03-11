class PlayerClass extends EntityClass{
	constructor() {
		super();
		this.name = "Player";

		this._lookSpeed = 0.75;
		this._moveSpeed = 50;
		this._rotateSpeed = 1.2;
	}

	update(deltaTime) {
		//player look
		this.ang += mouseMovementX * deltaTime * this._lookSpeed;
		if (Key.isDown(Key.Q)) {
			this.ang -= this._rotateSpeed * deltaTime;
		}
		if (Key.isDown(Key.E)) {
			this.ang += this._rotateSpeed * deltaTime;
		}
		if (this.ang > 2*pi) this.ang -= 2*pi;
		if (this.ang < 0) this.ang += 2*pi;

		//calculate forward vector
		this.forward.x = Math.cos(this.ang);
		this.forward.y = Math.sin(this.ang);

		//player move and collision checking
		var deltaX = 0;
		var deltaY = 0;
		var moving = false;
		if (Key.isDown(Key.W)) {
			deltaX += this.forward.x * deltaTime * this._moveSpeed;
			deltaY += this.forward.y * deltaTime * this._moveSpeed;
			moving = true;
		}
		if (Key.isDown(Key.S)) {
			deltaX -= this.forward.x * deltaTime * this._moveSpeed;
			deltaY -= this.forward.y * deltaTime * this._moveSpeed;
			moving = true;
		}
		if (Key.isDown(Key.A)) {
			deltaX += this.forward.y * deltaTime * this._moveSpeed;
			deltaY -= this.forward.x * deltaTime * this._moveSpeed;
			moving = true;
		}
		if (Key.isDown(Key.D)) {
			deltaX -= this.forward.y * deltaTime * this._moveSpeed;
			deltaY += this.forward.x * deltaTime * this._moveSpeed;
			moving = true;

		}
		if (moving) {
			var newPos = {x:this.pos.x + deltaX*5, y:this.pos.y + deltaY*5};
			for (var i in walls) {
				if (isLineIntersecting(this.pos, newPos, walls[i].p1, walls[i].p2)) {
					deltaX = 0;
					deltaY = 0;
					break;
				}
			}
		}
		this.pos.x += deltaX;
		this.pos.y += deltaY;

		super.update();
	}

	draw2D() {
		colorLine(this.pos.x, this.pos.y, this.pos.x + this.forward.x * 10, this.pos.y +this.forward.y * 10, 2, "darkgrey");
		colorEmptyCircle(this.pos.x, this.pos.y, 5, "darkgrey");
	}
}