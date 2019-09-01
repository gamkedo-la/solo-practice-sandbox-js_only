var canvas;
var canvasContext;

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
						
function drawEverything() {
	drawTracks()
}

	
