const TILE_W = 75;
const TILE_H = 75;
const TILE_GAP = 1;
const TILE_COLS = 8;
const TILE_ROWS = 8;
var tileGrid = 
   [0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 3, 3, 3, 3, 0,
    0, 0, 0, 3, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 2, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
];
var grid = []; // array of GridElement instances, gets initialized based on tileGrid
const NOTHING = 0;
const SOURCE = 1;
const DEST = 2;
const WALL = 3;
const VISITED = 4;
const PATH = 5;

const INFINITY_START_DISTANCE = 999999;

function tileCoordToIndex(tileCol, tileRow) {
    return (tileCol + TILE_COLS * tileRow);
}

function drawTiles() {
    var tileCount = TILE_COLS * TILE_ROWS;
    for (var eachTil = 0; eachTil < tileCount; eachTil++) {
        grid[eachTil].display();
    } // end of for eachTil
} // end of drawTiles()
