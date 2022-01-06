function ballClass() {
  var tempRandAng = Math.random() * Math.PI *2.0;
  var tempRandSpeed = BALL_INIT_SPEED + Math.random() * 1.5;

  this.speedX = Math.cos(tempRandAng)*tempRandSpeed;
  this.speedY = Math.sin(tempRandAng)*tempRandSpeed;
    this.history = [];
    
  this.placeInFlask = function() {
    this.x = FLASK_LEFT + Math.floor(Math.random() * (TILE_W * FLASK_SIZE - 2*BALL_OFFSET));
    this.y = FLASK_TOP + Math.floor(Math.random() * (TILE_H * FLASK_SIZE - 2*BALL_OFFSET));
  }

  this.placeInFlask(); // calling function as part of initialization
      
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

    this.obstacleBounce();
  
    this.x += this.speedX;
    this.y += this.speedY;
  }

  this.draw = function() {
    drawCircle(this.x, this.y, BALL_RADIUS, ballColour);
  }

  this.showStrength = function() {
    drawText(this.x, this.y, );
  }

  this.obstacleBounce = function() {
    let col = Math.floor(this.x / TILE_W);
    let row = Math.floor(this.y / TILE_H);

    // first check whether ball is within lab boundary
    if(col < 0 || col >= WORLD_COLS ||
       row < 0 || row >= WORLD_ROWS) {
       return false;
    }   
    var tileIndex = tileToIndex(col, row);

    // let's backtrack to see whether we changed rows or cols on way in
    var prevX = this.x-this.speedX;
    var prevY = this.y-this.speedY;
    var prevTileCol = Math.floor(prevX / TILE_W);
    var prevTileRow = Math.floor(prevY / TILE_H);

    // store tile path of ball
    if(prevTileCol != col || prevTileRow != row) {
        this.history.push(tileIndex);
    }
    
    if(worldGrid[tileIndex] == TILE_SHIELD || worldGrid[tileIndex] == TILE_CORNER_SHIELD || worldGrid[tileIndex] == TILE_ROCK) {
      // particle overlaps reflective tile
      var bothTestsFailed = true;

      if(prevTileCol != col) { // must have come in horizontally
        var adjacentTileIndex = tileToIndex(prevTileCol, row);
        // make sure the side we want to reflect off isn't blocked!
        if(worldGrid[adjacentTileIndex] != TILE_SHIELD && worldGrid[adjacentTileIndex] != TILE_CORNER_SHIELD || worldGrid[tileIndex] == TILE_ROCK) {
          this.speedX *= -1;
          bothTestsFailed = false;
          if(worldGrid[tileIndex] != TILE_ROCK) {
            impactShield(tileIndex);
          }
        }
      }

      if(prevTileRow != row) { // must have come in vertically
        var adjacentTileIndex = tileToIndex(col, prevTileRow);
        // make sure the side we want to reflect off isn't blocked!
        // if(worldGrid[adjacentTileIndex] != TILE_SHIELD) {
        if(worldGrid[adjacentTileIndex] != TILE_SHIELD && worldGrid[adjacentTileIndex] != TILE_CORNER_SHIELD || worldGrid[tileIndex] == TILE_ROCK) {
          this.speedY *= -1;
          bothTestsFailed = false;
          if(worldGrid[tileIndex] != TILE_ROCK) {
            impactShield(tileIndex);
          }
        }
      }

      if(bothTestsFailed) {
        // we hit an "armpit" on the inside corner, this blocks going into it
        this.speedX *= -1;
        this.speedY *= -1;
        if(worldGrid[tileIndex] != TILE_ROCK) {
            impactShield(tileIndex);
          }
      }
    }
  }
} // end of ball class