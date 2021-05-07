// keyboard keycode constants, determined by printing out evt.keyCode from a key handler  
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;
const KEY_NUMBER_1 = 49;

var mouseX = 0;
var mouseY = 0;
var tileOverIdx = -1;
var mouseDragging = false;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
  document.addEventListener("mousemove", mousemoved);
  document.addEventListener("mousedown", mouseclicked);
  document.addEventListener("mouseup", mousereleased); /////
  
  p1.setupControls(KEY_UP_ARROW,KEY_RIGHT_ARROW,KEY_DOWN_ARROW,KEY_LEFT_ARROW);
}

function setKeyHoldState(thisKey, thisPlayer, setTo) {
  if(thisKey == thisPlayer.controlKeyForNorth) {
    thisPlayer.keyHeld_North = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForEast) {
    thisPlayer.keyHeld_East = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForSouth) {
    thisPlayer.keyHeld_South = setTo;
  }
  if(thisKey == thisPlayer.controlKeyForWest) {
    thisPlayer.keyHeld_West = setTo;
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, p1, true);
  //console.log(evt.keyCode);
  //console.log(evt.keyCode);
  if(evt.keyCode == KEY_NUMBER_1){
	  pathFindingDisplay = !pathFindingDisplay;
  }
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, p1, false);
}

function mouseclicked(evt) {
	if(grid[tileOverIdx].elementType != WALL) {
		startPath(tileOverIdx, p1); 
    }
}



function mousereleased(evt) {
    mouseDragging = false;
}

function mousemoved(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    // account for the margins, canvas position on page, scroll amount, etc.
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    var tileOverCol = Math.floor(mouseX / TILE_W);
    var tileOverRow = Math.floor(mouseY / TILE_H);

    mouseOverSidebar = (tileOverCol >= ROOM_COLS);
    if(mouseOverSidebar) {
        tileOverIdx = -1;
    } else {
        tileOverIdx = tileCoordToIndex(tileOverCol, tileOverRow);
    }

    if(mouseDragging && tileOverIdx != -1) { /////
      /*  if(mouseSettingWalls) { /////
            if(grid[tileOverIdx].elementType != WALL) {
               grid[tileOverIdx].wallToggle(); 
            }
        } else {
            if(grid[tileOverIdx].elementType == WALL) {
               grid[tileOverIdx].wallToggle(); 
            }
        } */
    } /////
}