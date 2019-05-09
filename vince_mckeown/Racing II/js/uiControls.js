const KEY_W = 87; // "W"
const KEY_S = 83; // "S"
const KEY_A = 65; // "A"
const KEY_D = 68; // "D"

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;


function initInput(){
	canvas.addEventListener('mousemove', function(evt) {
	
	var mousePos = calculateMousePos(evt);
	
	MousePosX = mousePos.x;
	MousePosY = mousePos.y;
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	
	if(!computerPlayerOn) {
		playerTwo.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
	}
	playerOne.setupControls(KEY_W, KEY_S, KEY_A, KEY_D);
	
	

}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, playerOne, true);
	setKeyHoldState(evt.keyCode, playerTwo, true);
	evt.preventDefault();
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, playerOne, false);
	setKeyHoldState(evt.keyCode, playerTwo, false);
}


function setKeyHoldState(thisKey, thisCar, setTo) {

	if(thisKey == thisCar.controlKeyForGas){
		thisCar.keyHeld_Gas = setTo;
	}
	if(thisKey == thisCar.controlKeyForReverse){
		thisCar.keyHeld_Reverse = setTo;
	}
	if(thisKey == thisCar.controlKeyForTurnLeft){
		thisCar.keyHeld_TurnLeft = setTo;
	}
	
	if(thisKey == thisCar.controlKeyForTurnRight){
		thisCar.keyHeld_TurnRight = setTo;
	}
}

