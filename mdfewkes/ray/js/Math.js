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

function clamp(x, min, max) {
	return Math.max(min, Math.min(x, max));
}

function wrap(x, min, max) {
	while (x < min) x += max - min;
	while (x >= max) x -= max - min;
	return x;
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

function roundToDecimalPlace(value, places) {
	for (var i = 0; i < places; i++) {
		value *= 10;
	}
	value = Math.round(value);
	for (var i = 0; i < places; i++) {
		value /= 10;
	}
	return value;
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


function addVectors(a, b) {
	return {x:a.x + b.x, y:a.y + b.y};
}

function subtractVectors(a, b) {
	return {x:a.x - b.x, y:a.y - b.y};
}

function scaleVector(v, scale) {
	return {x:v.x * scale, y:v.y * scale};
}

function magnitudeOfVector(v) {
	return Math.sqrt(v.x*v.x + v.y*v.y)
}

function normalizeVector(v) {
	if (v.x == 0 && v.y == 0) return {x:0, y:0};
	return scaleVector(v, 1/magnitudeOfVector(v));
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


function isLineIntersecting(p1, p2, p3, p4) {
	var denominator = ((p1.x - p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x - p4.x));

	if(denominator == 0.0) return false;

	var t = (((p1.x - p3.x) * (p3.y - p4.y)) - ((p1.y - p3.y) * (p3.x - p4.x))) / denominator;
	var u = -(((p1.x - p2.x) * (p1.y - p3.y)) - ((p1.y - p2.y) * (p1.x - p3.x))) / denominator;

	if (t >= 0.0 && t <= 1.0 && u >= 0.0 && u <= 1.0) return true;
	
	return false;
}

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
}

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

function getAllIntersections(p1, p2) {
	var crossPoints = [];

	for (var i in walls) {
		var point = getPointAtLineIntersection(p1, p2, walls[i].p1, walls[i].p2);
		if (point != null) {
			var distance = distanceBetweenTwoPoints(p1, point);
			newPoint = point;
			newPoint.wall = walls[i];
			newPoint.distance = distance;

			crossPoints.push(newPoint);
		}
	}
	crossPoints.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
	return crossPoints;
}

function getNearestPointOnLine(a, b, p) {
	var atob = { x: b.x - a.x, y: b.y - a.y };
	var atop = { x: p.x - a.x, y: p.y - a.y };
	var len = atob.x * atob.x + atob.y * atob.y;
	var dot = atop.x * atob.x + atop.y * atob.y;
	var t = Math.min( 1, Math.max( 0, dot / len ) );
	dot = ( b.x - a.x ) * ( p.y - a.y ) - ( b.y - a.y ) * ( p.x - a.x );
	return {x: a.x + atob.x * t, y: a.y + atob.y * t};
}


function rgbToHex (value) {
	Math.round(value)
	var hex = Number(Math.round(value)).toString(16);

	if (hex.length < 2) {
		hex = "0" + hex;
	}
	return hex.toUpperCase();
}

function fullColorHex(r, g, b, a = 255) {
	var red = rgbToHex(r);
	var green = rgbToHex(g);
	var blue = rgbToHex(b);;
	var alpha = rgbToHex(a);

	return "#" + red + green + blue + alpha;
}

function colorHex(r, g, b,) {
	var red = rgbToHex(r);
	var green = rgbToHex(g);
	var blue = rgbToHex(b);;

	return "#" + red + green + blue;
}

function colorHexToRGB(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    
    // return {r, g, b} 
    return {r: r, g: g, b: b, a: 255};
}

function fullColorHexToRGB(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    var a = parseInt(hex.slice(7, 9), 16);
    
    // return {r, g, b} 
    return {r: r, g: g, b: b, a: a};
}