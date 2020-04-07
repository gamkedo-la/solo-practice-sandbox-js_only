//alien variables
var alienPosX = 100;
var alienPosY = 100;
var alienSpeedX = 4;
const ALINE_WIDTH = 100;
const ALIEN_HEIGHT = 30;
var alienDestroyed = false;
var respawnTimer = 0;
var alienColor = 'green';
var alienShotActive = false;
var alienShotX;
var alienShotY;
const ALIEN_SHOT_SPEED = 10;

function alienShotCheck() {
	if(p1.shield01 && alienShotY >= p1.spaceShipPosY - 20 && alienShotX >= p1.spaceShipPosX - 20 && alienShotX <= p1.spaceShipPosX + PLAYER_SHIP_WIDTH + 20){
		p1.shield01 = false;
		alienShotActive = false;
	}

	if(alienShotY >= p1.spaceShipPosY && alienShotX >= p1.spaceShipPosX && alienShotX <= p1.spaceShipPosX + PLAYER_SHIP_WIDTH){
		alienShotActive = false;
		console.log("player destroyed");
		p1.playerLose();
	}
	if(alienShotY >= c.height) {
		alienShotActive = false;
	}
}

function moveAlien() {
	alienPosX = alienPosX - alienSpeedX;
	
	if(alienPosX > c.width - ALINE_WIDTH - screenBuffer) {
		alienSpeedX = -alienSpeedX;
	}
	
	if(alienPosX < 0 + screenBuffer) {
		alienSpeedX = -alienSpeedX;
	}
}

function respawnAlien() {
	if(alienDestroyed == true){
		respawnTimer++;
		if(respawnTimer >= 60) {
			alienDestroyed = false;
			respawnTimer = 0;
		}
	}
}

function alienReload(){
	if(alienShotActive == false) {
		alienShotX = alienPosX + ALINE_WIDTH/2;
		alienShotY = alienPosY + ALIEN_HEIGHT;
		alienShotActive = true;
	}
}