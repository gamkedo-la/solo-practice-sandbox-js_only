const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	blueWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
} 

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keySet(keyEvent, setTo) {
	if(keyEvent.keyCode == blueWarrior.controlKeyLeft) {
		blueWarrior.keyHeld_West = setTo;
	}
	if(keyEvent.keyCode == blueWarrior.controlKeyRight) {
		blueWarrior.keyHeld_East = setTo;
	}
	if(keyEvent.keyCode == blueWarrior.controlKeyUp) {
		blueWarrior.keyHeld_North = setTo;
	}
	if(keyEvent.keyCode == blueWarrior.controlKeyDown) {
		blueWarrior.keyHeld_South = setTo;
	}
}

function keyPressed(evt) {
	keySet(evt, true);
	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, false);
}