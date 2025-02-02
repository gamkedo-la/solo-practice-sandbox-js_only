const enemies = [];

const player = new Player("Hero", 300, 500, 100, 10, 1, 50);
console.log(player.name, "has", player.health, "HP and", player.gold, "gold.");
player.levelUp();

const goblin = new Monster("Goblin", 300, 200, 30, 5, 20);
enemies.push(goblin);
console.log(`${goblin.name} is lurking in the woods...`);
goblin.attack(player);

console.log(`${player.name} now has ${player.health} HP.`);
   
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game state
const gameState = {
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
    if (keys.up) player.y -= 5;
    if (keys.down) player.y += 5;
    if (keys.left) player.x -= 5;
    if (keys.right) player.x += 5;

    // Collision with town
    if (
        player.x < gameState.town.x + gameState.town.width &&
        player.x + player.width > gameState.town.x &&
        player.y < gameState.town.y + gameState.town.height &&
        player.y + player.height > gameState.town.y
    ) {
        console.log("You're in town! You can interact with NPCs or buy items.");
        // Add interaction logic here
    }

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
function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Render enemies
    enemies.forEach((enemy) => {
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // Render town
    ctx.fillStyle = gameState.town.color;
    ctx.fillRect(gameState.town.x, gameState.town.y, gameState.town.width, gameState.town.height);

    // Display player stats
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`Health: ${player.health}`, 10, 20);
    ctx.fillText(`Gold: ${player.gold}`, 10, 40);
}

// Start the game
gameLoop();
