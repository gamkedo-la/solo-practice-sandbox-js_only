var canvas;
var canvasContext;

var propertyOne = new propertyClass();
var propertyTwo = new propertyClass();

window.onload = function(){
			
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
				
	loadImages();
	
	initInput();	
	
	canvas.addEventListener('mousemove', function(evt) {
	
	var mousePos = calculateMousePos(evt);
	
	MousePosX = mousePos.x;
	MousePosY = mousePos.y;
	});
	
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 60;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	propertyOne.init(propertyPic, "1");
	propertyTwo.init(propertyPic, "2");
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
	colorRect(0,0,canvas.width,canvas.height, 'black');		
	drawLandScape();
	propertyOne.draw();
	propertyTwo.draw();
}
