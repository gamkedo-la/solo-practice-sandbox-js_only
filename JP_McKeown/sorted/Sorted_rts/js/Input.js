// tried 22 June 2022 to integrate Warrior keyboard control for player shephered, but it isnt responsing

function setKeyHoldState(thisKey, thisPlayer, setTo) {
  if(thisKey  == thisPlayer.controlKeyNorth) {
    thisPlayer.keyHeld_up = setTo;
  }
  if(thisKey  == thisPlayer.controlKeyEast) {
    thisPlayer.keyHeld_right = setTo;
  }
  if(thisKey  == thisPlayer.controlKeySouth) {
    thisPlayer.keyHeld_down = setTo;
  }
  if(thisKey  == thisPlayer.controlKeyWest) {
    thisPlayer.keyHeld_left = setTo;
  }
}

function keyPressed(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	if(evt.keyCode == KEY_LEFT_ARROW) {
		keyHeld_left = true;
	}
	if(evt.keyCode == KEY_RIGHT_ARROW) {
		keyHeld_right = true;
	}
	if(evt.keyCode == KEY_UP_ARROW) {
		keyHeld_up = true;
	}
	if(evt.keyCode == KEY_DOWN_ARROW) {
		keyHeld_down = true;
	}
	evt.preventDefault();
}

function keyReleased(evt) {
	// console.log("Key pressed: "+evt.keyCode);
	if(evt.keyCode == KEY_LEFT_ARROW) {
		keyHeld_left = false;
	}
	if(evt.keyCode == KEY_RIGHT_ARROW) {
		keyHeld_right = false;
	}
	if(evt.keyCode == KEY_UP_ARROW) {
		keyHeld_up = false;
	}
	if(evt.keyCode == KEY_DOWN_ARROW) {
		keyHeld_down = false;
	}
}

function inputInit() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
  
  // p1.setupControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}