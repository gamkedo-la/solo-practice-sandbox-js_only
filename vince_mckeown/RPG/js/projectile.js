const PROJECTILE_SPEED = 6.0;
const PROJECTILE_LIFE = 30;
const PROJECTILE_DISPLAY_RADIUS = 2.0;
var missProjectile = -10;

//ProjectTileClass.prototype = new movingWrapPositionClass();

function ProjectileClass(){
	this.x;
	this.y;
	this.readyToRemove = false;
	
	this.picture = document.createElement("img");
	
	this.superclassReset = this.reset;
	this.reset = function() {
		this.projectileLife = 0;
		this.ang = -0.5 * Math.PI;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.readyToRemove = true;
	}
		
	this.isProjectileReadyToFire = function(){
		return (this.projectileLife <= 0);
	}
	
	this.shootFrom = function(shipFiring){
		this.x = shipFiring.x;
		this.y = shipFiring.y;
		
		this.xv = Math.cos(shipFiring.ang) * PROJECTILE_SPEED + shipFiring.xv;
		this.yv = Math.sin(shipFiring.ang) * PROJECTILE_SPEED + shipFiring.yv;
		
		this.projectileLife = PROJECTILE_LIFE;
	}
	
	//this.superclassMove = this.movement;  // saves a reference to the parent class's move
	this.movement = function() {
 
		if(this.projectileLife > 0){
			this.projectileLife--;
            this.x = this.xv++;
            this.y = this.yv++;
			//this.superclassMove();
		}
	}	
	
	this.hitTest = function(thisEnemy) {
		if(this.projectileLife <= 0) {
			playerOne.score = playerOne.score + missPROJECTILE;
			this.readyToRemove = true;
			let tempScore = new scoreDisplayClass; //create score being added
			tempScore.displayFrom("-10", this.x, this.y, 0, 0, 50, "red");
			playerOne.displayScoreList.push(tempScore);
			return false;
		}
		return thisEnemy.isOverlappingPoint(this.x,this.y);
	}
	
	this.draw = function(){
		if(this.projectileLife > 0){
			colorCircle(this.x, this.y, PROJECTILE_DISPLAY_RADIUS, 'white')
		}
	}
}