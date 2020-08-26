const GROUNDSPEED_DECAY_MULT = 0.94;
const NUDGE_SPEED_DECAY = 24;
const DRIVE_POWER = 500;
const REVERSE_POWER = 200;
const TURN_RATE = 1.2;
const MIN_TURN_SPEED = 10;
const CAR_RADIUS = 10;
const NITRO_POWER = 800;
const NITRO_SECONDS = 1;
const CPU_TIME = 1.2;

function carClass() {
  this.cpuActionTimer = CPU_TIME;
  this.carX = 100;
  this.carY = 220;
  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;
  this.keyHeld_Nitro = false;
  this.canSteer = true;

  this.setupControls = function(forwardKey, backKey, leftKey, rightKey, nitroKey) {
	this.controlKeyForGas = this.cpuControl ? null : forwardKey;
	this.controlKeyForReverse = this.cpuControl ? null : backKey;
	this.controlKeyForTurnLeft = this.cpuControl? null: leftKey;
	this.controlKeyForTurnRight = this.cpuControl ? null : rightKey;
	this.controlKeyForNitro = this.cpuControl ? null : nitroKey;
  };

  this.carInit = function(cpuControl, whichGraphic, whichName) {
	this.cpuControl = cpuControl;
	this.cpuGasProb = 0.3;
	this.cpuRevProb = 0.9;
	this.cpuLeftProb = 0.7;
	this.cpuRightProb = 0.7;
	this.myBitmap = whichGraphic;
	this.myName = whichName;
	this.carReset();
  };

  this.carDraw = function() {
	drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.carX, this.carY, this.carAng);
  };

  this.carReset = function() {
	this.carSpeed = 0;
	this.carAng = -0.5 * Math.PI;
	[this.carX, this.carY] = track.getFreePlayerTileCoord();
	this.nitroLeft = NITRO_SECONDS;
  };

  this.nudge = function(xDir, yDir, dt) {
	this.carAng += Math.atan2(yDir, xDir)*0.09;
	this.carSpeed -= NUDGE_SPEED_DECAY;
	this.calcAndApplyNextPos(dt);
  };

  this.calcAndApplyNextPos = function(dt) {
	let nextX = this.carX + Math.cos(this.carAng) * this.carSpeed * dt;
	let nextY = this.carY + Math.sin(this.carAng) * this.carSpeed * dt;
    if (track.isDriveableCoord(nextX, nextY)) {
	  this.carX = nextX;
	  this.carY = nextY;
	  this.carSpeed *= GROUNDSPEED_DECAY_MULT;
	  if (this.cpuControl) {
		this.cpuGasProb = 0.3;
		this.cpuRevProb = 0.9;
		this.cpuLeftProb = 0.6;
		this.cpuRightProb = 0.6;
	  };
      track.onDrive(this);
	} else {
	  this.carSpeed = 0.0;
	  if (this.cpuControl) {
		this.cpuGasProb = 0.9;
		this.cpuRevProb = 0.2;
		this.cpuLeftProb = 0.8;
		this.cpuRightProb = 0.8;
	  };
	}
  };

  this.carMove = function(dt) {
	let turnRate = TURN_RATE;
	if (this.cpuControl) {
	  this.cpuActionTimer -= dt;
	  this.keyHeld_Gas = Math.random() > this.cpuGasProb;
	  this.keyHeld_Reverse = !this.keyHeld_Gas && Math.random() > this.cpuRevProb;
	  if (this.cpuActionTimer < 0) {
		this.keyHeld_TurnLeft = Math.random() > this.cpuLeftProb;
		this.keyHeld_TurnRight = !this.keyHeld_TurnLeft && Math.random() > this.cpuLeftProb;
		this.cpuActionTimer = CPU_TIME;
	  }
	}
	if (this.keyHeld_Nitro && this.nitroLeft > 0) {
	  this.carSpeed += NITRO_POWER*dt;
	  this.nitroLeft -= dt;
	  turnRate -= 0.7; // Decrease maneuverability when nitro is on
	  if (this.nitroLeft < 0) {
		turnRate = TURN_RATE;
	  }
	}
	if (this.keyHeld_Gas) {
	  this.carSpeed += DRIVE_POWER*dt;
	}
	if (this.keyHeld_Reverse) {
	  this.carSpeed -= REVERSE_POWER*dt;
	}
	if (this.canSteer && Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
	  if (this.keyHeld_TurnLeft) {
		this.carAng += -turnRate*Math.PI * dt;
	  }
	  if (this.keyHeld_TurnRight) {
		this.carAng += turnRate*Math.PI * dt;
	  }
	}
	if (this.carSpeed != 0) {
	  carMoved = true;
	}
	this.calcAndApplyNextPos(dt);
  };

  this.driveOffRoad = function() {
	this.carSpeed /= 2;
	if (this.cpuControl) {
	  this.cpuGasProb = 0.9;
	  this.cpuRevProb = 0.001;
	  this.cpuLeftProb = 0.999;
	  this.cpuRightProb = 0.999;
	};
  };
}
