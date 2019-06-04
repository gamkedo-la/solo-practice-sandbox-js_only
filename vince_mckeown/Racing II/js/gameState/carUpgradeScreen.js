function drawCarUpgradeScreen(){
	colorRect(0,0,canvas.width,canvas.height, 'black');	
	colorText("Body Shop", 310, 200, 'white', font = "24px Arial Black");
	colorRect(200,400,100,50, 'white');	
	colorRect(500,400,100,50, 'white');	
	colorRect(200,300,100,50, 'white');	
	colorRect(500,300,100,50, 'white');	
	colorText("Tires", 225, 430, 'black', font = "14px Arial Black");
	colorText("Engine", 520, 430, 'black', font = "14px Arial Black");
	colorText("Transmission", 202, 330, 'black', font = "12px Arial Black");
	colorText("Nitro", 525, 330, 'black', font = "14px Arial Black");
}

function carUpgradeScreenMouseClick(mousePosX, mousePosY) {
	console.log(mousePosX, mousePosY);
	if(mousePosX > 200 && mousePosX < 300 && mousePosY > 300 && mousePosY < 350){ //Transmission
		console.log('Transmission Screen');
		carUpgradeScreen = false;
	} else if(mousePosX > 500 && mousePosX < 600 && mousePosY > 300 && mousePosY < 350){ //Nitro
		console.log('Nitro Screen');
		carUpgradeScreen = false;
	} else if(mousePosX > 200 && mousePosX < 300 && mousePosY > 400 && mousePosY < 450){  // Tires  
		console.log('Tire Screen');
		carUpgradeScreen = false;
	} else if(mousePosX > 500 && mousePosX < 600 && mousePosY > 400 && mousePosY < 450){ //Engine
		console.log('Engine Screen');
		carUpgradeScreen = false;
	}
}
