const WORLD_W = 50; 
const WORLD_H = 50;
const WORLD_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;
var roomOne =  [ 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01,
				 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01,
				 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01,
				 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01,
				 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01,
				 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01,
				 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01,
				 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01,
				 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01,
				 01, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 01,
				 01, 00, 00, 00, 00, 00, 00, 02, 00, 00, 00, 00, 00, 00, 00, 01,
				 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01, 01 ];
var worldGrid = [];

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYERSTART = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4; 	//
const TILE_DOOR = 5; 	//
const TILE_SPIKES = 6; //
const TILE_FOOD = 7; 	//
const TILE_POTION = 8;
const TILE_TRANSPORT = 9; //



function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < WORLD_COLS &&
		row >= 0 && row < WORLD_ROWS) {
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return worldGrid[worldIndexUnderCoord];
	} else {
		return WORLD_WALL;
	}
}

function playerTransportToRoom() {
	console.log("...playerTransportToRoom EXECUTES...");
}

function getTileIndexAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / WORLD_W);
	var warriorWorldRow = Math.floor(atY / WORLD_H);
	var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	// console.log(worldIndexUnderWarrior);

	if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
		return worldIndexUnderWarrior;
	} // end of valid col and row
	return undefined;
} // end of warriorWorldHandling func


function rowColToArrayIndex(col, row) {
	return col + WORLD_COLS * row;
}

function tileTypeHasTransparency(checkTileType) {
	return (checkTileType == TILE_GOAL ||
			checkTileType == TILE_KEY ||
			checkTileType == TILE_DOOR ||
			checkTileType == TILE_FOOD ||
			checkTileType == TILE_POTION);
}

function drawTitleScreen(color) {
	colorRect(0,0, canvas.width,canvas.height, color)
	colorText("Press the -SPACEBAR- to Begin", 100, 200, 20, 'yellow')
	colorText("Press  -9-  to go into EDITOR MODE", 100, 230, 20, 'yellow')
}

// function drawWorld() {
// 	var arrayIndex = 0;
// 	var drawTileX = 0;
// 	var drawTileY = 0;

// 	for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
// 		for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {

// 			// tileKindHere pulls from value from the worldGrid[ arrayIndex ]
// 			var tileKindHere = worldGrid[arrayIndex];
// 			// var useImg = worldPics[tileKindHere];

			
// 			if( tileTypeHasTransparency(tileKindHere) ) {
// 				canvasContext.drawImage(worldPics[TILE_GROUND],drawTileX,drawTileY);
// 			}

// 			//canvasContext.drawImage(tile_Ground, drawTileX,drawTileY);
// 			switch (tileKindHere) {

// 				case TILE_GROUND:
// 					canvasContext.drawImage(tile_Ground, drawTileX,drawTileY);
// 					break;
// 				case TILE_WALL:
// 					canvasContext.drawImage(tile_Wall, drawTileX,drawTileY);
// 					break;
// 				case TILE_GOAL:
// 					canvasContext.drawImage(tile_Chest, drawTileX,drawTileY);
// 					break;
// 				case TILE_KEY:
// 					canvasContext.drawImage(tile_Key, drawTileX,drawTileY);
// 					break;
// 				case TILE_DOOR:
// 					canvasContext.drawImage(tile_Door, drawTileX,drawTileY);
// 					break;
// 				case TILE_SPIKES:
// 					canvasContext.drawImage(tile_Spikes, drawTileX,drawTileY);
// 					break;
// 				case TILE_FOOD:
// 					canvasContext.drawImage(tile_Food, drawTileX,drawTileY);
// 					break;
// 				case TILE_POTION:
// 					canvasContext.drawImage(tile_Potion, drawTileX,drawTileY);
// 					break;
// 				case TILE_TRANSPORT:
// 					canvasContext.drawImage(tile_Transport, drawTileX,drawTileY);
// 					break;

// 			}

// 			drawTileX += WORLD_W;
// 			arrayIndex++;
// 		} // end of for each col
// 		drawTileY += WORLD_H;
// 		drawTileX = 0;
// 	} // end of for each row

// } // end of drawWorld func


function drawWorld() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];

			if( tileTypeHasTransparency(tileKindHere) ) {
				canvasContext.drawImage(worldPics[TILE_GROUND],drawTileX,drawTileY);
			}
			canvasContext.drawImage(useImg,drawTileX,drawTileY);
			drawTileX += WORLD_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += WORLD_H;
		drawTileX = 0;
	} // end of for each row

} // end of drawWorld func