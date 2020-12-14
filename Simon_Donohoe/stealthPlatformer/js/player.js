const RUN_SPEED = 4.0;
const JUMP_POWER = 12.0;

let jumperX = 75, jumperY = 75;
let jumperSpeedX = 0, jumperSpeedY = 0;
let jumperOnGround = false;
let JUMPER_RADIUS = 10;

function jumperReset() {
  // center jumper on screen
  jumperX = canvas.width/2;
  jumperY = canvas.height/2;
}

// function sliderReset() {
//   // center slider on screen
//   sliderX = canvas.width/2;
//   sliderY = canvas.height/2;
// }

