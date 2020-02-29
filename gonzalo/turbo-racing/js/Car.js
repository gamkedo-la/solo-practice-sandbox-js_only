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
	this.canSteer = true;

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
		[this.carX, this.carY] = track.getFreePlayerTileCoord();
    }

    this.carMove = function(dt) {
		if (this.keyHeld_Gas) {
			this.carSpeed += DRIVE_POWER*dt;
		}
		if (this.keyHeld_Reverse) {
			this.carSpeed -= REVERSE_POWER*dt;
		}
		if (this.canSteer && Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
			if (this.keyHeld_TurnLeft) {
				this.carAng += -TURN_RATE*Math.PI * dt;
			}
			if (this.keyHeld_TurnRight) {
				this.carAng += TURN_RATE*Math.PI * dt;
			}
		}
		let nextX = this.carX + Math.cos(this.carAng) * this.carSpeed * dt;
		let nextY = this.carY + Math.sin(this.carAng) * this.carSpeed * dt;
    	if (track.isDriveableCoord(nextX, nextY)) {
			this.carX = nextX;
			this.carY = nextY;
		    this.carSpeed *= GROUNDSPEED_DECAY_MULT;
     		track.onDrive(this);
		} else {
			this.carSpeed = 0.0;
		}
    }    
}
