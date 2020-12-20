const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;
var missShot = -10;

shotClass.prototype = new movingWrapPositionClass();

function shotClass(){
	this.x;
	this.y;
	this.readyToRemove = false;
	
	this.picture = document.createElement("img");
	
	this.superclassReset = this.reset;
	this.reset = function() {
		this.shotLife = 0;
		this.ang = -0.5 * Math.PI;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.readyToRemove = true;
	}
		
	this.isShotReadyToFire = function(){
		return (this.shotLife <= 0);
	}
	
	this.shootFrom = function(tankFiring){
		this.x = tankFiring.x;
		this.y = tankFiring.y;
		
		this.xv = Math.cos(tankFiring.ang) * SHOT_SPEED + tankFiring.xv;
		this.yv = Math.sin(tankFiring.ang) * SHOT_SPEED + tankFiring.yv;
		
		this.shotLife = SHOT_LIFE;
		
		console.log(this.x, this.y, this.xv, this.yv, this.shotLife);
	}
	
	this.superclassMove = this.movement;  // saves a reference to the parent class's move
	this.movement = function() {
 
		if(this.shotLife > 0){
			this.shotLife--;
			this.superclassMove();
		}
	}	
	
	this.hitTest = function(thisEnemy) {
		if(this.shotLife <= 0) {
			playerOne.score = playerOne.score + missShot;
			this.readyToRemove = true;
			let tempScore = new scoreDisplayClass; //create score being added
			tempScore.displayFrom("-10", this.x, this.y, 0, 0, 50, "red");
			playerOne.displayScoreList.push(tempScore);
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x,this.y);
	}
	
	this.draw = function(){
		if(this.shotLife > 0){
			colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'white');
		}
	}
}

