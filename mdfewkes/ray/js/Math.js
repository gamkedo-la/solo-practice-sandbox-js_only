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