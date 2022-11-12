function WallClass(x1 = 0, y1 = 0, x2 = 0, y2 = 0, color = "darkgrey") {
	this.p1 = {x:x1, y:y1};
	this.p2 = {x:x2, y:y2};
	this.color = color;
	this.texture = null;

	walls.push(this);

	this.draw2D = function(){
		colorLine(this.p1.x, this.p1.y, this.p2.x, this.p2.y, 2, this.color);
		if (debug) {
			colorText(this.p1.x + ":" + this.p1.y, this.p1.x, this.p1.y, this.color, font = "15px Arial");
			colorText(this.p2.x + ":" + this.p2.y, this.p2.x, this.p2.y, this.color, font = "15px Arial");
		}
	};
}

//Checks if there are no walls in between two points
function lineOfSight(v1, v2) {
	for (var i in walls) {
		if (isLineIntersecting(v1, v2, walls[i].p1, walls[i].p2)) {
			return false;
		}
	}
	return true;
};

