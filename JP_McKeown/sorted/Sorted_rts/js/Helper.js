var pennedSheep = 0;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomRangeInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function reportFold(i) {
  document.getElementById("report").innerHTML = pennedSheep + " sheep are in one or other fold/pen."; 
}
function reportIfReachFold(i) {
  // test if in sheepfold // simpler than isInBox() because pen is lowest part of screen and not yet distinguishing between blue, red, and middle.
  if(playerUnits[i].y > canvas.height - PEN_HEIGHT) {
    if(playerUnits[i].inPen == false) {
      //console.log("Sheep id " + i + " is in the pen.");
      pennedSheep++;
      document.getElementById("report").innerHTML = pennedSheep + " sheep are in one or other fold/pen."; 
      this.enteredPen = true; // should never return to false
    }
  }
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

function rowColToArrayIndex(col, row) {
  return col + TILE_COLS * row;
}