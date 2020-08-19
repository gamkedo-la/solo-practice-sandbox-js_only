function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  p1.setupControls("ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "ShiftRight");
  p2.setupControls("KeyW", "KeyS", "KeyA", "KeyD", "ShiftLeft");
}

function setKeyHoldState(thisKey, thisCar, setTo) {
  if (thisKey == thisCar.controlKeyForGas) {
	thisCar.keyHeld_Gas = setTo;
  }
  if (thisKey == thisCar.controlKeyForReverse) {
	thisCar.keyHeld_Reverse = setTo;
  }
  if (thisKey == thisCar.controlKeyForTurnLeft) {
	thisCar.keyHeld_TurnLeft = setTo;
  }
  if (thisKey == thisCar.controlKeyForTurnRight) {
	thisCar.keyHeld_TurnRight = setTo;
  }
  if (thisKey == thisCar.controlKeyForNitro) {
	thisCar.keyHeld_Nitro = setTo;
  }
}    

function keyPressed(evt) {
  switch(evt.code) {
  case "KeyT":
	track.flipTheme();
	break;
  case "PageUp":
	track.prevMap();
	break;
  case "PageDown":
	track.nextMap();
	break;
  default:
	for (p of [p1, p2].filter(p => !p.cpuControl)) {
	  setKeyHoldState(evt.code, p, true);
	}
  }
  evt.preventDefault();
}

function keyReleased(evt) {
  setKeyHoldState(evt.code, p1, false);
  setKeyHoldState(evt.code, p2, false);
}
