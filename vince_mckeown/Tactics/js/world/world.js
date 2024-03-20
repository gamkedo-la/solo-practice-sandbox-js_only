const ISO_GRID_W = 50;
const ISO_GRID_H = ISO_GRID_W / 2;
const ISO_TILE_GROUND_Y = 85;
const ISO_TILE_DRAW_W = 50;
const ISO_TILE_DRAW_H = 50;
const ROOM_W = 50;
const ROOM_H = ROOM_W;
const ROOM_COLS = 10;
const ROOM_ROWS = 10;


var isoDrawX = 0;
var isoDrawY = 0;

var sharedAnimCycle = 0;

var levelList = [levelOne, levelTwo];
var levelNow = 0;
var roomGrid = [];

var levelOne = [
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 2, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
				];
					
var levelTwo =[
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 2, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
				];
					
	const TILE_FLOOR_STONE_1 = 1;
	const TILE_PLAYER = 2;

	
function gameCoordToIsoCoord (pixelX, pixelY){
	var camPanX = -350;
	var camPanY = 0;
	var tileCFraction = pixelX / ROOM_W;
	var tileRFraction = pixelY / ROOM_H;
	
	isoDrawX = -camPanX + tileCFraction * (ISO_GRID_W/2) - tileRFraction * (ISO_GRID_W/2);
	isoDrawY = -camPanY + tileCFraction * (ISO_GRID_H/2) + tileRFraction * (ISO_GRID_H/2);
}	

function tileCoordToIsoCoord(tileC, tileR ){
	gameCoordToIsoCoord(tileC * ROOM_W, tileR * ROOM_H);
}
					
function drawTracks(){
	var tileIndex = 0;
	var tileLeftEdgeX = 700
	var tileTopEdgeY = 0;
	var isoTileLeftEdgeX = 0;
	var isoTileTopEdgeY = 0;
	var miniMapX = 750;
	var miniMapY = 2;
	sharedAnimCycle++;
	
	for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
		tileLeftEdgeX = 7;
		miniMapX = 730;
		
		for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
			var trackTypeHere = roomGrid[tileIndex];
			tileLeftEdgeX += ROOM_W;
			miniMapX += 4;
			isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY)/2;
			isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY)/4;
			tileCoordToIsoCoord(eachCol, eachRow);			 
		tileIndex++;
		} // end of each col
		tileTopEdgeY += ROOM_H;
	} // end of each row
}

function tileTypeHasRoadTransparency(checkTileType) {
/*	return (checkTileType == TILE_BOOKSHELF ||
			checkTileType == TILE_PITTRAP_UNARMED ||
				checkTileType == TILE_SPIKES_UNARMED 
			); */
}

function isWallAtTileCoord(trackTileCol, trackTileRow){
				var tileIndex = roomTileToIndex(tileCol, tileRow);
				return tileIndex;
}

function rowColToArrayIndex(col, row) {
	return col + ROOM_COLS * row;
}			
		
function getTileIndexAtPixelCoord(pixelX,pixelY){
	var tileCol = pixelX / ROOM_W;		
	var tileRow = pixelY / ROOM_H;
					
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow); 
	//console.log("X: "+pixelX+ " Y: "+pixelY+ " col: " + tileCol + " row: " + tileRow);
				
	if(tileCol < 0 || tileCol >= ROOM_COLS || 
		tileRow < 0 || tileRow >= ROOM_ROWS) {
		document.getElementById("debugText").innerHTML = "out of bounds: " +pixelX+", "+pixelY;
		return undefined; // checking for out of bounds 
	}
				
	var tileIndex = roomTileToIndex(tileCol, tileRow);
	return tileIndex;
}		
			
function roomTileToIndex(tileCol, tileRow) {
	return(tileCol + ROOM_COLS*tileRow);
}
			