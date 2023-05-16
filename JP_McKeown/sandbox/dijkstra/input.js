var mouseX = 0;
var mouseY = 0;
var tileOverIdx = -1;
var mouseOverSidebar = false;


function initInput() {
   document.addEventListener("mousemove", mousemoved);
   document.addEventListener("mousedown", mouseclicked);
}


function mouseclicked(evt) {
   if (mouseOverSidebar) {
      pathfindingNow = !pathfindingNow;
      if (endTile != null) {
         pathfindingNow = false;
      }
      if (pathfindingNow == false) {
         SetupPathfindingGridData();
      }
      return;
   }

   if (tileOverIdx < 0 || tileOverIdx >= tileGrid.length) { // invalid or off board
      return;
   }

   if (tileOverIdx != -1) {
      grid[tileOverIdx].wallToggle();
   }
}


function mousemoved(evt) {
   var rect = canvas.getBoundingClientRect();
   var root = document.documentElement;

   // account for the margins, canvas position on page, scroll amount, etc.
   mouseX = evt.clientX - rect.left - root.scrollLeft;
   mouseY = evt.clientY - rect.top - root.scrollTop;

   var tileOverCol = Math.floor(mouseX / TILE_W);
   var tileOverRow = Math.floor(mouseY / TILE_H);

   mouseOverSidebar = (tileOverCol >= TILE_COLS);
   if (mouseOverSidebar) {
      tileOverIdx = -1;
   } else {
      tileOverIdx = tileCoordToIndex(tileOverCol, tileOverRow);
   }
}
