const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_A = 65;
const KEY_D = 68;
const KEY_S = 83;
const KEY_W = 87;
var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;

var mousePos;

function initInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	document.addEventListener("mousedown", mouseClick);
	document.addEventListener("mousemove", 
		function(evt) {
		mousePos = calculateMousePos(evt);
		});
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, true);
	evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, false);
}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function mouseClick(evt) {
	if (!(mousePos.x > 0 && mousePos.x < canvas.width) ||
		!(mousePos.y > 0 && mousePos.y < canvas.height)) {
		console.log("mouse off canvas, player not moved");
		return;
	}

	if (!isBrickAtPixelCoord(mousePos.x,mousePos.y)) {
		sliderX = mousePos.x;
		sliderY = mousePos.y;
		currentPath = [];
		console.log("player teleported, currentPath reset");
	} else {
		console.log("BRICK in way, player not moved");
	}	
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
	case KEY_W: 
		holdUp = setTo;
		break;
	case KEY_DOWN_ARROW:
	case KEY_S: 
		holdDown = setTo;
		break;
	default:
		//console.log("Keycode is: " + thisKey);
	}
}