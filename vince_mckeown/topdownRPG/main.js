var canvas, ctx, collisionCanvas, collisionCtx;
const enemies = [];

// Player and enemy setup
const player = new Player("Hero", 300, 500, 100, 10, 1, 50);
console.log(player.name, "has", player.health, "HP and", player.gold, "gold.");
player.levelUp();

const goblin = new Monster("Goblin", 32*9, 32*4, 32, 5, 20);
enemies.push(goblin);

console.log(`${goblin.name} is lurking in the woods...`);
goblin.attack(player);

console.log(`${player.name} now has ${player.health} HP.`);

var insidebuilding = false;

// Game state
const gameState = {
    house: { x: 32, y: 0, sX: 0, sY: 0, sW: 32*6, sH: 32*6, width: 32*6, height: 32*6, 
        color: "rgba(9, 0, 128, 0.5)", image: blacksmithShopPic, insidebuilding: false},
    house2: { x: 32*18, y: 5*32, sX: 0, sY: 32*6, sW: 32*6, sH: 32*6, width: 32*6, height: 32*6, 
        color: "rgba(9, 0, 128, 0.5)", image: alchemistShopPic, insidebuilding: false}
};

// Collision Canvas Setup, ,
function setupCollisionCanvas() {
    collisionCanvas = document.createElement("canvas");
    collisionCanvas.width = canvas.width;
    collisionCanvas.height = canvas.height;
    collisionCanvas.style.position = "absolute";
    collisionCanvas.style.pointerEvents = "none";
    collisionCanvas.style.opacity = 0.5;

    const canvasRect = canvas.getBoundingClientRect();
    collisionCanvas.style.top = `${canvasRect.top}px`;
    collisionCanvas.style.left = `${canvasRect.left}px`;
    collisionCanvas.style.width = `${canvasRect.width}px`;
    collisionCanvas.style.height = `${canvasRect.height}px`;

    collisionCanvas.style.zIndex = 10;
    document.body.appendChild(collisionCanvas);

    collisionCtx = collisionCanvas.getContext("2d");
}

// Utility: Clear collision canvas
function clearCollisionCanvas() {
    collisionCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);
}

// Utility: Draw a collision box (for debugging)
function drawCollisionBox(x, y, width, height) {
    collisionCtx.fillStyle = "rgba(123, 0, 255, 0.8)"; // Red color
    collisionCtx.fillRect(x, y, width, height);
}

// Utility: Check collision on the collision canvas
function isCollisionAt(x, y) {
    const pixel = collisionCtx.getImageData(x, y, 1, 1).data;
    return pixel[0] === 255 && pixel[1] === 0 && pixel[2] === 0 && pixel[3] > 0; // Red detection
}

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    setupCollisionCanvas();
    loadImages();
};

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 60;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);
}

function checkCollision(character, building, message) {
    if (
        character._x < building.x + building.width &&
        character._x + character.width > building.x &&
        character._y < building.y + building.height &&
        character._y + character.height > building.y
    ) {
        console.log(message);
        building.sX = building.width;
        building.insidebuilding = true;
    } else {
        building.sX = 0;
        building.insidebuilding = false;
    }
}

// Move all entities
function moveEverything() {
    // Move player
    const SPEED = 4;
    if (keys.up) movePlayer(0, -SPEED);
    if (keys.down) movePlayer(0,SPEED);
    if (keys.left) movePlayer(-SPEED,0);
    if (keys.right) movePlayer(SPEED,0);
    let endTile = pixCoordToIndex(400, 300);
    let startTile = pixCoordToIndex(player.x, player.y);
    startPath(startTile, endTile);
    

    // Collision with house
    checkCollision(player, gameState.house, "You're in the blacksmith shop! You can interact with NPCs or buy items.");
    checkCollision(player, gameState.house2, "You're in the alchemist shop! You can interact with NPCs or buy items.");


    
    // Basic enemy interaction (combat)
    enemies.forEach((enemy) => {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            // Combat (just simple damage exchange for now)
            player.health -= enemy.damage;
            enemy.health -= player.damage;
            if (enemy.health <= 0) {
                enemies.splice(enemies.indexOf(enemy), 1);
                player.gold += 10; // Collect gold on kill
            }
            if (player.health <= 0) {
                console.log("Game Over!");
                // Reset game state or show game over screen
            }
        }
    });
}

// Render game
function drawEverything() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(townMapPic, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

    drawBackground();

    // Render building if inside
    if(gameState.house.insidebuilding){
    ctx.drawImage(gameState.house.image, gameState.house.sX, gameState.house.sY, gameState.house.sW, gameState.house.sH, 
        gameState.house.x, gameState.house.y, gameState.house.width, gameState.house.height);
    }
    if(gameState.house2.insidebuilding){
    ctx.drawImage(gameState.house2.image, gameState.house2.sX, gameState.house2.sY, gameState.house2.sW, gameState.house2.sH, 
        gameState.house2.x, gameState.house2.y, gameState.house2.width, gameState.house2.height);
        }

    // Render player
    ctx.drawImage(player.image, player.sX, player.sY, player.sW, player.sH, player.x, player.y, player.width, player.height);

    // Render enemies
    enemies.forEach((enemy) => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Render house if outside

    if(!gameState.house.insidebuilding){
        ctx.drawImage(gameState.house.image, gameState.house.sX, gameState.house.sY, gameState.house.sW, gameState.house.sH, 
            gameState.house.x, gameState.house.y, gameState.house.width, gameState.house.height);
    }
    if(!gameState.house2.insidebuilding){
        ctx.drawImage(gameState.house2.image, gameState.house2.sX, gameState.house2.sY, gameState.house2.sW, gameState.house2.sH, 
            gameState.house2.x, gameState.house2.y, gameState.house2.width, gameState.house2.height);
    }
    
    // Draw collision box for house
    //drawCollisionBox(gameState.house.x, gameState.house.y, gameState.house.width, gameState.house.height);
    //drawCollisionBox(gameState.house2.x, gameState.house2.y, gameState.house2.width, gameState.house2.height);

    // Display player stats
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`Health: ${player.health}`, 10, 20);
    ctx.fillText(`Gold: ${player.gold}`, 10, 40);
}