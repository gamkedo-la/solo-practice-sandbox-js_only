const ASTROID_SPEED = 1.0;
const ASTROID__COLLISION_RADIUS = 37;

asteroidClass.prototype = new movingWrapPositionClass();

function asteroidClass() {
		
	this.x, this.y;
	this.readyToRemove = false;
	
	this.keyHeld_Thrust = true;
	
	this.picture = document.createElement("img");
	
	this.superclassReset = this.reset; //saves a reference to the parent's class movement
	this.reset = function() {
		this.superclassReset();
		this.x = Math.random()*canvas.width;
		this.y = Math.random()*canvas.height;
		if(this.x > canvas.width/2){
			this.x = this.x + canvas.width/2;
		} else {
			this.x = this.x - canvas.width/2;
		}
		if(this.y > canvas.height/2){
			this.y = this.y + canvas.height/2;
		} else {
			this.y = this.y - canvas.height/2;
		}			
		var randAng = Math.random() * Math.PI*2.0;
		this.xv = Math.cos(randAng) * ASTROID_SPEED;
		this.yv = Math.sin(randAng) * ASTROID_SPEED;
	}
					
	this.init = function(whichGraphic, whichName) {
		this.myBitmap = whichGraphic;
		this.myName = whichName;
		this.reset();
	}	
	 	 
	this.superclassMove = this.movement; //saves a reference to the parent's class movement
	this.movement = function() {
		this.superclassMove();		// calls superclass which advances xv and yv every frame to x and y.
	}	
	
	this.isOverlappingPoint = function(testX, testY){
		var deltaX = testX-this.x;
		var deltaY = testY-this.y;
		var dist = Math.sqrt((deltaX*deltaX) + (deltaY*deltaY));
		return (dist <= ASTROID__COLLISION_RADIUS);
	}
	
	this.markForRemoval = function(){
		this.readyToRemove = true;
	}
	
	this.draw = function(){
		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0);
	}
} // end UFO Class