//input handling

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_BACKSPACE = 32;
const KEY_ENTER = 13;
const KEY_SHIFT = 16;
const KEY_Q = 81;
const KEY_S = 83;

function keyPressed(evt) {
	console.log("Key pressed: " + evt.keyCode);
	if(mode == GAME_SCREEN){
		if (evt.keyCode == KEY_LEFT_ARROW) {
			if(p1.x >= 20) {
				p1.x -= 10;
			}
		}

		if (evt.keyCode == KEY_RIGHT_ARROW) {
			if(p1.x <= c.width - PLAYER_SHIP_WIDTH - 20) {
				p1.x += 10;
			}
		}

		if (evt.keyCode == KEY_UP_ARROW) {
			p1.speedBuffer = false;
			if(p1.y >= 20){
				p1.y -= 5;
			}	
		}

		if (evt.keyCode == KEY_DOWN_ARROW) {
			if(p1.y <= 495){
				p1.y += 5;
			}
		}

		if(evt.keyCode == KEY_UP_ARROW && evt.keyCode == KEY_RIGHT_ARROW){
			p1.speedBuffer = false;
			if(p1.y >= 20){
				p1.y -= 5;
			}
			if(p1.x <= c.width - PLAYER_SHIP_WIDTH - 20) {
				p1.x += 10;
			}

		}

		if(evt.keyCode == KEY_BACKSPACE) {
			p1.playerReload();
		}

		//cheat keys

		if(evt.keyCode == KEY_Q) {
			a1.alienReload();
		}

		if(evt.keyCode == KEY_S) {
			p1.shield01 = !p1.shield01;
		}

	}

	if(mode == TITLE_SCREEN || mode == CREDIT_SCREEN) {
		if(evt.keyCode == KEY_BACKSPACE) {
			mode = MAIN_MENU;
			console.log(mode);
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
		if(evt.keyCode == KEY_BACKSPACE) {
			mode = GAME_SCREEN;
			playerScore = 0;
			p1.x = 400;
			p1.y = 500;
		}
	}



	evt.preventDefault(); // this is to prevent arrow keys from scrolling the page.
}


function keyReleased(evt) {
	//console.log("Key released: " + evt.keyCode);
	if(evt.keyCode == KEY_UP_ARROW) {
		p1.speedBuffer = true;
	}
}