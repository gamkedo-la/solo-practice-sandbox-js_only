let currentPickupTile = 9;
let currentDeliveryTile = 10;

var pickupAndDeliveryManager;

function PickupAndDeliveryManager()
{
	this.currentWaypointLeftX = undefined;
	this.currentWaypointRightX = undefined;
	this.currentWaypointTopY = undefined;
	this.currentWaypointBottomY = undefined;

	this.getWaypointBoxStartingTileCoordinatesReferencePoint = function(tileNumber)
	{
		for (let rowIndex = 0; rowIndex < NUMBER_OF_ROWS; rowIndex++)
		{
			for (let columnIndex = 0; columnIndex < NUMBER_OF_COLUMNS; columnIndex++)
			{
				if (trackGrid.grid[columnIndex + rowIndex*NUMBER_OF_COLUMNS] === tileNumber)
				{
					let waypointCoordinates = {x: TRACK_WIDTH*columnIndex,y: TRACK_HEIGHT*rowIndex};

					return {x: TRACK_WIDTH*columnIndex,y: TRACK_HEIGHT*rowIndex};

				}
			}
		}
	}

	this.shouldBeDrawingPickupWayPointBox = true;
	this.drawNorthOfBuildingPickUpWaypointBox = function()
	{
		let pickupBoxCoordinatesReferencePoint = this.getWaypointBoxStartingTileCoordinatesReferencePoint(currentPickupTile);

		let placeholderHorizontalSidewalkHeight = 120;
		let placeholderHannahsHorizontalLength = 1200;

		let pickupBoxStartingY = pickupBoxCoordinatesReferencePoint.y - placeholderHorizontalSidewalkHeight;

		this.currentWaypointLeftX = pickupBoxCoordinatesReferencePoint.x;
		this.currentWaypointRightX = pickupBoxCoordinatesReferencePoint.x + placeholderHannahsHorizontalLength;
		this.currentWaypointTopY = pickupBoxStartingY;
		this.currentWaypointBottomY = pickupBoxStartingY + placeholderHorizontalSidewalkHeight;

		canvasContext.strokeStyle = 'green';
		canvasContext.lineWidth = 10;
		canvasContext.strokeRect(pickupBoxCoordinatesReferencePoint.x,pickupBoxStartingY, 
								 placeholderHannahsHorizontalLength,placeholderHorizontalSidewalkHeight);

		canvasContext.font = '75px Helvetica';
		let pickupMessage = 'Pickup Here';
		let pickupMessageWidth = canvasContext.measureText(pickupMessage).width;
		let waypointBoxCenterX = pickupBoxCoordinatesReferencePoint.x + placeholderHannahsHorizontalLength/2;
		let pickupMessageStartingX = waypointBoxCenterX - pickupMessageWidth/2;
		let pickupMessageStartingY = pickupBoxStartingY + 75;
		canvasContext.fillText(pickupMessage, pickupMessageStartingX, pickupMessageStartingY);
	}

	this.shoudlBeDrawingDropoffWaypointBox = true;
	this.drawEastOfBuildingDropoffWaypointBox = function()
	{
		let dropoffBoxCoordinatesReferencePoint = this.getWaypointBoxStartingTileCoordinatesReferencePoint(currentDeliveryTile);
		
		let placeholderVerticalSidewalkWidth = 120;
		let placeholderSeasandWidth = 310;
		let placeholderSeasandHeight = 280;

		canvasContext.strokeStyle = 'green';
		canvasContext.lineWidth = 10;
		canvasContext.strokeRect(dropoffBoxCoordinatesReferencePoint.x + placeholderSeasandWidth - 30,
								 dropoffBoxCoordinatesReferencePoint.y, 
								 placeholderVerticalSidewalkWidth,placeholderSeasandHeight);

		this.currentWaypointLeftX = dropoffBoxCoordinatesReferencePoint.x + placeholderSeasandWidth - 30;
		this.currentWaypointRightX = dropoffBoxCoordinatesReferencePoint.x + placeholderSeasandWidth - 30 + placeholderSeasandWidth;
		this.currentWaypointTopY = dropoffBoxCoordinatesReferencePoint.y;
		this.currentWaypointBottomY = dropoffBoxCoordinatesReferencePoint.y + placeholderSeasandHeight;

		canvasContext.font = '40px Helvetica';
		let dropoffMessage = 'Dropoff Here';
		let dropoffMessageWidth = canvasContext.measureText(dropoffMessage).width;
		let waypointBoxCenterX = dropoffBoxCoordinatesReferencePoint.x + placeholderSeasandWidth + placeholderVerticalSidewalkWidth/2;
		let seasandSidewalkHeight = 285;
		let waypointBoxCenterY = dropoffBoxCoordinatesReferencePoint.y + seasandSidewalkHeight/2;
		
		let dropoffMessageStartingX = waypointBoxCenterX - dropoffMessageWidth/2;
		let dropoffMessageStartingY = waypointBoxCenterY;

		canvasContext.save();
		canvasContext.translate(dropoffMessageStartingX + dropoffMessageWidth/2,dropoffMessageStartingY);
		canvasContext.rotate(-1.5708);
		canvasContext.translate(-dropoffMessageStartingX - dropoffMessageWidth/2,-dropoffMessageStartingY)
		canvasContext.fillText(dropoffMessage, dropoffMessageStartingX , dropoffMessageStartingY);
		canvasContext.restore();
	}

	this.drawWaypoints = function()
	{
		if (snatchApp.status === 'waiting')
		{
			return;
		}
		else if (snatchApp.status === 'picking up')
		{
			this.drawNorthOfBuildingPickUpWaypointBox();
		}
		else if (snatchApp.status === 'dropping off')
		{
			this.drawEastOfBuildingDropoffWaypointBox();
		}
	}

	this.checkForWaypointArrivals = function()
	{
		if (snatchApp.status === 'waiting')
		{
			return;
		}

		else if (snatchApp.status === 'picking up')
		{

			if (scooter.centerX > this.currentWaypointLeftX && scooter.centerX < this.currentWaypointRightX &&
				scooter.centerY > this.currentWaypointTopY && scooter.centerY < this.currentWaypointBottomY)
			{
				console.log('pick up arrival detected');
				snatchApp.status = 'dropping off';
				pickupOrDropoffSFXAudioTag.play();
			}
		}
		else if (snatchApp.status === 'dropping off') 
		{
			if (scooter.centerX > this.currentWaypointLeftX && scooter.centerX < this.currentWaypointRightX &&
				scooter.centerY > this.currentWaypointTopY && scooter.centerY < this.currentWaypointBottomY)
			{
				console.log('drop off arrival detected');
				snatchApp.status = 'waiting';
				snatchApp.currentMessageLine1 = snatchApp.waitingMessage;
				snatchApp.currentMessageLine2 = undefined;
				snatchApp.startOrderCycle();
				pickupOrDropoffSFXAudioTag.play();
			}
		}

		
	}
}