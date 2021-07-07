var GAME_STATE = 'before_launch';
var canvas, ctx;

const TILE_W = 48;
const TILE_H = 48;
const WORLD_COLS = 15;
const WORLD_ROWS = 15;

const GAME_WIDTH = WORLD_COLS * TILE_W;
const GAME_HEIGHT = WORLD_ROWS * TILE_H;

// energy particles
const BALL_COUNT = 12;
const BALL_RADIUS = 5;
const BALL_OFFSET = BALL_RADIUS + 2;  // avoid overlap with shield tile
const BALL_COLOUR = 'red';

var ballList = [];

// flask position
const CENTRE_COL = 1 + WORLD_COLS / 2;
const CENTRE_ROW = 1 + WORLD_ROWS / 2;

// flask width and height equal
const FLASK_SIZE = 3;
// flask is at centre of lab
const FLASK_LEFT = BALL_OFFSET + (GAME_WIDTH / 2) - (FLASK_SIZE / 2) * TILE_W;
const FLASK_TOP = BALL_OFFSET + (GAME_HEIGHT / 2) - (FLASK_SIZE / 2) * TILE_H;

// HSL adjustment so high shield strength is bright colour and zero strength is white to look empty
const SHIELD_LIGHTNESS = 100;  

