// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;
const FIELD_COLOR = "white";

const ENEMY_START_UNITS = 15;
var enemyUnits = [];
const PLAYER_START_UNITS = 20;
var playerUnits = [];

var allUnits = [];
var selectedUnits = [];