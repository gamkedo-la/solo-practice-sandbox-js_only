let currentPickupTile = 9;
let currentDeliveryTile = 10;

var pickupAndDeliveryManager;

function PickupAndDeliveryManager()
{
	this.getWaypointBoxStartingTileCoordinates = function(tileNumber)
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

	this.drawPickUpWaypointBox = function()
	{
		let pickupBoxCoordinates = this.getWaypointBoxStartingTileCoordinates(currentPickupTile);
		console.log(pickupBoxCoordinates);
		canvasContext.strokeStyle = 'green';
		canvasContext.lineWidth = 10;
		canvasContext.strokeRect(pickupBoxCoordinates.x,pickupBoxCoordinates.y, 1200,320);
	}

	this.drawDeliveryWaypointBox = function()
	{
		let dropoffBoxCoordinates = this.getWaypointBoxStartingTileCoordinates(currentDeliveryTile);
		canvasContext.strokeStyle = 'green';
		canvasContext.lineWidth = 10;
		canvasContext.strokeRect(dropoffBoxCoordinates.x,dropoffBoxCoordinates.y, 350,350);
	}

	this.drawWaypoints = function()
	{
		this.drawPickUpWaypointBox();
		this.drawDeliveryWaypointBox();
	}
}