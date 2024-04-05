const ISO_CHAR_FOOT_Y = 8;
const COLLIDE_BUMP_MULT = 2; // this needs to be improved.  This could potentially cause enemy or player in an illegal position (wall)

function warriorClass() {
	this.x = 600;
	this.y = 800;
	this.width = 32;
	this.height = 60;
	this.offSetWidth = 0;
	this.offSetHeight = 0;
	this.miniMapX = 630;
	this.miniMapY = 30;
	this.playerMovementSpeed = 3.0;
	this.keyHeld_North = false;
	this.keyHeld_East = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.canMoveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;
	this.canMoveWest = true;	
	this.health = 4;
	this.maxHealth = 4;
	this.trapCoolDownTimer = 0;
	this.trapCoolDownCounter = 0;
	this.movementArray = [67];
	this.usingPath = false;

	this.warriorPic = document.createElement("img");
	
	this.setupControls = function(northKey,eastKey,southKey,westKey) {
		this.controlKeyForNorth = northKey;
		this.controlKeyForEast = eastKey;			
		this.controlKeyForSouth = southKey;
		this.controlKeyForWest = westKey;
	}

	this.warriorReset = function() {
		this.speed = 0;
		this.keysHeld = 1;
					
		for(var i=0; i<roomGrid.length; i++){
			if( roomGrid[i] == TILE_PLAYER) {
				var tileRow = Math.floor(i/ROOM_COLS);
				var tileCol	= i%ROOM_COLS;
				var tileLeftEdgeX = 700
				var tileTopEdgeY = 0;

				this.homeX = tileCol * ROOM_W + 0.5 * ROOM_W; 
				this.homeY = tileRow * ROOM_H + 0.5 * ROOM_H; 

				roomGrid[i] = TILE_FLOOR_STONE_1;
				break;
			}
		}
	
		this.x = this.homeX;
		this.y = this.homeY;
		this.miniMapX = this.homeX + 750;
		this.miniMapY = this.homeY + 2;
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.warriorReset();
	}	
	 
	this.movement = function() {
		
		var currentIndex;

		if(this.usingPath == false){
			currentIndex = this.movementArray[0];
			if(this.keyHeld_North){
				currentIndex = indexN(currentIndex);
				if(this.movementArray.length > 1 && this.movementArray[1] == currentIndex){
					this.movementArray.shift();
				} else {
					this.movementArray.unshift(currentIndex);
				}
				this.keyHeld_North = false;
			}
			if(this.keyHeld_South){
				currentIndex = indexS(currentIndex);
				if(this.movementArray.length > 1 && this.movementArray[1] == currentIndex){
					this.movementArray.shift();
				} else {
					this.movementArray.unshift(currentIndex);
				}
				this.keyHeld_South = false;
			}
			if(this.keyHeld_West){
				currentIndex = indexW(currentIndex);
				if(this.movementArray.length > 1 && this.movementArray[1] == currentIndex){
					this.movementArray.shift();
				} else {
					this.movementArray.unshift(currentIndex);
				}
				this.keyHeld_West = false;
			}
			if(this.keyHeld_East){
				currentIndex = indexE(currentIndex);
				if(this.movementArray.length > 1 && this.movementArray[1] == currentIndex){
					this.movementArray.shift();
				} else {
					this.movementArray.unshift(currentIndex);
				}
				this.keyHeld_East = false;
			}

			if(this.movementArray.length > 7){
				this.movementArray.shift();
			}
		} else {
			currentIndex = getTileIndexAtPixelCoord(this.x,this.y);
			var tileN = indexN(currentIndex);
			var tileS = indexS(currentIndex);
			var tileW = indexW(currentIndex);
			var tileE = indexE(currentIndex);
			var lastNode = this.movementArray.length - 1;
			console.log(this.movementArray[lastNode], currentIndex);
			if(this.movementArray[lastNode] == currentIndex){
				var col = currentIndex%ROOM_COLS;
				var row = Math.floor(currentIndex/ROOM_COLS);
				this.x = col * ROOM_W + ROOM_W * 0.5;
				this.y = row * ROOM_H + ROOM_H * 0.5;
				this.movementArray.pop();
				if(this.movementArray.length == 1){
					this.usingPath = false;
				}
			} else if (this.movementArray[lastNode] == tileN) {
				this.y -= this.playerMovementSpeed;
			} else if (this.movementArray[lastNode] == tileS) {
				this.y += this.playerMovementSpeed;
			} else if (this.movementArray[lastNode] == tileW) {
				this.x -= this.playerMovementSpeed;
			} else if (this.movementArray[lastNode] == tileE) {
				this.x += this.playerMovementSpeed;
			}
		}

		/*var nextX = this.x; 
		var nextY = this.y; 
		var collisionX = nextX;
		var collisionY = nextY;
		
		if(this.keyHeld_North && this.keyHeld_West){
			nextY -= this.playerMovementSpeed;
			collisionY = nextY 
		} else if(this.keyHeld_North && this.keyHeld_East){
			nextX += this.playerMovementSpeed;
		} else if(this.keyHeld_South && this.keyHeld_West){
			nextX -= this.playerMovementSpeed;
		} else if(this.keyHeld_South && this.keyHeld_East){
			nextY += this.playerMovementSpeed; 
		} else if(this.keyHeld_North && this.canMoveNorth){
			nextY -= this.playerMovementSpeed;
			this.offSetHeight = this.height * 4;
		} else if(this.keyHeld_East && this.canMoveEast){
			nextX += this.playerMovementSpeed;
			this.offSetHeight = this.height * 1;
		} else if(this.keyHeld_South && this.canMoveSouth){
			nextY += this.playerMovementSpeed;
			this.offSetHeight = this.height * 2;
		} else if(this.keyHeld_West && this.canMoveWest){
			nextX -= this.playerMovementSpeed;
			this.offSetHeight = this.height * 3;
		} else {
			this.offSetHeight = 0;
		}
		this.miniMapX = nextX;
		this.miniMapY = nextY;
		
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
		var walkIntoTileType = TILE_FLOOR_STONE_1;
		
		if(walkIntoTileType != undefined){	
			walkIntoTileType = roomGrid[walkIntoTileIndex];
		}

		switch(walkIntoTileType) {
			case TILE_FLOOR_STONE_1:
			case TILE_FLOOR_STONE_2:
			case TILE_FLOOR_STONE_3:
			case TILE_FLOOR_STONE_4:
			case TILE_FLOOR_SEWER_1:
			case TILE_FLOOR_SEWER_2:
			case TILE_FLOOR_SEWER_3:
			case TILE_FLOOR_SEWER_4:
			case TILE_FLOOR_SEWER_5:
			case TILE_FLOOR_SEWER_6:
			case TILE_FLOOR_SEWER_7:

				this.x = nextX;
				this.y = nextY;
				break;
			default:
				break;
		} // END OF SWITCH CASE		
		this.trapCoolDown();
		*/
	}	// END OF THIS.MOVEMENT

		
	this.checkCollisionsAgainst = function(otherHumanoid){
		if(this.collisionTest(otherHumanoid)){
			console.log("collision");
			if(this.keyHeld_North){
				this.canMoveNorth = false;
				this.y += this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_East){
				this.canMoveEast = false;
				this.x -= this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_South){
				this.canMoveSouth = false;
				this.y -= this.playerMovementSpeed * COLLIDE_BUMP_MULT;
			} else if(this.keyHeld_West){
				this.canMoveWest = false;
				this.x += this.playerMovementSpeed * COLLIDE_BUMP_MULT;				
			}
		} else {
			this.canMoveNorth = true;
			this.canMoveEast = true;
			this.canMoveSouth = true;
			this.canMoveWest = true;
		}
	}
	
	this.collisionTest = function(otherHumanoid){
		if(	this.x > otherHumanoid.x - 20 && this.x < otherHumanoid.x + 20 &&
			this.y > otherHumanoid.y - 20 && this.y < otherHumanoid.y + 20){
				return true;
		}
		return false;
	}
		
	this.draw = function(){
		gameCoordToIsoCoord(this.x,this.y);
		canvasContext.drawImage(this.myBitmap, this.offSetWidth, this.offSetHeight, this.width, this.height, 
								isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, this.width, this.height);
		colorRect(isoDrawX-(this.width/2), isoDrawY-this.height - ISO_CHAR_FOOT_Y, 10, 10, 'white');
	}
		
	//this delivers damage to the player when setting off a trap
	this.takeDamageFromTrap = function(howMuchDamage){
		if(this.trapCoolDownCounter == 0){
			this.health = this.health - howMuchDamage;
		}
		trapCoolDownTimer = true;
	}
	
	//this is used to keep traps from constantly causing damage to the player
	this.trapCoolDown = function(){
		if(this.trapCoolDownTimer == true){
			this.trapCoolDownCounter++
		}
		if(this.trapCoolDownCounter == 120){
			this.trapCoolDownCounter = 0;
			this.trapCoolDownTimer = false;
		}
	}
	
	
}