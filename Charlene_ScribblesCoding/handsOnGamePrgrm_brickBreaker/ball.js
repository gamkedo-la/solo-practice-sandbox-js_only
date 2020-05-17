function moveBallAngle() {
    var middle = paddleX + PADDLE_LENGTH / 2;
    ballSpeedX = ballX - middle;
}

function ballMoveHandler() {
    if (ballX > canvas.width) {
        ballSpeedX *= -1
    } else if (ballX < 0) {
        ballSpeedX *= -1
    // if ballY > canvas.height, reset the game
    } else if (ballY > paddleY - PADDLE_THICKNESS && ballY < paddleY + PADDLE_THICKNESS) {
        if (ballX > paddleX && ballX < paddleX + PADDLE_LENGTH && ballSpeedY > 0) {
            ballSpeedY *= -1;
            moveBallAngle();
        }
    } else if (ballY > canvas.height) {
        life -= 1;
        reset();
    } else if (ballY < 0) {
        ballSpeedY *= -1
    }

    ballSpeedX = Math.abs(ballSpeedX) > MAX_BALL_SPEED ? Math.sign(ballSpeedX) * MAX_BALL_SPEED : ballSpeedX;
    ballSpeedY = Math.abs(ballSpeedY) > MAX_BALL_SPEED ? ballSpeedY * MAX_BALL_SPEED : ballSpeedY;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    breakAndBounceOffBrickAtPixelCoord(ballX, ballY);
}

function moveBallAngle() {
    var middle = paddleX + PADDLE_LENGTH / 2;
    ballSpeedX = ballX - middle;
}

function drawBall() {
    canvasContext.fillStyle = 'white';
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, 10, 0, Math.PI*2, true);
    canvasContext.fill();
}