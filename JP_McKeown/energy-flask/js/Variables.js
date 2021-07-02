// canvas dimensions
var canvas, ctx;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// developer tools
var editor = true;
var mouseBrickMode = true;  // hover shows tile ID, col, row
var mouseBallMode = false;  // mouse repositions ball

var mouseX, mouseY;

// UI
const TILED_LEFT = 0;
const TILED_RIGHT = 600;

//const LAB
// tiles 
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;
const TILE_GAP = 2;
const GUTTER = 0;
const TILE_W = TILE_WIDTH - TILE_GAP;
const TILE_H = TILE_HEIGHT - TILE_GAP;

const TILE_COLS = TILED_RIGHT / TILE_WIDTH;
const TILE_ROWS = GAME_HEIGHT / TILE_HEIGHT;
const TILES = TILE_ROWS * TILE_COLS;

// flask
const TILED_CENTRE_COL = 1+ TILE_COLS /2;
const TILED_CENTRE_ROW = 1+ TILE_ROWS /2;
//assume flask width and height equal
const FLASK_SIZE = 5;

var tileGrid = new Array(TILES);
var tilesRemain;

const MAX_TILE_STRENGTH = 5;
const TILE_STRENGTH_COLOR = ['#000000', '#323232', '#565656', '#909090', '#c8c8c8', '#ffffff'];

// ball
const BALL_START_X = 300;
const BALL_START_Y = 300;
var ballSize = 10;
// var ballX = BALL_START_X;
// var ballY = BALL_START_Y; 
var ballSpeedX = 2, ballSpeedY = 1; 

// console.log('c' + TILE_COLS + ' r' + TILE_ROWS)