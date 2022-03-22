function WallClass() {
	this.p1 = {x:0, y:0};
	this.p2 = {x:0, y:0};

	world.push(this);

	this.draw2D = function(){
		colorLine(this.p1.x, this.p1.y, this.p2.x, this.p2.y, 2, "darkgrey")
	};

	this.draw3D = function(){};

	this.destroy = function(){
		world.splice(world.indexoOf(this), 1);
	};
}