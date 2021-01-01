var grid = []; // array of GridElement instances, gets initialized based on tileGrid
const NOTHING = 20;
const SOURCE = 21;
const DEST = 22;
const WALL = 23;
const VISITED = 24;
const PATH = 25;

const INFINITY_START_DISTANCE = 999999;

function tileCoordToIndex(tileCol, tileRow) {
    return (tileCol + ROOM_COLS * tileRow);
}

function drawPathingFindingTiles() {
    var tileCount = ROOM_COLS * ROOM_ROWS;
    for (var eachTil = 0; eachTil < tileCount; eachTil++) {
        grid[eachTil].display();
    } // end of for eachTil
} // end of drawTiles()
