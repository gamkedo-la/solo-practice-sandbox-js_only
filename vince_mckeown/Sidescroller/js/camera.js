var camPanX = 0;
var camPanY = 0;

function updatedCameraPosition(){
	camPanX = player.x - canvas.width/2;
	camPanY = player.y - canvas.height/2;
	
	if(camPanX < 0){
		camPanX = 0;
	}
	if(camPanY < 0){
		camPanY = 0;
	}
	
	var rightEdgeX = TILE_W * TILE_COLS;
	var bottomEdgeY = TILE_H * TILE_ROWS;
	
	if(camPanX >= rightEdgeX - 1 - canvas.width){
		camPanX = rightEdgeX - 1 - canvas.width;
	}
	if(camPanY >= bottomEdgeY - 1 - canvas.height){
		camPanY = bottomEdgeY - 1 - canvas.height;
	}
}

function shiftForCameraPan(){
	canvasContext.save();
	canvasContext.translate(-camPanX, -camPanY);
}

function finishedCameraPan(){
	canvasContext.restore();
}