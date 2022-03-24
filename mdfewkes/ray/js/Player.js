function PlayerClass() {
	this.pos =  {x:0, y:0};
	this.ang = 3*pi/2;
	this.forward = {x:0, y:0};

	var lookSpeed = 0.75;
	var moveSpeed = 100;

	gameObjects.push(this);

	this.update = function(){
		//player look
		this.ang += mouseMovementX * deltaTime * lookSpeed;
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
			newX += this.forward.x * deltaTime * moveSpeed;
			newY += this.forward.y * deltaTime * moveSpeed;
			moving = true;
		}
		if (Key.isDown(Key.S)) {
			newX -= this.forward.x * deltaTime * moveSpeed;
			newY -= this.forward.y * deltaTime * moveSpeed;
			moving = true;
		}
		if (Key.isDown(Key.A)) {
			newX += this.forward.y * deltaTime * moveSpeed;
			newY -= this.forward.x * deltaTime * moveSpeed;
			moving = true;
		}
		if (Key.isDown(Key.D)) {
			newX -= this.forward.y * deltaTime * moveSpeed;
			newY += this.forward.x * deltaTime * moveSpeed;
			moving = true;

		}
		if (moving) {
			for (var i in walls) {
				if (isLineOnLine(this.pos, {x:newX, y:newY}, walls[i].p1, walls[i].p2)) {
					newX = this.pos.x;
					newY = this.pos.y;
					break;
				}
			}
		}
		this.pos.x = newX;
		this.pos.y = newY;


	};

	this.draw2D = function(){
		colorLine(this.pos.x, this.pos.y, this.pos.x + this.forward.x * 10, this.pos.y +this.forward.y * 10, 2, "darkgrey");
		colorEmptyCircle(this.pos.x, this.pos.y, 5, "darkgrey");
	};

	this.draw3D = function(){};

	this.destroy = function(){
		gameObjects.splice(gameObjects.indexoOf(this), 2);
	};
}