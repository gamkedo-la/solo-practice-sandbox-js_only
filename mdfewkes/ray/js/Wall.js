function WallClass(x1 = 0, y1 = 0, x2 = 0, y2 = 0, color = "darkgrey") {
	this.p1 = {x:x1, y:y1};
	this.p2 = {x:x2, y:y2};
	this.color = color;

	walls.push(this);

	this.draw2D = function(){
		colorLine(this.p1.x, this.p1.y, this.p2.x, this.p2.y, 2, this.color);
		//colorText(this.p1.x + ":" + this.p1.y, this.p1.x, this.p1.y, this.color, font = "15px Arial");
		//colorText(this.p2.x + ":" + this.p2.y, this.p2.x, this.p2.y, this.color, font = "15px Arial");
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

function isLineIntersecting(p1, p2, p3, p4) {
	var denominator = ((p1.x - p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x - p4.x));

	if(denominator == 0.0) return false;

	var t = (((p1.x - p3.x) * (p3.y - p4.y)) - ((p1.y - p3.y) * (p3.x - p4.x))) / denominator;
	var u = -(((p1.x - p2.x) * (p1.y - p3.y)) - ((p1.y - p2.y) * (p1.x - p3.x))) / denominator;

	if (t >= 0.0 && t <= 1.0 && u >= 0.0 && u <= 1.0) return true;
	
	return false;
};

function getPointAtLineIntersection(p1, p2, p3, p4) {
	var denominator = ((p1.x - p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x - p4.x));

	if(denominator == 0.0) return null;

	var t = (((p1.x - p3.x) * (p3.y - p4.y)) - ((p1.y - p3.y) * (p3.x - p4.x))) / denominator;
	var u = -(((p1.x - p2.x) * (p1.y - p3.y)) - ((p1.y - p2.y) * (p1.x - p3.x))) / denominator;

	if (t >= 0.0 && t <= 1.0 && u >= 0.0 && u <= 1.0) {
		return {x: p1.x + t * (p2.x - p1.x),
				y: p1.y + t * (p2.y - p1.y)};
	}

	return null;
};

function getClosestIntersection(p1, p2) {
	var closestPoint = null;
	var distance = 1000;

	for (var i in walls) {
		var point = getPointAtLineIntersection(p1, p2, walls[i].p1, walls[i].p2);
		if (point != null) {
			var newDistance = distanceBetweenTwoPoints(p1, point);

			if (newDistance < distance) {
				closestPoint = point;
				closestPoint.wall = walls[i];
				closestPoint.distance = newDistance;
				distance = newDistance;
			}
		}
	}

	return closestPoint;
}