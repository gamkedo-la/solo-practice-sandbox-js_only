const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_D = 68;
const KEY_S = 83;
const KEY_A = 65;

let mouseX = 0;
let mouseY = 0;

function setupInput(){
  canvas.addEventListener("mousemove", updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  blueCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
  greenCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A);
}

function updateMousePos(evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft;
  mouseY = evt.clientY - rect.top - root.scrollTop;

  //cheat / hack to test car in any position
    // carX = mouseX;
    // carY = mouseY;
    // carSpeedX = 3;
    // carSpeedY = -4;
}

function keySet(keyEvent, whichCar, setTo){
  if(keyEvent.keyCode == whichCar.controlKeyLeft){
    whichCar.keyHeld_TurnLeft = setTo;
    }
  if(keyEvent.keyCode == whichCar.controlKeyRight){
    whichCar.keyHeld_TurnRight = setTo;
    }
  if(keyEvent.keyCode == whichCar.controlKeyUp){
    whichCar.keyHeld_Accel = setTo;
  }
  if(keyEvent.keyCode == whichCar.controlKeyDown){
    whichCar.keyHeld_Reverse = setTo;
    }
}

function keyPressed(evt){
  // console.log("Key pressed: " + evt.keyCode);
  keySet(evt, blueCar, true);
  keySet(evt, greenCar, true);
  evt.preventDefault();
}

function keyReleased(evt){
  // console.log("Key released: " + evt.keyCode);
  keySet(evt, blueCar, false);
  keySet(evt, greenCar, false);
}
