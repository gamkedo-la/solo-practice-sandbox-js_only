var canvas;
var canvasContext;

var playerOne = new shipClass();
var enemy = new ufoClass();
	
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
	
	playerOne.reset();
	enemy.reset();
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	playerOne.init(picture, "Red Vehicle");	
	enemy.init(ufoPic, "UFO");
}
			
function moveEverything() {
	
	playerOne.movement();
	enemy.movement();
	playerOne.checkMyShipAndShotCollisionAgainst(enemy);
}
									
function drawEverything() {
				
	//clears screen
	colorRect(0,0,canvas.width,canvas.height, 'black');
				
	playerOne.draw();
	enemy.draw();
}
