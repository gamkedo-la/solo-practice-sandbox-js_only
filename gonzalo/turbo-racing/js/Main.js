let canvas;
let canvasContext;
const p1 = new carClass();
const p2 = new carClass();
let dt = 0, last = timestamp();
const UPDATE_STEP = 1/30;
let carMoved = false;
let raceTime = 0;

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
  p2.carInit(true, imageLoader.getImage("car2Pic"), "Blue Car");
  p1.carInit(false, imageLoader.getImage("carPic"), "Green Car");
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
  drawRaceTime();
}

function drawRaceTime() {
  const minutes = Math.floor(raceTime/60);
  const seconds = raceTime - minutes*60;
  let secondsStr = seconds.toFixed(1);
  if (Number.parseFloat(secondsStr) < 10) {
	secondsStr = "0" + secondsStr;
  }
  const timeText = `${minutes.toString().padStart(2, "0")}:${secondsStr}`;
  canvasContext.fillStyle = 'black';
  canvasContext.font = 'normal 32px LCD14';
  canvasContext.globalAlpha = 0.5;
  canvasContext.fillRect(4, 4, canvasContext.measureText(timeText).width + 4, 44);
  canvasContext.globalAlpha = 1;
  canvasContext.fillStyle = 'lime';
  canvasContext.fillText(timeText, 8, 40);
  canvasContext.strokeText(timeText, 8, 40);
}

function moveEverything(dt) {
  p1.carMove(dt);
  p2.carMove(dt);
  if (carMoved) {
	raceTime += dt;
  }
  if ((Math.abs(p1.carX - p2.carX) < CAR_RADIUS*2.2) && (Math.abs(p1.carY - p2.carY) < CAR_RADIUS*2.2)) {
	p1.nudge(Math.sign(p1.carX - p2.carX), Math.sign(p1.carY - p2.carY), dt);
	p2.nudge(Math.sign(p2.carX - p1.carX), Math.sign(p2.carY - p1.carY), dt);
  }
}

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
