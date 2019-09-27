var canvas;
var canvasContext;

var playerOne = new warriorClass();
var enemyList = [];
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
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].enemyReset();
	}
		
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	playerOne.init(warriorPic, "The Warrior");
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].init(enemyPic, "Goblin");
	}	
}

	
function addEnemy(){
	var tempEnemy = new enemyClass();
	enemyList.push(tempEnemy);
	console.log(enemyList.length);
}
			
function moveEverything() {
	
	playerOne.movement();
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].movement();
	}
	for(var i = 0; i < enemyList.length; i++){
		playerOne.checkCollisionsAgainst(enemyList[i]);
	}	
	goblin1.checkCollisionsAgainst(goblin2);
	goblin1.checkCollisionsAgainst(goblin3);
	goblin1.checkCollisionsAgainst(goblin4);
	goblin2.checkCollisionsAgainst(goblin3);
	goblin2.checkCollisionsAgainst(goblin4);
	goblin3.checkCollisionsAgainst(goblin4);
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
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].draw();
	}
	canvasContext.drawImage(feedbackGUIPic,0, canvas.height-50);
	colorText("Keys: " + playerOne.keysHeld, 20, 582, "black", "14px Arial Black");
}
