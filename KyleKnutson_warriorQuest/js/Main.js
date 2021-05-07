var canvas, canvasContext;

var blueWarrior = new warriorClass();
var playersHUD = new hudClass();

var titleScreen = true;
var editorMode = false;


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

	// Playing with adding the button-images, have to wait for images to load.
	setupTileButtons();

	if(!titleScreen){loadLevel(freshMap);}
	//loadLevel(roomTwo);
}



function loadLevel(whichLevel) {
	worldGrid = whichLevel.slice();
	blueWarrior.reset(warriorFacingSouth, "Blue Storm");
}



function updateAll() {
	moveAll();
	drawAll();
}



function moveAll() {
	if(titleScreen) {
	} else if(editorMode) {
	} else{
		blueWarrior.move();
	}
}



function drawAll() {
	if(titleScreen) {
		drawTitleScreen("black");
	} 
	if(editorMode) {
		drawTitleScreen("dodgerblue");
		loadLevel(freshMap)
		drawWorld();
	}
	if(!titleScreen) {
		drawWorld();
		blueWarrior.draw();
		playersHUD.draw();
	}
	
} 