var	displayTires = false;
var	displayEngine = false;
var	displayTransmission = false;
var	displayNitro = false;


function drawCarUpgradeScreen(){
	colorRect(0,0,canvas.width,canvas.height, 'black');	
	colorText("Body Shop", 310, 200, 'white', font = "24px Arial Black");
	colorRect(0,0,canvas.width,50, 'green');
	colorRect(200,400,100,50, 'white');	
	colorRect(500,400,100,50, 'white');	
	colorRect(200,300,100,50, 'white');	
	colorRect(500,300,100,50, 'white');	
	colorRect(350,500,100,50, 'yellow');
	colorText("Cash: "+vehicleList[0].cash, 50, 20, 'white', font = "14px Arial");
	colorText("Tires", 225, 430, 'black', font = "14px Arial Black");
	colorText("Engine", 520, 430, 'black', font = "14px Arial Black");
	colorText("Transmission", 202, 330, 'black', font = "12px Arial Black");
	colorText("Nitro", 525, 330, 'black', font = "14px Arial Black");
	colorText("Start Race", 355, 530, 'black', font = "12px Arial Black");
	//tires
	if(displayTires){
		for (var i = 0; i < 5; i++) {
			colorRect(630,100* i + 200,canvas.width - 620,200, 'white');	
		}
	//engine
	} else if(displayEngine){
		for (var i = 0; i < 5; i++) {
			colorRect(630,100* i + 200,canvas.width - 620,200, 'white');	
		}
	
	//transmission
	} else if(displayTransmission){
		for (var i = 0; i < 5; i++) {
			colorRect(630,100* i + 200,canvas.width - 620,200, 'white');	
		}
	//nitro
	} else if(displayNitro){
		for (var i = 0; i < 5; i++) {
			colorRect(630,100* i + 200,canvas.width - 620,200, 'white');	
		}
	}
}

function carUpgradeScreenMouseClick(mousePosX, mousePosY) {
	//main screen
	if(mousePosX > 200 && mousePosX < 300 && mousePosY > 300 && mousePosY < 350){ //Transmission
		displayTires = false;
		displayEngine = false;
		displayTransmission = true;
		displayNitro = false;
		// carUpgradeScreen = false;
	} else if(mousePosX > 500 && mousePosX < 600 && mousePosY > 300 && mousePosY < 350){ //Nitro
		displayTires = false;
		displayEngine = false;
		displayTransmission = false;
		displayNitro = true;
	} else if(mousePosX > 200 && mousePosX < 300 && mousePosY > 400 && mousePosY < 450){  // Tires  
		displayTires = true;
		displayEngine = false;
		displayTransmission = false;
		displayNitro = false;
	} else if(mousePosX > 500 && mousePosX < 600 && mousePosY > 400 && mousePosY < 450){ //Engine
		displayTires = false;
		displayEngine = true;
		displayTransmission = false;
		displayNitro = false;
	} 
	//tires
	if(displayTires){
		for (var i = 0; i < 5; i++) {
			colorRect(630,100* i + 200,canvas.width - 620,200, 'white');	
		}
	//engine
	} else if(displayEngine){
		for (var i = 0; i < 5; i++) {
			colorRect(630,100* i + 200,canvas.width - 620,200, 'white');	
		}
	
	//transmission
	} else if(displayTransmission){
		for (var i = 0; i < 5; i++) {
			colorRect(630,100* i + 200,canvas.width - 620,200, 'white');	
		}
	//nitro
	} else if(displayNitro){
		for (var i = 0; i < 5; i++) {
			colorRect(630,100* i + 200,canvas.width - 620,200, 'white');	
		}
	}



}
