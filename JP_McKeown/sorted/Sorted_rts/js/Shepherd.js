const LEADER_PLACEHOLDER_RADIUS = 10;
const LEADER_PIXELS_MOVE_RATE = 5;
const LEADER_MAX_RAND_DISTANCE_FROM_WALK_TARGET = 50;

function leaderClass() {

  this.reset = function() {
    this.x = Math.random() * canvas.width/4;
    this.y = Math.random() * canvas.height/4;
    this.gotoX = this.x;
    this.gotoY = this.y;
    this.isDead = false;
  }

  // this.gotoNear = function(aroundX, aroundY) {
  //   this.gotoX = aroundX + Math.random() * LEADER_MAX_RAND_DISTANCE_FROM_WALK_TARGET; 
  //   this.gotoY = aroundY + Math.random() * LEADER_MAX_RAND_DISTANCE_FROM_WALK_TARGET; 
  // }

  // this.move = function() {
  //   var deltaX = this.gotoX - this.x; 
  //   var deltaY = this.gotoY - this.y;
  //   var distToGo = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
  //   var moveX = LEADER_PIXELS_MOVE_RATE * deltaX/distToGo;
  //   var moveY = LEADER_PIXELS_MOVE_RATE * deltaY/distToGo;

  //   if(distToGo > LEADER_PIXELS_MOVE_RATE) {
  //     this.x += moveX;
  //     this.y += moveY;
  //   } else {
  //     this.x = this.gotoX;
  //     this.y = this.gotoY;
  //   }
  // }

  this.draw = function() {
    if(this.isDead == false) {
      colorRect(this.x, this.y, LEADER_PLACEHOLDER_RADIUS, LEADER_PLACEHOLDER_RADIUS, 'red');
    }
  }

  // keyboard state variables, use keys like buttons
  this.keyHeld_North = false;
  this.keyHeld_East = false; 
  this.keyHeld_South = false;
  this.keyHeld_West = false;

  this.setupControls = function(northKey, eastKey, southKey, westKey) {
    this.controlKeyNorth = northKey;
    this.controlKeyEast = eastKey;
    this.controlKeySouth = southKey;
    this.controlKeyWest = westKey;
  }

  
  this.move = function() {
    var nextX = this.x;
    var nextY = this.y;

    if(this.keyHeld_North) {
      nextY -= LEADER_PIXELS_MOVE_RATE;
    }
    if(this.keyHeld_East) {
      nextX += LEADER_PIXELS_MOVE_RATE;
    }
    if(this.keyHeld_South) {
      nextY += LEADER_PIXELS_MOVE_RATE;
    }
    if(this.keyHeld_West) {
      nextX -= LEADER_PIXELS_MOVE_RATE;
    }
   
  }
}
