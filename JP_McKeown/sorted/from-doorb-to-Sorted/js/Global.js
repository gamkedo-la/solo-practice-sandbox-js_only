
const UNIT_PLACEHOLDER_RADIUS = 10;
const MOVE_RATE_PIXELS = 2;
const MAX_DIST_FROM_WALK_TARGET = 100;

const PLAY_AREA_MARGIN = UNIT_PLACEHOLDER_RADIUS +3;
const TOP_MARGIN = 40; // don't go in Hat zone
const BOTTOM_MARGIN = 40; // don't go in pen unless LED ?

const PEN_HEIGHT = 600;
const PEN_SIDE_GAP = 2;
const PEN_BASE_GAP = 2;
const PEN_WIDTH_LEFT = 160;
const PEN_WIDTH_RIGHT = 160;
const PEN_INNER_GAP = 160; 

const HAT_WIDTH = 16;
const HAT_HEIGHT = 20;

var keyHeld_up = false;
var keyHeld_left = false;
var keyHeld_down = false;
var keyHeld_right = false;

