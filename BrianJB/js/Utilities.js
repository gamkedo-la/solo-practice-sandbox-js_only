function getPixelCoordFromAngleAndSpeed(startingX, startingY, angle, speed) {
    var newX = startingX + Math.cos(angle) * speed;
    var newY = startingY + Math.sin(angle) * speed;
    return [newX, newY];
}

function isWallTileAtPixelCoord(pixelX, pixelY) {

    var levelTileCol = colAtXCoord(pixelX);
    var levelTileRow = rowAtYCoord(pixelY);

    if (levelTileCol < 0 || levelTileCol >= MAP_NUM_COLS || levelTileRow < 0 || levelTileRow >= MAP_NUM_ROWS) {
        return false;
    }

    return isWallTileAtLevelTileCoord(levelTileCol, levelTileRow);
}

function colAtXCoord(pixelX) {
    return Math.floor(pixelX / TILE_SIZE);
}

function rowAtYCoord(pixelY) {
    return Math.floor(pixelY / TILE_SIZE);
}

function isWallTileAtLevelTileCoord(levelTileCol, levelTileRow) {
    var levelTileIndex = levelTileIndexAtColRowCoord(levelTileCol, levelTileRow);
    return (grid.grid[levelTileIndex] === GRID_WALL);
}

function levelTileIndexAtColRowCoord(tileCol, tileRow) {
    return (tileCol + MAP_NUM_COLS * tileRow);
}