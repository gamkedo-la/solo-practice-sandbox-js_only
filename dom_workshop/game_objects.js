// game_objects.js

// Object class
//
// Master for on-screen items
class Object
{
    constructor(x, y)
    {
        this.x_pos = x;
        this.y_pos = y;
    }
}


// Block class
//
// Prevents movement
class Block extends Object
{
    constructor(x, y, width, height, color)
    {
        super(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw()
    {
        canvas_context.fillStyle = this.color;
        canvas_context.fillRect(this.x_pos, this.y_pos, this.width, this.height);
    }

    move() {} // Is relatively static
}

// Enemy class
//
// Basically a block that moves
var shots = [];
class Enemy extends Object
{
    constructor(x, y)
    {
        super(x, y);
        this.width = 30;
        this.height = 30;

        this.dir = -1;
        this.move_count = 0;
    }

    draw()
    {
        canvas_context.fillStyle = "#ff0000";
        canvas_context.fillRect(this.x_pos, this.y_pos, this.width, this.height);
    }

    move()
    {
        if (this.dir == -1)
        {
            if (this.move_count < -60)
            {
                this.dir = 1;
            }
            else
            {
                this.move_count -= 1;
                this.x_pos -= 3;
            }
        }
        else
        {
            if (this.move_count > 60)
            {
                this.dir = -1;
            }
            else
            {
                this.move_count += 1;
                this.x_pos += 3;

                if (this.move_count % 10 == 0)
                {
                    let shot = new Arrow(this.x_pos + (this.width / 2), this.y_pos + this.height);
                    shot.dir = 1;
                    shots.push(shot);
                }
            }
        }
    }
}

// Arrow  class
//
// Another moving block
class Arrow extends Object
{
    constructor(x, y)
    {
        super(x, y);
        this.width = 30;
        this.height = 10;

        this.dir = -1;
    }

    draw()
    {
        canvas_context.fillStyle = "#ff0000";

        if (this.dir == -1)
            canvas_context.fillRect(this.x_pos, this.y_pos, this.width, this.height);
        else
            canvas_context.fillRect(this.x_pos, this.y_pos, this.height, this.width);
    }

    move()
    {
        if (this.dir == -1)
            this.x_pos -= 10;
        else
            this.y_pos -= 10;
    }
}

// Player class
//
// Shape controlled by user
const PLAYER_SPEED = 8;
class Player extends Object
{

    constructor(x, y, color, shape)
    {
        super(x, y);
        this.size = 20;
        this.speed = PLAYER_SPEED;
        this.jumptime = 30;
        this.jumps = 1;

        this.up = false;
        this.left = false;
        this.right = false;
        this.down = true;

        this.color = color;
        this.shape = shape;
    }

    move()
    {
        if (this.up && this.jumptime > 0 && this.jumps)
        {
            this.y_pos -= this.speed;
            this.jumptime -= 1;
            this.down = false;
        }
        else if (!this.up && this.jumptime < 20)
        {
            this.down = true;
        }

        if (this.left)
            this.x_pos -= this.speed;

        if (this.right)
            this.x_pos += this.speed;

        if (this.down)
        {
            this.jumps = 0;
            this.y_pos += this.speed;
        }
    }

    draw(offset)
    {
        canvas_context.fillStyle = this.color;

        if (this.shape == "sqr")
        {
            canvas_context.fillRect(this.x_pos - (-offset), this.y_pos, this.size, this.size);
        }
        else if (this.shape == "tri")
        {
            canvas_context.beginPath();
            canvas_context.moveTo(this.x_pos - (-offset), this.y_pos + this.size);
            canvas_context.lineTo(this.x_pos - (-offset) + (this.size / 2), this.y_pos);
            canvas_context.lineTo(this.x_pos - (-offset) + this.size, this.y_pos + this.size);
            canvas_context.lineTo(this.x_pos - (-offset), this.y_pos + this.size);
            canvas_context.fill();
        }
        else if (this.shape == "cir")
        {
            canvas_context.beginPath();
            canvas_context.arc(this.x_pos - (-offset) + (this.size / 2), this.y_pos + (this.size / 2), this.size / 2, 0, 2 * Math.PI);
            canvas_context.fill();
        }
    }

    collide(test_x, test_y, test_width, test_height)
    {
        let offset = 4; // Prevent player "sticking" to objects

        // Collide top
        if (this.up)
        {
            if ((test_y + test_height + offset) >= this.y_pos &&
                test_y <= (this.y_pos + this.size))
            {
                if (test_x <= (this.x_pos + this.size) && 
                    (test_x + test_width) >= this.x_pos)
                {
                    // console.log("Collide top");
                    this.up = false;
                }
            }
        }

        // Collide left
        if (this.left)
        {
            if ((test_x + test_width + offset) >= this.x_pos &&
                test_x <= (this.x_pos + this.size))
            {
                if (test_y <= (this.y_pos + this.size) && 
                    (test_y + test_height) >= this.y_pos)
                {
                    // console.log("Collide left");
                    this.left = false;
                }
            }
        }

        // Collide right
        if (this.right)
        {
            if ((test_x - offset) <= (this.x_pos + this.size) &&
                (test_x + test_width) >= this.x_pos)
            {
                if (test_y <= (this.y_pos + this.size) && 
                    (test_y + test_height) >= this.y_pos)
                {
                    // console.log("Collide right");
                    this.right = false;
                }
            }
        }
        
        // Collide bottom
        if (this.down)
        {
            if ((test_y - offset) <= (this.y_pos + this.size) &&
                (test_y + test_height) >= this.y_pos)
            {
                if (test_x <= (this.x_pos + this.size) && 
                    (test_x + test_width) >= this.x_pos)
                {
                    // console.log("Collide bot");
                    this.down = false;
                    this.jumptime = 30;
                    this.jumps = 1;
                }
            }
        }
    }

}
