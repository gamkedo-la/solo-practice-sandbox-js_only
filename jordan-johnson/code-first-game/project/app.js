console.log('Hello World');
var ballX = 50;
var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');

setInterval(drawEverything, 1);

function drawEverything() {
	ballX += 1;
	canvasContext.fillStyle = 'Black';
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	canvasContext.fillStyle = 'White';
	canvasContext.fillRect(225, 210, 200, 200);
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(ballX, 200, 10, 10);
}
