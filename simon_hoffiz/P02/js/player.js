//player ship variables
var spaceShipPosX = 380;
var spaceShipPosY = 460;
const PLAYER_SHIP_WIDTH = 60; //current width of pixel art
const PLAYER_SHIP_HEIGHT = 80; //current height of pixel art 
var speedBuffer = false;

var shield01 = true;

function playerShotCheck() {
	if(shotY <= alienPosY + ALIEN_HEIGHT && shotX >= alienPosX && shotX <= alienPosX + ALINE_WIDTH) {
		shotActive = false;
		console.log("alien destroyed");
		alienDestroyed = true;
		playerScoring();
	}
	if(shotY < 0) {
		shotActive = false;
	}
}


function playerScoring() {
	playerScore ++;
	
	if(playerScore >= WIN_SCORE){
		mode = WIN_SCREEN;
	}
}

function playerLose() {
	mode = GAME_OVER;
}

function spaceshipAutoReverse() {
	if(spaceShipPosY <= 495 && speedBuffer){
		spaceShipPosY += 1;
	}
}

function playerReload() {
	if(shotActive == false) {
		shotX = spaceShipPosX + 30;
		shotY = spaceShipPosY;
		shotActive = true;
	}
}