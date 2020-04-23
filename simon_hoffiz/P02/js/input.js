//input handling
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACE = 32;
const KEY_ENTER = 13;
const KEY_SHIFT = 16;
const KEY_Q = 81;
const KEY_S = 83;

var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;

function initInput() {
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
}

function keyPressed(evt) {
	console.log("Key pressed: " + evt.keyCode);
	if(mode == GAME_SCREEN){
		if (evt.keyCode == KEY_LEFT_ARROW) {
			holdLeft = true;
		}

		if (evt.keyCode == KEY_RIGHT_ARROW) {
			holdRight = true;
		}

		if (evt.keyCode == KEY_UP_ARROW) {
			holdUp = true;
		}

		if (evt.keyCode == KEY_DOWN_ARROW) {
			holdDown = true;
		}

		if(evt.keyCode == KEY_SPACE) {
			p1.fireShot();
			
		}

		//cheat keys

		if(evt.keyCode == KEY_Q) {

		}

		if(evt.keyCode == KEY_S) {
			p1.shield01 = !p1.shield01;
		}

	}

	if(mode == TITLE_SCREEN || mode == CREDIT_SCREEN) {
		if(evt.keyCode == KEY_SPACE) {
			mode = MAIN_MENU;
		}
	}

	if(mode == MAIN_MENU) {
		if(evt.keyCode == KEY_ENTER) {
			mode = GAME_SCREEN;
		}
		if(evt.keyCode == KEY_SHIFT) {
			mode = CREDIT_SCREEN;
		}
	}

	if(mode == WIN_SCREEN || mode == GAME_OVER) {
		if(evt.keyCode == KEY_SPACE) {
			resetGame();
		}
	}
	
	evt.preventDefault(); // this is to prevent arrow keys from scrolling the page.
}


function keyReleased(evt) {
	//console.log("Key released: " + evt.keyCode);
	if (evt.keyCode == KEY_LEFT_ARROW) {
		holdLeft = false;
	}

	if (evt.keyCode == KEY_RIGHT_ARROW) {
		holdRight = false;
	}

	if (evt.keyCode == KEY_UP_ARROW) {
		holdUp = false;
	}

	if (evt.keyCode == KEY_DOWN_ARROW) {
		holdDown = false;
	}
}