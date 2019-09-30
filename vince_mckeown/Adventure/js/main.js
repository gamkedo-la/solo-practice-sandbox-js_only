var canvas;
var canvasContext;

var playerOne = new warriorClass();
var enemyList = [];

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

function calculateMousePos(evt) {
	
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX, 
		y: mouseY
	};
}

function imageLoadingDoneSoStartGame(){
	var framesPerSecond = 30;
	setInterval(function() {
		moveEverything();
		checkAllPlayerAndEnemyCollisions();
		drawEverything();
	}, 1000/framesPerSecond);
	playerOne.init(warriorPic, "The Warrior");
	for(var i = 0; i < roomGrid.length; i++){
		if(roomGrid[i] == TILE_ENEMY){
			addEnemy();
		}
	}
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].init(enemyPic, "Goblin");
	}	
}

//Adds an enemy 
function addEnemy(){
	var tempEnemy = new enemyClass();
	enemyList.push(tempEnemy);
	console.log(enemyList.length);
}
			
//All movement occurs here.  This is called every frame.
function moveEverything() {
	playerOne.movement();
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].movement();
	}
}

//This checks player and enemy collisions.  This is called every frame.
function checkAllPlayerAndEnemyCollisions(){
	//player
	for(var i = 0; i < enemyList.length; i++){
		playerOne.checkCollisionsAgainst(enemyList[i]);
		for(var ii = i+1; ii < enemyList.length; ii++){
			enemyList[i].checkCollisionsAgainst(enemyList[ii]);
			enemyList[i].checkCollisionsAgainst(playerOne);
		}
	}	
}

//All movement occurs here.  This is called every frame.
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
