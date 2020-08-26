const track = new (function() {
  const TILE_WIDTH = 40;
  const TILE_HEIGHT = 40;
  const COLS = 20;
  const ROWS = 15;
  const MAPS = [
	{
	  theme: "default",
	  ground: [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ////
		1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ////
		1, 0, 0, 0,14, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,13, 0, 4,32, ////
		30, 3, 0,14,10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9,13, 4, 1, ////
		32, 3,14,10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 1, ////
		1, 3, 4, 1, 1,30,30,30,30,30,30,30,30,30,30,30, 1, 3, 4, 1, ////
		1, 3, 4, 1, 3, 0, 0, 0, 1, 1, 1, 3, 0, 0, 0, 4, 1, 3, 4, 1, ////
		1, 3, 4, 1, 3, 0, 0, 4, 1, 1, 1, 3, 0, 0, 0, 4, 1, 3, 4, 1, ////
		1, 3, 4, 1, 3, 0, 0,16, 5, 0, 1, 3, 0, 0, 0, 4, 1, 3, 4, 1, ////
		1, 3, 4, 1, 3,14, 6, 6,13,16, 5,15,14, 6,13, 4, 1, 3, 4, 1, ////
		1, 3, 4, 1, 3, 4, 1, 1, 3, 0, 0, 0, 4, 1, 3,16, 5,15, 4, 1, ////
		1, 1, 1, 1, 3, 4,30,32, 3, 0, 0, 0, 4, 1, 3, 0, 0, 0, 4, 1, ////
		30, 3, 2, 5,15, 4, 1, 1, 1, 0, 0, 0, 0, 1, 3, 0, 0, 0, 4, 1, ////
		1, 3, 2, 6, 6,10, 1,31,30,30, 1, 1,30,30, 0, 0, 0, 0, 0, 1, ////
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,31,30, 1, 1, 1,30,32
	  ],
	  objects: [
		4,  4, 10,  1,  1,  1, 1,  1,  1,  1, 1, 1,  1, 1, 1, 1, 1, 1, 9, 4, ////
		4, 10, 11,  0,  6,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0,12, 9, ////
		10, 11, 0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		11,  0, 0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
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
	  ]
	},
	{
	  theme: "night",
	  ground: [
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ////
		1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, ////
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, ////
		1, 9, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,10, 1, ////
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
	  ],
	  objects: [
		 4,  4, 10,  1,  1,  1, 1,  1,  1,  1, 1, 1,  1, 1, 1, 1, 1, 1, 9, 4, ////
		 4, 10, 11,  0,  6,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0,12, 9, ////
		10,11, 0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  0, 0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  0,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  0,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  0,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  0,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  0,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  0,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  2,  2,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  0,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  0,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 8, ////
		8,  0,  0,  0,  0,  0, 0,  0,  0,  0, 0, 0,  0, 0, 0, 0, 0, 0,10,11, ////
		12, 1,  1,  1,  1,  1, 1,  1,  1,  1, 1, 1,  1, 1, 1, 1, 1, 1,11, 0
	  ]
	}
  ];
  let currentMapIndex = 0;
  const GROUND_INDEX = {
	road: 0,
	offroad: 1, // grass, sand, etc. depending on skin
	goal: 2,
	roadLeftSide: 3,
	roadRightSide: 4,
	roadTopSide: 5,
	roadBottomSide: 6,
	roadBothSidesHorizontal: 7,
	roadBothSidesVertical: 8,
	roadCornerSW: 9,
	roadCornerSE: 10,
	roadCornerNW: 11,
	roadCornerNE: 12,
	roadJointSW: 13,
	roadJointSE: 14,
	roadJointNW: 15,
	roadJointNE: 16,
	roadJointSWSE: 17,
	roadJointSWNW: 18,
	roadJointSWNE: 19,
	roadJointSENE: 20,
	roadJointNWSE: 21,
	roadJointNWNE: 22,
	roadJointALL: 23,
	offRoadWallShade: 30,
	offRoadWallShadeWest: 31,
	offRoadWallShadeEast: 32,
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
	[GROUND_INDEX.roadBothSidesVertical]: {
	  tileOffset: {x: 0, y: 6},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadBothSidesHorizontal]: {
	  tileOffset: {x: 1, y: 1},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadCornerSW]: {
	  tileOffset: {x: 3, y: 0},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadCornerSE]: {
	  tileOffset: {x: 2, y: 0},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadCornerNE]: {
	  tileOffset: {x: 4, y: 0},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadCornerNW]: {
	  tileOffset: {x: 5, y: 0},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	
	[GROUND_INDEX.roadJointSW]: {
	  tileOffset: {x: 0, y: 2},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadJointSE]: {
	  tileOffset: {x: 1, y: 2},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadJointNE]: {
	  tileOffset: {x: 2, y: 2},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.roadJointNW]: {
	  tileOffset: {x: 3, y: 2},
	  driveable: true,
	  onDrive: (car)=>{car.canSteer = true;}
	},
	[GROUND_INDEX.goal]: {
	  tileOffset: {x: 6, y: 1},
	  driveable: true,
	  onDrive: function(car) {
		document.getElementById("debugText").innerHTML = car.myName + " hit the goal line";
		resetRace();
	  }
	},
	[GROUND_INDEX.offroad]: {
	  tileOffset: {x: 0, y: 0},
	  driveable: true,
	  onDrive: (car) => {car.driveOffRoad();}
	},
	[GROUND_INDEX.offRoadWallShade]: {
	  tileOffset: {x: 1, y: 0},
	  driveable: true,
	  onDrive: (car) => {car.driveOffRoad();}
	},
	[GROUND_INDEX.offRoadWallShadeEast]: {
	  tileOffset: {x: 7, y: 0},
	  driveable: true,
	  onDrive: (car) => {car.driveOffRoad()}
	},
	[GROUND_INDEX.offRoadWallShadeWest]: {
	  tileOffset: {x: 8, y: 0},
	  driveable: true,
	  onDrive: (car) => {car.driveOffRoad()}
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
	  tileOffset: {x: 2, y: 0},
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.flag]: {
	  tileOffset: {x: 0, y: 0},
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.oil]: {
	  tileOffset: {x: 1, y: 0},
	  driveable: true,
	  onDrive: (car) => {car.canSteer = false;}
	},
	[OBJECT_INDEX.wall]: {
	  tileOffset: {x: 1, y: 1},
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.wallSide]: {
	  tileOffset: {x: 4, y: 1},
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.wallCornerNE]: {
	  tileOffset: {x: 3, y: 1},
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.wallCornerNW]: {
	  tileOffset: {x: 0, y: 1},
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.wallCornerSE]: {
	  tileOffset: {x: 3, y: 2},
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.wallCornerSW]: {
	  tileOffset: {x: 0, y: 2},
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.wallJoin]: {
	  tileOffset: {x: 2, y: 1},
	  driveable: false,
	  onDrive: ()=>{}
	},
	[OBJECT_INDEX.pillar]: {
	  tileOffset: {x: 4, y: 2},
	  driveable: false,
	  onDrive: ()=>{},
	},
	[OBJECT_INDEX.pillarE]: {
	  tileOffset: {x: 2, y: 2},
	  driveable: false,
	  onDrive: ()=>{},
	},
	[OBJECT_INDEX.pillarW]: {
	  tileOffset: {x: 2, y: 1},
	  driveable: false,
	  onDrive: ()=>{},
	},
	[OBJECT_INDEX._default]: {
	  imageId: 'TRACK_WALL',
	  driveable: true,
	  onDrive: ()=>{}
	}
  };
  const takenPlayerTiles = [];
  let currentTheme = THEMES[MAPS[currentMapIndex].theme];

  this.flipTheme = function() {
	if (currentTheme != THEMES.default) {
	  currentTheme = THEMES.default;
	} else {
	  currentTheme = THEMES.night;
	}
  };

  this.prevMap = function() {
	if (--currentMapIndex < 0) {
	  currentMapIndex = MAPS.length - 1;
	}
	this.setTheme(MAPS[currentMapIndex].theme);
	resetRace();
  };

  this.nextMap = function() {
	if (++currentMapIndex >= MAPS.length) {
	  currentMapIndex = 0;
	}
	this.setTheme(MAPS[currentMapIndex].theme);
	resetRace();
  };

  this.setTheme = function(themeId) {
	currentTheme = THEMES[themeId];
  };

  this.isDriveableCoord = function(X, Y) {
	const tileCol = Math.floor(X / TILE_WIDTH);
	const tileRow = Math.floor(Y / TILE_HEIGHT);
	const trackIndex = this.trackToTileIndex(tileCol, tileRow);
	if (tileCol < 0 || tileCol >= COLS || tileRow < 0 || tileRow >= ROWS) {
	  return GROUND_TYPES[GROUND_INDEX._default];
	}
	let groundTile = GROUND_TYPES[MAPS[currentMapIndex].ground[trackIndex]];
	let object = OBJECT_TYPES[MAPS[currentMapIndex].objects[trackIndex]];
	return (groundTile.driveable && object.driveable);
  };

  this.onDrive = function(car) {
	const tileCol = Math.floor(car.carX / TILE_WIDTH);
	const tileRow = Math.floor(car.carY / TILE_HEIGHT);
	const trackIndex = this.trackToTileIndex(tileCol, tileRow);
	if (tileCol < 0 || tileCol >= COLS || tileRow < 0 || tileRow >= ROWS) {
	  GROUND_TYPES[GROUND_INDEX._default].onDrive(car);
	} else {
	  let groundTile = GROUND_TYPES[MAPS[currentMapIndex].ground[trackIndex]];
	  groundTile.onDrive(car);
	  let object = OBJECT_TYPES[MAPS[currentMapIndex].objects[trackIndex]];
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
	const groundTileSheet = imageLoader.getImage(currentTheme.ground);
	const objectTileSheet = imageLoader.getImage(currentTheme.objects);
	for (let eachRow=0; eachRow<ROWS; eachRow++) {
	  trackLeftEdgeX = 0;
	  for (let eachCol=0; eachCol<COLS; eachCol++) {
		let groundTileHere = GROUND_TYPES[MAPS[currentMapIndex].ground[trackIndex]];
		canvasContext.drawImage(
		  groundTileSheet,
		  groundTileHere.tileOffset.x*TILE_WIDTH,
		  groundTileHere.tileOffset.y*TILE_HEIGHT,
		  TILE_WIDTH, TILE_HEIGHT,
		  trackLeftEdgeX, trackTopEdgeY,
		  TILE_WIDTH, TILE_HEIGHT
		);
		if (!(MAPS[currentMapIndex].objects[trackIndex] == OBJECT_INDEX.nothing || MAPS[currentMapIndex].objects[trackIndex] == OBJECT_INDEX.playerStart || MAPS[currentMapIndex].objects[trackIndex] == OBJECT_INDEX.goal || MAPS[currentMapIndex].objects[trackIndex] == OBJECT_INDEX._default)) {
		  let objectHere = OBJECT_TYPES[MAPS[currentMapIndex].objects[trackIndex]];
		  canvasContext.drawImage(
			objectTileSheet,
			objectHere.tileOffset.x*TILE_WIDTH,
			objectHere.tileOffset.y*TILE_HEIGHT,
			TILE_WIDTH, TILE_HEIGHT,
			trackLeftEdgeX, trackTopEdgeY,
			TILE_WIDTH, TILE_HEIGHT
		  );
		}
		trackIndex++;
		trackLeftEdgeX += TILE_WIDTH;
	  }
	  trackTopEdgeY += TILE_HEIGHT;
	}
  };

  this.getFreePlayerTileCoord = function() {
	for(let i=0; i<MAPS[currentMapIndex].objects.length; i++){
	  let tileKey = MAPS[currentMapIndex].objects[i];
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

  function resetRace() {
	takenPlayerTiles.splice(0, takenPlayerTiles.length);
	p1.carReset();
	p2.carReset();
	raceTime = 0;
  }
})();
