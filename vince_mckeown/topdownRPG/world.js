const TILE_W = 32;
const TILE_H = 32;
const TILE_COLS = 25;
const TILE_ROWS = 19;
const GRID_HEIGHT = TILE_H * TILE_COLS;
const GRID_WIDTH = TILE_W * TILE_ROWS; 

// Background grid (visual representation)
var backgroundGrid = [
[0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0],
[0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0],
[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Collision grid (1 = blocked, 0 = walkable)
var collisionGrid = [
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const TILE_GRASS = 0;
const TILE_WALL = 1;
const TILE_ROAD = 2;
const TILE_FLOOR = 3;
const TILE_TREE = 4;

// Function to check if a tile is walkable
function isWalkable(x, y) {
    let col = Math.floor(x / TILE_W);
    let row = Math.floor(y / TILE_H);

    // Ensure we're within grid bounds
    if (row < 0 || row >= TILE_ROWS || col < 0 || col >= TILE_COLS) {
        return false; // Treat out-of-bounds as unwalkable
    }

    return collisionGrid[row][col] === 0;
}

// Function to handle player movement
function movePlayer(dx, dy) {
    let newX = player.x + dx;
    let newY = player.y + dy;

    if (isWalkable(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }
}

// Drawing 
let cachedBackgroundGrid = []; // Store precomputed tile properties
let backgroundNeedsUpdate = true; // Flag to track updates

function precomputeBackground() {
    cachedBackgroundGrid = []; // Reset cache

    for (let row = 0; row < TILE_ROWS; row++) {
        cachedBackgroundGrid[row] = []; // Initialize row

        for (let col = 0; col < TILE_COLS; col++) {
            let tileType = backgroundGrid[row][col];

            // Get tile properties based on connectors first
            let result = checkTileTypeForConnectors(tileType, col, row);

            // If no connector adjustments, check for randomization
            if (!result) {
                result = checkTileTypeForRandomization(tileType);
            }

            // Fallback to default if still undefined
            let { sX = 0, sY = 0 } = result || {};

            // Store computed data in the cache
            cachedBackgroundGrid[row][col] = { sX, sY, tileType };
        }
    }

    backgroundNeedsUpdate = false; // Reset update flag after computing
}

function drawBackground() {
    if (backgroundNeedsUpdate) {
        precomputeBackground(); // Only update if needed
    }

    for (let row = 0; row < TILE_ROWS; row++) {
        for (let col = 0; col < TILE_COLS; col++) {
            let { sX, sY, tileType } = cachedBackgroundGrid[row][col];
            drawImageTile(row, col, sX, sY, tileType);
        }
    }
}

// Call this whenever backgroundGrid changes
function updateBackground() {
    backgroundNeedsUpdate = true;
}


function checkTileTypeForConnectors(tileType, x, y) {
    if (tileType !== TILE_ROAD) return null;

    const above = y > 0 && backgroundGrid[y - 1][x] === TILE_ROAD;
    const below = y < backgroundGrid.length - 1 && backgroundGrid[y + 1][x] === TILE_ROAD;
    const left = x > 0 && backgroundGrid[y][x - 1] === TILE_ROAD;
    const right = x < backgroundGrid[0].length - 1 && backgroundGrid[y][x + 1] === TILE_ROAD;

    if (above && below) return { sX: 32 * 1, sY: 32 * 1 }; // Vertical road
    if (left && right) return { sX: 0, sY: 32 * 1 }; // Horizontal road
    if (above && right) return { sX: 32 * 0, sY: 32 * 2 }; // Turn top-right
    if (above && left) return { sX: 32 * 2, sY: 32 * 2 }; // Turn top-left
    if (below && right) return { sX: 32 * 0, sY: 32 * 0 }; // Turn bottom-right
    if (below && left) return { sX: 32 * 2, sY: 32 * 0 }; // Turn bottom-left

    return { sX: 32 * 1, sY: 32 * 1 }; // Default road tile
}

function checkTileTypeForTrees(tileType, x, y) {
    if (tileType !== TILE_TREE) return null;

    // Ensure there's enough space for a 2x2 tree
    if (
        x < backgroundGrid[0].length - 1 && 
        y < backgroundGrid.length - 1 &&
        backgroundGrid[y][x] === TILE_TREE &&
        backgroundGrid[y][x + 1] === TILE_TREE &&
        backgroundGrid[y + 1][x] === TILE_TREE &&
        backgroundGrid[y + 1][x + 1] === TILE_TREE
    ) {
        return { sX: 0, sY: 32*3 }; // Example sprite position for a tree
    }

    return null;
}

function checkTileTypeForRandomization(tileType) {
    if (tileType === TILE_GRASS) {
        let options = 9;
        let randomNum = Math.floor(Math.random() * (options + 1));
        return { sX: 32 * randomNum, sY: 0 };
    }
    if (tileType === TILE_FLOOR){
        let options = 9;
        let randomNum = Math.floor(Math.random() * (options + 1));
        return { sX: 32 * randomNum, sY: 32*2 };
    }
    return null;
}


function drawImageTile(row, col, sX, sY, tileType) {   
    let tileImage = tilePics[tileType]; // Fetch the correct image from tilePics

    if (!tileImage) {
        console.error("Invalid tileType or missing image:", tileType);
        return;
    }
    ctx.drawImage(tileImage, sX, sY, 32, 32, col * TILE_W, row * TILE_H, TILE_W, TILE_H);
}

var grid = []; // array of GridElement instances, gets initialized based on tileGrid
const NOTHING = 20;
const SOURCE = 21;
const DEST = 22;
const WALL = 23;
const VISITED = 24;
const PATH = 25;

const INFINITY_START_DISTANCE = 999999;

function tileCoordToIndex(tileCol, tileRow) {
    return (tileCol + TILE_COLS * tileRow);
}

function pixCoordToIndex(pX, pY){
	var col = Math.floor(pX/GRID_WIDTH);
	var row = Math.floor(pY/GRID_HEIGHT);
	
	return tileCoordToIndex(col, row);
}

function drawPathingFindingTiles() {
    var tileCount = TILE_COLS * GRID_ROWS;
    for (var eachTil = 0; eachTil < tileCount; eachTil++) {
        grid[eachTil].display();
    } // end of for eachTil
} // end of drawTiles()



