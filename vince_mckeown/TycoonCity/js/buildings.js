function playerClass() {
	this.x = 45;
	this.y = 45;
	this.canMoveWest = true;
	this.canMoveNorth = true;
	this.canMoveEast = true;
	this.canMoveSouth = true;

	this.move = function(event) {
		switch (event.keyCode){
			case 37: // left
				this.checkAgainstWestSide(this.x, this.y);
				if (this.canMoveWest) {	
					this.x -= 30;
					this.y -= 15
				}
			break;
			case 38: // up
				this.checkAgainstNorthSide(this.x, this.y);
            	if(this.canMoveNorth){	
					this.x += 30;
					this.y -= 15;
				}
			break;
			case 39: // right
				this.checkAgainstEastSide(this.x, this.y);
				if (this.canMoveEast) {
					this.x += 30;
					this.y += 15;
				}
			break;
			case 40: // down
				this.checkAgainstSouthSide(this.x, this.y);
				if (this.canMoveSouth) {
					this.x -= 30;
					this.y += 15;
				}
			break;
		}
		this.canMoveWest = true;
		this.canMoveNorth = true;
		this.canMoveEast = true;
		this.canMoveSouth = true;
		playersTurn = false;
	}
	
	
    this.checkAgainstWestSide = function(posX, posY) {
        for (var i = 0; i <= 15; i++) {
			this.checkTile(posX, posY)
            var leftEdgeX = ((15 + (i * 30)) * -1);
            var leftEdgeY = 15 + (i * 15);
            if (posX == leftEdgeX && posY == leftEdgeY) {
                this.canMoveWest = false;
            }
        }
    }

    this.checkAgainstNorthSide = function(posX, posY) {
        for (var i = 0; i <= 15; i++) {
            this.checkTile(posX, posY)
			var topEdgeX = (i * 30) - 15;
            var topEdgeY = 15 + (i * 15);
            if (posX == topEdgeX && posY == topEdgeY) {
                this.canMoveNorth = false;
            }
        }
	}

	this.checkAgainstEastSide = function(posX, posY) {
		for (var i = 0; i <= 15; i++) {
			this.checkTile(posX, posY)
			var rightEdgeX = 315 - (i * 30);
			var rightEdgeY = 180 + (i * 15);
			if (posX == rightEdgeX && posY == rightEdgeY) {
				this.canMoveEast = false;
			}
		}
	}

	this.checkAgainstSouthSide = function(posX, posY) {
		for (var i = 0; i <= 15; i++) {
			var bottomEdgeX = (i * 30) - 465;
			var bottomEdgeY = 240 + (i * 15);			
			if (posX == bottomEdgeX && posY == bottomEdgeY) {
				this.canMoveSouth = false;
			}
		}
	}

	this.checkTile = function (posX, posY){
		var Xadjusted = posX;
		var Yadjusted = posY;
		var bumpIntoTileIndex = getTileTypeAtPixelCoord(Xadjusted, Yadjusted);
		console.log(bumpIntoTileIndex);
		console.log("X: "+ posX + " Y: " + posY);
	}
	

	this.draw = function () {
		canvasContext.drawImage(spriteCharacterPic, this.x, this.y);
	}
}