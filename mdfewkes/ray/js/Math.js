const pi = Math.PI;

function degToRad(degrees){
	return degrees * (pi/180);
}

function radToDeg(radians){
	return radians * (180/pi);
}

function lerp(v0, v1, t) {
	return v0*(1-t)+v1*t
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
	var angle = Math.atan2(b.y - a.y, b.x - a.x) * 180 / pi;
	angle *= -1;
	//if (angle >= 360) {angle -= 360;}
	//if (angle < 0) {angle += 360;}
	return angle;
}

function clamp(x, min, max) {
	return Math.max(min, Math.min(x, max));
}

function isLineOnLine(p1, p2, p3, p4) {
	var denominator = ((p1.x - p2.x) * (p3.y - p4.y)) - ((p1.y - p2.y) * (p3.x - p4.x));

	if(denominator != 0.0) {
		var t = (((p1.x - p3.x) * (p3.y - p4.y)) - ((p1.y - p3.y) * (p3.x - p4.x))) / denominator;
		if(t >= 0.0 && t <= 1.0) {
			var u = (((p1.x - p2.x) * (p1.y - p3.y)) - ((p1.y - p2.y) * (p1.x - p3.x))) / denominator;
			if(-u >= 0.0 && -u <= 1.0) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	return false;
}