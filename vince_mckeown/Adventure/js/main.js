var canvas;
var canvasContext;

var playerOne = new warriorClass();
var goblinList = [];
var orcList = [];

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
	for(var i = 0; i < goblinList.length; i++){
		goblinList[i].enemyReset();
	}
	for(var i = 0; i < orcList.length; i++){
		orcList[i].enemyReset();
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
		if(roomGrid[i] == TILE_GOBLIN){
			addGoblin();
			addOrc();
		}
	}
	for(var i = 0; i < goblinList.length; i++){
		goblinList[i].init(goblinPic, goblinNames[i]);
	}

	for(var i = 0; i < orcList.length; i++){
		orcList[i].init(orcPic, orcNames[i]);
	}		
}

//Adds an enemy 
function addGoblin(){
	var tempEnemy = new enemyClass();
	goblinList.push(tempEnemy);
}

function addOrc(){
	var tempEnemy = new enemyClass();
	orcList.push(tempEnemy);
}
			
//All movement occurs here.  This is called every frame.
function moveEverything() {
	playerOne.movement();
	for(var i = 0; i < goblinList.length; i++){
		goblinList[i].movement();
	}
	for(var i = 0; i < orcList.length; i++){
		orcList[i].movement();
	}
	updatedCameraPosition();
}

//This checks player and enemy collisions.  This is called every frame.
function checkAllPlayerAndEnemyCollisions(){
	//player
	for(var i = 0; i < goblinList.length; i++){
		playerOne.checkCollisionsAgainst(goblinList[i]);
		for(var ii = i+1; ii < goblinList.length; ii++){
			goblinList[i].checkCollisionsAgainst(goblinList[ii]);
			goblinList[i].checkCollisionsAgainst(playerOne);
		}
		//add orcs
	}	
}

//All movement occurs here.  This is called every frame.
function drawEverything() {
	colorRect(0,0,canvas.width,canvas.height, 'black');
	shiftForCameraPan();
	drawTracks();
	playerOne.draw();
	for(var i = 0; i < goblinList.length; i++){
		goblinList[i].draw();
	}
		for(var i = 0; i < orcList.length; i++){
		orcList[i].draw();
	}
	finishedCameraPan();
	canvasContext.drawImage(feedbackGUIPic,0, canvas.height-50);
	colorText("Keys: " + playerOne.keysHeld, 20, 582, "black", "14px Arial Black");
}
