const DRIVE_POWER = 0.5
const REVERSE_POWER = 0.2;
const MIN_TURN_SPEED = 0.5;
const GROUNDSPEED_DECAY_MULT = 0.94;
const CAR_COLLISION_RADIUS = 15;

function carClass() {
    this.x = 60;
    this.y = 60;
	this.z = 0;
	this.zVel = 0;
	
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
	this.wayPointNumber = 0;
	this.width = 50;
	this.height = 50;
	this.cash = 0;

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
		this.checkPointA = false;
		this.checkPointB = false;
		this.checkPointC = false;
		this.aiRandomMovements = false;
		this.wayPoint = true;
		this.width = 50;
		this.height = 50;
		this.wayPointX = [110, 680, 680, 150]; 
		this.wayPointY = [110, 100, 500, 500];
		this.level = 0;
		this.stuckTime = 0;
		this.randomMovementsTimer = 0;
    }
	
	this.tryNitroBoost = function(){
		if(this.nitroBoostAmount > 0){
			this.speed += 2;
			this.turn_rate = 0.01;
			this.nitroboost = true;
		}
		this.nitroBoostAmount = this.nitroBoostAmount - 1;
		this.turn_rate = 0.03;
		this.nitroboost = false;
	}
	
	this.randomMovements = function(){
		var chanceToMoveForward = Math.round(Math.random() * 10);
		this.randomMovementsTimer++
		if (chanceToMoveForward > 3){
			this.keyHeld_Gas = true;
			this.keyHeld_Reverse = false;
		} else {
			this.keyHeld_Reverse = true;
			this.keyHeld_Gas = false;
		}
		var chanceToMoveRight = Math.round(Math.random() * 10);
		if (chanceToMoveRight <= 0){  // 2
			this.keyHeld_TurnRight = true;
			this.keyHeld_TurnLeft = false;
		} else if (chanceToMoveRight == 1){ // 3
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
		if(this.randomMovementsTimer > 300){
			this.randomMovementsTimer = 0;
			this.aiRandomMovements = false;
			this.wayPoint = true;
		}
	}
	
	this.updateWayPoints = function(){
		this.level = this.level + 1;
		this.wayPointNumber = 0;
		this.lapNumber = 0;
		this.checkPointA = false;
		this.checkPointB = false;
		this.checkPointC = false;
		if(this.level == 0){
			this.wayPointX = [110, 680, 680, 150]; 
			this.wayPointY = [110, 100, 500, 500];
		} else if (this.level == 1){
			this.wayPointX = [110, 304, 334, 437, 461, 680, 680, 150]; 
			this.wayPointY = [110, 106, 266, 277,  86, 100, 500, 500];
		} else if (this.level == 2){
			this.wayPointX = [ 71, 164, 218, 332, 327, 450, 454, 725, 721, 640, 738,  66]; 
			this.wayPointY = [243, 167,  76, 134, 411, 355,  96, 104, 246, 313, 508, 512]; 
		} else if (this.level == 3){
			this.wayPointX = [110, 680, 680, 150]; 
			this.wayPointY = [110, 100, 500, 500];
		}
	}

	this.wayPointMovements = function(toX, toY){
		var wayPointVectorX = toX - this.x;
		var wayPointVectorY = toY - this.y;
		var carVectorX = Math.cos(this.ang - Math.PI/2);
		var carVectorY = Math.sin(this.ang - Math.PI/2);
		var dotProduct = wayPointVectorX * carVectorX + wayPointVectorY * carVectorY;
		
		if(dotProduct < 0){
			this.keyHeld_TurnRight = true;
			this.keyHeld_TurnLeft = false;
		} else {
			this.keyHeld_TurnRight = false;
			this.keyHeld_TurnLeft = true;
		}
		
		if(dist(this.x, this.y, toX, toY) < 20){
			this.wayPointNumber++;
			if(this.wayPointNumber >= this.wayPointX.length) {
				this.wayPointNumber = 0;
			}
		}
	}
	
	this.checkIfStuck = function(){
		if(this.speed < 1){
			this.stuckTime++;
			if(this.stuckTime == 100){
				this.aiRandomMovements = true;
				this.wayPoint = false;
				this.stuckTime = 0;
			}
		}
	}
	
	this.carControls = function() {			
        this.speed *= GROUNDSPEED_DECAY_MULT;

        if (this.keyHeld_Gas && !this.airborne) {
            this.speed += DRIVE_POWER;
			if(this.keyHeld_Nitro){
				this.tryNitroBoost();
			}
        }
        if (this.keyHeld_Reverse && !this.airborne) {
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
	}
	
    this.movement = function() {
		
		var nextX = this.x + Math.cos(this.ang) * this.speed;
        var nextY = this.y + Math.sin(this.ang) * this.speed;
				
		if(this.computerPlayer){
			if(this.aiRandomMovements){
				this.randomMovements();
			}
			if(this.wayPoint){
				this.wayPointMovements(this.wayPointX[this.wayPointNumber], this.wayPointY[this.wayPointNumber]);
				this.keyHeld_Gas = true;
				this.keyHeld_Reverse = false;
				this.checkIfStuck();
			}
		} 

		this.carControls();
		
		this.z += this.zVel;
		if(this.z > 0){	
			this.zVel -= 0.4;
		} else {
			this.z = 0;	
			this.zVel = 0;
		}

        var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);

        switch (drivingIntoTileType) {

            case TRACK_ROAD:
                this.x = nextX;
                this.y = nextY;
                this.turnable = true;
                break;
			case TRACK_ROAD_AAA:
                this.x = nextX;
                this.y = nextY;
                this.turnable = true;
                this.checkPointA = true;
				break;
			case TRACK_ROAD_BBB:
                this.x = nextX;
                this.y = nextY;
                this.turnable = true;
				if(this.checkPointA){
					this.checkPointB = true;
					this.checkPointA = false;
				}
				break;
			case TRACK_ROAD_CCC:
                this.x = nextX;
                this.y = nextY;
                this.turnable = true;
                if(this.checkPointB){
					this.checkPointC = true;
					this.checkPointB = false;
				}
				break;
			case TRACK_FINISH:
				console.log('Lap: '+this.lapNumber+' ')
				if(this.checkPointC){
					this.checkPointC = false;
					if(this.lapNumber < 3){
						this.recordALap();
					} else {
						whichPlace(this.myName, this.cash);
					}
				} 
				this.x = nextX;
                this.y = nextY;
                this.turnable = true;
				break;	
            case TRACK_OIL_SLICK:
                this.x = nextX;
                this.y = nextY;
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
            default:
                this.speed = -.5 * this.speed;
        }
		this.trackTime();
    }
	
	this.getAirTime = function(){  // WIP:  Need to gradually increase shadow while in air.
		if(this.z <= 0){
			this.zVel = 5;
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
			this.speed = -0.25 * this.speed; 
		}
	}
	
    this.drawCar = function() {
        drawBitmapCenteredAtLocationWithRotation(carShadowPic, this.x, this.y, this.ang);
		var xOffSet = this.x;
		var yOffSet = this.y;
		if(this.airborne){
			yOffSet = yOffSet - 10;
		}
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x - (this.z / 4), this.y - (this.z / 2), this.ang);
		if(debugMode){
			colorRect(this.x - (this.z / 4), this.y - (this.z / 2), 2, 2, 'red');
		}
	}
}