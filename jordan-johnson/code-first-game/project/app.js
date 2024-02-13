console.log('Hello World');
var ballX = 50;
var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');
var framesperSecond = 30;
var ballSpeedX = 5;
setInterval(function () {
	moveEveryThing();
	drawEverything();
}, 1000 / framesperSecond);

function moveEveryThing() {
	ballX += ballSpeedX;

	if(ballX > canvas.width){
		ballSpeedX = -ballSpeedX;

	}
	if(ballX < 0 ){
		ballSpeedX = -ballSpeedX;
	}
}


function drawRect(topX,topY, width, height, color){
	canvasContext.fillStyle =  color;
	canvasContext.fillRect(topX, topY,width, height);
}
function drawEverything() {
	
	// Draws the black background
	drawRect(0,0,canvas.width, canvas.height, "Black")

	// Draws the Player Paddle
	drawRect(0,210,10,100, "White")

	// Draws the ball
	drawRect(ballX, 200,10,10,'red')
}
