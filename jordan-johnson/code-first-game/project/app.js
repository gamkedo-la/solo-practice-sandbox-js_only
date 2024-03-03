console.log('Hello World');

var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');
var framesperSecond = 30;
var ballX = 50;
var ballY = 50;

var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;


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

	//Vertical Movement 
	ballY += ballSpeedY;

	if(ballY > canvas.height){
		ballSpeedY = -ballSpeedY;

	}
	if(ballY < 0 ){
		ballSpeedY = -ballSpeedY;
	}
}


function drawRect(topX,topY, width, height, color){
	canvasContext.fillStyle =  color;
	canvasContext.fillRect(topX, topY,width, height);
}
function drawEverything() {
	
	// Draws the black background
	drawRect(0,0,canvas.width, canvas.height, "Black");

	// Draws the Player Paddle
	drawRect(0,210,10,100, "White");

	// Draws the ball
	colorCircle(ballX, ballY, 10, 'white')
	
}


function colorCircle(centerX, centerY, radius, drawColor){
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();

	//first 2 are the center of the circle 
	// 3rd -> the radius 
	// Last 2: Angle and radians we want to go around the circle from 0 to 2pi 
	// Clockwise or counter clockwise 
	canvasContext.arc(centerX,centerY, radius ,0, Math.PI *2, true);
	canvasContext.fill();

}