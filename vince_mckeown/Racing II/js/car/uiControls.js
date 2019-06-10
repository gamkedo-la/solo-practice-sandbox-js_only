const KEY_W = 87; 
const KEY_S = 83; 
const KEY_A = 65; 
const KEY_D = 68; 
const KEY_F = 70;

const KEY_INSERT = 45;
const KEY_HOME = 36;
const KEY_PAGE_UP = 33;
const KEY_DELETE = 46;
const KEY_END = 35;
const KEY_PAGE_DOWN = 34;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const ENTER_KEY = 13;

const KEY_F1 = 112;
const KEY_F2 = 113;
const KEY_P = 80;


function initInput(){
	canvas.addEventListener('mousemove', function(evt) {
	
	calculateMousePos(evt);
	document.getElementById("debugText").innerHTML = "(" +mouseX+ ", " +mouseY+ ")";
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	canvas.addEventListener('click',function(evt){
		if(levelEditor){
			mouseClick(mouseX, mouseY);
		} else if(titleScreen){
			titleScreenMouseClick(mouseX, mouseY);
		} else if(carUpgradeScreen){
			carUpgradeScreenMouseClick(mouseX, mouseY)
		}
	} );
	
	canvas.addEventListener('mousedown',function(evt){
		isMouseDragging = true;
	} );
	
	if(computerPlayerOn) {
		vehicleList[1].setupControls(KEY_W, KEY_S, KEY_A, KEY_D, KEY_F);
	}
	vehicleList[0].setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW, KEY_PAGE_DOWN);
}

function keyPressed(evt) {
	var levelEditorKey = KEY_F1;
	var debugKey = KEY_F2;
	var pausedKey = KEY_P;
	
	setKeyHoldState(evt.keyCode, vehicleList[0], true);
	setKeyHoldState(evt.keyCode, vehicleList[1], true);
	evt.preventDefault();
	
	if(pausedKey == evt.keyCode){
		console.log(paused);
		if(paused){
			paused = false;
		} else {
			paused = true;
		}
	} else if (levelEditorKey == evt.keyCode) {
		if(levelEditor){
			levelEditor = false;
		} else 
			levelEditor = true;
	} else if (debugKey = evt.keyCode){
		if(debugMode){
			debugMode = false;
		} else {
			debugMode = true;
		}
	}
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, vehicleList[0], false);
	setKeyHoldState(evt.keyCode, vehicleList[1], false);
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
	
	if(thisKey == thisCar.controlKeyForNitro){
		thisCar.keyHeld_Nitro = setTo;
	}
}


function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}



