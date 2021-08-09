const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_LEFT = 37;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	warrior.setupInput(KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_LEFT);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

}

function keySet(keyEvent, setTo){
	if(keyEvent.keyCode == warrior.controlKeyLeft) {
		warrior.keyHeld_Left = setTo;
	}
	if(keyEvent.keyCode == warrior.controlKeyRight) {
		warrior.keyHeld_Right = setTo;
	}
	if(keyEvent.keyCode == warrior.controlKeyUp) {
		warrior.keyHeld_Up = setTo;
	}
	if(keyEvent.keyCode == warrior.controlKeyDown) {
		warrior.keyHeld_Down = setTo;
	}
}

function keyPressed(evt) {
	keySet(evt, true); //shortcut to set key bools to true;
	evt.preventDefault();
}

function keyReleased(evt) {
	keySet(evt, false); //shortcut to set key bools to true;
}