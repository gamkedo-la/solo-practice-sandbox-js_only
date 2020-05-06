function drawCombatScreen(){
	drawCombatScreenBackground();
	drawLocationsBackground();
}

function drawCombatScreenBackground(){
	let border = 1;
	let topScreenHeight = 50;
	let bottomScreenHeight = 200;
	let combatAreaHeight = canvas.height - topScreenHeight - bottomScreenHeight;
	colorRect(0, 0, canvas.width, canvas.height, 'black'); //background
	colorRect(border, border, canvas.width - (2 * border), topScreenHeight - (2 * border), 'white'); //top
	colorRect(border, topScreenHeight + border, (canvas.width * 2/3) - (2 * border), combatAreaHeight - (2 * border), 'white'); //left
	colorRect((canvas.width * 2/3) + border, topScreenHeight + border, (canvas.width * 1/3) - (2 * border), combatAreaHeight - (2 * border), 'white'); //right
	colorRect(border, topScreenHeight + combatAreaHeight + border, canvas.width - (2 * border), bottomScreenHeight - (2 * border), 'white'); //bottom
}

function drawLocationsBackground(){
	let enemyTerrainPictureX = 10;
	let terrainPictureY = 60;
	let playerTerrainPictureX = canvas.width - 254;
	let warriorX = canvas.width - 100;
	let warriorY = 110;
	canvasContext.drawImage(forestPic, enemyTerrainPictureX, terrainPictureY);
	canvasContext.drawImage(playerForestPic, playerTerrainPictureX, terrainPictureY);
	for (var i = 0; i < 4; i++){
		canvasContext.drawImage(warriorPic, warriorX, warriorY + (i * 50)+40);
		colorText("HP 50/50", warriorX + 40, warriorY + (i * 50 + 55), "black", "10px Arial Black");
		colorText("MP 20/20", warriorX + 40, warriorY + (i * 50 + 70), "black", "10px Arial Black");
		colorText("Warrior " + (i + 1), warriorX + 40, warriorY + (i * 50 + 90), "green", "10px Arial Black");
	}
}


