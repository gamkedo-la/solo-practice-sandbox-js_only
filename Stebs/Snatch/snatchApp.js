var snatchApp;

function SnatchApp()
{
	this.waitingMessage = 'Waiting for an order';
	this.currentOrderMessageLine1 = 'Joseph Roberts wants Crumble Chicken from Hannahs.';
	this.currentOrderMessageLine2 = ' Dropoff at Seasand Apartments.';

	this.currentMessageLine1 = this.waitingMessage;
	this.currentMessageLine2 = undefined;

	this.status = 'waiting';

	this.startOrderCycle = function()
	{
		let timeToNextOrder = getRandomInt(3000, 5000);
		console.log(timeToNextOrder);
		setTimeout( 
			function() 
			{
				snatchApp.status = 'picking up';
				snatchApp.currentMessageLine1 = snatchApp.currentOrderMessageLine1;
				snatchApp.currentMessageLine2 = snatchApp.currentOrderMessageLine2;
				orderAlertSFXAudioTag.play();
			}, 
			timeToNextOrder);
	}

	this.drawMessage = function()
	{
		let fontSize = 50;
		canvasContext.font = fontSize + 'px Helvetica';
		canvasContext.fillStyle = 'blue';
		let messageLine1Width = canvasContext.measureText(this.currentMessageLine1).width;
		let messageLine1StartingX = canvas.width/2 - messageLine1Width/2;
		let messageLine1StartingYWithFillTextOffset = fontSize;
		canvasContext.fillText(this.currentMessageLine1, messageLine1StartingX,messageLine1StartingYWithFillTextOffset);


		if (this.currentMessageLine2 !== undefined)
		{
			let messageLine2Width = canvasContext.measureText(this.currentMessageLine2).width;
			let messageLine2StartingX = canvas.width/2 - messageLine2Width/2;
			let messageLine2StartingYWithFillTextOffset = fontSize*2;
			canvasContext.fillText(this.currentMessageLine2, messageLine2StartingX,messageLine2StartingYWithFillTextOffset);
		}
	}
}