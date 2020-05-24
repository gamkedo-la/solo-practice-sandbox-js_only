// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_JUMP = 32;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  
  player.setupControls(KEY_RIGHT_ARROW, KEY_LEFT_ARROW, KEY_JUMP);
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
  if (thisKey == thisPlayer.controlKeyForEast) {
    thisPlayer.keyHeld_East = setTo;
  }
  if (thisKey == thisPlayer.controlKeyForWest) {
    thisPlayer.keyHeld_West = setTo;
  }
  if (thisKey == thisPlayer.controlKeyForJump) {
    thisPlayer.keyHeld_Jump = setTo;
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, player, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, player, false);
}