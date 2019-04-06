const ENEMY_RUN_SPEED = 5.5;
var enemyX;
var enemyY;

function enemyMove() {
	var nextX = enemyX;
	var nextY = enemyY;

	if(holdLeft) {
		nextX += -ENEMY_RUN_SPEED;
	}
	if(holdRight) {
		nextX += ENEMY_RUN_SPEED;
	}
	if(holdUp) {
		nextY += -ENEMY_RUN_SPEED;
	}
	if(holdDown) {
		nextY += ENEMY_RUN_SPEED;
	}

	if(isBrickAtPixelCoord(nextX,nextY) == false) {
		enemyX = nextX;
		enemyY = nextY;
	}
}

function enemyDraw() {
	colorCircle(enemyX, enemyY, 10, 'violet');
}

function enemyReset() {
	// center slider on screen
	enemyX = 100;
	enemyY = 100;
}