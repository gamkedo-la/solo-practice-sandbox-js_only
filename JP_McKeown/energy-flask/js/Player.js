function ballPaddleHandling() {
    var paddleTopEdgeY = canvas.height - PADDLE_THICKNESS - BELOW_PADDLE;
    var paddleLowEdgeY = canvas.height - BELOW_PADDLE;
    var paddleRightEdge = paddleX + PADDLE_SIZE;
  
    if(ballY > paddleTopEdgeY && ballY < paddleLowEdgeY && 
      ballX > paddleX && ballX < paddleRightEdge) {
      ballSpeedY *= -1;
  
      var centrePaddleX = paddleX + PADDLE_SIZE/2;
      var ballDistanceFromPaddleCentre = ballX - centrePaddleX;
      ballSpeedX = ballDistanceFromPaddleCentre * 20 / PADDLE_SIZE;
  
      if(tilesRemain == 0) {
        tileReset();
      }
    }  // ball (centre) within paddle
}