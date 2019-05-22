// game.js

var canvas; // Part of screen where we'll draw objects
var canvas_context; // Used to draw onto the canvas
var player;
var trial;
var score = 0;
var timer;

// Runs both functions ~60 times per second
game_run = function()
{
	game_logic();
	game_draw();
}

// Run game logic
// Check collision, move objects, etc.
game_logic = function()
{
	if (player.y_pos < (canvas.height * 0.9) - player.size + 4)
		player.down = true;
    else
    {
        player.down = false;
        player.jumptime = 30;
        player.jumps = 1;
    }

    if(trial.x_pos < -801)
    {
        trial = new Trial;
    }

    trial.move();

    player.move();

    trial.collide();
}

// Draw Objects to the screen
var view_x = 0;
game_draw = function()
{
	canvas_context.save();

	canvas_context.translate(view_x, 0);
	canvas_context.clearRect(-view_x, 0, 800, 600);

    canvas_context.fillStyle = '#66ccff';
    canvas_context.fillRect(0 - view_x, 0, canvas.width, canvas.height);

    canvas_context.fillStyle = '#006600';
    canvas_context.fillRect(0 - view_x, canvas.height * 0.9, 
                            canvas.width, canvas.height * 0.1);

    trial.draw();

	canvas_context.restore();

    player.draw(view_x);
}

// Input handlers
document.addEventListener('keydown', 
function(event)
{
    if(event.keyCode == 37)
    {
        player.left = true;
    }

    if(event.keyCode == 39)
    {
        player.right = true;
    }

    if(event.keyCode == 38)
    {
        player.up = true;
    }

});

document.addEventListener('keyup', 
function(event)
{
    if(event.keyCode == 37)
    {
        player.left = false;
    }

    if(event.keyCode == 39)
    {
        player.right = false;
    }

    if(event.keyCode == 38)
    {
        player.up = false;
    }

});

game_over = function()
{
    game_draw();

    canvas_context.fillStyle = "#000000";
    canvas_context.font = "20px Veranda";
    canvas_context.fillText("Game Over!", 200, 100, 400);
}

// Initializer function
window.onload = function()
{
	canvas = document.getElementById('game_canvas');

	canvas_context = canvas.getContext('2d');

	canvas.width = 800;
	canvas.height = 600;

    // player = new Player(200, canvas.height * 0.5, COLOR, SHAPE);

    player = new Player(200, canvas.height * 0.5, "#ffff00", "sqr");

    trial = new Trial;

	timer = setInterval(game_run, 1000 / 60);
}
