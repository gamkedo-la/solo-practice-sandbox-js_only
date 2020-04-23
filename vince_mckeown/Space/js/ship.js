const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;
const SPACESPEED_DECAY_MULT = 0.99;

shipClass.prototype = new movingWrapPositionClass();

function shipClass() {
	this.x, this.y;
	this.keyHeld_Thrust = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;
	this.myShotList = [];
	this.totalShots = 3
	this.score = 0;
	this.picture = document.createElement("img");
	
	this.setupControls = function(forwardKey,leftKey,rightKey,shotKey) {
		this.controlKeyForThrust = forwardKey;			
		this.controlKeyForTurnLeft = leftKey;
		this.controlKeyForTurnRight = rightKey;
		this.controlKeyForShotFire = shotKey;
	}

	this.superclassReset = this.reset; //saves a reference to the parent's class movement
	this.reset = function() {
		this.superclassReset();
		this.ang = -0.5 * Math.PI;
		for (var i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].reset();
		}
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.reset();
	}	
	 	 
	this.superclassMove = this.movement; //saves a reference to the parent's class movement
	this.movement = function() {
		
		if(this.keyHeld_TurnLeft){
			this.ang -= TURN_RATE*Math.PI;
		}
		if(this.keyHeld_TurnRight){
			this.ang += TURN_RATE*Math.PI;
		}
		if(this.keyHeld_Thrust){
			this.xv += THRUST_POWER * Math.cos(this.ang);
			this.yv += THRUST_POWER * Math.sin(this.ang);
		}
			
		this.superclassMove();		// calls superclass which advances xv and yv every frame to x and y.
		
		this.xv *= SPACESPEED_DECAY_MULT;
		this.yv *= SPACESPEED_DECAY_MULT;
		
		for (var i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].movement();
		}
		
		this.removeBullet();
	}	
	
	this.checkMyShipAndShotCollisionAgainst = function(thisEnemy){
		if(thisEnemy.isOverlappingPoint(this.x,this.y)){
			this.reset();
			document.getElementById("debugText").innerHTML = "Player Crashed!";
			this.score -= 200;
		}
		for (i=0; i < this.myShotList.length; i++){
			if(this.myShotList[i].hitTest(thisEnemy)){
				thisEnemy.reset();
				this.myShotList[i].reset();
				document.getElementById("debugText").innerHTML = "Enemy Blasted!";
				this.score += 100;
			}
		}
	}
	
	this.draw = function(){
		for (i=0; i < this.myShotList.length ; i++){
			this.myShotList[i].draw();
		}
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}
	
	this.cannonFire = function(){
		if(this.myShotList.length < this.totalShots){
			console.log("FIRE");
			let tempShot = new shotClass();
			tempShot.shootFrom(this);
			this.myShotList.push(tempShot);
		}
	}
	
	this.removeBullet = function (){
		for(var i = this.myShotList.length - 1; i >= 0 ; i--){
			console.log(this.myShotList.length);
			if(this.myShotList[i].readyToRemove){
				this.myShotList.splice(i,1);
			}
		}
	}
}