// tried 22 June 2022 to integrate Warrior keyboard control for player shephered, but it isnt responsing

const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

var keyHeld_North = false;
var keyHeld_East = false;
var keyHeld_South = false;
var keyHeld_West = false;

function setKeyHoldState(thisKey, thisPlayer, setTo) {
  if(thisKey  == thisPlayer.controlKeyNorth) {
    thisPlayer.keyHeld_North = setTo;
  }
  if(thisKey  == thisPlayer.controlKeyEast) {
    thisPlayer.keyHeld_East = setTo;
  }
  if(thisKey  == thisPlayer.controlKeySouth) {
    thisPlayer.keyHeld_South = setTo;
  }
  if(thisKey  == thisPlayer.controlKeyWest) {
    thisPlayer.keyHeld_West = setTo;
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, p1, true);
  console.log(evt.keyCode)
  evt.preventDefault();
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, p1, false);
}

function inputInit() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
  
  p1.setupControls(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
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