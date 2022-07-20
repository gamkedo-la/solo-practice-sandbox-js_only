// make meep not appear on edge of screen

// meep states
const IDLE = 0;
const WALK = 1;
const TRACTOR = 2;
const HELD = 3;
const DROPPED = 4;
const PENNED = 5;
const LED = 6;

function meepClass() {

  this.init = function(i, color) {
    this.id = i;
    // this.img = pic;
    this.color = color;
    this.reset();
  }

  this.reset = function(i) {
    this.x = randomRangeInt(PLAY_AREA_MARGIN, canvas.width - PLAY_AREA_MARGIN);
    this.y = randomRangeInt(TOP_MARGIN, canvas.height / 4);
    this.mobility = 0.01;
    this.speed = 12;
    this.angle = 0;
    this.goal = false;
    this.gotoX = this.x;
    this.gotoY = this.y;
    this.state = IDLE;
  }

  // click is centre of random targets
  this.gotoNear = function(aroundX, aroundY) {
    this.gotoX = aroundX - MAX_DIST_FROM_WALK_TARGET/2 + Math.random() * MAX_DIST_FROM_WALK_TARGET; 
    this.gotoY = aroundY - MAX_DIST_FROM_WALK_TARGET/2 + Math.random() * MAX_DIST_FROM_WALK_TARGET; 
  }

  // calculate a gotoXY then calculate nextXY
  this.move = function() {

    // if no goal, random walk
    if(this.state == WALK) {
      if(Math.random() < this.mobility) {
        // this.gotoX += randomRangeInt(-1, 1) * 20;
        // this.gotoY += randomRangeInt(-1, 1) * 20;
        // better if choose angle then use sine & cosine
        this.angle = randomRangeInt(0, 359);
        this.gotoX = this.x + Math.cos(this.angle) * this.speed;
        this.gotoY = this.y + Math.sin(this.angle) * this.speed;
      }
    }

    if(this.state == LED) {
      this.gotoX = p1.x -18;
      this.gotoY = p1.y -30;
    }

    var deltaX = this.gotoX - this.x; 
    var deltaY = this.gotoY - this.y;
    var distToGo = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
    var moveX = MOVE_RATE_PIXELS * deltaX/distToGo;
    var moveY = MOVE_RATE_PIXELS * deltaY/distToGo;

    if(distToGo > MOVE_RATE_PIXELS) {
      nextX = this.x + moveX;
      nextY = this.y + moveY;
    } else {
      // sheep is arriving at location goal
      nextX = this.gotoX;
      nextY = this.gotoY;
      this.goal = false;
    }

    //this.keepInPlayableArea(nextX,nextY); // adjusts goto x,y numbers
    // don't go beyond right or left edges of canvas
    if(nextX > canvas.width - PLAY_AREA_MARGIN) {
      nextX = PLAY_AREA_MARGIN;
    } 
    else if(nextX < PLAY_AREA_MARGIN) {
      nextX = canvas.width - PLAY_AREA_MARGIN;
    }
    // don't go beyond bottom or top edges of canvas
    if(nextY < TOP_MARGIN) { 
      nextY = canvas.height - TOP_MARGIN;
    }
    // else if(nextY > canvas.height - BOTTOM_MARGIN) {
    //   nextY = BOTTOM_MARGIN;
    // }

    // now look at tile ahead
    var enterTileIndex = getTileIndexAtPixelCoord(nextX,nextY);
    var movingIntoTileType = TILE_WALL;
  
    if(enterTileIndex != undefined) {
      movingIntoTileType = roomGrid[enterTileIndex];
    }

    switch( movingIntoTileType) {
      case TILE_GROUND:
        // allow current move to complete
        this.x = nextX;
        this.y = nextY;
        break;
      case TILE_GOAL:
        // penned message, add score
console.log("meep ID " + this.id + " is in pen")
this.state = PENNED;
        break;
      case TILE_DOOR:
        // if key held remove door
        if(this.keysHeld > 0) {
          this.keysHeld--;
          roomGrid[enterTileIndex] = TILE_GROUND;
        }
        break;
      case TILE_KEY:
        // remove key from screen
        this.keysHeld++;
        roomGrid[enterTileIndex] = TILE_GROUND;
        break;
      case TILE_WALL:
      default:
        //
        break;
    }
  }

  this.draw = function() {
      colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, this.color);
      //drawBitmapCenteredAtLocationWithRotation(this.img, this.x, this.y, Math.PI);
  }

  this.label = function() {
      drawText(this.id, this.x + UNIT_PLACEHOLDER_RADIUS +1, this.y +5, "white");
  }

  // mostly needed if state=WALK
  // this.keepInPlayableArea = function(x, y) {
  //   // don't go beyond right or left edges of canvas
  //   if(nextX > canvas.width - PLAY_AREA_MARGIN) {
  //     nextX = PLAY_AREA_MARGIN;
  //   } 
  //   else if(nextX < PLAY_AREA_MARGIN) {
  //     nextX = canvas.width - PLAY_AREA_MARGIN;
  //   }
  //   // don't go beyond bottom or top edges of canvas
  //   if(nextY > canvas.height - PLAY_AREA_MARGIN) {
  //     nextY = TOP_MARGIN;
  //   }
  //   else if(nextY < TOP_MARGIN) { 
  //     nextY = canvas.height - PLAY_AREA_MARGIN;
  //   }
  // }

  this.distFrom = function(otherX, otherY) {
    var deltaX = otherX-this.x;
    var deltaY = otherY-this.y;
    return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
  }
}