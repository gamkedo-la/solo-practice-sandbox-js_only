
   
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
const gameState = {
    player: {
        x: 300,
        y: 400,
        width: 32,
        height: 32,
        color: 'blue',
        health: 100,
        damage: 10,
        level: 1,
        gold: 0,
        experience: 0
    },
    enemies: [
        { x: 300, y: 150, width: 40, height: 40, color: 'red', health: 50, damage: 5 },
    ],
    town: { x: 50, y: 50, width: 200, height: 200, color: 'green' }
};

// Key press handling
const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') keys.up = true;
    if (event.key === 'ArrowDown') keys.down = true;
    if (event.key === 'ArrowLeft') keys.left = true;
    if (event.key === 'ArrowRight') keys.right = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') keys.up = false;
    if (event.key === 'ArrowDown') keys.down = false;
    if (event.key === 'ArrowLeft') keys.left = false;
    if (event.key === 'ArrowRight') keys.right = false;
});

// Game loop
function gameLoop() {
    updateGameState();
    renderGame();
    requestAnimationFrame(gameLoop);
}

// Update game state
function updateGameState() {
    // Move player
    if (keys.up) gameState.player.y -= 5;
    if (keys.down) gameState.player.y += 5;
    if (keys.left) gameState.player.x -= 5;
    if (keys.right) gameState.player.x += 5;

    // Collision with town
    if (
        gameState.player.x < gameState.town.x + gameState.town.width &&
        gameState.player.x + gameState.player.width > gameState.town.x &&
        gameState.player.y < gameState.town.y + gameState.town.height &&
        gameState.player.y + gameState.player.height > gameState.town.y
    ) {
        alert("You're in town! You can interact with NPCs or buy items.");
        // Add interaction logic here
    }

    // Basic enemy interaction (combat)
    gameState.enemies.forEach((enemy) => {
        if (
            gameState.player.x < enemy.x + enemy.width &&
            gameState.player.x + gameState.player.width > enemy.x &&
            gameState.player.y < enemy.y + enemy.height &&
            gameState.player.y + gameState.player.height > enemy.y
        ) {
            // Combat (just simple damage exchange for now)
            gameState.player.health -= enemy.damage;
            enemy.health -= gameState.player.damage;
            if (enemy.health <= 0) {
                gameState.enemies.splice(gameState.enemies.indexOf(enemy), 1);
                gameState.player.gold += 10; // Collect gold on kill
            }
            if (gameState.player.health <= 0) {
                alert("Game Over!");
                // Reset game state or show game over screen
            }
        }
    });
}

// Render game
function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render player
    ctx.fillStyle = gameState.player.color;
    ctx.fillRect(gameState.player.x, gameState.player.y, gameState.player.width, gameState.player.height);

    // Render enemies
    gameState.enemies.forEach((enemy) => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Render town
    ctx.fillStyle = gameState.town.color;
    ctx.fillRect(gameState.town.x, gameState.town.y, gameState.town.width, gameState.town.height);

    // Display player stats
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`Health: ${gameState.player.health}`, 10, 20);
    ctx.fillText(`Gold: ${gameState.player.gold}`, 10, 40);
}

// Start the game
gameLoop();
