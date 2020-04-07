//scene function

const GAME_SCREEN = 0;
const WIN_SCREEN = 1;
const GAME_OVER = 2;
const TITLE_SCREEN = 3;
const MAIN_MENU = 4;
const CREDIT_SCREEN = 5;
var mode = TITLE_SCREEN;

function gameMode() {

	//player shot
	if(shotActive) {
		colorCircle(shotX, shotY, 3, 'white'); 
		//colorRect(shotX, shotY, 4, 10,'white');
	}

	//alien
	if(alienDestroyed == false) {
		ctx.drawImage(alienShipPic, alienPosX, alienPosY);
		//colorRect(alienPosX, alienPosY, ALINE_WIDTH, ALIEN_HEIGHT, alienColor);
	}

	if(alienShotActive) {
		colorRect(alienShotX, alienShotY, 4, 10, 'white');
	}

	//space ship
	if(spaceshipPicLoaded){
		ctx.drawImage(spaceshipPic, spaceShipPosX, spaceShipPosY);
	}

	//ship shield
	if(shield01) {
		drawBitmapCenteredAtLocationWithRotation(shieldPic, spaceShipPosX + PLAYER_SHIP_WIDTH/2, spaceShipPosY + PLAYER_SHIP_HEIGHT/2, angle);
		//colorEmptyCircle(spaceShipPosX + PLAYER_SHIP_WIDTH/2, spaceShipPosY + PLAYER_SHIP_HEIGHT/2, 55, 'white');
	}
	
	//player score
	colorText("Score: " + playerScore, 700, 560, "15px arial", "white");

	respawnAlien();

}

function gameOverScreen() {
	colorRect(0, 0, c.width, c.height, 'blue');
	colorText("Game Over", c.width/2 - 80, c.height/2, "30px arial", "white");
	colorText("New Game: [SPACE]", 330, 350, "15px arial", "white");
}

function winScreen() {
	colorRect(0, 0, c.width, c.height, 'green');
	colorText("Player Wins", c.width/2 - 80, c.height/2, "30px arial", "white");
	colorText("New Game: [SPACE]", 330, 350, "15px arial", "white");
}

function titleScreen() {
	colorRect(0, 0, c.width, c.height, 'red');
	colorText("Title Screen", c.width/2 - 80, c.height/2, "30px arial", "white");
	colorText("New Game: [SPACE]", 330, 350, "15px arial", "white");
}

function mainMenuScreen() {
	colorRect(0, 0, c.width, c.height, 'orange');
	colorText("Main Menu", c.width/2 - 80, c.height/2, "30px arial", "white");
	colorText("New Game: [SPACE]", 330, 350, "15px arial", "white");
}

function creditScreen() {
	colorRect(0, 0, c.width, c.height, 'black');
	colorText("Credits", c.width/2 - 80, c.height/2, "30px arial", "white");
	colorText("New Game: [SPACE]", 330, 350, "15px arial", "white");
}