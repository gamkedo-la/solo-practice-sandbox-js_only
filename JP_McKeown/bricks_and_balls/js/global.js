var canvas, ctx;
let gameRunning = false;
var editMode = true;
let pathsDrawn = false;
let gameLevel = 0;

const STATE_CREDITS = -8;
const STATE_OPTIONS = -7;
const STATE_GUIDE = -6;
const STATE_PATH = -5;
const STATE_LEVELSELECT = -2;
const STATE_LAUNCH = -1;
const STATE_MENU = 0;
const STATE_PLAY = 7;
const STATE_DIALOG = 1;
const STATE_SPEND = 2;
const STATE_DEPLOY = 3;
const STATE_REACTOR = 4;

let gameState = STATE_MENU;

// energy particles
const BALL_COUNT = 12;
const BALL_RADIUS = 5;
const BALL_OFFSET = BALL_RADIUS + 2;  // avoid overlap with shield tile
const BALL_INIT_COLOUR = 'red';
var ballColour= BALL_INIT_COLOUR;
const BALL_INIT_SPEED = 7.0;

const BALL_INIT_LIFE = 480;
var ballLife = 0;
var ballList = [];

let WORLD_COLS, WORLD_ROWS;
let worldShape = 'rectangle'; 
WORLD_COLS = 15;
WORLD_ROWS = 10;

const TILES = WORLD_COLS * WORLD_ROWS;

const TILE_W = 48;
const TILE_H = 48;
const UI_WIDTH = 300;
const GAME_WIDTH = WORLD_COLS * TILE_W;
const VIEW_WIDTH = GAME_WIDTH + UI_WIDTH;
const GAME_HEIGHT = WORLD_ROWS * TILE_H;

let FLASK_LEFT, FLASK_TOP, FLASK_SIZE;

if(worldShape == '15square'){
// flask position
const CENTRE_COL = 1 + WORLD_COLS / 2;
const CENTRE_ROW = 1 + WORLD_ROWS / 2;

// flask width and height equal
FLASK_SIZE = 3;
FLASK_LEFT = 0; 
FLASK_TOP = 100; 
} else {
    FLASK_SIZE = 2;
 FLASK_LEFT = 0; 
 FLASK_TOP = 100; 
}

var machineList = [];

// HSL adjustment so high shield strength is bright colour and zero strength is white to look empty
const SHIELD_LIGHTNESS = 100;  
const SHIELD_COUNT = 16;
var shieldList = [];
const SHIELD_WALL_INIT_STRENGTH = 4;
const SHIELD_CORNER_INIT_STRENGTH = 1;

const MONEY_INIT = 100;
var money = MONEY_INIT;
var ENERGY_INIT = 0;
var energy = ENERGY_INIT;
var energyUsed = 0;
var energyGained = 0;

const MENU_X = 100;
const MENU_Y = 100;

const HEADING_SIZE = 48;
const MENU_SIZE = 32;
const HUD_SIZE = 18;
const LABEL_SIZE = 12;
