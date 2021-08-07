// const KEY_LEFT_ARROW = 37; //keyboard A
// const KEY_UP_ARROW = 38; // keyboard W
// const KEY_RIGHT_ARROW =39 ;//keyboard D
// const KEY_DOWN_ARROW = 40;// keyboard S

const KEY_W = 87; // keyboard W
const KEY_A = 65; //keyboard A
const KEY_S = 83;// keyboard S
const KEY_D =68 ;//keyboard D
const KEY_SPACEBAR = 32;//JUMP

// const KEY_E =

var mouseX = 0;
var mouseY = 0;

function setupInput(){
  canvas.addEventListener('mousemove', updateMousePosition);
  document.addEventListener('keydown',keyPressed);
  document.addEventListener('keyup',keyReleased);

  blackCar.setupInput(KEY_W, KEY_D, KEY_S, KEY_A, KEY_SPACEBAR);
//   blueCar.setupInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);

}

function updateMousePosition(mouseEvent) {
    var rect = canvas.getBoundingClientRect();  f
    var root = document.documentElement; 
    mouseX = mouseEvent.clientX - rect.left - root.scrollLeft;
    mouseY = mouseEvent.clientY - rect.top - root.scrollTop; 
}



function keySet(keyEvent,whichCar, setTo){
    if(keyEvent.keyCode == whichCar.controlKeyLeft){
        whichCar.keyHeld_TurnLeft = setTo;

    }
    if(keyEvent.keyCode == whichCar.controlKeyRight){
        whichCar.keyHeld_TurnRight = setTo;
    }

    if(keyEvent.keyCode ==whichCar.controlKeyUp){
        whichCar.keyHeld_Gas = setTo;
    }
    if(keyEvent.keyCode == whichCar.controlKeyDown){
         whichCar.keyHeld_Reverse = setTo;
    }

    if(keyEvent.keyCode == whichCar.controlKeyJump){
        whichCar.keyHeld_Jump = setTo;
    }

}
function keyPressed(evt){
  
    keySet(evt,blackCar,true);
    keySet(evt,blueCar,true);
    evt.preventDefault();

}

function keyReleased(evt){
   
    keySet(evt,blackCar,false);
    keySet(evt,blueCar,false);
}
