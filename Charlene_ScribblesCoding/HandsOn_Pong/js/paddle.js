function moveComputerPaddle() {
    var middle = paddle2Y + PADDLE_HEIGHT / 2;
    
    if (ballY > middle + 25) {
      paddle2Y += 8;
    } else if (ballY < middle - 25) {
      paddle2Y -= 8;
    }
  }