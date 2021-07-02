const BALL_COUNT = 1;
const BALL_RADIUS = 5;
const BALL_COLOUR = 'red';

function ballClass() {
  var tempRandAng = Math.random()*Math.PI*2.0;
  var tempRandSpeed = 3.0+Math.random()*0.5;
  
  this.speedX = Math.cos(tempRandAng)*tempRandSpeed;
  this.speedY = Math.sin(tempRandAng)*tempRandSpeed;
  
  this.findNewRandPosition = function() {
    this.x = Math.random() * GAME_WIDTH;
    this.y = Math.random()*GAME_HEIGHT;
  }
  
  this.findNewRandPosition(); // note: calling that function as part of initialization
      
  this.move = function() {
    if(this.x < 0) { // if ball has moved beyond the left edge
      this.speedX *= -1; // reverse ball's horizontal direction
    }
    
    if(this.x > GAME_WIDTH) { // if ball has moved beyond the right edge
      this.speedX *= -1; // reverse ball's horizontal direction
    }

    if(this.y < 0) { // if ball has moved beyond the top edge
      this.speedY *= -1; // reverse ball's vertical direction
    }
    
    if(this.y > GAME_HEIGHT) { // if ball has moved beyond the bottom edge
      this.speedY *= -1;
    }
    
    this.bounceOffWalls();
  
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.isOnWall = function() {
    return isBrickAtPixelPosition(this.x, this.y);
  }

  this.bounceOffWalls = function() {
    var tileCol = this.x / BRICK_W;
    var tileRow = this.y / BRICK_H;
    
    // using Math.floor to round down to the nearest whole number
    tileCol = Math.floor( tileCol );
    tileRow = Math.floor( tileRow );

    // first check whether the ball is within any part of the brick wall
    if(tileCol < 0 || tileCol >= BRICK_COLS ||
       tileRow < 0 || tileRow >= BRICK_ROWS) {
       return false;
    }
    
    var brickIndex = brickTileToIndex(tileCol, tileRow);
   
    if(brickGrid[brickIndex] == 1) {
      // ok, so we know we overlap a brick now.
      // let's backtrack to see whether we changed rows or cols on way in
      var prevX = this.x-this.speedX;
      var prevY = this.y-this.speedY;
      var prevTileCol = Math.floor(prevX / BRICK_W);
      var prevTileRow = Math.floor(prevY / BRICK_H);
      var bothTestsFailed = true;
      if(prevTileCol != tileCol) { // must have come in horizontally
        var adjacentBrickIndex = brickTileToIndex(prevTileCol, tileRow);
        // make sure the side we want to reflect off isn't blocked!
        if(brickGrid[adjacentBrickIndex] != 1) {
          this.speedX *= -1;
          bothTestsFailed = false;
        }
      }
      if(prevTileRow != tileRow) { // must have come in vertically
        var adjacentBrickIndex = brickTileToIndex(tileCol, prevTileRow);
        // make sure the side we want to reflect off isn't blocked!
        if(brickGrid[adjacentBrickIndex] != 1) {
          this.speedY *= -1;
          bothTestsFailed = false;
        }
      }
      // we hit an "armpit" on the inside corner, this blocks going into it
      if(bothTestsFailed) {
        this.speedX *= -1;
        this.speedY *= -1;
      }
    }
  }
  
  this.draw = function() {
      colorCircle(this.x, this.y, BALL_RADIUS, BALL_COLOUR);
  }
} // end of ball class

var ballList = [];

function createEveryBall() {
  for( var i=0;i<BALL_COUNT;i++) {
    ballList.push(new ballClass());
    while(ballList[i].isOnWall()) {
      ballList[i].findNewRandPosition();
    }
  }
}