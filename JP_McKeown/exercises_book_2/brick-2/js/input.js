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
  canvas.addEventListener('mouseup', mouseUp);

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calculateMousePos(evt);
    paddleX = mousePos.x - (PADDLE_WIDTH/2); // minus half paddle height to center
    } );
}

function mouseUp(evt) {
    if (gameState == STATE_PLAY) {
    ballReady = false;
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
            else {
              gameState = STATE_PLAY;
              resetGame();
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

        default:

            break;
    }
    evt.preventDefault();
}

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