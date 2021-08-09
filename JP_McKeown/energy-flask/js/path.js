// same length as world, all zero
let visitGrid = new Array(TILES).fill(0);

function drawBallPath(id) {
    console.log(ballList[id].history);
}

function drawVisits() {
    if(!pathsDrawn) {
        countVisits();
        drawTiles();
        pathsDrawn = true;
    }
}

function countVisits() {
    for(var i=0; i<BALL_COUNT; i++) {
        console.log(ballList[i].history);
        for(var j=0; j < ballList[i].history.length; j++) {
            let index = ballList[i].history.pop();
            // console.log(index);
            visitGrid[index]++;
        }
    }
}

// white if not visted by balls, incrementally redder 
function drawTiles() {
    var index = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(let row = 0; row < WORLD_ROWS; row++) {
      for(let col = 0; col < WORLD_COLS; col++) {
  
        index = tileToIndex(col, row);
        if(gameRunning) {
            redTile(drawTileX, drawTileY, index);
        } else {
drawLineRect(drawTileX, drawTileY, TILE_W, TILE_H, 'white', 'black');
        }
        drawTileX += TILE_W;
        index++;
      } // end col
  
      drawTileY += TILE_H;
      drawTileX = 0;
    } // end row
}

const VISIT_HUE_MULT = 4;
// 0 is white, large number = red
function redTile(x, y, index) {
    var n = visitGrid[index];
    var lightness = 100 - (n * VISIT_HUE_MULT);
    if(lightness < 0) { lightness = 0;}
    var tint = 'hsl(0, 100%, ' + lightness + '%)'; 
    drawLineRect(x, y, TILE_W, TILE_H, tint, 'black');
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