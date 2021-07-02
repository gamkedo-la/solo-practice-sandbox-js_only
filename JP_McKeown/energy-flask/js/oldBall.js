function ballReset() {
  ballX = BALL_START_X;
  ballY = BALL_START_Y;
}
  
function ballMove() {
    ballX += ballSpeedX; // move ball horizontal 
    ballY += ballSpeedY; // move ball vertical
  
    if(ballX < 0 && ballSpeedX < 0.0) { // left edge
      ballSpeedX *= -1; // reverse ball's horizontal direction
    }
    
    if(ballX > GAME_WIDTH && ballSpeedX > 0.0) { // right edge
      ballSpeedX *= -1; 
    }
  
    if(ballY < 0 && ballSpeedY < 0.0) { // if ball has moved beyond the top edge
      ballSpeedY *= -1; 
    }
    
    if(ballY > GAME_HEIGHT) { // if ball has moved beyond the bottom edge
      ballReset();
      tileReset();
    }
}
  
function ballBrickHandling() {
    // get col, row, and index of tile under ball
    var ballTileCol = Math.floor(ballX / TILE_WIDTH);
    var ballTileRow = Math.floor(ballY / TILE_HEIGHT);
    var ballTileIndex = colRowTileIndex(ballTileCol, ballTileRow);

    let tileStrength = tileGrid[ballTileIndex];
    
    // console.log('c' + ballTileCol + ', r' + ballTileRow + ', i' + ballTileIndex + ', s' + tileStrength + ' x' + ballX + ', y' + ballY);

    // stop bug when ball slightly off-screen by using cols and rows
    if(ballTileCol >= 0 && ballTileCol < TILE_COLS && 
      ballTileRow >= 0 && ballTileRow < TILE_ROWS) {
      
      if(isTileAtColRow(ballTileCol, ballTileRow)) {
  
        // ball damages tile, and if 0 strength is destroyed
        tileGrid[ballTileIndex]--;  
        if(tileStrength == 0) {
          tilesRemain--;
        }
  
        var prevBallX = ballX - ballSpeedX;
        var prevBallY = ballY - ballSpeedY;
        var prevTileCol = Math.floor(prevBallX / TILE_WIDTH);
        var prevTileRow = Math.floor(prevBallY / TILE_HEIGHT);
        var bothTestsFailed = true;
  
        // if corner both below will be true
        // hits vertical side
        if(prevTileCol != ballTileCol) {
          if(isTileAtColRow(prevTileCol, ballTileRow) == false) {
            ballSpeedX *= -1; 
            var bothTestsFailed = false;
          }     
        }
        // hits horizontal face
        if(prevTileRow != ballTileRow) {
          if(isTileAtColRow(ballTileCol, prevTileRow) == false) {
            ballSpeedY *= -1; 
            var bothTestsFailed = false;
          }
        }
        // corner armpit case, make ball bounce back
        if(bothTestsFailed) {
          ballSpeedX *= -1; 
          ballSpeedY *= -1; 
          // tile protected on side and face
          // tileGrid[ballTileIndex] = true;
          // or also remove other two tiles 
        }
      }  // tile present
    }  // in wall area
}
  
