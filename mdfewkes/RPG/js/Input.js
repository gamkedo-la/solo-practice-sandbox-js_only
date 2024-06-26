window.addEventListener('keyup', function (event) { Key.onKeyup(event); event.preventDefault();});
window.addEventListener('keydown', function (event) { Key.onKeydown(event); event.preventDefault();});

document.getElementById('gameCanvas').addEventListener('mousedown', mouseDown);
document.getElementById('gameCanvas').addEventListener('mouseup', mouseUp);
document.getElementById('gameCanvas').addEventListener('mousemove', mouseMove);

let mouseX = 0;
let mouseY = 0;
let mouseMovementX = 0;
let mouseMovementY = 0;

function mouseMove(event) {
	mouseX = event.offsetX;
	mouseY = event.offsetY;
	mouseMovementX += event.movementX;
	mouseMovementY += event.movementY;
}

function isMouseInArea(x, y, width, height) {
	if (mouseX >= x && mouseX <= x + width &&
		mouseY >= y && mouseY <= y + height) {
		return true;
	} else {
		return false;
	}
}

function mouseDown(event) {
	Key.onKeydown({keyCode: event.button + 300});
}

function mouseUp(event) {
	Key.onKeyup({keyCode: event.button + 300});
}

const Key = {

	_down: {},
	_pressed: {},
	_released: {},

	TAB: 9,
	ENTER: 13,
	SHIFT: 16,
	CTRL: 17,
	ALT: 18,
	ESC: 27,
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	DELETE: 46,
	ZERO: 48,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,
	COMMA: 188,
	PERIOD: 190,
	BRACKET_LEFT: 219,
	BRACKET_RIGHT: 221,
	PLUS:187,
	MINUS:189,
	MOUSE_LEFT:300,
	MOUSE_MID:301,
	MOUSE_RIGHT:302,

	isDown(keyCode) {
		return (this._down[keyCode] == true);
	},

	isJustPressed(keyCode) {
		return (this._pressed[keyCode] == true);
	},

	isJustReleased(keyCode) {
		return (this._released[keyCode] == true);
	},

	onKeydown(event) {
		if (this._down[event.keyCode] != true) {
			this._pressed[event.keyCode] = true;
		}
		this._down[event.keyCode] = true;
	},

	onKeyup(event) {
		this._released[event.keyCode] = true;
		delete this._down[event.keyCode];
	},

	update() {
		this._pressed = {};
		this._released = {};

		mouseMovementX = 0;
		mouseMovementY = 0;
	}
};
