const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

//var trackGrid = new Array(TRACK_COLS * TRACK_ROWS);
var trackGrid =    [1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                    1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                    1, 0, 0, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 0, 0, 0, 0, 0, 4,
                    1, 0, 0, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 0, 0, 0, 0, 0, 1, 4,
                    1, 2, 0, 1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 0, 0, 0, 1, 1, 1, 4,
                    1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 4,
                    1, 5, 5, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 0, 0, 0, 0, 1, 1,
                    1, 3, 3, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 0, 0, 0, 1, 1,
                    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
                    4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
                    4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                    

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3; 
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function isObstacleAtColRow(col, row){
    if(col >= 0 && col < TRACK_COLS &&
    row >= 0 && row < TRACK_ROWS){
        var trackIndexUnderCoord = rowColToArrayIndex(col,row);
        return (trackGrid[trackIndexUnderCoord] != TRACK_ROAD);
    }else{
        return false;
    }
}

function carTrackHandling(){
    var carTrackCol = Math.floor(carX / TRACK_W); 
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);

    if(isObstacleAtColRow(carTrackCol, carTrackRow)){
        carX -= Math.cos(carAng) * carSpeed;
        carY -= Math.sin(carAng) * carSpeed;
        carSpeed *= -0.5;
    }
}

function rowColToArrayIndex(col, row){
    return col + TRACK_COLS * row;
}

function drawTracks(){

    for(var row = 0; row < TRACK_ROWS; row++){
        for(var col = 0; col<TRACK_COLS; col++){

            var arrayIndex = TRACK_COLS * row + col;
            var tileKindHere = trackGrid[arrayIndex];

            var useImg;
            switch(tileKindHere){
                case TRACK_ROAD:
                    useImg = roadPic;
                    break;
                case TRACK_WALL:
                    useImg = wallPic;
                    break;
                case TRACK_GOAL:
                    useImg = goalPic;
                    break;
                case TRACK_TREE:
                    useImg = treePic;
                    break;
                case TRACK_FLAG:
                    useImg = flagPic;
                    break;                
            }

            canvasContext.drawImage(useImg, TRACK_W * col,TRACK_H * row);

        }
    }
}
