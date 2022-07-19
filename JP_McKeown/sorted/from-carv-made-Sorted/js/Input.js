const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

  blueCar.setupInput(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
  greenCar.setupInput(KEY_W, KEY_S, KEY_A, KEY_D);
}

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

// because pressed & released identical except true/false
function keySet(evt, whichCar, setTo) {
  // console.log("Key: "+evt.keyCode, setTo);
  if(evt.keyCode == whichCar.controlKeyLeft) {
		whichCar.keyHeld_left = setTo;
	}
	if(evt.keyCode == whichCar.controlKeyRight) {
		whichCar.keyHeld_right = setTo;
	}
	if(evt.keyCode == whichCar.controlKeyUp) {
		whichCar.keyHeld_tractor = setTo;
	}
	if(evt.keyCode == whichCar.controlKeyDown) {
		whichCar.keyHeld_drop = setTo;
	}
}

// maybe flip set keyHeld_
function keyPressed(evt) {
  keySet(evt, blueCar, true);
  keySet(evt, greenCar, true);
	evt.preventDefault();
}

function keyReleased(evt) {
  keySet(evt, blueCar, false);
  keySet(evt, greenCar, false);
}