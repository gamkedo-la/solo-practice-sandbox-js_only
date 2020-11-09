function Camera () {
	this.panX = undefined;
	this.panY = undefined;
	this.shakeFrames = 0;
	this.shakePower = 5;

	this.follow = function (canvas, target) {
		
		if(controlCameraForDebug) {return;}
		this.deltaCanvasCenterXWithTarget = target.centerX - (canvas.width/2); //   /scaleWidth;
		this.deltaCanvasCenterYWithTarget = target.centerY - (canvas.height/2); //   /scaleHeight;

		//if on the right half of canvas don't pan???
		// if(this.deltaCanvasCenterXWithTarget < 0)
		// {
		// 	console.log('this.deltaCanvasCenterXWithTarget: ' + this.deltaCanvasCenterXWithTarget);
		// 	this.deltaCanvasCenterXWithTarget = 0;
		// }
		// //if on the top half of canvas don't pan????
		// if(this.deltaCanvasCenterYWithTarget < 0)
		// {
		// 	console.log('this.deltaCanvasCenterYWithTarget: ' + this.deltaCanvasCenterYWithTarget);
		// 	this.deltaCanvasCenterYWithTarget = 0;
		// }
		
		var rightEdgeOfMapX = TRACK_WIDTH * NUMBER_OF_COLUMNS;
		var leftEdgeOfMapX = 0;
		var bottomEdgeOfMapY = TRACK_HEIGHT * NUMBER_OF_ROWS;
		var topEdgeOfMapY = 0;

		var lastFullCanvasWidthOnRightSideMinus1 = rightEdgeOfMapX - 1 - canvas.width;
		var lastFullCanvasHeightOnBottomSideMinus1 = bottomEdgeOfMapY - 1 - canvas.height;

		// //don't pan past right edge of screen???
		// if(this.deltaCanvasCenterXWithTarget >= lastFullCanvasWidthOnRightSideMinus1/*/scaleWidth*/  )
		// {
		// 	this.deltaCanvasCenterXWithTarget = lastFullCanvasWidthOnRightSideMinus1  /*/scaleWidth*/ ;
		// }
		// //don't pan past bottom edge of screen???
		// if(this.deltaCanvasCenterYWithTarget >= lastFullCanvasHeightOnBottomSideMinus1  /*/scaleHeight*/  )
		// {
		// 	this.deltaCanvasCenterYWithTarget = lastFullCanvasHeightOnBottomSideMinus1  /*/scaleHeight*/  ;
		// }
		if (this.deltaCanvasCenterXWithTarget > 0)
		{
			this.panX = canvas.width/2 - this.deltaCanvasCenterXWithTarget;
		}
		else if (this.deltaCanvasCenterXWithTarget < 0)
		{
			this.panX = (canvas.width/2 - this.deltaCanvasCenterXWithTarget)*-1;
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
		//ctx.translate(-this.deltaCanvasCenterXWithTarget + shakeX, -this.deltaCanvasCenterYWithTarget + shakeY);

				

	};

	this.endPan = function (ctx = canvasContext) {
		ctx.restore();
	};
}