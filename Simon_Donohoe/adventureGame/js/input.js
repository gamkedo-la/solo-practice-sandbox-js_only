const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

let mouseX = 0;
let mouseY = 0;

function setupInput(){
  canvas.addEventListener("mousemove", updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  blueWarrior.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
}

function updateMousePos(evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  //cheat / hack to test warrior in any position
    // warriorX = mouseX;
    // warriorY = mouseY;
    // warriorSpeedX = 3;
    // warriorSpeedY = -4;
}

function keySet(keyEvent, whichWarrior, setTo){
  if(keyEvent.keyCode == whichWarrior.controlKeyLeft){
    whichWarrior.keyHeld_TurnLeft = setTo;
    }
  if(keyEvent.keyCode == whichWarrior.controlKeyRight){
    whichWarrior.keyHeld_TurnRight = setTo;
    }
  if(keyEvent.keyCode == whichWarrior.controlKeyUp){
    whichWarrior.keyHeld_Accel = setTo;
  }
  if(keyEvent.keyCode == whichWarrior.controlKeyDown){
    whichWarrior.keyHeld_Reverse = setTo;
    }
}

function keyPressed(evt){
  // console.log("Key pressed: " + evt.keyCode);
  keySet(evt, blueWarrior, true);
  evt.preventDefault();
}

function keyReleased(evt){
  // console.log("Key released: " + evt.keyCode);
  keySet(evt, blueWarrior, false);
}
