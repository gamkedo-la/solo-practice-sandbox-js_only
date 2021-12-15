const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_SELECT_DIM_HALF = UNIT_PLACEHOLDER_RADIUS + 3;
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
  
  this.gotoNear = function (aroundX, aroundY) {
    this.gotoX = aroundX + Math.random() * UNIT_MAX_RAND_DIST_FROM_WALK_TARGET;
    this.gotoY = aroundY + Math.random() * UNIT_MAX_RAND_DIST_FROM_WALK_TARGET;
  }

  this.isInBox = function (x1, y1, x2, y2) {
    let leftX, rightX;

    if(x1 < x2) {
      leftX = x1;
      rightX = x2;
    } else {
      leftX = x2;
      rightX = x1;
    }

    let topY, bottomY;

    if(y1 < y2) {
      topY = y1;
      bottomY = y2;
    } else {
      topY = y2;
      bottomY = y1;
    }

    if(this.x < leftX) {
      return false;
    }
    if(this.y < topY) {
      return false;
    }
    if(this.x > rightX) {
      return false;
    }
    if(this.y > bottomY) {
      return false;
    }
    return true;
  }
  
  this.move = function () {
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

  this.drawSelectionBox = function () {
    coloredOutlineRectCornerToCorner(this.x - UNIT_SELECT_DIM_HALF, this.y - UNIT_SELECT_DIM_HALF, this.x + UNIT_SELECT_DIM_HALF, this.y + UNIT_SELECT_DIM_HALF, 'green');
  }

  this.draw = function () {
    if(this.isDead == false) {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, 'white');
    }
  }
} // end of class