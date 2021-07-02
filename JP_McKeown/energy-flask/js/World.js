function drawUI() {
  colorRect(TILED_RIGHT,0,GAME_WIDTH-TILED_RIGHT,GAME_HEIGHT,'green');
}

function drawTiles() {
  let strength = 0;
  for(var row=0; row < TILE_ROWS; row++) {
      for(var col=0; col < TILE_COLS; col++) {
  
        var arrayIndex = colRowTileIndex(col, row);
        var tileLeftEdgeX = col * TILE_WIDTH;
        var tileTopEdgeY = row * TILE_HEIGHT;

        strength = tileGrid[arrayIndex];
        if(strength > 0) {
          colorRect(tileLeftEdgeX, tileTopEdgeY, TILE_W, TILE_H, TILE_STRENGTH_COLOR[strength]);
        } 
      }
    }
}

function makeShield() {
  // there must be  math formula, given topleft grid position and size of rectangle
  // to get a list of array index positions where to draw; instead crazy hack below
  let flaskLeftCol = TILED_CENTRE_COL - FLASK_SIZE/2 - 1;
  let flaskTopRow = TILED_CENTRE_COL - FLASK_SIZE/2 -1;

  let start = colRowTileIndex(flaskLeftCol, flaskTopRow);
  for(i= 0; i<FLASK_SIZE; i++) {
    tileGrid[start + i] = 5;
  }
  for(i=0; i<FLASK_SIZE; i++) {
    tileGrid[start + i*15] = 5;
  }
  let end = colRowTileIndex(flaskLeftCol + FLASK_SIZE-1, flaskTopRow + FLASK_SIZE-1);
  for(i= 0; i<FLASK_SIZE; i++) {
    tileGrid[end - i] = 5;
  }  
  for(i= 0; i<FLASK_SIZE; i++) {
    tileGrid[end - i*15] = 5;
  }  
}

// make void first then overwrite with shield
// or make shield fill whole flask, then overwrite void
function makeVoid() {
  let flaskLeftCol = TILED_CENTRE_COL - FLASK_SIZE/2 - 1;
  let flaskTopRow = TILED_CENTRE_COL - FLASK_SIZE/2 -1;
  let start = colRowTileIndex(flaskLeftCol, flaskTopRow);

  for(i=0; i<FLASK_SIZE*FLASK_SIZE; i++) {
      tileGrid.fill(0, start + i*TILE_COLS, start + FLASK_SIZE + i*TILE_COLS);
  }
}

function tileReset() {
  // should not tie strength to tile contents because I want other objects
  tilesRemain = 0;
  tileGrid.fill(0,0); // begin as Lab
  makeVoid();
  makeShield();


  // Test fills all tiles with shielding 
  // for(var i = 0 ; i < TILES; i++) {
  //   tileGrid[i] = 5;
  //   tilesRemain++;
  // }
}

// gets index number of tile
function colRowTileIndex(col, row) {
  return col + TILE_COLS * row;
}
  
function isTileAtColRow(col, row) {
    if(col >= 0 && col < TILE_COLS && row >= 0 && row < TILE_ROWS) {
        var tileIndex = colRowTileIndex(col, row);
        if(tileGrid[tileIndex] > 0) {
          return tileGrid[tileIndex];
        } else {
          return false;
        }
    } else {
        return false;
    }
}