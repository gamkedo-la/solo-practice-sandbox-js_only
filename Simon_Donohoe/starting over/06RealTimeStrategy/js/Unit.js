const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_PIXELS_MOVE_RATE = 2;
const UNIT_MAX_RAND_DIST_FROM_WALK_TARGET = 50;

function unitClass() {
  this.reset = function () {
    this.x = Math.random()*canvas.width/4; 
    this.y = Math.random()*canvas.height/4; 

    this.gotoX = this.x;
    this.gotoY = this.y;

    this.isDead = false;
  }

  this.draw = function () {
    if(this.isDead == false) {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, 'white');
    }
  }

  this.move = function () {
    // if(this.x < this.gotoX) {
    //   this.x += UNIT_PIXELS_MOVE_RATE;
    // }
    // if(this.x > this.gotoX) {
    //   this.x -= UNIT_PIXELS_MOVE_RATE;
    // }
    // if(this.y < this.gotoY) {
    //   this.y += UNIT_PIXELS_MOVE_RATE;
    // }
    // if(this.y > this.gotoY) {
    //   this.y -= UNIT_PIXELS_MOVE_RATE;
    // }
    let deltaX = this.gotoX - this.x;
    let deltaY = this.gotoY - this.y;
    let distToGo = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    // let moveAng = Math.atan2(deltaY, deltaX);
    let moveX = UNIT_PIXELS_MOVE_RATE * deltaX / distToGo;
    let moveY = UNIT_PIXELS_MOVE_RATE * deltaY / distToGo;

    if(distToGo > UNIT_PIXELS_MOVE_RATE) {
      this.x += moveX;
      this.y += moveY;  
    } else {
      this.x = this.gotoX;
      this.y = this.gotoY;
    }
  }

  this.gotoNear = function (aroundX, aroundY) {
    this.gotoX = aroundX + Math.random() * UNIT_MAX_RAND_DIST_FROM_WALK_TARGET;
    this.gotoY = aroundY + Math.random() * UNIT_MAX_RAND_DIST_FROM_WALK_TARGET;
  }
} // end of class