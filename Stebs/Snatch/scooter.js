var scooter;

function Scooter()
{
	this.startingDrawX;
	this.startingDrawY;
	this.width;
	this.height;
	this.topEdge;
	this.rightEdge;
	this.bottomEdge;
	this.leftEdge;
	this.centerX;
	this.centerY;

	this.angle;
	
	this.speed;

	this.keyHeld_Gas = false;
	this.keyHeld_HandBrake = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.initialize = function()
	{
		this.startingDrawX = undefined;
		this.startingDrawY = undefined;
		this.width = 90;
		this.height = 125;
		this.angle = 0;
		this.speed = 0;

		this.resetPosition();

		this.topEdge = this.startingDrawY;
		this.rightEdge = this.startingDrawX + this.width;
		this.bottomEdge = this.startingDrawY + this.height;
		this.leftEdge = this.startingDrawX;

	}


	this.handleWallCollisions = function()
	{

		let currentScooterTopEdgeColumnIndex = Math.floor( (this.startingDrawX + this.width/2)/TRACK_WIDTH );
		let currentScooterTopEdgeRowIndex = Math.floor(this.startingDrawY/TRACK_HEIGHT);

		let currentScooterRightEdgeColumnIndex = Math.floor( (this.startingDrawX + this.width)/TRACK_WIDTH );
		let currentScooterRightEdgeRowIndex = Math.floor( (this.startingDrawY + this.height/2)/TRACK_HEIGHT );

		let currentScooterBottomEdgeColumnIndex = Math.floor( (this.startingDrawX + this.width/2)/TRACK_WIDTH );
		let currentScooterBottomEdgeRowIndex = Math.floor( (this.startingDrawY + this.height)/TRACK_HEIGHT );

		let currentScooterLefttEdgeColumnIndex = Math.floor(this.startingDrawX/TRACK_WIDTH);
		let currentScooterLefttEdgeRowIndex = Math.floor( (this.startingDrawY + this.height/2)/TRACK_HEIGHT );

		let currentTopEdgeGridIndexUnderScooter = convertRowsAndColumnsToGridIndex(currentScooterTopEdgeColumnIndex,currentScooterTopEdgeRowIndex);
		let currentRightEdgeGridIndexUnderScooter = convertRowsAndColumnsToGridIndex(currentScooterRightEdgeColumnIndex,currentScooterRightEdgeRowIndex);
		let currentBottomEdgeGridIndexUnderScooter = convertRowsAndColumnsToGridIndex(currentScooterBottomEdgeColumnIndex,currentScooterBottomEdgeRowIndex);
		let currentLeftEdgeGridIndexUnderScooter = convertRowsAndColumnsToGridIndex(currentScooterLefttEdgeColumnIndex,currentScooterLefttEdgeRowIndex);

		let topEdgeScooterWallCollision = (currentTopEdgeGridIndexUnderScooter >= 0 && currentTopEdgeGridIndexUnderScooter < TRACK_COUNT && trackGrid.grid[currentTopEdgeGridIndexUnderScooter] === 1 );
		let rightEdgeScooterWallCollision = (currentRightEdgeGridIndexUnderScooter >= 0 && currentRightEdgeGridIndexUnderScooter < TRACK_COUNT && trackGrid.grid[currentRightEdgeGridIndexUnderScooter] === 1 );
		let bottomEdgeScooterWallCollision = (currentBottomEdgeGridIndexUnderScooter >= 0 && currentBottomEdgeGridIndexUnderScooter < TRACK_COUNT && trackGrid.grid[currentBottomEdgeGridIndexUnderScooter] === 1 );
		let leftEdgeScooterWallCollision = (currentLeftEdgeGridIndexUnderScooter >= 0 && currentLeftEdgeGridIndexUnderScooter < TRACK_COUNT && trackGrid.grid[currentLeftEdgeGridIndexUnderScooter] === 1 );
		
		if (topEdgeScooterWallCollision)
		{
			console.log('topEdge Wall Collision');
		}
		else if (rightEdgeScooterWallCollision)
		{
			console.log('rightEdgeScooterWallCollision');
		}
		else if (bottomEdgeScooterWallCollision)
		{
			console.log('bottomEdgeScooterWallCollision');
		}
		else if (leftEdgeScooterWallCollision)
		{
			console.log('leftEdgeScooterWallCollision');
		}

		if ( topEdgeScooterWallCollision || rightEdgeScooterWallCollision || bottomEdgeScooterWallCollision || leftEdgeScooterWallCollision)	
		{
			
			var previousX = this.startingDrawX - this.speed;
			var previousY = this.startingDrawY - this.speed;
			this.startingDrawX = previousX;
			this.startingDrawY = previousY;
			this.speed = -3;
		}
		
	}


	this.resetPosition = function()
	{
		for (let rowIndex = 0; rowIndex < NUMBER_OF_ROWS; rowIndex++)
		{
			for (let columnIndex = 0; columnIndex < NUMBER_OF_COLUMNS; columnIndex++)
			{

				var arrayIndex = convertRowsAndColumnsToGridIndex(columnIndex,rowIndex);

				if (trackGrid.grid[arrayIndex] === 2)
				{
					this.startingDrawX = columnIndex * TRACK_WIDTH + 12.5;
					this.startingDrawY = rowIndex * TRACK_HEIGHT + 2.5;
					this.centerX = this.startingDrawX + this.width/2;
					this.centerY = this.startingDrawY + this.height/2;
					trackGrid.grid[arrayIndex] = 3;
				}
			}
		}
	}


	this.draw = function()
	{
		
		if (scooterImageLoaded)
		{
			let scooterImageRotationPivotX = this.startingDrawX + this.width/2;
			let scooterImageRotationPivotY = this.startingDrawY + this.height/2;
			let tempStartingDrawX = canvas.width/2 - this.width/2;
			let tempStartingDrawY = canvas.height/2 - this.height/2;
			
			//scooter spritesheet source dimensions
			//total width: 3232, individual frame: 202
			//height: 197
			//(image, sourceX,sourceY, sourceWidth,sourceHeight, destinationX,destinationY,
			// destinationWidth,destinationHeight, pivotX,pivotY, angle)
			drawImageAfterPivotedRotation(scooterImage, 202*4,0, 202,197, tempStartingDrawX,tempStartingDrawY,
			this.width,this.height, canvas.width/2,canvas.height/2, this.angle);	

			//canvasContext.drawImage(scooterImage, 202*4,0, 202,197, tempStartingDrawX,tempStartingDrawY, this.width,this.height);					  	
		}
	}

	this.updateProperties = function()
	{
		this.topEdge = this.startingDrawY;
		this.rightEdge = this.startingDrawX;
		this.bottomEdge = this.startingDrawY + this.height;
		this.leftEdge = this.startingDrawX - this.width;
		this.centerX = this.startingDrawX + this.width/2;
		this.centerY = this.startingDrawY + this.height/2;
	}

	this.move = function()
	{
		if (this.keyHeld_Gas && this.speed < 10 && !this.keyHeld_HandBrake)
		{
			this.speed += 0.75;
		}
		else if (this.keyHeld_Gas && this.speed < 40 && !this.keyHeld_HandBrake)
		{
			this.speed += 0.25;
			if (this.speed > 40)
			{
				this.speed = 40;
			}
		}
		else if (!this.keyHeld_Gas && this.speed > 0)
		{
			this.speed -= 0.33;
			if (this.speed < 0)
			{
				this.speed = 0;
			} 
		}
		
		if (this.keyHeld_HandBrake)
		{
			this.speed -= 0.5;
			if (this.speed < 0)
			{
				this.speed = 0;
			}
		}

		if (this.keyHeld_WalkBack && !this.keyHeld_Gas && this.speed <= 0)
		{
			this.speed = -0.15;
		}

		//turning
		//only turning right, no gas or brake
		if (this.keyHeld_TurnRight && !this.keyHeld_HandBrake && !this.keyHeld_Gas)
		{
			this.angle += 0.075;
		}
		//turning right with gas, no brake
		if (this.keyHeld_TurnRight && !this.keyHeld_HandBrake && this.keyHeld_Gas)
		{
			this.angle += 0.05;
		}
		//turning right with gas and brake
		if (this.keyHeld_TurnRight && this.keyHeld_HandBrake && this.keyHeld_Gas)
		{
			this.angle += 0.15;
		}
		//turning right with brake and without gas
		if (this.keyHeld_TurnRight && this.keyHeld_HandBrake && !this.keyHeld_Gas)
		{
			this.angle += 0.2;
		} 
		
		//only turning left, no gas or brake
		if (this.keyHeld_TurnLeft  && !this.keyHeld_HandBrake && !this.keyHeld_Gas)
		{
			this.angle -= 0.075;
		}
		//turning left with gas, no brake
		if (this.keyHeld_TurnLeft  && !this.keyHeld_HandBrake && this.keyHeld_Gas)
		{
			this.angle -= 0.05;
		}
		//turning left with gas and brake
		if (this.keyHeld_TurnLeft  && this.keyHeld_HandBrake && this.keyHeld_Gas)
		{
			this.angle -= 0.15;
		}
		//turning left with brake and without gas
		if (this.keyHeld_TurnLeft && this.keyHeld_HandBrake && !this.keyHeld_Gas)
		{
			this.angle -= 0.2;
		} 

		//slow down bounces over time
		if (this.speed < 0)
		{
			this.speed += 0.075;
		}

		this.startingDrawX += Math.sin(-this.angle) * -this.speed;
		this.startingDrawY += Math.cos(-this.angle) * -this.speed;
	}

	this.update = function()
	{
		this.move();
		this.handleWallCollisions();
		this.updateProperties();
		
	}
}