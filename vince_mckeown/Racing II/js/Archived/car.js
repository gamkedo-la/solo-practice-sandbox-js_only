const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;
const GROUNDSPEED_DECAY_MULT = 0.94;

function carClass() {
	this.x = 60;
	this.y = 60;
	this.speed = 0;
	this.ang = -0.5 * Math.PI;
	
	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.carPic = document.createElement("img");
	
	this.setupControls = function(forwardKey,backKey,leftKey,rightKey) {
		this.controlKeyForGas = forwardKey;
		this.controlKeyForReverse = backKey;			
		this.controlKeyForTurnLeft = leftKey;
		this.controlKeyForTurnRight = rightKey;
	}

	this.carReset = function() {
		for(var eachRow=0; eachRow<TRACK_ROWS;eachRow++){
			for(var eachCol=0;eachCol<TRACK_COLS;eachCol++){
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if(trackGrid[arrayIndex] == TRACK_PLAYER) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					this.ang = -Math.PI/2;
					this.x = eachCol *TRACK_W + TRACK_W/2;
					this.y = eachRow *TRACK_H + TRACK_H/2;
					return;
				}
			}
		}
	}	

	this.carInit = function(whichGraphic) {
		this.myBitmap = whichGraphic;
		this.carReset();
	}	
	 

	this.movement = function() {
		
		this.speed *= GROUNDSPEED_DECAY_MULT;
		
		if(this.keyHeld_Gas){
			this.speed += DRIVE_POWER;
		}
		if(this.keyHeld_Reverse){
			this.speed -= REVERSE_POWER;
		}
		if (Math.abs(this.speed) >= MIN_TURN_SPEED){
			if(this.keyHeld_TurnLeft){
				this.ang -= TURN_RATE*Math.PI;
			}
			if(this.keyHeld_TurnRight){
				this.ang += TURN_RATE*Math.PI;
			}
		}
		

		
		// Motion X and Y of the car
		var nextX = this.x + Math.cos(this.ang) * this.speed;
		var nextY = this.y + Math.sin(this.ang) * this.speed;	
		
		if(checkForTrackAtPixelCoord(nextX, nextY)){	
			this.x = nextX;
			this.y = nextY;
		} else this.speed = -0.5 * this.speed;		
	}
		

		
	this.drawCar = function(){
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}
}