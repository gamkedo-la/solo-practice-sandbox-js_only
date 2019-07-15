// select canvas
var canvas = document.getElementById("gameCanvas");
var canvasContext = canvas.getContext("2d");

// draw rect function
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight); 
}

// draw Circle
function colorCircle(centerX, centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

// draw Text
function colorText(showWords, textX, textY, fillColor) {
    canvasContext.fillStyle = fillColor;
	canvasContext.font = "42px arial"
    canvasContext.fillText(showWords, textX, textY);
}

var courtColor = 'green';
var ballColor = 'white';
var BALL_RADIUS = 10;
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballSpeedX = 2;
var ballSpeedY = 2;

colorRect(0, 0, canvas.width, canvas.height, courtColor);
colorCircle(ballX, ballY, BALL_RADIUS, ballColor);
colorText("helloworld", canvas.width/2, 200, 'white');