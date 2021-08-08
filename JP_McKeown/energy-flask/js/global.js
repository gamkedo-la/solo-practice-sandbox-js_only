var canvas, ctx;
var editMode = true;

const STATE_CREDITS = -8;
const STATE_OPTIONS = -7;
const STATE_GUIDE = -6;
const STATE_LAUNCH = -2;
const STATE_MENU = -1;
const STATE_PAUSE = 0;
const STATE_PLAY = 7;
const STATE_DIALOG = 1;
const STATE_SPEND = 2;
const STATE_DEPLOY = 3;
const STATE_REACTOR = 4;

let gameState = STATE_MENU;

const TILE_W = 48;
const TILE_H = 48;
const WORLD_COLS = 15;
const WORLD_ROWS = 15;

const UI_WIDTH = 300;
const GAME_WIDTH = WORLD_COLS * TILE_W;
const VIEW_WIDTH = GAME_WIDTH + UI_WIDTH;
const GAME_HEIGHT = WORLD_ROWS * TILE_H;

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

// flask position
const CENTRE_COL = 1 + WORLD_COLS / 2;
const CENTRE_ROW = 1 + WORLD_ROWS / 2;

// flask width and height equal
const FLASK_SIZE = 3;
// flask is at centre of lab
// const FLASK_LEFT = BALL_OFFSET + (GAME_WIDTH / 2) - (FLASK_SIZE / 2) * TILE_W;
// const FLASK_TOP = BALL_OFFSET + (GAME_HEIGHT / 2) - (FLASK_SIZE / 2) * TILE_H;
// flask location defined by worldGrid[]
const FLASK_LEFT = BALL_OFFSET + 7.5*TILE_W - (FLASK_SIZE / 2) * TILE_W;
const FLASK_TOP = BALL_OFFSET + 7.5*TILE_H - (FLASK_SIZE / 2) * TILE_H;

// HSL adjustment so high shield strength is bright colour and zero strength is white to look empty
const SHIELD_LIGHTNESS = 100;  
const SHIELD_COUNT = 16;
var shieldList = [];
const SHIELD_WALL_INIT_STRENGTH = 40;
const SHIELD_CORNER_INIT_STRENGTH = 5;

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
