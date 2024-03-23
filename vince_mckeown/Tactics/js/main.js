var canvas;
var canvasContext;

//characters (Player, NPC's, Enemies)
var playerOne = new warriorClass();

function resetEnemyLists(){
}

//game states
var liveGame = true;
var pauseScreen = false;
var inventoryScreen = false;
var mainMenu = false;


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
	loadLevel(levelOne)
	playerOne.init(wizardPic, "Nesquit");
}

function nextLevel() {
	levelNow++;
	if(levelNow > levelList.length) {
		levelNow = 0;
	}
	loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {	
	resetEnemyLists();
	roomGrid = whichLevel.slice();
	playerOne.warriorReset();
	console.log("Finish Load Level");
}

			
//All movement occurs here.  This is called every frame.
function moveEverything() {
	if(liveGame){
		playerOne.movement();
		updatedCameraPosition();
	}
}

//This checks player and enemy collisions.  This is called every frame.
//This requires refactoring.  Too many individual lines checking monsters to players
function checkAllPlayerAndEnemyCollisions(){
	 
}


//All movement occurs here.  This is called every frame.
function drawEverything() {
	colorRect(0,0,canvas.width,canvas.height, 'black');
	if(liveGame){
		shiftForCameraPan();
		drawTracks();
		playerOne.draw();
		finishedCameraPan();
		colorText("Keys: " + playerOne.keysHeld, 20, 582, "black", "14px Arial Black");
	}
}
