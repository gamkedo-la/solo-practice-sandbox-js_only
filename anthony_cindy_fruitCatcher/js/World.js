const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_GAP = 0;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;
const WORLD_TOTAL_WIDTH = WORLD_W*WORLD_COLS;
const WORLD_TOTAL_HEIGHT = WORLD_H*WORLD_ROWS;
// console.log(WORLD_TOTAL_WIDTH, ":", WORLD_TOTAL_HEIGHT);

var tutorial =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1];

var levelList = [tutorial];
var levelNow = 0;
var worldGrid = [];

const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_TROPHY = 3;
const WORLD_KEY = 4;
const WORLD_DOOR = 5;
const WORLD_DOOR_OPEN = 6;

function returnTileTypeAtColRow(col, row) {
    if(col >=0 && col < WORLD_COLS && 
        row >= 0 && row < WORLD_ROWS) {
        
        var worldIndexUnderCoord = rowColtoArrayIndex(col, row);
        return worldGrid[worldIndexUnderCoord];
    } else {
        return WORLD_WALL;
    }
}

function handleStoppingPlayer(whichPlayer){
    if(whichPlayer.keyHeld_North) {
        whichPlayer.y += WALK_SPEED;
    }
    if(whichPlayer.keyHeld_South) {
        whichPlayer.y -= WALK_SPEED;
    }
    if(whichPlayer.keyHeld_West) {
        whichPlayer.x += WALK_SPEED;
    }
    if(whichPlayer.keyHeld_East) {
        whichPlayer.x -= WALK_SPEED;
    }
}

function tileTypeMove(checkTileType){
    return (checkTileType == WORLD_ROAD||
            checkTileType == WORLD_DOOR_OPEN);
}

function playerWorldHandling(whichPlayer) {
    var playerWorldCol = Math.floor(whichPlayer.x/ WORLD_W);
    var playerWorldRow = Math.floor(whichPlayer.y/WORLD_H);
    if(playerWorldCol>=0 && playerWorldCol < WORLD_COLS && 
        playerWorldRow >= 0 && playerWorldRow < WORLD_ROWS){

        var tileHere = returnTileTypeAtColRow(playerWorldCol, playerWorldRow);
            
        if(tileHere == WORLD_TROPHY){
            console.log(whichPlayer.name + " TRIUMPHED IN THIS LEVEL!!");
            nextLevel();
            // alert(whichPlayer.name + " WINS!!"); // player keeps going after alert as if up key was still pressed
        } 
        else if(tileHere == WORLD_KEY) {
            whichPlayer.fruitsHeld++;
            // console.log(whichPlayer.fruitsHeld);
            // console.log(playerWorldCol, ":", playerWorldRow, ":", worldGrid[playerWorldCol + WORLD_COLS*playerWorldRow]);
            // console.log(rowColtoArrayIndex(playerWorldCol, playerWorldRow));
            worldGrid[rowColtoArrayIndex(playerWorldCol, playerWorldRow)] = WORLD_ROAD;
        }
        else if(tileHere == WORLD_DOOR) {
            if(whichPlayer.fruitsHeld > 0){
                worldGrid[rowColtoArrayIndex(playerWorldCol, playerWorldRow)] = WORLD_DOOR_OPEN;
                whichPlayer.fruitsHeld--;
            } else {
                handleStoppingPlayer(whichPlayer);
            }
        }
        else if(!tileTypeMove(tileHere) || 
                whichPlayer.x <= 3 || whichPlayer.x >= WORLD_TOTAL_WIDTH-(WORLD_W/3)
                || whichPlayer.y <= WORLD_H/2 || whichPlayer.y > WORLD_TOTAL_HEIGHT-(WORLD_H/3)
            ) {
            handleStoppingPlayer(whichPlayer);
        } // end of if else if goal vs road
    } // end of world row and col
} // end of playerWorldHandling func

function rowColtoArrayIndex(col, row) {
    return col + WORLD_COLS * row;
}

function tileTypeHasTransparency(checkTileType){
    return (checkTileType == WORLD_DOOR ||
            checkTileType == WORLD_KEY ||
            checkTileType == WORLD_TROPHY ||
            checkTileType == WORLD_DOOR_OPEN);
}

function drawWorlds() {
    var arrayIndex = 0;
    var drawTileX = 0;
    var drawTileY = 0;
    for(var eachRow = 0; eachRow < WORLD_ROWS; eachRow++){
        for(var eachCol = 0; eachCol < WORLD_COLS; eachCol++){
            var tileKindHere = worldGrid[arrayIndex];
            var useImg = worldPics[tileKindHere]; //take the value in the world map and find the image from the worldPics array we load
            if(tileTypeHasTransparency(tileKindHere)){
                canvasContext.drawImage(worldPics[0], drawTileX, drawTileY);
            }
            canvasContext.drawImage(useImg, drawTileX, drawTileY);
            drawTileX += WORLD_W
            arrayIndex++;
        } //end of for each col   
        drawTileY += WORLD_H;     
        drawTileX = 0;
    } //end of for each row
    if(levelNow == 0){
        var tutorialText = "Welcome to Fruit Catcher!";
        colorText(tutorialText, 60, 100, "black", "30px arial");
        tutorialText = "Catch the correct fruit.";
        colorText(tutorialText, 60, 150, "black", "25px arial");
    }
} // end of drawWorlds

function drawUserStats(whichPlayer) {
    colorRect(5, 5, 100, 25, "yellow", 0.7);
    var userStatsText = "Fruits: " + whichPlayer.fruitsHeld;
    colorText(userStatsText, 20, 23, "black", "20px serif");
}