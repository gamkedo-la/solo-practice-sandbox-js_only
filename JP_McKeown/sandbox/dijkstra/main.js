var canvas, canvasContext;

window.onload = function() {
   canvas = document.getElementById('gameCanvas');
   canvasContext = canvas.getContext('2d');

   initInput();

   SetupPathfindingGridData();

   var framesPerSecond = 30;
   setInterval(drawEverything, 1000 / framesPerSecond);
};


function drawEverything() {
   if (pathfindingNow) {
      PathfindingNextStep();
   }

   colorRect(0, 0, canvas.width, canvas.height, 'black');

   canvasContext.textAlign = "center";

   canvasContext.font = "12px Arial"; // smaller text for grid
   drawTiles();
   canvasContext.font = "12px Arial";

   canvasContext.textAlign = "left";
   canvasContext.fillStyle = 'white';
   var rightAreaX = TILE_W * TILE_COLS;
   var lineSkip = 30;
   var lineY = 28;
   canvasContext.fillText("Click map square to toggle wall", rightAreaX, lineY);
   lineY += lineSkip;
   canvasContext.fillText("Click this sidebar for pathfinding", rightAreaX, lineY);
   if (pathfindingNow) {
      lineY += lineSkip;
      canvasContext.fillText("DOING PATHFINDING...", rightAreaX, lineY);
   }
}
