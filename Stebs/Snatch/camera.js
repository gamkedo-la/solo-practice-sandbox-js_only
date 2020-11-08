function Camera () {
	this.panX = 0;
	this.panY = 0;
	this.shakeFrames = 0;
	this.shakePower = 5;

	this.follow = function (canvas, target) {
		
		if(controlCameraForDebug) {return;}
		this.panX = target.startingDrawX - (canvas.width/2); //   /scaleWidth;
		this.panY = target.startingDrawY - (canvas.height/2); //   /scaleHeight;
		if(this.panX < 0){
			this.panX = 0;
		}
		if(this.panY < 0){
			this.panY = 0;
		}
		
		var rightEdgeX = TRACK_WIDTH * NUMBER_OF_COLUMNS;
		var bottomEdgeY = TRACK_HEIGHT * NUMBER_OF_ROWS;
		
		if(this.panX >= rightEdgeX - 1 - canvas.width  /*/scaleWidth*/  ){
			this.panX = (rightEdgeX - 1 - canvas.width)  /*/scaleWidth*/ ;
		}
		if(this.panY >= bottomEdgeY - 1 - canvas.height  /*/scaleHeight*/  ){
			this.panY = bottomEdgeY - 1 - canvas.height  /*/scaleHeight*/  ;
		}
	};

	this.shakeCamera = function (newShake, newPower) {
		this.shakeFrames = newShake;
		this.shakePower = newPower;
	}

	this.startPan = function (ctx = canvasContext) {
		var shakeX = 0;
		var shakeY = 0;
		ctx.save();
		if (this.shakeFrames > 0) {
			this.shakeFrames --;
			shakeX = Math.floor(Math.random() * 3 - 1) * this.shakePower;
			shakeY = Math.floor(Math.random() * 3 - 1) * this.shakePower;
		}
		ctx.translate(-this.panX + shakeX, -this.panY + shakeY);
	};

	this.endPan = function (ctx = canvasContext) {
		ctx.restore();
	};
}