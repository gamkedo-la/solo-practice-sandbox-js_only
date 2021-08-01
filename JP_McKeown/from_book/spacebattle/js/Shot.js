// tuning constants
const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;

shotClass.prototype = new moveWrapClass();

function shotClass() {
  
  this.superclassReset = this.reset;
  this.reset = function(shipFiring) {
    this.superclassReset();
    this.shotLife = 0;
  } 
  
  this.superclassMove = this.move;
  this.move = function() {
    if(this.shotLife > 0) {
      this.shotLife--;
      this.superclassMove(); 
    }
  }

  this.isShotReadyToFire = function() {
    return(this.shotLife <= 0);
  }

  this.shootFrom = function(shipFiring) {
    this.x = shipFiring.x;
    this.y = shipFiring.y;
    
    this.velocityX = Math.cos(shipFiring.ang) * SHOT_SPEED + shipFiring.velocityX;
    this.velocityY = Math.sin(shipFiring.ang) * SHOT_SPEED + shipFiring.velocityY;

    this.shotLife = SHOT_LIFE;
    // console.log(shipFiring.ang + ' ' + Math.cos(shipFiring.ang) + ' ' + Math.sin(shipFiring.ang) + ' ' + this.velocityX + ' ' + this.velocityY)
  }

  this.testHit = function(thisEnemy) {
    if(this.shotLife <= 0) {
      return false;
    }
    return(thisEnemy.withinCollisionRadius(this.x, this.y))
  }

  this.draw = function() {
    if(this.shotLife > 0) {
      colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 'red');
    }
  }

} // end of class