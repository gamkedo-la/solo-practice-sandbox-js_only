// car tuning constants
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.3;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.05;
const MIN_TURN_SPEED = 0.1;

function carClass() {
    // variables to keep track of car position
    this.x = 75;
    this.y = 75;
	this.xv = 0;
	this.yv = 0;
    this.projectiles = 10;
    this.bullets = 100;
	this.totalShots = 5;
	this.myShotList = [];

    // keyboard hold state variables, to use keys more like buttons
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    // key controls used for this car 
    this.setupControls = function(forwardKey, backKey, leftKey, rightKey, spaceBar) {
        this.controlKeyForGas = forwardKey;
        this.controlKeyForReverse = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
		this.controlKeyForFiring = spaceBar;
    }

    this.carInit = function(whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.carReset();
    }

    this.carReset = function() {
        this.speed = 0;
        this.ang = -0.5 * Math.PI;

        if (this.homeX == undefined) {
            for (var i = 0; i < trackGrid.length; i++) {
                if (trackGrid[i] == TRACK_PLAYER) {
                    var tileRow = Math.floor(i / TRACK_COLS);
                    var tileCol = i % TRACK_COLS;
                    this.homeX = tileCol * TRACK_W + 0.5 * TRACK_W;
                    this.homeY = tileRow * TRACK_H + 0.5 * TRACK_H;
                    trackGrid[i] = TRACK_ROAD;
                    break; // found it, so no need to keep searching 
                } // end of if
            } // end of for
        } // end of if car position not saved yet
		
		for (var i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].reset();
		}

        this.x = this.homeX;
        this.y = this.homeY;

    } // end of carReset

    this.cannonFire = function() {
        if (this.myShotList.length < this.totalShots) {
            let tempShot = new shotClass();
            tempShot.shootFrom(this);
            this.myShotList.push(tempShot);
			}
    }
	
	this.removeBullet = function (){
		for(var i = this.myShotList.length - 1; i >= 0 ; i--){
			if(this.myShotList[i].readyToRemove){
				this.myShotList.splice(i,1);
			}
		}
	}
	
	this.checkMyShotCollisionAgainst = function(thisEnemy){
		for (ii=0; ii < this.myShotList.length; ii++){
			if(this.myShotList[ii].hitTest(thisEnemy)){
				thisEnemy.markForRemoval();
				this.myShotList[ii].reset();
				document.getElementById("debugText").innerHTML = "Enemy Blasted!";
				//Score to be added
				/*let tempScore = new scoreDisplayClass; //create score being added
				tempScore.displayFrom("100", this.x, this.y, 0, 0, 50, "white");
				playerOne.displayScoreList.push(tempScore);
				this.score += 100; */
			}
		} 
	}

    this.carMove = function() {
        // only allow the car to turn while it's rolling
        if (Math.abs(this.speed) > MIN_TURN_SPEED) {
            if (this.keyHeld_TurnLeft) {
                this.ang -= TURN_RATE * Math.PI;
            }

            if (this.keyHeld_TurnRight) {
                this.ang += TURN_RATE * Math.PI;
            }
        }

        if (this.keyHeld_Gas) {
            this.speed += DRIVE_POWER;
			this.xv += DRIVE_POWER * Math.cos(this.ang);
			this.yv += DRIVE_POWER * Math.sin(this.ang);
        }
        if (this.keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
			this.xv -= REVERSE_POWER * Math.cos(this.ang);
			this.yv -= REVERSE_POWER * Math.sin(this.ang);
        }

        var nextX = this.x + Math.cos(this.ang) * this.speed;
        var nextY = this.y + Math.sin(this.ang) * this.speed;
		
		this.xv = nextX;
		this.yv = nextY;

        var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);

        if (drivingIntoTileType == TRACK_ROAD) {
            this.x = nextX;
            this.y = nextY;
        } else if (drivingIntoTileType == TRACK_GOAL) {
            document.getElementById("debugText").innerHTML = this.myName + " won the race";
            p1.carReset();
            p2.carReset();
        } else {
            this.speed = 0.0;
        }

        this.speed *= GROUNDSPEED_DECAY_MULT;
		
		for (var i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].movement();
		}
    }

    this.carDraw = function() {
		for (i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].draw();
		}
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
    }

} // end of car class