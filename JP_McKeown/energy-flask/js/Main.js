window.onload = function() {
    
    canvas = document.createElement('canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
  
    // render display
    var framesPerSecond = 30;
    setInterval(function() {
        moveAll();
        drawAll();
      }, 1000/framesPerSecond);
  
    canvas.addEventListener('mousemove', updateMousePos);

    tileReset();
    ballReset();
    // createEveryBall();
}
    
function moveAll() {
    ballMove();
    ballBrickHandling();
} 
  
function drawAll() {
    // clear screen
    colorRect(0, 0, GAME_WIDTH, GAME_HEIGHT, 'black'); 
    
    // draw ball
    colorCircle(ballX, ballY, ballSize, 'yellow');
  
    drawTiles();
    drawUI();
  
    if(mouseBrickMode) {
      // write mouse label
      var mouseTileCol = Math.floor(mouseX / TILE_WIDTH);
      var mouseTileRow = Math.floor(mouseY / TILE_HEIGHT);

      // only show if within tiled area
      if(mouseTileCol < TILE_COLS) {
        var tileIndexMouse = colRowTileIndex(mouseTileCol, mouseTileRow);
        colorText(mouseTileCol + ',' + mouseTileRow + ': ' + tileIndexMouse + ' s' + tileGrid[tileIndexMouse], mouseX, mouseY, 'red'); 
      }
    }
    colorText('UI here',640,100,'yellow');
}