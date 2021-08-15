// Tim Chase
// Aug 15, 2020
// Racing game - Track stuff

var roadPic = document.createElement('img');
var wallPic = document.createElement('img');

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_GAP = 2;
const TRACK_ROWS = 15;
var trackGrid = [
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;

function trackLoadImages() {
    roadPic.src = "track_road.png";
    wallPic.src = "track_wall.png";
}

// track functions
function rowColToArrayIndex(col, row) {
    return col + (TRACK_COLS * row)
}

function drawTracks() {

    for(var eachRow=0;eachRow<TRACK_ROWS;eachRow++) {
        for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);

            if(trackGrid[arrayIndex] == TRACK_ROAD) {
                canvasContext.drawImage(roadPic, TRACK_W*eachCol, TRACK_H*eachRow);

            } else if(trackGrid[arrayIndex] == TRACK_WALL) {
                canvasContext.drawImage(wallPic, TRACK_W*eachCol, TRACK_H*eachRow);
            }
        } // draw rows
    } // draw cols
}

function isWallAtColRow(col, row) {
    if(col >= 0 && col < TRACK_COLS && 
       row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColToArrayIndex(col, row);
        return trackGrid[trackIndexUnderCoord] == TRACK_WALL;
    } else {
        return false;
    }
}

function carTrackHandling() {
    // collision
    var carTrackCol = Math.floor(carX / TRACK_W);
    var carTrackRow = Math.floor(carY / TRACK_H);
    //var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    if(carTrackCol >=0 && carTrackCol < TRACK_COLS && 
       carTrackRow >=0 && carTrackRow < TRACK_ROWS) {
        if(isWallAtColRow(carTrackCol, carTrackRow)) {
            // keep car from being buried in the wall
            carX -= Math.cos(carAng) * carSpeed;
            carY -= Math.sin(carAng) * carSpeed;

            carSpeed *= -0.5;
        } // end track found
    } // end valid col row
} // carTrackHandling
