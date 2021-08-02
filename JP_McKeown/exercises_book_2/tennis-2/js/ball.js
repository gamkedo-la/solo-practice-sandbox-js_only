function resetBall() {
    if(player1score >= _WIN_SCORE || player2score >= _WIN_SCORE) {
        gameOver = true;
        if(player1score >= _WIN_SCORE) {
            winner = 1;
        }
        if(player2score >= _WIN_SCORE) {
            winner = 2;
        }
    }
    // new serve/round
    roundHitCount = 0;
    // reverse so player scored against serves
    ballSpeedX = -ballSpeedX;
    // do not carry over spped from game
    ballSpeedY = _INIT_SPEED_Y * ( Math.random() * 2 - 1); 

    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function moveBall() {
    var deltaY; // how far from centre of paddle

    // bounce left paddle
    if(ballX < 0 + _PADDLE_INSET + _PADDLE_THICKNESS &&
       ballX > 0 + _PADDLE_INSET &&
       ballY > paddle1Y && 
       ballY < paddle1Y + _PADDLE_HEIGHT) {

        ballSpeedX *= -1;
        hitSound.play();
        hitCount++;
        speedXincreased = false;
        var paddle1Ycentre = paddle1Y + _PADDLE_HEIGHT/2;
        deltaY = ballY - paddle1Ycentre;
        ballSpeedY = deltaY * _ANGLE_ADJUST; 
    }
    
    // left edge
    if(ballX < 0) {
        scoreSound.play();
        player2score++;
        resetBall();
    }

    // bounce right paddle
    if(ballX > canvas.width - _PADDLE_INSET - _PADDLE_THICKNESS &&
       ballX < canvas.width - _PADDLE_INSET &&
       ballY > paddle2Y && 
       ballY < paddle2Y + _PADDLE_HEIGHT) {

        ballSpeedX *= -1;
        hitSound.play();
        hitCount++;
        speedXincreased = false;
        let paddle2Ycentre = paddle2Y + _PADDLE_HEIGHT/2;
        deltaY = ballY - paddle2Ycentre;
        ballSpeedY = deltaY * _ANGLE_ADJUST; 
    }

    // right edge
    if(ballX > canvas.width) {
        scoreSound.play();
        player1score++;
        resetBall();
    }

    // bounce top edge
    if(ballY < 0) {
        bounceSound.play();
        ballSpeedY *= -1;
    }
    // bounce bottom edge
    if(ballY > canvas.height) {
        bounceSound.play();
        ballSpeedY *= -1;
    }

    ballY += ballSpeedY;

    if(!speedXincreased) {
        if(hitCount == 5 || hitCount == 12) {
            if(ballSpeedX<0) {
                ballSpeedX = ballSpeedX - 2;
            } else {
                ballSpeedX = ballSpeedX + 2;
            }
            speedXincreased = true;    
        }
    }
    ballX += ballSpeedX;
}

function drawBall() {
    // colourCircle(ballX, ballY, 10, 'yellow');
    drawBitmapCenteredAtLocationWithRotation(ballPic, ballX, ballY, _NO_ANGLE);
}