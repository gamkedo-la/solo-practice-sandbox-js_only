// make sheep not appear on edge of screen

const UNIT_PLACEHOLDER_RADIUS = 5;
const MOVE_RATE_PIXELS = 2;
const MAX_DIST_FROM_WALK_TARGET = 100;

function unitClass() {

  this.reset = function() {
    this.x = randomRangeInt(PLAY_AREA_MARGIN, canvas.width - PLAY_AREA_MARGIN);
    this.y = randomRangeInt(PLAY_AREA_MARGIN +40, canvas.height / 4);
    this.gotoX = this.x;
    this.gotoY = this.y;
    this.inPen = false;
    this.isDead = false;

    // test with initial colours
    var colorChoice = randomRangeInt(0, 2);
    this.color = 'gray';
    if (colorChoice == 1) {
      this.color = 'red';
    } else if (colorChoice == 2) {
      this.color = 'blue';
    }
  }

  // click is centre of random targets
  this.gotoNear = function(aroundX, aroundY) {
    this.gotoX = aroundX - MAX_DIST_FROM_WALK_TARGET/2 + Math.random() * MAX_DIST_FROM_WALK_TARGET; 
    this.gotoY = aroundY - MAX_DIST_FROM_WALK_TARGET/2 + Math.random() * MAX_DIST_FROM_WALK_TARGET; 
  }

  this.move = function() {

    this.keepInPlayableArea(); // adjusts goto x,y numbers

    var deltaX = this.gotoX - this.x; 
    var deltaY = this.gotoY - this.y;
    var distToGo = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    var moveX = MOVE_RATE_PIXELS * deltaX/distToGo;
    var moveY = MOVE_RATE_PIXELS * deltaY/distToGo;

    if(distToGo > MOVE_RATE_PIXELS) {
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

  this.keepInPlayableArea = function() {
    if(this.gotoX < PLAY_AREA_MARGIN) {
      this.gotoX = PLAY_AREA_MARGIN;
    } else if(this.gotoX > canvas.width - PLAY_AREA_MARGIN) {
      this.gotoX = canvas.width - PLAY_AREA_MARGIN;
    }
    if(this.gotoY < PLAY_AREA_MARGIN) {
      this.gotoY = PLAY_AREA_MARGIN;
    } else if(this.gotoY > canvas.height - PLAY_AREA_MARGIN) {
      this.gotoX = canvas.height - PLAY_AREA_MARGIN;
    }
  }
}
