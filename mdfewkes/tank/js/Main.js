var canvas, canvasContext, debugText;
var framesPerSecond = 30;

var numberOfPlayers = 4;
var arrayOfPlayers = [];
var arrayOfProjectiles = [];
var arrayOfExplosions = [];

var playerTurn = 0;
var incrementTurn = false;

var deltaTime = 0;
var lastFrameTime = window.performance.now();
var elapsed = 0;
var frameStepSize = 1/60;
var now;

const GAME_MODE = 0;
const TITLE_SCREEN = 1;
var mode = GAME_MODE;

var skyColor = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
var skyColorGradient = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
var groundColor = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));
var groundColorGradient = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));

const UI_HEIGHT = 100

var map = new terrain();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	gameStart();
}

function gameStart() {
	map.init(canvas.width, canvas.height-UI_HEIGHT);

	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayers[i] = new tankClass();

		arrayOfPlayers[i].x = lerp(0, canvas.width, (i+1)/(numberOfPlayers+1));
		arrayOfPlayers[i].angle = lerp(45, 135, i/(numberOfPlayers-1)); 
		arrayOfPlayers[i].color = fullColorHex(rndInt(0,255), rndInt(0,255), rndInt(0,255));

	}

	arrayOfPlayers[0].myTurn = true;

	window.requestAnimationFrame(frameLoop);
}

function frameLoop() {

	now = window.performance.now();

	deltaTime = deltaTime + Math.min(1, (now-lastFrameTime) / 1000);

	while (deltaTime > frameStepSize) {
		deltaTime = deltaTime - frameStepSize;
		update(frameStepSize);
	}

	lastFrameTime = now;

	window.requestAnimationFrame(frameLoop);
}

function update(frameTime) {	
	switch (mode) {
		case GAME_MODE:
			modeGame(frameTime);
			break;
		case TITLE_SCREEN:
			modeTitle(frameTime);
			break;
	}

	if (Key.isJustPressed(Key.BRACKET_LEFT)){
		turnVolumeDown()
	}
	if (Key.isJustPressed(Key.BRACKET_RIGHT)){
		turnVolumeUp();
	}

	backgroundMusic.updateMusic(frameTime);
	Key.update();
}

function modeGame(frameTime) {
	// colorRect(0, 0, canvas.width, canvas.height, skyColor);	
	var gradient = canvasContext.createLinearGradient(0,0,0,canvas.height - UI_HEIGHT);
	gradient.addColorStop(0, skyColor);
	gradient.addColorStop(1, skyColorGradient);
	colorRect(0, 0, canvas.width, canvas.height, gradient);

	colorRect(0, canvas.height - UI_HEIGHT, canvas.width, canvas.height, "Grey");
	
	colorRect(100, canvas.height - UI_HEIGHT + 20, canvas.width - 200, 20, "White");
	colorText("Player " + pad(playerTurn+1, 2) + 
		" Angle "  + pad(Math.round(arrayOfPlayers[playerTurn].angle), 3) + 
		" Power " + pad(Math.round(arrayOfPlayers[playerTurn].power), 3) + 
		" Health " + pad(Math.round(arrayOfPlayers[playerTurn].health), 3),
		250, canvas.height - UI_HEIGHT + 35, "Black", "15px Arial")


	colorRect(100, canvas.height - UI_HEIGHT + 60, canvas.width - 200, 20, "White");
	colorText(arrayOfPlayers[playerTurn].weapon, 400, canvas.height - UI_HEIGHT + 75, "Black", "15px Arial") 

	map.draw();

	for (var i = 0; i < numberOfPlayers; i++) {
		arrayOfPlayers[i].update(frameTime);
		arrayOfPlayers[i].draw(frameTime);
	}
	for (var i = 0; i < arrayOfProjectiles.length; i++) {
		arrayOfProjectiles[i].update(frameTime);
		arrayOfProjectiles[i].draw(frameTime);
	}
	for (var i = 0; i < arrayOfExplosions.length; i++) {
		arrayOfExplosions[i].update(frameTime);
		arrayOfExplosions[i].draw(frameTime);
	}

	cleanLists();
	nextTurn()
}

function modeTitle(frameTime) {
	colorRect(0, 0, canvas.width, canvas.height, "LightGrey");	
	colorRect(100, 100, canvas.width-200, canvas.height-200, "Grey");
	colorText("Tank Game", canvas.width/2 - 125, canvas.height/2, "White", "50px Arial");

	if (Key.isJustPressed(Key.SPACE)){
		mode = GAME_MODE;
	}
}

function nextTurn() {
	if (incrementTurn) {
		arrayOfPlayers[playerTurn].myTurn = false;

		playerTurn++;
		if (playerTurn >= numberOfPlayers) {
			playerTurn = 0;
		}

		arrayOfPlayers[playerTurn].myTurn = true;

		incrementTurn = false;
	}
}

function cleanLists() {
	for (var i = 0; i < arrayOfProjectiles.length; i++) {
		if (!arrayOfProjectiles[i].active) {
			arrayOfProjectiles.splice(i, 1);
			i--;
		}
	}
	for (var i = 0; i < arrayOfExplosions.length; i++) {
		if (!arrayOfExplosions[i].active) {
			arrayOfExplosions.splice(i, 1);
			i--;
		}
	}
}