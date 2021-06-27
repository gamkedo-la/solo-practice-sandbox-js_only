const BRICK_W = 40;
const BRICK_H = 40;
const BRICK_GAP = 1;

const BRICK_COLS = canvas.width / BRICK_W;
const BRICK_ROWS = canvas.height / BRICK_H;

const TILE_SHADE = ['#ffffff',
                    '#dfdfdf',
                    '#c0c0c0',
                    '#a2a2a2',
                    '#858585',
                    '#696969',
                    '#4f4f4f',
                    '#363636',
                    '#1e1e1e',
                    '#010101' ];
var BRICK_HITS = 0;
var BRICK_COLOUR = TILE_SHADE[BRICK_HITS];

const brickGrid = new Array(BRICK_COLS * BRICK_ROWS);

// const centreCol = Math.floor(BRICK_COLS / 2) -1;
// const centreRow = Math.floor(BRICK_ROWS / 2) -1;
// const centreTile = centreCol + centreRow * BRICK_COLS;
// brickGrid.fill(0, +BRICK_COLS + centreTile, BRICK_COLS + centreTile+2);
// brickGrid.fill(0, BRICK_COLS + voidTopLeftTile, BRICK_COLS + voidTopLeftTile + VOID_SIZE);
// brickGrid.fill(0, 2 * BRICK_COLS + voidTopLeftTile, 2 * BRICK_COLS + voidTopLeftTile + VOID_SIZE);

// void 3x3 randomly placed
const VOID_W = 3;
const VOID_H = 3;

function resetGrid() {
    brickGrid.fill(1, 0);
    let minCol = 1; //avoid left edge, until ball escape fixed
    let minRow = 1; //avoid top edge
    let maxCol = BRICK_COLS - VOID_W - 1; //avoid right edge
    let maxRow = BRICK_ROWS - VOID_H - 1; //avoid bottom edge

    let voidTopLeftCol = Math.floor(Math.random() * (maxCol - minCol +1)) + minCol;
    let voidTopLeftRow = Math.floor(Math.random() * (maxRow - minRow +1)) + minRow;
    let voidTopLeftTile = voidTopLeftCol + voidTopLeftRow * BRICK_COLS;
    console.log('col:' + voidTopLeftCol + ' row:' + voidTopLeftRow)
    //for(let row = voidTopLeftRow, row < voidTopLeftRow + VOID_W)
    for(i=0; i<VOID_H; i++) {
        brickGrid.fill(0, voidTopLeftTile + i*BRICK_COLS, voidTopLeftTile + VOID_W + i*BRICK_COLS);
    }
}

// console.log(BRICK_COLS * BRICK_ROWS)
    // [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    // 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    // 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    // 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    // 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    // 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
    // 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    // 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    // 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    // 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    // 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    // 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
    // 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// var hitsGrid = 
//     [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
//     1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//     1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
//     1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
//     1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1,
//     1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
//     1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
//     1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
//     1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
//     1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
//     1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
//     1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
//     1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
//     1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

function brickTileToIndex(tileCol, tileRow) {
    return (tileCol + BRICK_COLS*tileRow);
}

function isBrickAtPixelPosition(pixelX, pixelY) {
    var tileCol = pixelX / BRICK_W;
    var tileRow = pixelY / BRICK_H;
    
    // using Math.floor to round down to the nearest whole number
    tileCol = Math.floor( tileCol );
    tileRow = Math.floor( tileRow );

    // first check whether the ball is within any part of the brick wall
    if(tileCol < 0 || tileCol >= BRICK_COLS ||
        tileRow < 0 || tileRow >= BRICK_ROWS) {
        return 1; // treat out of bounds as solid
    }
    
    return isBrickAtTileCoord(tileCol, tileRow);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
    var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
    return (brickGrid[brickIndex] == 1);
}

function drawBricks() {
    for(var eachCol=0; eachCol<BRICK_COLS; eachCol++) { // in each column...
      for(var eachRow=0; eachRow<BRICK_ROWS; eachRow++) { // in each row within that col
      
        if( isBrickAtTileCoord(eachCol, eachRow) ) {
          var brickLeftEdgeX = eachCol * BRICK_W;
          var brickTopEdgeY = eachRow * BRICK_H;
          colorRect(brickLeftEdgeX, brickTopEdgeY,
                   BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, BRICK_COLOUR );
        } // end of isBrickAtTileCoord()
      } // end of for eachRow
    } // end of for eachCol
  } // end of drawBricks()