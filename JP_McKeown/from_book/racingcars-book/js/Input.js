const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87; ////
const KEY_LETTER_A = 65; ////
const KEY_LETTER_S = 83; ////
const KEY_LETTER_D = 68; ////

var keyHeld_Forward = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

function setKeyHoldState(thisKey, thisCar, setTo) {
  if(thisKey  == thisCar.controlKeyTurnLeft) {
    thisCar.keyHeld_TurnLeft = setTo;
  }
  if(thisKey  == thisCar.controlKeyTurnRight) {
    thisCar.keyHeld_TurnRight = setTo;
  }
  if(thisKey  == thisCar.controlKeyForward) {
    thisCar.keyHeld_Forward = setTo;
  }
  if(thisKey  == thisCar.controlKeyReverse) {
    thisCar.keyHeld_Reverse = setTo;
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, p1, true);
  setKeyHoldState(evt.keyCode, p2, true);
  evt.preventDefault();
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, p1, false);
  setKeyHoldState(evt.keyCode, p2, false);
}

function inputInit() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
  
  p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
  p2.setupControls(KEY_LETTER_W, KEY_LETTER_S, KEY_LETTER_A, KEY_LETTER_D);
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect(), root = document.documentElement;

  // account for the margins, canvas position on page, scroll amount, etc.
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}