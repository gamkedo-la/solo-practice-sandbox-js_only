function Camera () {
	this.panX = 0;
	this.panY = 0;
	this.shakeFrames = 0;
	this.shakePower = 5;

	this.follow = function (canvas, target) {
		
		if(controlCameraForDebug) {return;}
		this.deltaCanvasCenterXWithTarget = target.centerX - (canvas.width/2); //   /scaleWidth;
		this.deltaCanvasCenterYWithTarget = target.centerY - (canvas.height/2); //   /scaleHeight;
		// this.verticalCenterOfCanvas = canvas.width/2;
		// this.horizontalCenterOfCanvas = canvas.height/2;

		// this.checkIfScooterIsAtVerticalCenterOfCanvas = function()
		// {
		// 	if ( Math.abs(scooter.centerX - canvas.width/2) < 10)
		// 	{
		// 		return true;
		// 	}
		// }

		// this.checkIfScooterIsAtHorizontalCenterOfCanvas = function()
		// {
		// 	if ( Math.abs(scooter.centerY - canvas.height/2) < 10)
		// 	{
		// 		return true;
		// 	}
		// }

		// if(this.deltaCanvasCenterXWithTarget < 0){
		// 	console.log('this.deltaCanvasCenterXWithTarget: ' + this.deltaCanvasCenterXWithTarget);
		// 	this.deltaCanvasCenterXWithTarget = 0;
		// }
		// if(this.deltaCanvasCenterYWithTarget < 0){
		// 	console.log('this.deltaCanvasCenterYWithTarget: ' + this.deltaCanvasCenterYWithTarget);
		// 	this.deltaCanvasCenterYWithTarget = 0;
		// }
		
		var rightEdgeOfCanvasX = TRACK_WIDTH * NUMBER_OF_COLUMNS;
		var leftEdgeOfCanvasX = 0;
		var bottomEdgeOfCanvasY = TRACK_HEIGHT * NUMBER_OF_ROWS;
		var leftEdgeOfCanvasY = 0;

		
		if(this.deltaCanvasCenterXWithTarget >= rightEdgeOfCanvasX - 1 - canvas.width  /*/scaleWidth*/  ){
			this.deltaCanvasCenterXWithTarget = (rightEdgeOfCanvasX - 1 - canvas.width)  /*/scaleWidth*/ ;
		}
		if(this.deltaCanvasCenterYWithTarget >= bottomEdgeOfCanvasY - 1 - canvas.height  /*/scaleHeight*/  ){
			this.deltaCanvasCenterYWithTarget = bottomEdgeOfCanvasY - 1 - canvas.height  /*/scaleHeight*/  ;
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
		
		if (this.deltaCanvasCenterXWithTarget > 0)
		{
			ctx.translate(-this.deltaCanvasCenterXWithTarget + shakeX, 0);
		}
		else if (this.deltaCanvasCenterXWithTarget < 0)
		{
			ctx.translate(this.deltaCanvasCenterXWithTarget + shakeX, 0);
		}

		if (this.deltaCanvasCenterYWithTarget > 0)
		{
			ctx.translate(0, -this.deltaCanvasCenterYWithTarget + shakeY);
		}
		else if (this.deltaCanvasCenterYWithTarget > 0)
		{
			ctx.translate(0, this.deltaCanvasCenterYWithTarget + shakeY);
		}
		
	};

	this.endPan = function (ctx = canvasContext) {
		ctx.restore();
	};
}