// keyboard keycode constants

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const KEY_C = 67;
const KEY_G = 71;
const KEY_H = 72;
const KEY_L = 76;
const KEY_M = 77;
const KEY_O = 79;
const KEY_P = 80;
const KEY_R = 82;
const KEY_T = 84;

const KEY_1 = 49;
const KEY_2 = 50;
const KEY_3 = 51;
const KEY_4 = 52;
const KEY_5 = 53;
const KEY_6 = 54;
const KEY_7 = 55;
const KEY_8 = 56;
const KEY_9 = 57;

const KEY_ESC = 27;
const KEY_ENTER = 13;
const KEY_SPACE = 32;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  canvas.addEventListener('mousemove', mouseMoved);
}

function mouseMoved(evt) {
    if(gameState == STATE_REACTOR) {
        var mousePos = calculateMousePos(evt);
        col = xToCol(mousePos.x);
        row = yToRow(mousePos.y);
        document.getElementById("debugText").innerHTML = "Tile "+col+","+row+"  Pixel "+mousePos.x+","+mousePos.y;
    }
}

function keyPressed(evt) {
    var key = evt.keyCode;
    switch (gameState) {
        case STATE_MENU:
            if(key == KEY_C) {
                gameState = STATE_CREDITS;
            }
            else if(key == KEY_O) {
                gameState = STATE_OPTIONS;
            }
            else if(key == KEY_G) {
                gameState = STATE_GUIDE;
            }
            else if(key == KEY_L) {
                gameState = STATE_LEVELSELECT;
            }
            else if(key == KEY_P) {
                gameState = STATE_PATH;
            }
            else if(key == KEY_R) {
                gameState = STATE_REACTOR;
            }
            else if(key == KEY_S) {
                gameState = STATE_REACTOR;
                gameRunning = true;
            }
            break;

        case STATE_REACTOR:
            if(key == KEY_ESC || key == KEY_M) {
                gameState = STATE_MENU;
            }
            else if(key == KEY_P || key == KEY_SPACE) {
                gameState = STATE_PAUSE;
            }
            break;

        case STATE_PATH:
            if(key == KEY_ESC || key == KEY_M) {
                gameState = STATE_MENU;
                pathsDrawn = false;
            }
            break;

        case STATE_LEVELSELECT:
            if(key == KEY_ESC || key == KEY_M) {
                gameState = STATE_MENU;
                worldGrid = levelList[gameLevel];
            }
            if(key >= KEY_1 && key <= KEY_9) {
                gameLevel = 1 + key - KEY_1;
            }
            break;

        case STATE_OPTIONS:
            if(key == KEY_ESC || key == KEY_M) {
                gameState = STATE_MENU;
            }
            break;

        case STATE_CREDITS:
            if(key == KEY_ESC || key == KEY_M) {
                gameState = STATE_MENU;
            }
            break;
            
        case STATE_GUIDE:
            if(key == KEY_ESC || key == KEY_M) {
                gameState = STATE_MENU;
            }
            break;

        default:
            break;
    }
    evt.preventDefault();
}

    // if(evt.keyCode == KEY_LETTER_T) {
    //   topupShields();
    // }

function keyReleased() {
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect(), root = document.documentElement;
  // account for the margins, canvas position on page, scroll amount, etc.
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}