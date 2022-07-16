// make sheep not appear on edge of screen

function unitClass() {

  this.reset = function(i) {
    this.id = i;
    this.x = randomRangeInt(PLAY_AREA_MARGIN, canvas.width - PLAY_AREA_MARGIN);
    this.y = randomRangeInt(TOP_MARGIN, canvas.height / 4);
    this.mobility = 0.01;
    this.speed = 12;
    this.angle = 0;
    this.goal = false;
    this.gotoX = this.x;
    this.gotoY = this.y;
    this.enteredPen = false;
    this.inPen = false;
    this.isDead = false;

    // test with initial colours
    var colorChoice = randomRangeInt(0, 2);
    if (colorChoice == 0) {
      this.color = 'grey';
      this.img = greySheepPic;
    } else if (colorChoice == 2) {
      this.color = 'blue';
      this.img = blueSheepPic;
    } else if (colorChoice == 1) {
      this.color = 'red';
      this.img = redSheepPic;
    }
  }

  // click is centre of random targets
  this.gotoNear = function(aroundX, aroundY) {
    this.gotoX = aroundX - MAX_DIST_FROM_WALK_TARGET/2 + Math.random() * MAX_DIST_FROM_WALK_TARGET; 
    this.gotoY = aroundY - MAX_DIST_FROM_WALK_TARGET/2 + Math.random() * MAX_DIST_FROM_WALK_TARGET; 
  }

  this.ifInPen = function() {
    // test if in sheepfold, return 0 if not, 1 blue, 2 red
    if(this.y > canvas.height - PEN_HEIGHT) {
      // now check blue, red, or middle using x
      if(this.x < PEN_WIDTH_LEFT) {
        // console.log("Sheep id " + this.id + " is in right pen.");
        return 1;
      } else if(this.x > canvas.width - PEN_WIDTH_RIGHT) {
        // console.log("Sheep id " + this.id + " is in right pen.");
        return 2;
      } else {
        // console.log("Sheep id " + this.id + " is between pens.");
        return 0;
      }
    } else {
      return 0;
    }
  }

  this.move = function() {
    // if no goal, random walk
    if(this.goal == false) {
      if(Math.random() < this.mobility) {
        // this.gotoX += randomRangeInt(-1, 1) * 20;
        // this.gotoY += randomRangeInt(-1, 1) * 20;
        // better if choose angle then use sine & cosine
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
      // colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, this.color);
      drawBitmapCenteredAtLocationWithRotation(this.img, this.x, this.y, Math.PI);
    }
  }

  this.label = function() {
    if(this.isDead == false) {
      drawText(this.id, this.x + UNIT_PLACEHOLDER_RADIUS +1, this.y +5, "white");
    }
  }

  this.keepInPlayableArea = function() {
    // don't go beyond right or left edges of canvas
    if(this.gotoX > canvas.width - PLAY_AREA_MARGIN) {
      this.gotoX = PLAY_AREA_MARGIN;
    } 
    else if(this.gotoX < PLAY_AREA_MARGIN) {
      this.gotoX = canvas.width - PLAY_AREA_MARGIN;
    }
    // don't go beyond bottom or top edges of canvas
    if(this.gotoY > canvas.height - PLAY_AREA_MARGIN) {
      this.gotoY = TOP_MARGIN;
    }
    else if(this.gotoY < TOP_MARGIN) { 
      this.gotoY = canvas.height - PLAY_AREA_MARGIN;
    }

    // stop random walk entering pens
    // if(this.goal == false && this.enteredPen == false) {
    //   if(this.gotoY > canvas.height - PEN_HEIGHT) {
    //     this.gotoY = canvas.height - PEN_HEIGHT - PLAY_AREA_MARGIN;
    //   }
    // } 
  } // END keepInPlayableArea
}
