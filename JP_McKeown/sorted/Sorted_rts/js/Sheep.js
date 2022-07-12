// make sheep not appear on edge of screen

function unitClass() {

  this.reset = function(i) {
    this.id = i;
    this.x = randomRangeInt(PLAY_AREA_MARGIN, canvas.width - PLAY_AREA_MARGIN);
    this.y = randomRangeInt(TOP_MARGIN, canvas.height / 4);
    this.mobility = 0.01;
    this.speed = 10;
    this.angle = 0;
    this.goal = false;
    this.gotoX = this.x;
    this.gotoY = this.y;
    this.enteredPen = false;
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

    // if no goal, random walk
    if(this.goal == false) {
      if(Math.random() < this.mobility) {
        // this.gotoX += randomRangeInt(-1, 1) * 20;
        // this.gotoY += randomRangeInt(-1, 1) * 20;
        // better if choose angle then use sin & cos
        this.angle = randomRangeInt(0, 359);
        this.gotoX = this.x + Math.cos(this.angle) * this.speed;
        this.gotoY = this.y + Math.sin(this.angle) * this.speed;
      }
    }
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
      // sheep is arriving at location goal
      this.x = this.gotoX;
      this.y = this.gotoY;
      this.goal = false;
    }
  }

  this.draw = function() {
    if(this.isDead == false) {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, this.color);
    }
  }
  this.label = function() {
    if(this.isDead == false) {
      drawText(this.id, this.x + UNIT_PLACEHOLDER_RADIUS +1, this.y +5, "black");
    }
  }

  this.keepInPlayableArea = function() {
    if(this.gotoX < PLAY_AREA_MARGIN) {
      this.gotoX = PLAY_AREA_MARGIN;
    } else if(this.gotoX > canvas.width - PLAY_AREA_MARGIN) {
      this.gotoX = canvas.width - PLAY_AREA_MARGIN;
    }
    if(this.gotoY < TOP_MARGIN) {
      this.gotoY = TOP_MARGIN;
    } 
    if(this.goal == false && this.enteredPen == false) {
      if(this.gotoY > canvas.height - PEN_HEIGHT) {
        this.gotoY = canvas.height - PEN_HEIGHT - PLAY_AREA_MARGIN;
      }
    } else {
      if(this.gotoY > canvas.height - PLAY_AREA_MARGIN) {
        this.gotoY = canvas.height - PLAY_AREA_MARGIN;
      }
    }
  }
}
