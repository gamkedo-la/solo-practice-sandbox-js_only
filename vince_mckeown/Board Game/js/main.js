var canvas;
var canvasContext;
var MousePosX;
var MousePosY;

window.onload = function() {
	canvas = document.getElementById("canvas"),
	canvasContext = canvas.getContext('2d');
	width = canvas.width = window.innerWidth,
	height = canvas.height = window.innerHeight,
	tileWidth = 60,
	tileHeight = 30;

	canvasContext.translate(width / 2, 50);

	loadImages();
	
	function drawTile(x, y, color) {
		console.log("3: " + canvasContext);
		canvasContext.save();
		canvasContext.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);

		canvasContext.beginPath();
		canvasContext.moveTo(0, 0);
		canvasContext.lineTo(tileWidth / 2, tileHeight / 2);
		canvasContext.lineTo(0, tileHeight);
		canvasContext.lineTo(-tileWidth / 2, tileHeight / 2);
		canvasContext.closePath();
		canvasContext.fillStyle = color;
		canvasContext.fill();

		canvasContext.restore();
	}	

	canvas.addEventListener('mousemove', function(evt) {
	
		var mousePos = calculateMousePos(evt);
	
		MousePosX = mousePos.x;
		MousePosY = mousePos.y;
	});
	
	//document.addEventListener("keydown", keyPressed);
	//document.addEventListener("keyup", keyReleased);
	
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
}
			
function moveEverything() {
	squareX += velocityX;
	squareY += velocityY;
}
			
function calculateMousePos(evt) {
	
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX, 
		y: mouseY
	};
}

var squareX = 615;
var squareY = 70;
var squareWidth = 25;
var squareHeight = 25;
var velocityX = .5;
var velocityY = 1;
						
function drawEverything() {
	drawTracks()
	colorRect(200, 0, 100, 50, "black");
	colorText("Mouse X: " + MousePosX, 205, 20, "white"); 
	colorText("Mouse Y: " + MousePosY, 205, 40, "white");
	colorRect(300, 60, 100, 50, "black");
	colorText("X: " + Math.floor(squareX) + " Y: " + Math.floor(squareY), 305, 80, "white");
	colorRect(squareX, squareY, squareWidth, squareHeight, "blue"); 
}




	
