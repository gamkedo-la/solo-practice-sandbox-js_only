var canvas;
var canvasContext;

var playerOne = new shipClass();
var enemyList = [];
var asteroidList = [];
var highScore = 0;

var totalUFOs = 5;
var totalAsteroids = 3;

window.onload = function() {

    canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
	
	for (i = 0; i < totalUFOs; i++) {
        createEnemies();
	}
	for (i = 0; i < totalAsteroids; i++) {
        createAsteroids();
	}

    loadImages();

    initInput();

    canvas.addEventListener('mousemove', function(evt) {

        var mousePos = calculateMousePos(evt);

        MousePosX = mousePos.x;
        MousePosY = mousePos.y;
        canvasContext = canvas.getContext('2d');
    });

    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    playerOne.reset();
}

function createEnemies() {
	var tempUFO = new ufoClass();
    enemyList.push(tempUFO);
}

function createAsteroids(){
	var tempAsteroid = new asteroidClass();
    asteroidList.push(tempAsteroid);
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
		checkForCollisions();
		checkForRemovingItems();
        drawEverything();
    }, 1000 / framesPerSecond);
    playerOne.init(picture, "Player Ship");
    for (i = 0; i < enemyList.length; i++) {
		let name = [i];
		enemyList[i].init(ufoPic, name);
    }
	for (i = 0; i < asteroidList.length; i++) {
		let name2 = [i];
		asteroidList[i].init(asteroidPic, name2);
    }
}

function moveEverything() {

    playerOne.movement();
    for (i = 0; i < enemyList.length; i++) {
        enemyList[i].movement();
    }
	for (i = 0; i < asteroidList.length; i++) {
        asteroidList[i].movement();
    }
}

function checkForCollisions(){
	// player to object collisions
	for (var i = 0; i < enemyList.length; i++) {
		playerOne.checkMyShipCollisionAgainst(enemyList[i]);
    }
	for (var i = 0; i < asteroidList.length; i++) {
		playerOne.checkMyShipCollisionAgainst(asteroidList[i]);
    }
	// player shot to objects
	for (var i = 0; i < enemyList.length; i++) {
		playerOne.checkMyShotCollisionAgainst(enemyList[i]);
    }
	for (var i = 0; i < asteroidList.length; i++) {
		playerOne.checkMyShotCollisionAgainst(asteroidList[i]);
    }
	/*  ******************
	Currently crashing game
	*/
	// enemy to enemy collisions 
	/*for (i = 0; i < enemyList.length; i++) {
		for (ii = 0; ii < asteroidList.length; i++) {
			enemyList[i].checkMyShipCollisionAgainst(asteroidList[ii]);
		}
    } ********************** */ 
}

function checkForRemovingItems(){
	for (var i = enemyList.length-1; i >= 0 ; i--) {
		if(enemyList[i].readyToRemove){		
			enemyList.splice(i,1);
		}
    }
	for (var i = asteroidList.length-1; i >= 0 ; i--) {
		if(asteroidList[i].readyToRemove){		
			asteroidList.splice(i,1);
		}
    }
	if(enemyList.length == 0){
		resetGame();
	}
}
	
function drawEverything() {

    colorRect(0, 0, canvas.width, canvas.height, 'black');

    playerOne.draw();
    for (i = 0; i < enemyList.length; i++) {
		enemyList[i].draw();
    }
	for (i = 0; i < asteroidList.length; i++) {
		asteroidList[i].draw();
    }
    drawUserInterface();
}

function resetGame() {
    if (highScore <= playerOne.score) {
        highScore = playerOne.score;
    }
    playerOne.reset();
    playerOne.life = 3;
    playerOne.score = 0;
	totalUFOs = 3
	totalAsteroids = 1;
	for (i = 0; i < totalUFOs; i++) {
        createEnemies();
	}
	for (i = 0; i < totalAsteroids; i++) {
        createAsteroids();
	}
}