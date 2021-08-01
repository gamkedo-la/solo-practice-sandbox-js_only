var canvas, canvasContext;

var blueWarrior = new warriorClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');

	loadImages();
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	setupInput();

	loadLevel(levelOne);
}

function loadLevel(whichLevel) {
	worldGrid = whichLevel.slice();
	blueWarrior.reset(warriorPic, "Blue Storm");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	blueWarrior.move();
}

function drawAll() {
	drawWorld();
	blueWarrior.draw();
	drawHelp();	
} 

function drawHelp() {
	colorRect(0, canvas.height - 75, canvas.width, 75, 'black');
	if(blueWarrior.keysHeld>0) {
		drawInventory(blueWarrior.keysHeld);
	}
}

function drawInventory(keysHeld) {
	img = worldPics[TILE_KEY];
	offsetX = 30;
	invY = canvas.height - 60;
	for(var k=0; k<keysHeld; k++) {
		invX = offsetX + k * (WORLD_W +20);
		canvasContext.drawImage(img, invX, invY);
	}
	// console.log(keysHeld)
}