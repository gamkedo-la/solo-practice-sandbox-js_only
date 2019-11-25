function mousemoveHandler(evt) {
    if (!isGameOver) {
      var mousePos = calcMousePos(evt);
      // ballHitPaddleSound.play();
      paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    }
}

function dblclickHandler() {
    if (isGameOver) {
      if (playerSP > compSP) {
        ballSpeedX = 6;
        ballSpeedY = 6;            
      } else {
        ballSpeedX = -6;
        ballSpeedY = -6;
      }

      playerSP = 0;
      compSP = 0;
      paddle1Y = 250;
      paddle2Y = 250;         
      
      isGameOver = false;
    }
}