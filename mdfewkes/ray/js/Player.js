function PlayerClass() {
	this.pos =  {x:0, y:0};
	this.ang = 0;
	this.forward = {x:0, y:0};

	var lookSpeed = 0.0005;
	var moveSpeed = 0.1;

	gameObjects.push(this);

	this.update = function(){
		this.ang += mouseMovementX * deltaTime * lookSpeed;
		if (this.ang > 2*pi) this.ang -= 2*pi;
		if (this.ang < 0) this.ang += 2*pi;

		this.forward.x = Math.cos(this.ang);
		this.forward.y = Math.sin(this.ang);

		if (Key.isDown(Key.W)) {
			var newX = this.pos.x + this.forward.x * deltaTime * moveSpeed;
			var newY = this.pos.y + this.forward.y * deltaTime * moveSpeed;

			for (var i in world) {
				if (isLineOnLine(this.pos, {x:newX, y:newY}, world[i].p1, world[i].p2)) {
					newX = this.pos.x;
					newY = this.pos.y;
					break;
				}
			}
			this.pos.x = newX;
			this.pos.y = newY;
		}
		if (Key.isDown(Key.S)) {
			var newX = this.pos.x - this.forward.x * deltaTime * moveSpeed;
			var newY = this.pos.y - this.forward.y * deltaTime * moveSpeed;

			for (var i in world) {
				if (isLineOnLine(this.pos, {x:newX, y:newY}, world[i].p1, world[i].p2)) {
					newX = this.pos.x;
					newY = this.pos.y;
					break;
				}
			}
			this.pos.x = newX;
			this.pos.y = newY;
		}
		if (Key.isDown(Key.A)) {
			var newX = this.pos.x + this.forward.y * deltaTime * moveSpeed;
			var newY = this.pos.y - this.forward.x * deltaTime * moveSpeed;

			for (var i in world) {
				if (isLineOnLine(this.pos, {x:newX, y:newY}, world[i].p1, world[i].p2)) {
					newX = this.pos.x;
					newY = this.pos.y;
					break;
				}
			}
			this.pos.x = newX;
			this.pos.y = newY;
		}
		if (Key.isDown(Key.D)) {
			var newX = this.pos.x - this.forward.y * deltaTime * moveSpeed;
			var newY = this.pos.y + this.forward.x * deltaTime * moveSpeed;

			for (var i in world) {
				if (isLineOnLine(this.pos, {x:newX, y:newY}, world[i].p1, world[i].p2)) {
					newX = this.pos.x;
					newY = this.pos.y;
					break;
				}
			}
			this.pos.x = newX;
			this.pos.y = newY;
		}


	};

	this.draw = function(){
		colorLine(this.pos.x, this.pos.y, this.pos.x + this.forward.x * 10, this.pos.y +this.forward.y * 10, 2, "darkgrey");
		colorEmptyCircle(this.pos.x, this.pos.y, 5, "darkgrey");
	};

	this.destroy = function(){
		gameObjects.splice(gameObjects.indexoOf(this), 2);
	};
}