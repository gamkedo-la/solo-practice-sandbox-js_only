//scene function

const GAME_SCREEN = 0;
const WIN_SCREEN = 1;
const GAME_OVER = 2;
const TITLE_SCREEN = 3;
const MAIN_MENU = 4;
const CREDIT_SCREEN = 5;
var mode = GAME_SCREEN;

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
	colorText("New Game: [ENTER]", 330, 350, "15px arial", "white");
	colorText("Credits: [SHIFT]", 330, 400, "15px arial", "white");
}

function creditScreen() {
	colorRect(0, 0, c.width, c.height, 'black');
	colorText("Credits", c.width/2 - 80, c.height/2, "30px arial", "white");
	colorText("Main Menu: [SPACE]", 330, 350, "15px arial", "white");
}