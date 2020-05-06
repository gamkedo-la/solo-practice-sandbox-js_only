const UFO_SPEED = 1.9;
const UFO_TIME_BETWEEN_DIR_CHANGE = 85;
const UFO_COLLISION_RADIUS = 25;

ufoClass.prototype = new movingWrapPositionClass();
function ufoClass() {	
	this.x, this.y;
	this.readyToRemove = false;
	
	this.keyHeld_Thrust = false;
	
	this.picture = document.createElement("img");
	
	this.superclassReset = this.reset; //saves a reference to the parent's class movement
	this.reset = function() {
		this.superclassReset();
		this.x = Math.random()*canvas.width;
		this.y = Math.random()*canvas.height;
		this.cyclesTilDirectionChange = 0;
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.reset();
	}	
	 	 
	this.superclassMove = this.movement; //saves a reference to the parent's class movement
	this.movement = function() {
		this.superclassMove();		// calls superclass which advances xv and yv every frame to x and y.
	
		this.cyclesTilDirectionChange--;
		if(this.cyclesTilDirectionChange <= 0) {
			var randAng = Math.random() * Math.PI*2.0;
			this.xv = Math.cos(randAng) * UFO_SPEED;
			this.yv = Math.sin(randAng) * UFO_SPEED;
			this.cyclesTilDirectionChange = UFO_TIME_BETWEEN_DIR_CHANGE;
		}
	}	
	
	this.isOverlappingPoint = function(testX, testY){
		var deltaX = testX-this.x;
		var deltaY = testY-this.y;
		var dist = Math.sqrt((deltaX*deltaX) + (deltaY*deltaY));
		return (dist <= UFO_COLLISION_RADIUS);
	}
	
	this.checkMyShipCollisionAgainst = function(thisEnemy){
		if(thisEnemy.isOverlappingPoint(this.x,this.y)){
			this.readyToRemove = true;
			document.getElementById("debugText").innerHTML = "Crashed into the Asteroid";
		} 
	}
	
	this.checkMyShotCollisionAgainst = function(thisEnemy){
		for (var ii=0; ii < this.myShotList.length; ii++){
			if(this.myShotList[ii].hitTest(thisEnemy)){
				thisEnemy.readyToRemove = true;
				this.myShotList[ii].reset();
				document.getElementById("debugText").innerHTML = "Player Blasted!";
			}
		} 
	}
	
	this.markForRemoval = function(){
		this.readyToRemove = true;
	}
	
	this.draw = function(){
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0);
		//colorText(this.myName, this.x, this.y - 50, "white");
	}
} // end UFO Class