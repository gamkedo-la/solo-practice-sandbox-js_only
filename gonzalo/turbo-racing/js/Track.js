const track = new (function() {
  const TILE_WIDTH = 40;
  const TILE_HEIGHT = 40;
  const COLS = 20;
  const ROWS = 15;
  const GROUND_GRID = [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ////
	1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ////
	1, 0, 0, 0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0, 4, 1, ////
	1, 3, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 1, ////
	1, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 1, ////
	1, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 1, ////
	1, 3, 4, 1, 3, 0, 0, 0, 1, 1, 1, 3, 0, 0, 0, 4, 1, 3, 4, 1, ////
	1, 3, 4, 1, 3, 0, 0, 4, 1, 1, 1, 3, 0, 0, 0, 4, 1, 3, 4, 1, ////
	1, 3, 4, 1, 3, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 4, 1, 3, 4, 1, ////
	1, 3, 4, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 3, 4, 1, ////
	1, 3, 4, 1, 3, 0, 1, 1, 3, 0, 0, 0, 4, 1, 3, 0, 5, 0, 4, 1, ////
	1, 1, 1, 1, 3, 0, 1, 1, 3, 0, 0, 0, 4, 1, 3, 0, 0, 0, 4, 1, ////
	1, 3, 2, 5, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 3, 0, 0, 0, 4, 1, ////
	1, 3, 2, 6, 6, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, ////
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];
  const OBJECT_GRID = [
	4,  4, 10,  1,  1,  1, 1,  1,  1,  1, 1, 1,  1, 1, 1, 1, 1, 1, 9, 4, ////
	4, 10, 11,  0,  6,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0,12, 9, ////
	10, 11,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
	11,  0,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
	0,  0,  0,  0,  0, 10, 1,  1,  1,  1, 1, 1,  1, 1, 1, 9, 0, 0, 0, 8, ////
	0,  0,  0, 10,  1,  9, 0,  4,  4,  4, 4, 4,  4, 4, 4,10, 9, 0, 0, 8, ////
	0,  0,  0,  8,  0, 12, 1,  1,  9,  4,10, 1,  1, 1, 1,11, 8, 0, 0, 8, ////
	0,  0,  6,  8,  0,  0, 0,  0,  8,  4, 8, 0,  0, 0, 0, 0, 8, 0, 0, 8, ////
	5,  0,  0,  5,  0,  0, 0,  0, 12,  1, 9, 0,  0, 0, 0, 0, 8, 0, 0, 8, ////
	8,  0,  0,  8,  0,  0, 5,  0,  0,  0,14, 0,  0, 5, 0, 0, 8, 0, 0, 8, ////
	8,  2,  2,  8,  0, 10, 1,  9,  0,  0, 0, 0,  0, 8, 0, 0, 5, 0, 0, 8, ////
	13,  1,  1,  5,  0,  8, 0,  8,  0,  0, 0, 6,  0, 8, 0, 0, 0, 0, 0, 8, ////
	8,  0,  0,  0,  0,  8, 4, 12,  1,  9, 0, 0, 10, 9, 0, 0, 0, 0, 0, 8, ////
	8,  0,  0,  0,  0,  8, 0,  4,  0, 12, 1, 1, 11,12, 9, 0, 0, 0,10,11, ////
	12,  1,  1,  5,  1, 11, 4,  0,  4,  4, 0, 4,  4, 4,12, 1, 1, 1,11, 0
  ];
  const GROUND_INDEX = {
	road: 0,
	offroad: 1, // grass, sand, etc. depending on skin
	goal: 2,
	roadLeftSide: 3,
	roadRightSide: 4,
	roadTopSide: 5,
	roadBottomSide: 6,
	_default: Number.MAX_SAFE_INTEGER
  };
  const OBJECT_INDEX = {
	nothing: 0,
	wall: 1,
	playerStart: 2,
	goal: 3,
	tree: 4,
	flag: 5,
	oil: 6,
	grass: 7,
	wallSide: 8,
	wallCornerNE: 9,
	wallCornerNW: 10,
	wallCornerSE: 11,
	wallCornerSW: 12,
	wallJoin: 13,
	pillar: 14,
	pillarE: 15,
	pillarW: 16,
	_default: Number.MAX_SAFE_INTEGER
  };
  const GROUND_TYPES = {
	[GROUND_INDEX.road]: {
	  tileOffset: {x: 0, y: 1},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.road]: {
	  tileOffset: {x: 0, y: 1},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadLeftSide]: {
	  tileOffset: {x: 4, y: 1},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadRightSide]: {
	  tileOffset: {x: 2, y: 1},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadTopSide]: {
	  tileOffset: {x: 3, y: 1},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadBottomSide]: {
	  tileOffset: {x: 5, y: 1},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.goal]: {
	  tileOffset: {x: 6, y: 1},
	  driveable: true,
	  onDrive: function(car) {
		document.getElementById("debugText").innerHTML = car.myName + " hit the goal line";
		takenPlayerTiles.splice(0, takenPlayerTiles.length);
		p1.carReset();
		p2.carReset();
	  }
	},
	[GROUND_INDEX.offroad]: {
	  tileOffset: {x: 0, y: 0},
	  driveable: true,
	  onDrive: (car) => {car.carSpeed /= 2;}
	},
	[GROUND_INDEX._default]: {
	  tileOffset: {x: 0, y: 1},
	  driveable: false,
	  onDrive: ()=>{}
	}
  };
  const OBJECT_TYPES = {
	[OBJECT_INDEX.nothing]: {
	  driveable: true,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.playerStart]: {
	  driveable: true,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.tree]: {
	  imageId: 'TRACK_TREE',
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.flag]: {
	  imageId: 'TRACK_FLAG',
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.oil]: {
	  imageId: 'TRACK_OIL',
	  driveable: true,
	  onDrive: (car) => {car.canSteer = false;}
	},
	[OBJECT_INDEX.wall]: {
	  imageId: 'TRACK_WALL',
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.wallSide]: {
	  imageId: 'TRACK_WALL_SIDE',
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.wallCornerNE]: {
	  imageId: 'TRACK_WALL_NE',
	  driveable: false,
	  onDrive: ()=>{},
	},
	[OBJECT_INDEX.wallCornerNW]: {
	  imageId: 'TRACK_WALL_NW',
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.wallCornerSE]: {
	  imageId: 'TRACK_WALL_SE',
	  driveable: false,
	  onDrive: ()=>{},
	},
	[OBJECT_INDEX.wallCornerSW]: {
	  imageId: 'TRACK_WALL_SW',
	  driveable: false,
	  onDrive: ()=>{},
	},
	[OBJECT_INDEX.wallJoin]: {
	  imageId: 'TRACK_WALL_JOIN',
	  driveable: false,
	  onDrive: ()=>{},
	},
	[OBJECT_INDEX.pillar]: {
	  imageId: 'TRACK_PILLAR',
	  driveable: false,
	  onDrive: ()=>{},
	},
	[OBJECT_INDEX.pillarE]: {
	  imageId: 'TRACK_PILLAR_E',
	  driveable: false,
	  onDrive: ()=>{},
	},
	[OBJECT_INDEX.pillarW]: {
	  imageId: 'TRACK_PILLAR_W',
	  driveable: false,
	  onDrive: ()=>{},
	},
	[OBJECT_INDEX._default]: {
	  imageId: 'TRACK_WALL',
	  driveable: false,
	  onDrive: ()=>{}
	}
  };
  const takenPlayerTiles = [];

  this.isDriveableCoord = function(X, Y) {
	const tileCol = Math.floor(X / TILE_WIDTH);
	const tileRow = Math.floor(Y / TILE_HEIGHT);
	const trackIndex = this.trackToTileIndex(tileCol, tileRow);
	if (tileCol < 0 || tileCol >= COLS || tileRow < 0 || tileRow >= ROWS) {
	  return GROUND_TYPES[GROUND_INDEX._default];
	}
	let groundTile = GROUND_TYPES[GROUND_GRID[trackIndex]];
	let object = OBJECT_TYPES[OBJECT_GRID[trackIndex]];
	return (groundTile.driveable && object.driveable);
  };

  this.onDrive = function(car) {
	const tileCol = Math.floor(car.carX / TILE_WIDTH);
	const tileRow = Math.floor(car.carY / TILE_HEIGHT);
	const trackIndex = this.trackToTileIndex(tileCol, tileRow);
	if (tileCol < 0 || tileCol >= COLS || tileRow < 0 || tileRow >= ROWS) {
	  GROUND_TYPES[GROUND_INDEX._default].onDrive(car);
	} else {
	  let groundTile = GROUND_TYPES[GROUND_GRID[trackIndex]];
	  groundTile.onDrive(car);
	  let object = OBJECT_TYPES[OBJECT_GRID[trackIndex]];
	  object.onDrive(car);
	}
  };

  this.trackToTileIndex = function(tileCol, tileRow) {
	return tileCol + COLS * tileRow;
  };

  this.draw = function() {
	let trackIndex = 0;
	let trackLeftEdgeX = 0;
	let trackTopEdgeY = 0;
	const groundTileSheet = imageLoader.getImage("GROUND_TILES_DEFAULT");
	for (let eachRow=0; eachRow<ROWS; eachRow++) {
	  trackLeftEdgeX = 0;
	  for (let eachCol=0; eachCol<COLS; eachCol++) {
		let groundTileHere = GROUND_TYPES[GROUND_GRID[trackIndex]];
		canvasContext.drawImage(
		  groundTileSheet,
		  groundTileHere.tileOffset.x*TILE_WIDTH,
		  groundTileHere.tileOffset.y*TILE_HEIGHT,
		  TILE_WIDTH, TILE_HEIGHT,
		  trackLeftEdgeX, trackTopEdgeY,
		  TILE_WIDTH, TILE_HEIGHT
		);
		let objectHere = OBJECT_TYPES[OBJECT_GRID[trackIndex]];
		if (objectHere.imageId) {
		  let image = imageLoader.getImage(objectHere.imageId);
		  canvasContext.drawImage(image, trackLeftEdgeX, trackTopEdgeY);
		}
		trackIndex++;
		trackLeftEdgeX += TILE_WIDTH;
	  }
	  trackTopEdgeY += TILE_HEIGHT;
	}
  };

  this.getFreePlayerTileCoord = function() {
	for(let i=0; i<OBJECT_GRID.length; i++){
	  let tileKey = OBJECT_GRID[i];
	  if(tileKey == OBJECT_INDEX.playerStart && !takenPlayerTiles.includes(i)) {
		let tileRow = Math.floor(i/COLS);
		let tileCol = i % COLS;
		let homeX = tileCol * TILE_WIDTH + 0.5*TILE_WIDTH;
		let homeY = tileRow * TILE_HEIGHT + 0.5*TILE_HEIGHT;
		takenPlayerTiles.push(i);
		return [homeX, homeY];
	  }
	}
	return [-1, -1];
  };
})();
