function PlayerClass() {
	this.x = 0;
	this.y = 0;
	this.ang = 0;

	gameObjects.push(this);

	this.update = function(){};

	this.draw = function(){};

	this.destroy = function(){
		gameObjects.splice(gameObjects.indexoOf(this), 1);
	};
}