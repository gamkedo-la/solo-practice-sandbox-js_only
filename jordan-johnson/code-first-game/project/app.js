console.log('Hello World');
var ballX = 50;
var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');
var framesperSecond = 30;

setInterval(function () {
	moveEveryThing();
	drawEverything();
}, 1000 / framesperSecond);

function moveEveryThing() {
	ballX += 1;
}

function drawEverything() {
	canvasContext.fillStyle = 'Black';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	canvasContext.fillStyle = 'White';
	canvasContext.fillRect(0, 210, 10, 100);
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(ballX, 200, 10, 10);
}
