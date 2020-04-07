//input handling

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_BACKSPACE = 32;
const KEY_Q = 81;
const KEY_S = 83;

function keyPressed(evt) {
	if(mode == GAME_SCREEN){
		//console.log("Key pressed: " + evt.keyCode);
		if (evt.keyCode == KEY_LEFT_ARROW) {
			if(p1.spaceShipPosX >= 20) {
				p1.spaceShipPosX -= 10;
			}
		}

		if (evt.keyCode == KEY_RIGHT_ARROW) {
			if(p1.spaceShipPosX <= c.width - PLAYER_SHIP_WIDTH - 20) {
				p1.spaceShipPosX += 10;
			}
		}

		if (evt.keyCode == KEY_UP_ARROW) {
			p1.speedBuffer = false;
			if(p1.spaceShipPosY >= 20){
				p1.spaceShipPosY -= 5;
			}	
		}

		if (evt.keyCode == KEY_DOWN_ARROW) {
			if(p1.spaceShipPosY <= 495){
				p1.spaceShipPosY += 5;
			}
		}

		if(evt.keyCode == KEY_UP_ARROW && evt.keyCode == KEY_RIGHT_ARROW){
			p1.speedBuffer = false;
			if(p1.spaceShipPosY >= 20){
				p1.spaceShipPosY -= 5;
			}
			if(p1.spaceShipPosX <= c.width - PLAYER_SHIP_WIDTH - 20) {
				p1.spaceShipPosX += 10;
			}

		}

		if(evt.keyCode == KEY_BACKSPACE) {
			p1.playerReload();
		}

		//cheat keys

		if(evt.keyCode == KEY_Q) {
			console.log("alien shot");
			alienReload();
		}

		if(evt.keyCode == KEY_S) {
			p1.shield01 = !p1.shield01;
		}

	}

	if(mode == TITLE_SCREEN) {
		if(evt.keyCode == KEY_BACKSPACE) {
			mode = MAIN_MENU;
		}
	}

	if(mode != GAME_SCREEN && mode != TITLE_SCREEN) {
		if(evt.keyCode == KEY_BACKSPACE) {
			mode = GAME_SCREEN;
			playerScore = 0;
			p1.spaceShipPosX = 400;
			p1.spaceShipPosY = 500;
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