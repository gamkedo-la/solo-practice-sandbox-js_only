//create parent class for enemy and player
function enemyClass(xPos, yPos, myName) {
    this.x = xPos;
    this.y = yPos;
    this.name = myName;
    this.myPic = spriteEnemyPic;
    this.moveWest = true;
    this.canMoveWest = true;
    this.moveNorth = false;
    this.canMoveNorth = true;
    this.moveEast = false;
    this.canMoveEast = true;
    this.moveSouth = false;
    this.canMoveSouth = true


    this.wanderDirection = function() {
        this.moveWest = false;
        this.canMoveWest = true;
        this.moveNorth = false;
        this.canMoveNorth = true;
        this.moveEast = false;
        this.canMoveEast = true;
        this.moveSouth = false;
        this.canMoveSouth = true;

        var randomDirection = Math.floor(Math.random() * 4);

        switch (randomDirection) {
            case 0:
                this.moveWest = true;
                break;
            case 1:
                this.moveNorth = true;
                break;
            case 2:
                this.moveEast = true;
                break;
            case 3:
                this.moveSouth = true;
                break;
        }
    }

    this.move = function() {
        if (this.moveWest) {
            this.checkAgainstWestSide(this.x, this.y);
            if (this.canMoveWest) {
                this.x -= 30;
                this.y -= 15;
            } else {
                console.log(this.name + " can't move West");
            }
        } else if (this.moveNorth) {
            this.checkAgainstNorthSide(this.x, this.y);
            console.log(this.canMoveNorth);
            if (this.canMoveNorth) {
                this.x += 30;
                this.y -= 15;
            } else {
                console.log(this.name + " can't move North");
            }
        } else if (this.moveEast) {
            this.checkAgainstEastSide(this.x, this.y);
            if (this.canMoveEast) {
                this.x += 30;
                this.y += 15;
            } else {
                console.log(this.name + " can't move East");
            }
        } else if (this.moveSouth) {
            this.checkAgainstSouthSide(this.x, this.y);
            if (this.canMoveSouth) {
                this.x -= 30;
                this.y += 15;
            } else {
                console.log(this.name + " can't move South");
            }
        }
        this.wanderDirection();
    }
	
	this.move = function() {
        if (this.moveWest) {
            this.checkAgainstWestSide(this.x, this.y);
            if (this.canMoveWest) {
                this.x -= 30;
                this.y -= 15;
			}
        } else if (this.moveNorth) {
            this.checkAgainstNorthSide(this.x, this.y);
            if (this.canMoveNorth) {
                this.x += 30;
                this.y -= 15;
			}
        } else if (this.moveEast) {
            this.checkAgainstEastSide(this.x, this.y);
            if (this.canMoveEast) {
                this.x += 30;
                this.y += 15;
			}
		} else if (this.moveSouth) {
            this.checkAgainstSouthSide(this.x, this.y);
            if (this.canMoveSouth) {
                this.x -= 30;
                this.y += 15;
			}
        }
        this.wanderDirection();
    }

    this.checkAgainstWestSide = function(posX, posY) {
        for (var i = 0; i <= 15; i++) {
            var leftEdgeX = ((15 + (i * 30)) * -1);
            var leftEdgeY = 15 + (i * 15);
            if (posX == leftEdgeX && posY == leftEdgeY) {
                this.canMoveWest = false;
            }
        }
    }

    this.checkAgainstNorthSide = function(posX, posY) {
        for (var i = 0; i <= 15; i++) {
            var topEdgeX = (i * 30) - 15;
            var topEdgeY = 15 + (i * 15);
            if (posX == topEdgeX && posY == topEdgeY) {
                this.canMoveNorth = false;
            }
        }
	}

	this.checkAgainstEastSide = function(posX, posY) {
		for (var i = 0; i <= 15; i++) {
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

	this.draw = function(image, x, y) {
		canvasContext.drawImage(image, this.x, this.y);
		colorText(this.name, x + 10, y - 10, "black" ); 
	}
}