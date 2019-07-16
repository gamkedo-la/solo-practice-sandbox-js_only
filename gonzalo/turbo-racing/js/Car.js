const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 500;
const REVERSE_POWER = 200;
const TURN_RATE = 1.2;
const MIN_TURN_SPEED = 10;
const CAR_RADIUS = 10;

function carClass() {
    this.carX = 100;
    this.carY = 220;
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.setupControls = function(forwardKey, backKey, leftKey, rightKey) {
		this.controlKeyForGas = forwardKey;
		this.controlKeyForReverse = backKey;
		this.controlKeyForTurnLeft = leftKey;
		this.controlKeyForTurnRight = rightKey;
    }

    this.carInit = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.carReset();
    }

    this.carDraw = function() {
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.carX, this.carY, this.carAng);
    }

    this.carReset = function() {
		this.carSpeed = 0;
		this.carAng = -0.5 * Math.PI;
		if (this.homeX == undefined) {
			for(var i=0; i<trackGrid.length; i++){
				if(trackGrid[i] == TRACK_PLAYER) {
					var tileRow = Math.floor(i/TRACK_COLS);
					var tileCol = i % TRACK_COLS;
					this.homeX = tileCol * TRACK_W + 0.5*TRACK_W;
					this.homeY = tileRow * TRACK_H + 0.5*TRACK_H;
					trackGrid[i] = TRACK_ROAD;
					break;
				}
			}
		}
		this.carX = this.homeX;
		this.carY = this.homeY;
    }

    this.carMove = function(dt) {
		if (this.keyHeld_Gas) {
			this.carSpeed += DRIVE_POWER*dt;
		}
		if (this.keyHeld_Reverse) {
			this.carSpeed -= REVERSE_POWER*dt;
		}
		if (Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
			if (this.keyHeld_TurnLeft) {
				this.carAng += -TURN_RATE*Math.PI * dt;
			}
			if (this.keyHeld_TurnRight) {
				this.carAng += TURN_RATE*Math.PI * dt;
			}
		}	
		var nextX = this.carX + Math.cos(this.carAng) * this.carSpeed * dt;
		var nextY = this.carY + Math.sin(this.carAng) * this.carSpeed * dt;
		var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);
		if (drivingIntoTileType == TRACK_ROAD) {
			this.carX = nextX;
			this.carY = nextY;
			this.carSpeed *= GROUNDSPEED_DECAY_MULT;
		} else if (drivingIntoTileType == TRACK_GOAL) {
			document.getElementById("debugText").innerHTML = this.myName + " hit the goal line";
			p1.carReset();
			p2.carReset();
		} else {
			this.carSpeed = 0.0;
		}
    }    
}
