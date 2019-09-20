const ISO_GRID_W = 50;
const ISO_GRID_H = ISO_GRID_W / 2;
const ISO_TILE_GROUND_Y = 35;

const ROOM_W = 50;
const ROOM_H = ROOM_W;
const ROOM_COLS = 16;
const ROOM_ROWS = 16;


var isoDrawX = 0;
var isoDrawY = 0;

var roomGrid = [
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,
					1,5,2,5,5,5,5,5,5,5,5,5,5,5,5,1,
					1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,0,5,1,
					1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,
					1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1,
					1,5,0,1,1,6,1,1,3,1,1,1,1,1,7,1,
					1,5,0,1,1,0,0,1,0,5,0,1,0,0,5,1,
					1,5,0,1,1,0,0,1,0,0,0,1,5,0,5,1,
					1,5,0,1,1,0,0,1,0,8,0,1,0,0,5,1,
					1,5,0,1,1,0,0,1,0,0,0,1,0,0,5,1,
					1,5,0,1,1,0,0,1,1,1,1,1,8,0,5,1,				
					1,5,0,1,0,0,4,0,0,1,1,1,0,0,5,1,
					1,5,0,1,0,0,0,0,0,1,1,1,0,0,5,1,
					1,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1
					];
					
	const TILE_ROAD = 0;
	const TILE_WALL = 1;
	const TILE_PLAYER = 2;
	const TILE_YELLOW_DOOR = 3;
	const TILE_FINISH = 4;
	const TILE_YELLOW_KEY = 5;
	const TILE_RED_DOOR = 6;
	const TILE_BLUE_DOOR = 7;
	const TILE_TREASURE = 8;

function tileTypeHasTransparency(checkTileType){
	return (checkTileType == TILE_FINISH ||
			checkTileType == TILE_YELLOW_DOOR ||
			checkTileType == TILE_YELLOW_KEY);
	}
	
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
	var miniMapX = 600;
	var miniMapY = 10;
	
	for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){
		tileLeftEdgeX = 700;
		miniMapX = 600;
		
		for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++) {
			var trackTypeHere = roomGrid[tileIndex];
			tileLeftEdgeX += ROOM_W;
			miniMapX += 10;
			isoTileLeftEdgeX = (tileLeftEdgeX - tileTopEdgeY)/2;
			isoTileTopEdgeY = (tileLeftEdgeX + tileTopEdgeY)/4;
			//canvasContext.drawImage(trackPics[trackTypeHere], isoTileLeftEdgeX, isoTileTopEdgeY);
			tileCoordToIsoCoord(eachCol, eachRow);
			canvasContext.drawImage(trackPics[trackTypeHere], isoDrawX - ISO_GRID_W/2, isoDrawY - ISO_TILE_GROUND_Y);
			if(trackTypeHere == 0){
				colorRect(miniMapX, miniMapY, 10, 10, "white");
			} else if (trackTypeHere == 1){
				colorRect(miniMapX, miniMapY, 10, 10, "gray");
			} else if (trackTypeHere == 3){
				colorRect(miniMapX, miniMapY, 10, 10, "yellow");
			} else if (trackTypeHere == 4 || trackTypeHere == 8){
				colorRect(miniMapX, miniMapY, 10, 10, "purple");
			} else if (trackTypeHere == 5){
				colorRect(miniMapX, miniMapY, 10, 10, "orange");	
			} else if (trackTypeHere == 6){
				colorRect(miniMapX, miniMapY, 10, 10, "red");	
			} else if (trackTypeHere == 7){
				colorRect(miniMapX, miniMapY, 10, 10, "blue");	
			}
			tileIndex++;
		} // end of each col
		miniMapY += 10;
		tileTopEdgeY += ROOM_H;
	} // end of each row
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
			