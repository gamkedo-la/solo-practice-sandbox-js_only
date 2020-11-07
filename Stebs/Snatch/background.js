var background;

function Background()
{
	this.startingDrawX;
	this.startingDrawY;
	this.width;
	this.height;

	this.color;

	this.initialize = function()
	{
		this.startingDrawX = 0;
		this.startingDrawY = 0;
		this.width = canvas.width;
		this.height = canvas.height;

		this.color = 'black';
	}

	this.draw = function()
	{
		colorRect(this.startingDrawX,this.startingDrawY, this.width,this.height, this.color);
	}
}