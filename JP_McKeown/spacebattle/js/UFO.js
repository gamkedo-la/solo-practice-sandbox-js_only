// tuning constants
const UFO_SPEED = 0.5;
const UFO_TIME_BEFORE_CHANGE_DIRECTION = 70;
const UFO_COLLISION_RADIUS = 15;
const NO_ANGLE = 0;

ufoClass.prototype = new moveWrapClass();

function ufoClass() {

  this.init = function(whichGraphic) { 
    // this.myShot = new shotClass();
    this.myBitmap = whichGraphic;
    this.reset();
  }
  
  this.superclassReset = this.reset;
  this.reset = function() {
    this.superclassReset();
    // this.ang = -0.5 * Math.PI;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.cyclesUntilDirectionChange = 0;
    // this.myShot.reset(); // shot disappears when UFO gone?
  } 
  
  this.superclassMove = this.move;
  this.move = function() {
    this.superclassMove();
    this.cyclesUntilDirectionChange--;
    if(this.cyclesUntilDirectionChange <= 0) {
      var randomAngle = Math.random() * Math.PI * 2.0;
      this.velocityX = Math.cos(randomAngle) * UFO_SPEED;
      this.velocityY = Math.sin(randomAngle) * UFO_SPEED;
      this.cyclesUntilDirectionChange = UFO_TIME_BEFORE_CHANGE_DIRECTION;
    }
    // this.velocityX *= SPEED_DECAY_MULT;
    // this.velocityY *= SPEED_DECAY_MULT;
    // this.myShot.move();
  }

  this.draw = function() {
    // this.myShot.draw(); // so it spawns under shop image
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, NO_ANGLE);
  }

  this.withinCollisionRadius = function(testX, testY) {
    var deltaX = testX - this.x;
    var deltaY = testY - this.y;
    var distance = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    return(distance <= UFO_COLLISION_RADIUS);
  }

  // this.cannonFire = function() {
  //   if(this.myShot.isShotReadyToFire()) {
  //     this.myShot.shootFrom(this);
  //   }
  // }

} // end of class