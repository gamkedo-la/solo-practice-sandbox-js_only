const TILE_FLOOR = 0;
const TILE_FLASK = 1;
const TILE_SHIELD = 2;
const TILE_CORNER_SHIELD = 3;
const TILE_PIPE_H = 6;
const TILE_PIPE_V = 7;
const TILE_DAMPER = 12;
// const TILE_ROCK = 4;
// const TILE_TUNNEL = 5; 
// only if I work out how to have more than one base tile for transparent overlay, 
// otherrwise use TILE_FLOOR for the access tunnel and any deflective tunnels.

// const TILE_MOBILESHIELD = ;
// const TILE_NEUTRALIZER;
// const TILE_DEFLECTOR;
// const TILE_IGNITER;
// const TILE_FACTORY;
// const TILE_ = ;

var worldGrid =
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 3, 2, 2, 2, 3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 3, 2, 2, 2, 3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

// var strengthGrid =
//   [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 10, 40, 40, 40, 10, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 10, 40, 40, 40, 10, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
// var strengthArray = [];

function drawWorld() {
  let arrayIndex = 0;
	let drawTileX = 0;
	let drawTileY = 0;
  for(let row = 0; row < WORLD_ROWS; row++) {
    for(let col = 0; col < WORLD_COLS; col++) {

      let arrayIndex = tileToIndex(col, row); 
      let tileKindHere = worldGrid[arrayIndex];

      if(tileKindHere == TILE_FLOOR) {
        drawLineRect(drawTileX, drawTileY, TILE_W, TILE_H, '#ffffbf', '#dddddd');
      } else if(tileKindHere == TILE_FLASK) {
        drawFillRect(drawTileX, drawTileY, TILE_W, TILE_H, '#ffffff');
      } // } else if(tileKindHere == TILE_SHIELD) {
      //   colourShield(drawTileX, drawTileY, strengthGrid[arrayIndex]);
      // }

      drawTileX += TILE_W;
      arrayIndex++;
    } // end col

    drawTileY += TILE_H;
    drawTileX = 0;
  } // end row
}

// function colourShield(x, y, strength) {
//   // let strengthTint = '#0000' + strength.toString(16);
//   // RGB gradient only works for greyscale, need HSL
//   // low strength -> higher lightness 
//   let lightness = SHIELD_LIGHTNESS - strength;
//   let strengthTint = 'hsl(240, 100%, ' + lightness + '%)'; 
//   // console.log(strengthTint)
//   drawLineRect(x, y, TILE_W, TILE_H, strengthTint, 'black');
// }

function tileToShield(tile) {
  for(let i=0; i < shieldList.length; i++) {
    if(shieldList[i].tileIndex == tile) {
      return i;
    }
  }
}

function isFlaskAtTileCoord(tileCol, tileRow) {
  var tileIndex = tileToIndex(tileCol, tileRow);
  return (worldGrid[tileIndex] == TILE_FLASK);
}

function tileToIndex(col, row) {
  return(col + WORLD_ROWS * row);
}

function xToCol(x) {
  // given pixel coordinate find tile column
  let col = Math.floor(x / TILE_W);
  return col;
}

function yToRow(y) {
  // given pixel coordinate find tile row
  let row = Math.floor(y / TILE_H);
  return row;
}

