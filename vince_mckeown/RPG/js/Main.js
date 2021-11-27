// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new warriorClass();
var pathFindingDisplay = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    SetupPathfindingGridData(p1);
    loadImages();
	for(var i = 0; i < roomGrid.length; i++){
		if(roomGrid[i] == TILE_ENEMY){
			addEnemy();
		} 
	}
}

function loadingDoneSoStartGame() {
    // these next few lines set up our game logic and render to happen 30 times per second
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);

    p1.init(playerPic, "Blue");
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].init(ghostPic, "red");
	}
    initInput();
}

function moveEverything() {
	p1.move();
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].move();
	}
	updatedCameraPosition();
}

function drawEverything() {
	shiftForCameraPan();
    drawRoom();
	if(pathFindingDisplay){
		drawPathingFindingTiles();
    }
	p1.draw();
	for(var i = 0; i < enemyList.length; i++){
		enemyList[i].draw();
	}
	finishedCameraPan();
}