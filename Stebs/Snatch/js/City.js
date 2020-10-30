const ISO_GRID_W = 3;
const ISO_GRID_H = ISO_GRID_W / 2;
const ISO_TILE_GROUND_Y = 35;
const ISO_TILE_DRAW_W = 50;
const ISO_TILE_DRAW_H = 50;
const ROOM_W = 50;
const ROOM_H = ROOM_W;
const ROOM_COLS = 40;
const ROOM_ROWS = 30;

var isoDrawX = 0;
var isoDrawY = 0;

var sharedAnimCycle = 0;

var myAn = 
[
	1,0,1,
	1,0,1,
	1,0,1,
	1,0,1,
	1,0,1,
	1,0,1,
	1,0,1,
	1,0,1,
	1,0,1,
	1,0,1
];

//Tile number associations
const TILE_NORTH_SOUTH_TWO_LANE_ROAD = 0;
const TILE_SIDEWALK = 1;