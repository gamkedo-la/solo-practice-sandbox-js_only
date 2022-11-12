const pi = Math.PI;
const d0 = 0;
const d90 = pi/2;
const d180 = pi;
const d270 = 3*pi/2;
const d360 = 2*pi;


function degToRad(degrees){
	return degrees * pi/180;
}

function radToDeg(radians){
	return radians * 180/pi;
}

function lerp(v0, v1, t) {
	return v0*(1-t)+v1*t
}

function lerpC(val1, val2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return val1 * (1 - amount) + val2 * amount;
}

function remap(in_min, in_max, out_min, out_max, num) {
	return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function rndInt(min, max) {
	if(max == null) {
		max = min || 1;
		min = 0;
	}
	return Math.round( Math.random() * (max - min) + min );
}

function rndFloat(min, max) {
	if(max == null) {
		max = min || 1;
		min = 0;
	}
	return Math.random() * (max - min) + min;
}

function rndOneIn(max = 2){
	return rndInt(0,max) === 0;
}

 function rndOneFrom(items){
	return items[rndInt(items.length)];
}

function distanceBetweenTwoPoints(a,b) {
	var dx = a.x - b.x;
	var dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}

function angleBetweenTwoPoints(a, b) {
	var angle = Math.atan2(b.y - a.y, b.x - a.x);
	//angle *= -1;
	return angle;
}

function clamp(x, min, max) {
	return Math.max(min, Math.min(x, max));
}


function rgbToHex (value) {
	Math.round(value)
	var hex = Number(Math.round(value)).toString(16);

	if (hex.length < 2) {
		hex = "0" + hex;
	}
	return hex.toUpperCase();
}

function fullColorHex(r, g, b, a = 1) {
	var red = rgbToHex(r);
	var green = rgbToHex(g);
	var blue = rgbToHex(b);;
	var alpha = rgbToHex(a);

	return "#" + red + green + blue + alpha;
}
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