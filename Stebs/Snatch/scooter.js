var scooter;

function Scooter()
{
	this.startingTileX;
	this.startingTileY;
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
		this.startingTileX = undefined;
		this.startingTileY = undefined;
		this.width = 90;
		this.height = 125;
		this.angle = 0;
		this.speed = 0;

		this.resetPosition();

		this.initializeProperties();

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
					this.startingTileX = columnIndex * TRACK_WIDTH;
					this.startingTileY = rowIndex * TRACK_HEIGHT;
					
					trackGrid.grid[arrayIndex] = 0;

					this.centerX = this.startingTileX + TRACK_WIDTH/2;
					this.centerY = this.startingTileY + TRACK_HEIGHT/2;

					this.updateProperties();
							
				}
			}
		}
	}

	this.initializeProperties = function()
	{
		this.startingDrawX = this.centerX - this.width/2;
		this.startingDrawY = this.centerY - this.height/2;
		
		this.topEdge = this.centerY - this.height/2;
		this.rightEdge = this.centerX + this.width/2;
		this.bottomEdge = this.centerY + this.height/2;
		this.leftEdge = this.centerX - this.width/2;		
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


	this.draw = function()
	{
		
		if (scooterImageLoaded)
		{
			let scooterImageRotationPivotX = this.centerX;
			let scooterImageRotationPivotY = this.centerY;
			
			//scooter spritesheet source dimensions
			//total width: 3232, individual frame: 202
			//height: 197
			//(image, sourceX,sourceY, sourceWidth,sourceHeight, destinationX,destinationY,
			// destinationWidth,destinationHeight, pivotX,pivotY, angle)
			drawImageAfterPivotedRotation(scooterImage, 202*4,0, 202,197, this.startingDrawX,this.startingDrawY,
			this.width,this.height, canvas.width/2,canvas.height/2, this.angle);	

			//canvasContext.drawImage(scooterImage, 202*4,0, 202,197, tempStartingDrawX,tempStartingDrawY, this.width,this.height);					  	
		}
	}

	this.updateProperties = function()
	{
		this.startingDrawX = this.centerX - this.width/2;
		this.startingDrawY = this.centerY - this.height/2;
		
		this.topEdge = this.centerY - this.height/2;
		this.rightEdge = this.centerX + this.width/2;
		this.bottomEdge = this.centerY + this.height/2;
		this.leftEdge = this.centerX - this.width/2;		
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

		this.centerX += Math.sin(-this.angle) * -this.speed;
		this.centerY += Math.cos(-this.angle) * -this.speed;
		this.startingDrawY += Math.sin(-this.angle) * -this.speed;
		this.startingDrawY += Math.cos(-this.angle) * -this.speed;

	}

	this.update = function()
	{
		this.move();
		this.handleWallCollisions();
		this.updateProperties();
		
	}
}