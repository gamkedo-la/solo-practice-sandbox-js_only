var unvisitedList = [];
var endTile = null;
var pathfindingNow = false;


function SetupPathfindingGridData() {
   unvisitedList = [];
   endTile = null;
   pathfindingNow = false;

   if (grid.length > 0) { // non-zero, copy over player set walls into tileGrid for reset
      for (var eachCol = 0; eachCol < TILE_COLS; eachCol++) {
         for (var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
            var idxHere = tileCoordToIndex(eachCol, eachRow);
            if (grid[idxHere].elementType == VISITED ||
               grid[idxHere].elementType == PATH) {
               tileGrid[idxHere] = NOTHING;
            } else {
               tileGrid[idxHere] = grid[idxHere].elementType;
            }
         }
      }
   }

   grid = [];

   for (var eachCol = 0; eachCol < TILE_COLS; eachCol++) {
      for (var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
         var idxHere = tileCoordToIndex(eachCol, eachRow);

         grid[idxHere] = new GridElement();
         unvisitedList.push(grid[idxHere]);
         grid[idxHere].setup(eachCol, eachRow, idxHere, tileGrid[idxHere]);
      }
   }
}


function PathfindingNextStep() {
   var tentativeDistance = 0;

   if (unvisitedList.length > 0) { //// "while Q is not empty:"
      //// "u := vertex in Q with min dist[u]"
      var currentTile = null;
      // console.log(unvisitedList.length);
      for (var i = 0; i < unvisitedList.length; i++) {
         var compareTile = unvisitedList[i];

         if (currentTile == null || compareTile.distance < currentTile.distance) {
            currentTile = compareTile;
         }
      }

      arrayRemove(unvisitedList, currentTile); //// remove u from Q

      //// "for each neighbor v of u where v has not yet been removed from Q
      var neighborsStillInUnvisitedList = currentTile.myUnvisitedNeighbors();
      for (var i = 0; i < neighborsStillInUnvisitedList.length; i++) {
         var neighborTile = neighborsStillInUnvisitedList[i];

         if (neighborTile.isTileType(NOTHING)) {
            tentativeDistance = currentTile.distance + 1;
            neighborTile.setDistIfLess(tentativeDistance, currentTile);
            neighborTile.setTile(VISITED);
         }
         else if (neighborTile.isTileType(DEST)) {
            tentativeDistance = currentTile.distance + 1;
            neighborTile.setDistIfLess(tentativeDistance, currentTile);
            endTile = neighborTile;
            unvisitedList = []; //// empty the unvisitedList since we've found the end
         }
      }
   }

   else { //// all nodes have been accounted for, work backward from end's tiles for path
      //// terminate the algorithm from taking further steps since we found what we needed
      if (endTile != null) {
         console.log("Best distance found: " + endTile.distance);

         // walk backward from destination to create the path
         var previousTile = endTile.cameFrom;

         for (var pathIndex = endTile.distance; pathIndex > 1; pathIndex--) {
            previousTile.setTile(PATH);
            previousTile = previousTile.cameFrom;
         }
      }
      pathfindingNow = false;
   }
}
