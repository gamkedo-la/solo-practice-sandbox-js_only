// arrow keys for player1 car movement
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

const KEY_LETTER_A = 65; // left
const KEY_LETTER_W = 87; // up
const KEY_LETTER_D = 68; // right
const KEY_LETTER_S = 83; // down

function initInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  p1.setupControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
  p2.setupControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
  if(thisKey == thisPlayer.controlKeyForNorth){
    thisPlayer.keyHeld_North = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForEast){
    thisPlayer.keyHeld_East = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForSouth){
    thisPlayer.keyHeld_South = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForWest){
    thisPlayer.keyHeld_West = setTo;
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, p1, true);
  setKeyHoldState(evt.keyCode, p2, true);

  evt.preventDefault(); // without this, arrow keys scroll the browser
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, p1, false);
  setKeyHoldState(evt.keyCode, p2, false);
}