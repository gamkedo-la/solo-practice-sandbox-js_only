var canvas;
var canvasContext;

var playerOne = new warriorClass();
var goblin1 = new enemyClass();
var goblin2 = new enemyClass();
var goblin3 = new enemyClass();
var goblin4 = new enemyClass();

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
	
	playerOne.warriorReset();
	goblin1.enemyReset();
	goblin2.enemyReset();
	goblin3.enemyReset();
	goblin4.enemyReset();
	
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	playerOne.init(warriorPic, "The Warrior");
	goblin1.init(enemyPic, "Goblin 1");
	goblin2.init(enemyPic, "Goblin 2");
	goblin3.init(enemyPic, "Goblin 3");
	goblin4.init(enemyPic, "Goblin 4");	
	
}
			
function moveEverything() {
	
	playerOne.movement();
	goblin1.movement();
	goblin2.movement();
	goblin3.movement();
	goblin4.movement();	
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
	drawTracks();
	playerOne.draw();
	goblin1.draw();
	goblin2.draw();
	goblin3.draw();
	goblin4.draw();
	canvasContext.drawImage(feedbackGUIPic,0, canvas.height-50);
	colorText("Keys: " + playerOne.keysHeld, 20, 582, "black");
}
