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
			if(spaceShipPosX >= 20) {
				spaceShipPosX -= 10;
			}
		}

		if (evt.keyCode == KEY_RIGHT_ARROW) {
			if(spaceShipPosX <= c.width - PLAYER_SHIP_WIDTH - 20) {
				spaceShipPosX += 10;
			}
		}

		if (evt.keyCode == KEY_UP_ARROW) {
			speedBuffer = false;
			if(spaceShipPosY >= 20){
				spaceShipPosY -= 5;
			}	
		}

		if (evt.keyCode == KEY_DOWN_ARROW) {
			if(spaceShipPosY <= 495){
				spaceShipPosY += 5;
			}
		}

		if(evt.keyCode == KEY_UP_ARROW && evt.keyCode == KEY_RIGHT_ARROW){
			speedBuffer = false;
			if(spaceShipPosY >= 20){
				spaceShipPosY -= 5;
			}
			if(spaceShipPosX <= c.width - PLAYER_SHIP_WIDTH - 20) {
				spaceShipPosX += 10;
			}

		}

		if(evt.keyCode == KEY_BACKSPACE) {
			playerReload();
		}

		//cheat keys

		if(evt.keyCode == KEY_Q) {
			console.log("alien shot");
			alienReload();
		}

		if(evt.keyCode == KEY_S) {
			shield01 = !shield01;
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
			spaceShipPosX = 400;
			spaceShipPosY = 500;
		}
	}


	evt.preventDefault(); // this is to prevent arrow keys from scrolling the page.
}


function keyReleased(evt) {
	//console.log("Key released: " + evt.keyCode);
	if(evt.keyCode == KEY_UP_ARROW) {
		speedBuffer = true;
	}
}