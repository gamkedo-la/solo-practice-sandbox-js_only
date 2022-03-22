function PlayerClass() {
	this.x = 0;
	this.y = 0;
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
			this.x += this.forward.x * deltaTime * moveSpeed;
			this.y += this.forward.y * deltaTime * moveSpeed;
		}
		if (Key.isDown(Key.S)) {
			this.x -= this.forward.x * deltaTime * moveSpeed;
			this.y -= this.forward.y * deltaTime * moveSpeed;
		}
		if (Key.isDown(Key.A)) {
			this.x += this.forward.y * deltaTime * moveSpeed;
			this.y -= this.forward.x * deltaTime * moveSpeed;
		}
		if (Key.isDown(Key.D)) {
			this.x -= this.forward.y * deltaTime * moveSpeed;
			this.y += this.forward.x * deltaTime * moveSpeed;
		}


	};

	this.draw = function(){
		colorLine(this.x, this.y, this.x + this.forward.x * 10, this.y +this.forward.y * 10, 2, "darkgrey");
		colorEmptyCircle(this.x, this.y, 5, "darkgrey");
	};

	this.destroy = function(){
		gameObjects.splice(gameObjects.indexoOf(this), 2);
	};
}