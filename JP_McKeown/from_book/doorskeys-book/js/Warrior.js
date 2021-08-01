const PLAYER_SPEED = 3.0;

function warriorClass() {

  // keyboard hold state variables, to use keys more like buttons
  this.keyHeld_North = false; ////
  this.keyHeld_East = false; ////
  this.keyHeld_South = false;
  this.keyHeld_West = false;

  // key controls
  this.setupControls = function(northKey, eastKey, southKey, westKey) {
    this.controlKeyNorth = northKey;
    this.controlKeyEast = eastKey;
    this.controlKeySouth = southKey;
    this.controlKeyWest = westKey;
  }

  this.init = function(whichImage, whichName) {
    this.bitmap = whichImage;
    this.name = whichName
    this.reset();
  }

  this.reset = function() {
    this.speed = 0;
    this.keysHeld = 0;
    // position player on screen
    for(var i = 0; i < TILES; i++) {
      if(tileGrid[i] == TILE_PLAYER) {
        var tileCol = i % TILE_COLS;
        var tileRow = Math.floor(i/TILE_COLS);
        this.x = tileCol * TILE_W + 0.5 * TILE_W;
        this.y = tileRow * TILE_H + 0.5 * TILE_H;
        tileGrid[i] = TILE_GROUND;
  
        document.getElementById('debugText').innerHTML =
          'Adventurer starts at tile: ' + tileCol + ', ' + tileRow +
          '<br />Pixel coordinate: ' + this.x + ', ' + this.y;
        break;  
      }
    }
  }

  this.move = function() {
    var nextX = this.x;
    var nextY = this.y;

    if(this.keyHeld_North) {
      nextY -= PLAYER_SPEED;
    }
    if(this.keyHeld_East) {
      nextX += PLAYER_SPEED;
    }
    if(this.keyHeld_South) {
      nextY += PLAYER_SPEED;
    }
    if(this.keyHeld_West) {
      nextX -= PLAYER_SPEED;
    }
    
    var movingIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);
    var movingIntoTileType = TILE_WALL;
    if(movingIntoTileIndex != undefined) {
      movingIntoTileType = tileGrid[movingIntoTileIndex];
    }
    
    if(movingIntoTileType == TILE_GROUND) {
      // allow player move
      this.x = nextX;
      this.y = nextY;
    } else if(movingIntoTileType == TILE_GOAL) {
      // win message, reset
      showText(this.name + ' won the race.');
    } else if(movingIntoTileType == TILE_DOOR) {
      // if key, decrement and remove door
      if(this.keysHeld > 0) {
        this.keysHeld--;
        tileGrid[movingIntoTileIndex] = TILE_GROUND;
        showText('Keys remaining: ' + this.keysHeld);
      }
    } else if(movingIntoTileType == TILE_KEY) {
      // remove key and increment key
      this.keysHeld++;
      tileGrid[movingIntoTileIndex] = TILE_GROUND;
      showText('Keys remaining: ' + this.keysHeld);
    } else {
      // stop movement into wall
      this.speed *= -0.5;
    }
    if(this.y > canvas.height) { // if car has moved beyond the bottom edge
      this.reset();
    }
  }

  this.draw = function() {
    if(true) {
      drawBitmapCenteredAtlocationWithRotation(this.bitmap, this.x, this.y, 0.0);
    }
  }
} // ends Class


      // if(x < 0) { // if car has moved beyond the left edge
    //   speedX *= -1; // reverse car's horizontal direction
    // }
    
    // if(x > canvas.width) { // if car has moved beyond the right edge
    //   speedX *= -1; // reverse car's horizontal direction
    // }

        // if(y < 0) { // if car has moved beyond the top edge
    //   speedY *= -1; // reverse car's vertical direction
    // }
    