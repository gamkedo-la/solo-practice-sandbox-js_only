// game_trials.js
//
// Theory: Trials are a block of elements passed by the screen

class Trial
{
	constructor()
	{
		this.x_pos = 801;
		this.y_pos = 0;

		this.elements = [];
		this.populate();
	}

	populate()
	{
		let roll = Math.floor((Math.random() * 3) + 1);

		if (roll == 1)
		{
			// Floor hazard
			this.elements.push(new Block(this.x_pos, this.y_pos + 540, 400, 60, "#ff0000"));
		}
		else if (roll == 2)
		{
			// Mid hazard
			roll = Math.floor((Math.random() * 95) + 440);
			let x_roll = Math.floor(Math.random() * 800);

			this.elements.push(new Arrow(x_roll, roll, 300, 100, "#ff000"));
		}
		else if (roll == 3)
		{
			// Top hazard
			this.elements.push(new Enemy(this.x_pos + 400, this.y_pos + 150, 20, 20, "#ff0000"));
		}

	}

	move()
	{
		this.x_pos -= 1;

		for (let j = 0; j < this.elements.length; j++)
		{
			this.elements[j].x_pos -= 1;
			this.elements[j].move();
		}
	}

	draw()
	{
		for (let j = 0; j < this.elements.length; j++)
			this.elements[j].draw();
	}

	collide()
	{
		for (let j = 0; j < this.elements.length; j++)
			player.collide(this.elements[j].x_pos, this.elements[j].y_pos,
							this.elements[j].width, this.elements[j].height);
	}
}
