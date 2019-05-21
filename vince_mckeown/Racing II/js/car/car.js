const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const MIN_TURN_SPEED = 0.5;
const GROUNDSPEED_DECAY_MULT = 0.94;
const CAR_COLLISION_RADIUS = 15;

function carClass() {
    this.x = 60;
    this.y = 60;

	this.turn_rate = 0.03;
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;
	this.keyHeld_Nitro = false;
    this.turnable = true;
	this.computerPlayer = false;
	this.runTime = 0.0
	this.nitroboost = false;

    this.carPic = document.createElement("img");

    this.setupControls = function(forwardKey, backKey, leftKey, rightKey, nitroKey) {
        this.controlKeyForGas = forwardKey;
        this.controlKeyForReverse = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
		this.controlKeyForNitro = nitroKey;
    }


    this.carReset = function(whichGraphic, whichName, computer) {
		this.name = whichName;
		this.myCarPic = whichGraphic;
        this.speed = 0;
        this.ang = -0.5 * Math.PI;

		for (var i = 0; i < trackGrid.length; i++) {
			if (trackGrid[i] == TRACK_PLAYER) {
				console.log(this.homeX);
				var tileRow = Math.floor(i / TRACK_COLS);
				var tileCol = i % TRACK_COLS;
				this.homeX = tileCol * TRACK_W + 0.5 * TRACK_W;
				this.homeY = tileRow * TRACK_H + 0.5 * TRACK_H;
				trackGrid[i] = TRACK_ROAD;
				break;
			}
		}

        this.x = this.homeX;
        this.y = this.homeY;
	}

    this.carInit = function(whichGraphic, whichName, computer) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
        this.carReset(whichGraphic, whichName, computer);
		this.computerPlayer = computer;
		this.nitroboost = false;
		this.nitroBoostAmount = 1;
		this.nitroBoostTime = 10;
		this.airborne = false;
		this.startTime = now;
		this.xOffSet = this.x;
		this.yOffSet = this.y;
		this.runTime = 0.0;
		this.tenthSecond = 0;
		this.second = 0;
		this.secondTensSpot = 0;
		this.minute = 0;
		this.minuteTensSpot = 0;
		this.lapTenthSecond = 0;
		this.lapSecond = 0;
		this.lapSecondTensSpot = 0;
		this.lapMinute = 0;
		this.lapMinuteTensSpot = 0;
		this.lapNumber = 0;

    }
	
	this.tryNitroBoost = function(){
		if(this.nitroBoostAmount > 0)
			for(var i=0; i < this.nitroBoostTime ; i++) {
				this.speed += 2;
				this.turn_rate = 0.01;
				this.nitroboost = true;
			}
		this.nitroBoostAmount = this.nitroBoostAmount - 1;
		this.turn_rate = 0.03;
		this.nitroboost = false;
	}

    this.movement = function() {
		
		if(this.computerPlayer){
			var chanceToMoveForward = Math.round(Math.random() * 10);
			if (chanceToMoveForward > 2){
				this.keyHeld_Gas = true;
				this.keyHeld_Reverse = false;
			} else {
				this.keyHeld_Reverse = true;
				this.keyHeld_Gas = false;
			}
			var chanceToMoveRight = Math.round(Math.random() * 10);
			if (chanceToMoveRight <= 2){
				this.keyHeld_TurnRight = true;
				this.keyHeld_TurnLeft = false;
			} else if (chanceToMoveRight == 3){
				this.keyHeld_TurnRight = false;
				this.keyHeld_TurnLeft = true;
			} else {
				this.keyHeld_TurnRight = false;
				this.keyHeld_TurnLeft = false;
			}	
			var chanceToUseNitro = Math.round(Math.random() * 100);
			if (chanceToUseNitro <= 1){
				this.controlKeyForNitro = true;
			}
		} 
			
        this.speed *= GROUNDSPEED_DECAY_MULT;

        if (this.keyHeld_Gas) {
            this.speed += DRIVE_POWER;
			if(this.keyHeld_Nitro){
				this.tryNitroBoost();
			}
        }
        if (this.keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }
        if (Math.abs(this.speed) >= MIN_TURN_SPEED) {
            if (this.keyHeld_TurnLeft && this.turnable) {
                this.ang -= this.turn_rate * Math.PI;
            }
            if (this.keyHeld_TurnRight && this.turnable) {
                this.ang += this.turn_rate * Math.PI;
            }
        }

        // Motion X and Y of the car
        var nextX = this.x + Math.cos(this.ang) * this.speed;
        var nextY = this.y + Math.sin(this.ang) * this.speed;

        var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);

        switch (drivingIntoTileType) {

            case TRACK_ROAD:
                this.x = nextX;
                this.y = nextY;
                //this.speed *= 1;
                this.turnable = true;
                break;
            case TRACK_OIL_SLICK:
                this.x = nextX;
                this.y = nextY;
                //this.speed *= 1;
                this.turnable = false;
                break;
            case TRACK_GRASS:
                this.x = nextX;
                this.y = nextY;
                this.speed *= 0.5;
                this.turnable = true;
                break;
			case TRACK_NORTH_RAMP:
                this.x = nextX;
                this.y = nextY;
                this.turnable = false;
				this.getAirTime();
                break;
            case TRACK_FINISH:
				console.log('Lap: '+this.lapNumber+' ')
                document.getElementById("debugText").innerHTML = this.myName + " is the WINNER!";
				if(this.lapNumber < 1){
					this.recordALap();
				}
				if(this.lapNumber >= 1){
					nextLevel();
				}
				this.x = nextX;
                this.y = nextY;
                //this.speed *= 1;
                this.turnable = true;
				
				
				break;
            default:
                this.speed = -.5 * this.speed;
        }
		this.trackTime();
    }
	
	this.getAirTime = function(){  // WIP:  Need to gradually increase shadow while in air.
		this.airborne = true;
		for(i = 0; i < 10; i++){
			this.xOffSet = this.xOffSet + 5;
			this.yOffSet = this.yOffSet + 5;
		}
	}
	
	this.recordALap = function(){
		this.lapNumber += 1;
		this.lapTenthSecond = this.tenthSecond;
		this.lapSecond = this.second;
		this.lapSecondTensSpot = this.secondTensSpot;
		this.lapMinute = this.minute;
		this.lapMinuteTensSpot = this.minuteTensSpot;
	}
	
	
	this.trackTime = function(){
		this.runTime = now - this.startTime;                  // 00:00:0  Minutes : Seconds : MiliSeconds
		if(this.runTime >= 1000){ 
			this.runTime = 0;
			this.tenthSecond += 1;
		}
		if(this.tenthSecond >= 10){
			this.tenthSecond = 0;
			this.second += 1;
		}
		if(this.second >= 10){
			this.second = 0;
			this.secondTensSpot += 1;
		}
		if(this.secondTensSpot >= 6){
			this.secondTensSpot = 0;
			this.minute += 1;
		}
		if(this.minute >= 10){
			this.minute = 0;
			this.minuteTensSpot += 1;
		}	
	}
	
	
	this.isOverLappingPoint = function(testX, testY){
		var deltaX = testX - this.x;
		var deltaY = testY - this.y;
		var dist = Math.sqrt ((deltaX*deltaX)+(deltaY*deltaY));
		return(dist <= CAR_COLLISION_RADIUS);
	}
	
	this.checkCarCollisionAgainst = function(thisCar){
		if(thisCar.isOverLappingPoint(this.x,this.y)){
			this.speed = -1 * this.speed;
		}
		
	}
	
    this.drawCar = function() {
        //drawBitmapCenteredAtLocationWithRotation(carShadowPic, this.x, this.y, this.ang);
		var xOffSet = this.x;
		var yOffSet = this.y;
		if(this.airborne){
			yOffSet = yOffSet - 10;
		}
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}
}