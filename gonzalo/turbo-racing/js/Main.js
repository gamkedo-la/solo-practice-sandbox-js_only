var canvas;
var canvasContext;
const p1 = new carClass();
const p2 = new carClass();
var dt = 0, last = timestamp();
const UPDATE_STEP = 1/30;

function runGameStep(browserTimeStamp)
{
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
    loadImages();
    initInput();
}

function loadingDoneSoStartGame() {
    p2.carInit(car2Pic, "Green Car");
    p1.carInit(carPic, "Blue Car");
	window.requestAnimationFrame(runGameStep);
}

function drawEverything() {
    drawTracks();
    p1.carDraw();
    p2.carDraw();
}

function moveEverything(dt) {
    p1.carMove(dt);
    p2.carMove(dt);
}

function timestamp() {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
