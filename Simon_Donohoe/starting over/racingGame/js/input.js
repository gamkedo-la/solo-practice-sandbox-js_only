// arrow keys for player1 car movement
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

// keyboard hald state variables, to use keys more like buttons
let keyHeld_Gas = false;
let keyHeld_Reverse = false;
let keyHeld_TurnLeft = false;
let keyHeld_TurnRight = false;

function initInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

function setKeyHoldState(thisKey, setTo) {
  if(thisKey == KEY_UP_ARROW){
    keyHeld_Gas = setTo;
  }
  if(thisKey == KEY_DOWN_ARROW){
    keyHeld_Reverse = setTo;
  }
  if(thisKey == KEY_LEFT_ARROW){
    keyHeld_TurnLeft = setTo;
  }
  if(thisKey == KEY_RIGHT_ARROW){
    keyHeld_TurnRight = setTo;
  }
}

function keyPressed(evt) {
  // document.getElementById("debugText").innerHTML = "KeyCode Pushed: " + evt.keyCode;

  setKeyHoldState(evt.keyCode, true);

  evt.preventDefault(); // without this, arrow keys scroll the browser
}

function keyReleased(evt) {
  // document.getElementById("debugText").innerHTML = "KeyCode Released: " + evt.keyCode;

  setKeyHoldState(evt.keyCode, false);
}