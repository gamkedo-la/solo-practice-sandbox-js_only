const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

var levelOne = 
	[
   100,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,102, 
   103,  1,  1,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1,  1,  1,  1,  1,  1,  1,  4,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  3,  3, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 50,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1,107,
   103, 52, 52, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1,107,
   103, 53, 53, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,  1,  1,107,
   103,  0,  1, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1,107,
   103,  0,  1, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1,107,
   103,  0,  1, 51, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 51,  1,  1,107,
   103,  0,  1, 50, 51, 51, 51, 51, 51, 50, 50, 51, 51, 51, 51, 51, 50,  1,  1,107,
   103,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,  
   103,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,	
   104,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105, 
   ];
	
var levelTwo = 
	[
   100,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,102, 
   103,  1,  1,  1,  1,  1,  1,  1,  1, 50,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1,  1,  1,  1,  1,  1,  1, 50,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 51, 51, 50,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 51, 51, 51,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 51, 51, 51,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51,  1,  1,  4,  1,  1, 51, 51, 51, 51, 51,  1,  1,107,
   103,  3,  3, 50, 50, 50, 50,  1,  1,  4,  1,  1, 50, 50, 50, 50, 50,  1,  1,107,
   103,  1,  1, 51, 51, 51, 50, 50, 50, 50, 50, 50, 50, 51, 51, 51, 51,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51, 51, 51, 50, 51, 51, 51, 51, 51, 51, 51,  1,  1,107,
   103,  0,  0, 51, 51, 51, 51, 51, 51, 50, 51, 51, 51, 51, 51, 51, 51,  1,  1,107,
   103,  0,  0, 50, 51, 51, 51, 51, 51, 50, 51, 51, 51, 51, 51, 51, 50,  1,  1,107,
   103,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,  
   103,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,	
   104,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105, 
   ];
	
var levelThree = 
	[
   100,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,101,102, 
    50, 51, 51,  1,  1,  1,  1,  1,  1, 50,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
    50, 51, 51,  1,  1,  1,  1,  1,  1, 50,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,
    50, 51, 51,  1,  1, 50, 50,  1,  1, 50,  1,  1, 51, 51, 51, 51, 50,  1,  1,107,
   103,  1,  1,  1,  1, 51, 51,  1,  1, 50,  1,  1, 51, 51, 50, 50, 50,  1,  1,107,
   103,  1,  1,  1,  1, 51, 51,  1,  1, 50,  1,  1, 51, 51, 50,  1,  1,  1,  1,107,
   103,  1,  1, 50, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 50,  1,  1,  1,  1,107,
   103,  3,  3, 51, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 50,  1,  1, 51, 51, 50,
   103,  1,  1, 51, 51, 51, 51,  1,  1, 50,  1,  1, 51, 51, 50,  1,  1,  1,  1,107,
   103,  1,  1, 51, 51, 51, 51,  1,  1,  4,  1,  1, 51, 51, 50,  1,  1,  1,  1,107,
   103,  0,  0, 51, 51, 51, 50,  1,  1,  4,  1,  1, 50, 51, 50, 50, 50,  1,  1,107,
   103,  0,  0, 50, 51, 51, 50, 50, 50, 50, 50, 50, 50, 51, 51, 51, 50,  1,  1,107,
   103,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,  
   103,  0,  0,  2,  1,  1,  1,  1,  1,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,107,	
   104,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,105,
	];
	
var levelList = [levelOne, levelTwo, levelThree];
var levelNow = 0;
var trackGrid = [];
// 0 through 49 are dedicated for road tiles				
const TRACK_PLAYER = 0;
const TRACK_ROAD = 1;
const TRACK_FINISH = 2;
const TRACK_ROAD_AAA = 3;
const TRACK_ROAD_BBB = 4;
const TRACK_ROAD_CCC = 5;

// 50 through 99 are dedicated for track obstacles
const TRACK_WALL = 50;
const TRACK_GRASS = 51;
const TRACK_OIL_SLICK = 52;
const TRACK_NORTH_RAMP = 53;

// 100 through 150 are dedicated for wallSpriteSheet
const TRACK_BRICK_WALL_TOP_LEFT_END = 100;
const TRACK_BRICK_WALL_TOP_MIDDLE = 101;
const TRACK_BRICK_WALL_TOP_RIGHT_END = 102;
const TRACK_BRICK_WALL_LEFT = 103;
const TRACK_BRICK_WALL_BOT_LEFT_END = 104;
const TRACK_BRICK_WALL_BOT_MIDDLE = 105;
const TRACK_BRICK_WALL_BOT_RIGHT_END = 106;
const TRACK_BRICK_WALL_RIGHT = 107;
	// 108, and 109 are available
const TRACK_BRICK_WALL_TOP_LEFT_END_GRASS = 110;
const TRACK_BRICK_WALL_TOP_MIDDLE_GRASS = 111;
const TRACK_BRICK_WALL_TOP_RIGHT_END_GRASS = 112;
const TRACK_BRICK_WALL_LEFT_GRASS = 113;
const TRACK_BRICK_WALL_BOT_LEFT_END_GRASS = 114;
const TRACK_BRICK_WALL_BOT_MIDDLE_GRASS = 115;
const TRACK_BRICK_WALL_BOT_RIGHT_END_GRASS = 116;
const TRACK_BRICK_WALL_RIGHT_GRASS = 117;

function nextLevel() {
	levelNow++;
	if(levelNow >= levelList.length) {
		levelNow = 0;
	}
	loadLevel(levelList[levelNow]);
	//make into a list
	//updates wayPoints
	for (var i = 0; i < vehicleList.length; i++) {  	
		vehicleList[i].updateWayPoints(); 
	}
	winScreen = true;
	
}

function loadLevel(whichLevel) {	
	trackGrid = whichLevel.slice();
	for (var i = 0; i < vehicleList.length; i++) {  
		vehicleList[i].carReset(window['carPic'+(i+1)], 'Car '+(i+1), true);
	} 	
}
		
function drawTracks(){
	var trackIndex = 0;
	var trackLeftEdgeX = 0;
	var trackTopEdgeY = 0;
	var spriteSheet = roadSpriteSheet;
	
	for(var eachRow = 0; eachRow<TRACK_ROWS; eachRow++){
		
		trackLeftEdgeX = 0;
		
		for(var eachCol=0; eachCol<TRACK_COLS; eachCol++) {
			
			var trackTypeHere = trackGrid[trackIndex];
			var transparencyCheckTypeHere = trackGrid[trackIndex]
			var imageOffsetY = 0;
			if (trackTypeHere >= 0 && trackTypeHere < 50){
				spriteSheet = roadSpriteSheet;
				if (trackTypeHere > 9 && trackTypeHere <= 19){
					imageOffsetY = TRACK_H;
				} else if (trackTypeHere > 19 && trackTypeHere <= 29){
					imageOffsetY = TRACK_H * 2;
				} else if (trackTypeHere > 29 && trackTypeHere <= 39){
					imageOffsetY = TRACK_H * 3;
				} else if (trackTypeHere > 39 && trackTypeHere <= 49){
					imageOffsetY = TRACK_H * 4;
				}
			} else if (trackTypeHere >= 50 && trackTypeHere < 100){
				spriteSheet = trackobstaclesSpriteSheet;
				var trackTypeHere = trackTypeHere - 50;
				if (trackTypeHere > 9 && trackTypeHere <= 19){
					imageOffsetY = TRACK_H;
				} else if (trackTypeHere > 19 && trackTypeHere <= 29){
					imageOffsetY = TRACK_H * 2;
				} else if (trackTypeHere > 29 && trackTypeHere <= 39){
					imageOffsetY = TRACK_H * 3;
				} else if (trackTypeHere > 39 && trackTypeHere <= 49){
					imageOffsetY = TRACK_H * 4;
				}
			} else if (trackTypeHere >= 100 && trackTypeHere < 150){
				spriteSheet = wallSpriteSheet;
				var trackTypeHere = trackTypeHere - 100;
				if (trackTypeHere > 9 && trackTypeHere <= 19){
					imageOffsetY = TRACK_H;
				} else if (trackTypeHere > 19 && trackTypeHere <= 29){
					imageOffsetY = TRACK_H * 2;
				} else if (trackTypeHere > 29 && trackTypeHere <= 39){
					imageOffsetY = TRACK_H * 3;
				} else if (trackTypeHere > 39 && trackTypeHere <= 49){
					imageOffsetY = TRACK_H * 4;
				}
			}
			
			if (tileTypeHasRoadTransparency(transparencyCheckTypeHere)) {
				canvasContext.drawImage( roadSpriteSheet, 0, 0, TRACK_W, TRACK_H, trackLeftEdgeX, trackTopEdgeY, TRACK_W, TRACK_H);
			} else if (tileTypeHasgGrassTransparency(transparencyCheckTypeHere)) {
				canvasContext.drawImage( trackobstaclesSpriteSheet, 40, 0, TRACK_W, TRACK_H, trackLeftEdgeX, trackTopEdgeY, TRACK_W, TRACK_H);
			}
			
			canvasContext.drawImage( spriteSheet, trackTypeHere * TRACK_W, imageOffsetY, TRACK_W, TRACK_H, trackLeftEdgeX, trackTopEdgeY, TRACK_W, TRACK_H);

			//canvasContext.drawImage(trackPics[trackTypeHere], trackLeftEdgeX, trackTopEdgeY);
				
			trackIndex++;
			trackLeftEdgeX += TRACK_W;
				
		} // end of each col
		
		trackTopEdgeY += TRACK_H;
		
	} // end of each row
}

function tileTypeHasRoadTransparency(transparencyCheckTypeHere){
	 return (
			transparencyCheckTypeHere == TRACK_OIL_SLICK ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_LEFT_END ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_MIDDLE ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_RIGHT_END ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_LEFT_END ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_MIDDLE ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_RIGHT_END ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_LEFT ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_RIGHT	
			);
}

function tileTypeHasgGrassTransparency(transparencyCheckTypeHere){
	 return (
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_LEFT_END_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_MIDDLE_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_TOP_RIGHT_END_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_LEFT_END_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_MIDDLE_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_BOT_RIGHT_END_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_LEFT_GRASS ||
			transparencyCheckTypeHere == TRACK_BRICK_WALL_RIGHT_GRASS			
			);
}



function isWallAtTileCoord(trackTileCol, trackTileRow){
				var trackIndex = trackTileCol + TRACK_COLS*trackTileRow;
				return (trackGrid[trackIndex] == TRACK_WALL);
}

function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}			

			
function getTrackAtPixelCoord(pixelX,pixelY){
	var tileCol = pixelX / TRACK_W;		
	var tileRow = pixelY / TRACK_H;
				
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);
				
	if(tileCol < 0 || tileCol >= TRACK_COLS || tileRow < 0 || tileRow >= TRACK_ROWS) {
		return TRACK_WALL; // This returns Track Wall to prevent out of bounds as a wall.
	}
				
	var trackIndex = trackTileToIndex(tileCol, tileRow);
	return (trackGrid[trackIndex]);
}		

			
function trackTileToIndex(tileCol, tileRow) {
	return(tileCol + TRACK_COLS*tileRow);
}
			