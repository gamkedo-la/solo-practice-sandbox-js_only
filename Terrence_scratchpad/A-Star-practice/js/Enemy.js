const ENEMY_RUN_SPEED = 4;
var enemyX;
var enemyY;

function enemyMove() {
	var x = 0;
	var y = 1;

	if (currentPath.length === 0) {
		enemyTilePosition = pixelCoordToWorldTilePos(enemyX, enemyY);
		playerTilePosition = pixelCoordToWorldTilePos(sliderX, sliderY);

		pathStart = [enemyTilePosition.x, enemyTilePosition.y];
		pathEnd = [playerTilePosition.x, playerTilePosition.y];

		currentPath = findPath(world,pathStart,pathEnd);
	}

	var enemyWorldTilePosition = pixelCoordToWorldTilePos(enemyX, enemyY);

	if (enemyWorldTilePosition.x === currentPath[0][x] && 
		enemyWorldTilePosition.y === currentPath[0][y]) {
		currentPath.shift();
	} else {
		var destinationX = WorldTilePosToCenteredTileCoord(currentPath[0][x]);
		var destinationY = WorldTilePosToCenteredTileCoord(currentPath[0][y]);

		if (enemyX < destinationX - ENEMY_RUN_SPEED) {
			enemyX += ENEMY_RUN_SPEED;
		} else if (enemyX > destinationX + ENEMY_RUN_SPEED) {
			enemyX += -ENEMY_RUN_SPEED;
		}

		if (enemyY < destinationY - ENEMY_RUN_SPEED) {
			enemyY += ENEMY_RUN_SPEED;
		} else if (enemyY > destinationY + ENEMY_RUN_SPEED) {
			enemyY += -ENEMY_RUN_SPEED;
		}
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