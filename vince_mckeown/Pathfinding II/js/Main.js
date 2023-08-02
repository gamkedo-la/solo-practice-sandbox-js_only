var gridSize = 4;
var grid = [];

for(var i=0; i<gridSize; i++){
    grid[i] = [];
    for( var ii=0; j<gridSize; ii++){
        grid[i][ii] = "Empty";
    }
}

grid[0][0] = "Start";
grid[2][2] = "Goal";

grid[1][1] = "Obstacle";
grid[1][2] = "Obstacle";
grid[1][3] = "Obstacle";
grid[2][1] = "Obstacle";

var findShortestPath = function(startCoordinates, grid){
    var distanceFromTop: 
        startCoordinates[0], 
        distanceFromLeft:
        startCoordinates[1],
};

var location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'Start'
};