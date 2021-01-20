const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

// FIX THE KEY VALUE
const KEY_1 = 49;
const KEY_9 = 57;
const KEY_SPACE = 32;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;


function setupInput() {
	canvas.addEventListener('mousemove', updateMousePos);
	canvas.addEventListener('click', mouseButtonClicked);
	canvas.addEventListener('mousedown', mouseButtonPressed);

	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);

	blueWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
} 

function updateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	// cheat / hack to test car in any position
	/*carX = mouseX;
	carY = mouseY;
	carSpeedX = 4;
	carSpeedY = -4;*/
}


function mouseButtonClicked(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	var clickedIndex = getTileIndexAtPixelCoord(mouseX, mouseY);

	console.log(freshMap[clickedIndex], storedTileValue);
	
	freshMap[getTileIndexAtPixelCoord(mouseX, mouseY)] = storedTileValue;
}

function mouseButtonPressed(evt) {
	console.log('mouse button pressed NOW!')
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
	//console.log(evt.which)

	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, true);

	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	keySet(evt, false);

	if(evt.keyCode == KEY_1) {
		playersHUD.reduceHealth();
	}
	if(evt.keyCode == KEY_SPACE && titleScreen) {
		titleScreen = false;
		loadLevel(roomTwo);
	}
	if(evt.keyCode == KEY_9 && titleScreen) {
		console.log("what what!")
		editorMode = true;

	}
}