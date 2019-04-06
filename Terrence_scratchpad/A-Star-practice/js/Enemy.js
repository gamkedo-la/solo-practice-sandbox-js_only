const ENEMY_RUN_SPEED = 5.5;
var enemyX;
var enemyY;

function enemyMove() {
	
}

function enemyDraw() {
	colorCircle(enemyX, enemyY, 10, 'violet');
}

function enemyReset() {
	// center slider on screen
	enemyX = 100;
	enemyY = 100;
}