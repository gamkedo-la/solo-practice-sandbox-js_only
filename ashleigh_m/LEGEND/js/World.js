const TILE_W = 50;
const TILE_H = 50;
const TILE_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;
var levelOne = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
				1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
				1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 0, 1,
				1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 1,
				1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 1,
				1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 1,
				1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1,
				1, 2, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 1,
				1, 0, 0, 1, 3, 3, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1,
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var worldGrid = [];

const TILE_FLOOR = 0;
const TILE_WALL = 1;
const TILE_PLAYERSTART = 2;
const TILE_DOOR = 3;
const TILE_KEY = 4;
const TILE_GOAL = 5;

function returnTileTypeAtColRow(col, row) {
	if(col >= 0 && col < WORLD_COLS &&
		row >= 0 && row < WORLD_ROWS) {
		 var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		 return worldGrid[worldIndexUnderCoord];
	} else {
		return TILE_WALL; //treat out of bounds world as though it was a wall
	}
}

function getTileTypeAtPixelCoord(atX, atY) { //changed from warrior world handling
	var warriorWorldCol = Math.floor(atX / TILE_W);
	var warriorWorldRow = Math.floor(atY / TILE_H);
	//var worldIndexUnderWarrior = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

	if(warriorWorldCol >= 0 && warriorWorldCol < WORLD_COLS &&
		warriorWorldRow >= 0 && warriorWorldRow < WORLD_ROWS) {
		var tileHere = returnTileTypeAtColRow( warriorWorldCol,warriorWorldRow );
		return tileHere;
	} // end of valid col and row
	return TILE_WALL;
} // end of warriorWorldHandling func

function rowColToArrayIndex(col, row) {
	return col + WORLD_COLS * row;
}

function tileUsesTransparency(tile){
	if(tile == 3 ||
       tile == 4 || 
	   tile == 5){
		return true;
	} else {
		return false;
	}
}

function drawWorld() {

	for(var eachRow=0;eachRow<WORLD_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<WORLD_COLS;eachCol++) {

			var arrayIndex = rowColToArrayIndex(eachCol, eachRow); 
			var tileKindHere = worldGrid[arrayIndex];
			var useImg = worldPics[tileKindHere];
			if(tileUsesTransparency(tileKindHere)){
				canvasContext.drawImage(worldPics[0], //draw floor under transparent images
					TILE_W*eachCol,TILE_H*eachRow);				
			} 
			canvasContext.drawImage(useImg,
					TILE_W*eachCol,TILE_H*eachRow);

		} // end of for each col
	} // end of for each row

} // end of drawWorld func