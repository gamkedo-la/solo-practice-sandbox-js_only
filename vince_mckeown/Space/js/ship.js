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
	this.life = 3;
	this.displayScoreList = [];
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
		for (var i=0; i < this.displayScoreList.length ; i++){
			this.displayScoreList[i].reset();
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
		for (var i=0; i < this.displayScoreList.length ; i++){
			this.displayScoreList[i].movement();
		}
		
		this.removeBullet();
		this.removeScoreFromScreen();
	}	
	
	this.checkMyShipCollisionAgainst = function(thisEnemy){
		if(thisEnemy.isOverlappingPoint(this.x,this.y)){
			this.reset();
			document.getElementById("debugText").innerHTML = "Player Crashed!";
			let tempScore = new scoreDisplayClass; //create score being added
			tempScore.displayFrom("-200", this.x, this.y, 0, 0, 50, "red");
			playerOne.displayScoreList.push(tempScore);
			this.score -= 200;
			this.life -= 1;
			if(this.life <= 0){
				resetGame();
			}
		} 
	}
	
	this.checkMyShotCollisionAgainst = function(thisEnemy){
		for (ii=0; ii < this.myShotList.length; ii++){
			if(this.myShotList[ii].hitTest(thisEnemy)){
				thisEnemy.markForRemoval();
				this.myShotList[ii].reset();
				document.getElementById("debugText").innerHTML = "Enemy Blasted!";
				let tempScore = new scoreDisplayClass; //create score being added
				tempScore.displayFrom("100", this.x, this.y, 0, 0, 50, "white");
				playerOne.displayScoreList.push(tempScore);
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
	
	this.removeScoreFromScreen = function(){
		for(var i = this.displayScoreList.length - 1; i >= 0 ; i--){
			if(this.displayScoreList[i].readyToRemove){
				this.displayScoreList.splice(i,1);
			}
		}
	}
}