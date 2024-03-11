class EntityClass {
	constructor(entityClone = {}) {
		this.name = entityClone.name || "";
		this.pos =  entityClone.pos || {x:0, y:0};
		this.x = this.pos.x;
		this.y = this.pos.y;
		this.ang = entityClone.ang || d270;
		this.forward = {x:0, y:0};
		this.forward.x = Math.cos(this.ang);
		this.forward.y = Math.sin(this.ang);
		this.distance = Infinity;

		gameObjects.push(this);
	}

	update(deltaTime) {
		this.x = this.pos.x;
		this.y = this.pos.y;

		this.distance = distanceBetweenTwoPoints(this.pos, player);
	}

	draw2D() {
		colorLine(this.pos.x, this.pos.y, this.pos.x + this.forward.x * 10, this.pos.y +this.forward.y * 10, 2, "white");
		colorEmptyCircle(this.pos.x, this.pos.y, 5, "grey");
	}

	draw3D() {}

	destroy() {
		gameObjects.splice(gameObjects.indexoOf(this), 2);
	}
}

class SceneEntity extends EntityClass {
	constructor(entityClone = {}) {
		super(entityClone);

		this._image = new Image();
		this._image.src = './images/testEntity.png';
	}

	draw3D() {
		var drawAngle = wrap(radToDeg(angleBetweenTwoPoints(player, this.pos) - player.ang), -180, 180);

		var size = heightScale * canvas.height / this.distance;
		var drawX = canvas.width*0.5 - size*0.5 + drawAngle * canvas.width/FOV;
		var drawY = canvas.height*0.5 - size*0.5;

		canvasContext.fillStyle = '#00000020';
		canvasContext.beginPath();
		canvasContext.ellipse(drawX+size*0.5, drawY+size, size*0.4, size*0.05, 0, 0, Math.PI*2);
		canvasContext.fill();

		canvasContext.drawImage(this._image, drawX, drawY, size, size);
	}
}