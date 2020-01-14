window.addEventListener('keyup',    function (event) { Key.onKeyup(event); event.preventDefault() }, false);
window.addEventListener('keydown',  function (event) { Key.onKeydown(event); event.preventDefault() }, false);

const Key = {

	_down: {},
	_pressed: {},
	_released: {},

	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32,
	CTRL: 17,
	ALT: 18,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	COMMA: 188,
	PERIOD: 190,
	a: 65,
	c: 67,
	w: 87,
	s: 83,
	d: 68,
	z: 90,
	x: 88,
	f: 70,
	p: 80,
	r: 82,
	i: 73,
	j: 74,
	k: 75,
	l: 76,
	m: 77,
	o: 79,

	isDown(keyCode) {
		return this._down[keyCode];
	},

	isJustReleased(keyCode) {
		return this._released[keyCode];
	},

	isJustPressed(keyCode) {
		return this._pressed[keyCode];
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
	}
};