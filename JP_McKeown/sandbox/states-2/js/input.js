function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    canvas.addEventListener('mousedown', mouseClicked);
    canvas.addEventListener('mousemove', mouseMoved);
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
            else if(key == KEY_S) {
                gameState = STATE_PLAY;
            }
            break;
        case STATE_PLAY:
            if(key == KEY_ESC) {
                gameState = STATE_MENU;
            }
            break;    
        case STATE_GUIDE:
            if(key == KEY_ESC) {
                gameState = STATE_MENU;
            }
            break;    
        case STATE_OPTIONS:
            if(key == KEY_ESC) {
                gameState = STATE_MENU;
            }
            break;    
        case STATE_CREDITS:
            if(key == KEY_ESC) {
                gameState = STATE_MENU;
            }
            break;    
        default:
            break;
    }
    evt.preventDefault();
  }

  function keyReleased() {}
  function mouseClicked() {}
  function mouseMoved() {}
  