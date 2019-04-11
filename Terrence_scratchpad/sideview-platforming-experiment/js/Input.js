const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_SPACE = 32;
const KEY_A = 65;
const KEY_D = 68;
//const KEY_S = 83;
const KEY_W = 87;

var holdLeft = false;
var holdRight = false;
var holdJump = false;
  
function initInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}

function setKeyHoldState(thisKey, setTo) {
	switch (thisKey) {
	case KEY_LEFT_ARROW:
	case KEY_A: 
		holdLeft = setTo;
		break;
	case KEY_RIGHT_ARROW:
	case KEY_D: 
		holdRight = setTo;
		break;
	case KEY_UP_ARROW:
	case KEY_SPACE:
	case KEY_W:
		holdJump = setTo;
		break;
	default:
		//console.log("Keycode is: " + thisKey);
	}
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, true);
	evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, false);
}