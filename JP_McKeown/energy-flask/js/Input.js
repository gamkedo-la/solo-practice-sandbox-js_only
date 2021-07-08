// keyboard keycode constants
const KEY_LETTER_T = 84; // topup shields

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;
const KEY_SPACEBAR = 32;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
}

function keyPressed(evt) {
  console.log(evt.keyCode)
  if(showMenu) {
    if(evt.keyCode == KEY_SPACEBAR) {
      showMenu = false;
    }
    if(evt.keyCode == KEY_LETTER_T) {
      topupShields();
    }
  }
  evt.preventDefault(); // without this, arrow keys scroll the browser!
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

