const pi = Math.PI;

function degreesToRadians(degrees){
	return degrees * (pi/180);
}

function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}

function rndInt(min, max) {
	if(max == null) {
		max = min || 1;
		min = 0;
	}
	return Math.floor( Math.random() * (max - min) + min );
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

function distance (a,b) {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}

function clamp(x, min, max) {
	return Math.max(min, Math.min(x, max));
}

function mix(a, b, p) {
	return a * (1-p) + b * p;
}

function range(num, in_min, in_max, out_min, out_max) {
	return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function rgbToHex (value) {
	var hex = Number(value).toString(16);

	if (hex.length < 2) {
		hex = "0" + hex;
	}
	return hex.toUpperCase();
}

function fullColorHex(r, g, b) {
	var red = rgbToHex(r);
	var green = rgbToHex(g);
	var blue = rgbToHex(b);

	return "#" + red + green + blue;
}