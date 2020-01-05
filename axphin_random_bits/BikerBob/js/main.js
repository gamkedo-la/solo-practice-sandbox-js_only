// select canvas
var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");
	
var framesPerSecond = 60; // default 30
	
var ballColor = 'white';
var ballEdge = 'cyan';
var BALL_RADIUS = 10;
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballSpeedX = 2;
var ballSpeedY = 2;
	
var courtColor = 'midnightblue';
	
var PADDLE_HEIGHT = 100;
var PADDLE_WIDTH = 10;
	
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight); 
}
	
function colorCircle(centerX, centerY, radius, fillColorA, fillColorB) {
	canvasContext.fillStyle = fillColorA;
	canvasContext.strokeStyle = fillColorB;
	canvasContext.lineWidth = 2;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
	canvasContext.stroke();
}
	
function drawEverything() {
        // draw the game court rectangle
		colorRect(0, 0, canvas.width, canvas.height, courtColor);
		// draw ball with parameters
        colorCircle(ballX, ballY, BALL_RADIUS, ballColor, ballEdge);
    }
	
function moveEverything() {
        if(ballX + ballSpeedX > canvas.width-BALL_RADIUS || ballX + ballSpeedX < BALL_RADIUS) {
            ballSpeedX = -ballSpeedX;
        }
        if(ballY + ballSpeedY > canvas.height-BALL_RADIUS || ballY + ballSpeedY < BALL_RADIUS) {
            ballSpeedY = -ballSpeedY;
        }
        ballX += ballSpeedX;
        ballY += ballSpeedY;
    }
//setInterval(drawEverything, 15);
	
setInterval(function() {
    moveEverything();
    drawEverything();
}, 1000/framesPerSecond);