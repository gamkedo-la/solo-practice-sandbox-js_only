// make sheep not appear on edge of screen

const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_PIXELS_MOVE_RATE = 2;
const UNIT_MAX_RAND_DISTANCE_FROM_WALK_TARGET = 50;

function unitClass() {

  this.reset = function() {
    this.x = 10 + Math.random() * (canvas.width - 10);
    this.y = 10 + Math.random() * canvas.height/4;
    this.gotoX = this.x;
    this.gotoY = this.y;
    this.inPen = false;
    this.isDead = false;

    // test with initial colours
    var colorChoice = getRandomInt(0, 2);
    this.color = 'gray';
    if (colorChoice == 1) {
      this.color = 'red';
    } else if (colorChoice == 2) {
      this.color = 'blue';
    }
  }

  this.gotoNear = function(aroundX, aroundY) {
    this.gotoX = aroundX + Math.random() * UNIT_MAX_RAND_DISTANCE_FROM_WALK_TARGET; 
    this.gotoY = aroundY + Math.random() * UNIT_MAX_RAND_DISTANCE_FROM_WALK_TARGET; 
  }

  this.move = function() {
    var deltaX = this.gotoX - this.x; 
    var deltaY = this.gotoY - this.y;
    var distToGo = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    var moveX = UNIT_PIXELS_MOVE_RATE * deltaX/distToGo;
    var moveY = UNIT_PIXELS_MOVE_RATE * deltaY/distToGo;

    if(distToGo > UNIT_PIXELS_MOVE_RATE) {
      this.x += moveX;
      this.y += moveY;
    } else {
      this.x = this.gotoX;
      this.y = this.gotoY;
    }
  }

  this.draw = function() {
    if(this.isDead == false) {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, this.color);
    }
  }

}
