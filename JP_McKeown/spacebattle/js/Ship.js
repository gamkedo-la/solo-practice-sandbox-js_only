// tuning constants
const SPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;

shipClass.prototype = new moveWrapClass();

function shipClass() {
  // variables to keep track of position

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_Forward = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  // key controls used for this
  this.setupControls = function(forwardKey, leftKey, rightKey, spaceBar) {
    this.controlKey_Forward = forwardKey;
    this.controlKey_TurnLeft = leftKey;
    this.controlKey_TurnRight = rightKey;
    this.controlKey_ShotFire = spaceBar;
  }

  this.init = function(whichGraphic) { 
    this.myShot = new shotClass();
    this.myBitmap = whichGraphic;
    this.reset();
  }
  
  this.superclassReset = this.reset;
  this.reset = function() {
    this.superclassReset();
    this.ang = -0.5 * Math.PI;
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.myShot.reset(); // shot disappears when only ship gone because it is game end
  } 
  
  this.superclassMove = this.move;
  this.move = function() {
    if(this.keyHeld_TurnLeft) {
      this.ang -= TURN_RATE*Math.PI;
    }
    if(this.keyHeld_TurnRight) {
      this.ang += TURN_RATE*Math.PI;
    }
    if(this.keyHeld_Forward) {
      this.velocityX += Math.cos(this.ang) * THRUST_POWER;
      this.velocityY += Math.sin(this.ang) * THRUST_POWER;
    }

    this.superclassMove();
    this.velocityX *= SPEED_DECAY_MULT;
    this.velocityY *= SPEED_DECAY_MULT;

    this.myShot.move();
    // console.log('xgap:' + deltaX + '  ygap:' + deltaY);
  }

  this.draw = function() {
    this.myShot.draw(); // so it spawns under shop image
    drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, this.ang );
  }

  this.cannonFire = function() {
    if(this.myShot.isShotReadyToFire()) {
      this.myShot.shootFrom(this);
    }
  }

  this.checkCollision = function(thisEnemy) {
    if(thisEnemy.withinCollisionRadius(this.x,this.y)) {
      // ship collided 
      this.reset();
      showText('Player crashed into UFO!');
    }
    if(this.myShot.testHit(thisEnemy)) {
      thisEnemy.reset();
      this.myShot.reset();
      showText('Missile hit the UFO!');
    }
  }

} // end of class