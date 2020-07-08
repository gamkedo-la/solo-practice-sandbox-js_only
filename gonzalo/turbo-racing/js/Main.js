var canvas;
var canvasContext;
const p1 = new carClass();
const p2 = new carClass();
var dt = 0, last = timestamp();
const UPDATE_STEP = 1/30;
let carMoved = false;

function runGameStep(browserTimeStamp) {
  dt += Math.min(1, (browserTimeStamp - last)/1000);
  while(dt > UPDATE_STEP) {
	dt -= UPDATE_STEP;
	moveEverything(UPDATE_STEP);
  }
  drawEverything();
  last = browserTimeStamp;
  window.requestAnimationFrame(runGameStep);
}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  imageLoader.loadImages().then(startGame);
  initInput();
}

function startGame(values) {
  p2.carInit(imageLoader.getImage("car2Pic"), "Green Car");
  p1.carInit(imageLoader.getImage("carPic"), "Blue Car");
  window.requestAnimationFrame(runGameStep);
}

function drawEverything() {
  track.draw();
  p1.carDraw();
  p2.carDraw();
  if (!carMoved) {
	colorTextCentered(
	  "Press T key to switch between day/night themes!",
	  canvas.width/2, canvas.height/2 - 110,
	  "white", "22px Arial Black"
	);
  }
}

function moveEverything(dt) {
  p1.carMove(dt);
  p2.carMove(dt);
}

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
