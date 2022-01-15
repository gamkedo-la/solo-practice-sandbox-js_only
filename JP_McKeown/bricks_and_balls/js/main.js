window.onload = function() {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    div = document.getElementById('canvas-container')
    div.appendChild(canvas);
    canvas.width = VIEW_WIDTH;
    canvas.height = GAME_HEIGHT;

    var ballLife = BALL_INIT_LIFE;
    createEveryBall();
    createEveryShield();
    createEveryMachine();

    let framesPerSecond = 30;
    setInterval(
      function() {
        moveAll();
        drawAll();
      }, 1000/framesPerSecond
    );

    initInput();
};

function createEveryBall() {
  for( var i=0; i<BALL_COUNT; i++) {
    ballList.push(new ballClass());
  }
}

function moveAll() {
    if(gameState == STATE_REACTOR) {
        // if(ballLife > 0) {
            for(var i=0;i<ballList.length;i++) {
                ballList[i].move();
            }
        //     ballLife--;
        // }
    }
}

function drawAll() {
    // blank right bar
    // drawFillRect(GAME_WIDTH,0,UI_WIDTH,GAME_HEIGHT,'black');
    document.querySelector('#state').innerText = 'State = ' + gameState;
    drawFillRect(0,0,1200,GAME_HEIGHT,'white');

    switch (gameState) {
        case STATE_LAUNCH:
                // blank main area
    drawFillRect(0,0,GAME_WIDTH,GAME_HEIGHT,'black');
            drawText('Keys to press:', GAME_WIDTH+40, 100, 'white', '18px Verdana');
            drawText('spacebar = begin', GAME_WIDTH+40, 150, 'white', '18px Verdana');
            drawText('t = topup shields', GAME_WIDTH+40, 200, 'white', '18px Verdana');
            break;
    
        case STATE_MENU:
                // blank main area
    drawFillRect(0,0,GAME_WIDTH,GAME_HEIGHT,'black');
            drawMenu();
            break;

        case STATE_OPTIONS:
                // blank main area
    drawFillRect(0,0,GAME_WIDTH,GAME_HEIGHT,'black');
            drawOptions();
            break;
        case STATE_CREDITS:
                // blank main area
    drawFillRect(0,0,GAME_WIDTH,GAME_HEIGHT,'black');
            drawCredits();
            break;
        
        case STATE_LEVELSELECT:
    drawFillRect(0,0,GAME_WIDTH,GAME_HEIGHT,'black');
            drawLevelSelector();
            break;

        case STATE_PATH:
            drawVisits();
            break;
    
        case STATE_REACTOR:
    drawFillRect(0,0,GAME_WIDTH,GAME_HEIGHT,'white');
            drawWorld();
            writeMoney();
            writeEnergy();
            
            for(var i=0;i<shieldList.length;i++) {
                shieldList[i].drawStrength();
            }
            for(var i=0;i<machineList.length;i++) {
                machineList[i].draw();
            }
            for(var i=0;i<ballList.length;i++) {
                ballList[i].draw();
            }
            if(ballLife < 1 || editMode) {
                writeEveryStrength();
            }
            break;
    }
}

function drawMenu() {
    if(!gameRunning) {
        drawText('Bricks and Balls', MENU_X, MENU_Y, HEADING_SIZE, 'white');
        drawText('Start', MENU_X, MENU_Y+80, MENU_SIZE, 'white');
    } else {
        drawText('Bricks and Balls', MENU_X, MENU_Y, HEADING_SIZE, 'orange');
        drawText('Resume', MENU_X, MENU_Y+80, MENU_SIZE, 'white');
    }   
    drawText('Level select', MENU_X, MENU_Y+140, MENU_SIZE, 'white');
    drawText('Options', MENU_X, MENU_Y+200, MENU_SIZE, 'white');
    drawText('Credits', MENU_X, MENU_Y+260, MENU_SIZE, 'white');
    // drawText('Path', MENU_X, MENU_Y+320, MENU_SIZE, 'white');
}

function drawLevelSelector() {
    drawText('Select level, click 1 to 9', MENU_X, MENU_Y, HEADING_SIZE, 'white');
    drawText('Level: ' + gameLevel, MENU_X, MENU_Y+80, MENU_SIZE, 'white');
}

function drawOptions() {
    drawText('Options', MENU_X, MENU_Y, HEADING_SIZE, 'white');
    drawText('Mute', MENU_X, MENU_Y+80, MENU_SIZE, 'white');
    drawText('Volume', MENU_X, MENU_Y+140, MENU_SIZE, 'white');
    drawText('Difficulty', MENU_X, MENU_Y+200, MENU_SIZE, 'white');
    drawText('Cheats', MENU_X, MENU_Y+260, MENU_SIZE, 'white');
}

function drawCredits() {
    drawText('Credits', MENU_X, MENU_Y, HEADING_SIZE, 'white');
    drawText('A Member: contributions described', MENU_X, MENU_Y+80, MENU_SIZE, 'white');
    drawText('A Member: contributions described', MENU_X, MENU_Y+140, MENU_SIZE, 'white');
}

function writeEveryStrength() {
  for(var i=0; i<shieldList.length; i++) {
    shieldList[i].writeStrength();
  }
}

initializeInput = function() {
}
loadImages = function() {
}