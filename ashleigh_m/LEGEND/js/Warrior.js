const PLAYER_MOVE_SPEED = 50;

function warriorClass(){
	this.x = 75;
	this.y = 75;
	this.speed = 5;

	this.keyHeld_Up = false;
	this.keyHeld_Down = false;
	this.keyHeld_Left = false;
	this.keyHeld_Right = false;

	this.setupInput = function(upKey, rightKey, downKey, leftKey){
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	//need to pick a noun for the tiles, might jjust be world
	this.reset = function() {
		for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
			for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
				if(worldGrid[arrayIndex] == TILE_PLAYERSTART) {
					worldGrid[arrayIndex] = TILE_ROAD;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				}
			}
		}
	}

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;

		if(this.keyHeld_Up) {
			nextY -= PLAYER_MOVE_SPEED;
		}
		if(this.keyHeld_Down) {
			nextY += PLAYER_MOVE_SPEED;
		}
		if(this.keyHeld_Left) {
			nextX -= PLAYER_MOVE_SPEED;
		}
		if(this.keyHeld_Right) {
			nextX += PLAYER_MOVE_SPEED;
		}

		var walkIntoTileIndex = getTileTypeAtPixelCoord(nextX, nextY);
		console.log(nextX + ", " + nextY);
		console.log(walkIntoTileIndex);

		if(walkIntoTileIndex == TILE_GOAL) {
			console.log(this.name + " WINS!");
			loadLevel(levelOne);
		} else if(walkIntoTileIndex == TILE_ROAD) {
			this.x = nextX;
			this.y = nextY;
		}
	}

	this.draw = function(){
		drawBitmapCenteredWithRotation(warriorPic, this.x,this.y);
	}
}