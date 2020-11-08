var debugOn = false;

function drawDebugStuff()
{
	drawMouseCoordinates();
	drawTrackRowAndColumnUnderMouse();
	drawGridIndexUnderMouse();
}

function drawMouseCoordinates()
{
	colorText(mouseXCoordinate + "," + mouseYCoordinate, mouseXCoordinate,mouseYCoordinate, 'pink', '30px Helvetica');
}

function drawTrackRowAndColumnUnderMouse()
{
	var mouseTRACKColumn = Math.floor(mouseXCoordinate/TRACK_WIDTH);
	var mouseTRACKRow = Math.floor(mouseYCoordinate/TRACK_HEIGHT);

	colorText(mouseTRACKColumn + ',' + mouseTRACKRow, mouseXCoordinate,mouseYCoordinate + 50, 'yellow');
}

function drawGridIndexUnderMouse()
{
	var mouseTrackColumn = Math.floor(mouseXCoordinate/TRACK_WIDTH);
	var mouseTrackRow = Math.floor(mouseYCoordinate/TRACK_HEIGHT);
	var gridIndex = convertRowsAndColumnsToGridIndex(mouseTrackColumn,mouseTrackRow); 

	colorText(gridIndex, mouseXCoordinate + 50,mouseYCoordinate + 25, 'orange');

	// if (gridIndex >= 0 && gridIndex < TRACK_COUNT)
	// {
	// 	TRACKGrid.grid[gridIndex] = false;
	// }
	
}

function convertRowsAndColumnsToGridIndex(columnIndex,rowIndex)
{
	let gridIndex = columnIndex + rowIndex*NUMBER_OF_COLUMNS;
	return gridIndex; 
}

var controlCameraForDebug = false;