const PLAYER_MOVE_SPEED = 5.0;

const DIR_NORTH = 'north';
const DIR_EAST = 'east';
const DIR_SOUTH = 'south';
const DIR_WEST = 'west';

let isInvincible = false;

function warriorClass() {
	this.x = 75;
	this.y = 75;
	this.myWarriorPic; // which picture to use
	this.name = "Untitled Warrior";
	this.keysHeld = 0;
	this.potionsHeld = 0;

	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.keyHeld_East = false;

	this.isFacing;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	this.reset = function(whichImage, warriorName) {
		this.name = warriorName;
		this.isFacing = DIR_SOUTH;
		this.myWarriorPic = whichImage;
		this.keysHeld = 0;
		this.updateKeyReadout();
		this.updatePotionReadout();
		

		for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
				if(worldGrid[arrayIndex] == TILE_PLAYERSTART) {
					worldGrid[arrayIndex] = TILE_GROUND;
					this.x = eachCol * WORLD_W + WORLD_W/2;
					this.y = eachRow * WORLD_H + WORLD_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of warriorReset func

	this.updateKeyReadout = function() {
		document.getElementById("debugText").innerHTML = "Keys: " + this.keysHeld;
	}

	this.updatePotionReadout = function() {
		document.getElementById('potionReadout').innerHTML = `Potions: ${this.potionsHeld}`;
	}


	this.move = function(whichImage) {
		var nextX = this.x;
		var nextY = this.y;

		if(this.keyHeld_North) {
			nextY -= PLAYER_MOVE_SPEED;
			this.isFacing = DIR_NORTH;
			this.myWarriorPic = warriorFacingNorth;
		}
		if(this.keyHeld_East) {
			nextX += PLAYER_MOVE_SPEED;
			this.isFacing = DIR_EAST;
			this.myWarriorPic = warriorFacingEast;
		}
		if(this.keyHeld_South) {
			nextY += PLAYER_MOVE_SPEED;
			this.isFacing = DIR_SOUTH;
			this.myWarriorPic = warriorFacingSouth;
		}
		if(this.keyHeld_West) {
			nextX -= PLAYER_MOVE_SPEED;
			this.isFacing = DIR_WEST;
			this.myWarriorPic = warriorFacingWest;
		}

		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
		var walkIntoTileType = TILE_WALL;

		if(walkIntoTileIndex != undefined) {
			walkIntoTileType = worldGrid[walkIntoTileIndex];
		}

		switch(walkIntoTileType) {

			case TILE_GROUND:
				this.x = nextX;
				this.y = nextY;
				break;
			case TILE_SPIKES:
				this.x = nextX;
				this.y = nextY;
				playersHUD.reduceHealth(2);
				break;
			case TILE_FOOD:
				this.x = nextX;
				this.y = nextY;
				playersHUD.restoreHealth(1);
				worldGrid[walkIntoTileIndex] = TILE_GROUND;
				break;
			case TILE_POTION:
				this.x = nextX;
				this.y = nextY;
				// playersHUD.restoreHealth('full');
				this.potionsHeld ++;
				this.updatePotionReadout();
				worldGrid[walkIntoTileIndex] = TILE_GROUND;
				break;
			case TILE_GOAL:
				console.log(this.name + " WINS!");
				loadLevel(roomOne);
				break;
			case TILE_DOOR:
				if(this.keysHeld > 0) {
					this.keysHeld--; // one less key
					this.updateKeyReadout();
					worldGrid[walkIntoTileIndex] = TILE_GROUND;
				}
				break;
			case TILE_TRANSPORT:
				var warriorWorldCol = Math.floor(nextX / WORLD_W);
				var warriorWorldRow = Math.floor(nextY / WORLD_H);	
				if(warriorWorldCol == WORLD_COLS) {
					// get corresponding TILE_TRANSPORT INDEX for roomTwo; 
					
					loadLevel(roomTwo);
				}
				break;
			case TILE_KEY:
				this.keysHeld++; // one more key
				this.updateKeyReadout();
				worldGrid[walkIntoTileIndex] = TILE_GROUND;
				break;
			case TILE_WALL:
			default:
				break;
		}
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myWarriorPic, this.x,this.y, 0);
	}
}