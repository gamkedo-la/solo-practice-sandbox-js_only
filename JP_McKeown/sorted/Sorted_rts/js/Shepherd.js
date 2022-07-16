const LEADER_PLACEHOLDER_RADIUS = 10;
const LEADER_PIXELS_MOVE_RATE = 5;
const LEADER_MAX_RAND_DISTANCE_FROM_WALK_TARGET = 50;

function leaderClass() {

  this.reset = function() {
    this.x = 10;
    this.y = 10;
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
      // colorRect(this.x, this.y, LEADER_PLACEHOLDER_RADIUS, LEADER_PLACEHOLDER_RADIUS, 'red');
      drawHat(12, 3, "purple");
      
    }
  }
// drawHat(canvas.width-15, 3, "blue");

  this.move = function() {
    var nextX = this.x;
    var nextY = this.y;

    if(this.keyHeld_up) {
      nextY -= LEADER_PIXELS_MOVE_RATE;
    }
    if(this.keyHeld_right) {
      nextX += LEADER_PIXELS_MOVE_RATE;
    }
    if(this.keyHeld_down) {
      nextY += LEADER_PIXELS_MOVE_RATE;
    }
    if(this.keyHeld_left) {
      nextX -= LEADER_PIXELS_MOVE_RATE;
    }
    this.x = nextX
    this.y = nextY
  }
}
