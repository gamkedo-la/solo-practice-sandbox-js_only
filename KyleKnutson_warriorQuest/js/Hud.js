


var hudClass = function(whichWarrior) {

	this.health = 6;
	this.maxHealth = 6;
	this.healthPosition = {x:50, y:50}

	// this.hearts = 3;
	this.heartSpacing = 10;

	this.flashEffect = function(flashColor) {
		var body = document.getElementById("the-body");
		var prevColor = body.style.color;
		
		body.style.backgroundColor = flashColor;
		setTimeout(function(){ body.style.backgroundColor = prevColor; }
			,100)
	};


	// function accepts string "full" -OR- number
	this.restoreHealth = function(healthRestored) {
		if(healthRestored == 'full') {  this.health = this.maxHealth; }
		else if(this.health == this.maxHealth) { return }  
		else{ this.health += healthRestored; }
	}


	this.reduceHealth = function(damage) {
		// damage should be an integer 
		if(isInvincible == false) {
			this.health-= damage;

			// When player loses all hearts, GameOver, start/load the level again.
			if(this.health <= 0) {
				this.restoreHealth('full');
				loadLevel(roomTwo);

			}
			isInvincible = true;
			console.log(isInvincible, "Blue Warrior is IMMORTAL")

			this.flashEffect('red');

			setTimeout(function() {
				isInvincible = false;
				console.log(isInvincible, "Blue Warrior is MORTAL")
			}, 1500)

		}
			
		console.log(this.health)
	};


	this.draw = function() {
		// drawing health GUI
		var remainder;
		for(i = 1; i < this.health+1; i++) {
			remainder = i % 2;
			if(remainder != 0) {
				drawBitmapCenteredWithRotation(leftHalfHeart, this.healthPosition.x + this.heartSpacing*i ,this.healthPosition.y, 0)
			} else {
				drawBitmapCenteredWithRotation(rightHalfHeart, this.healthPosition.x + this.heartSpacing*i ,this.healthPosition.y, 0)	
			}
		}

		// var i = 1;
		// if(this.health == 1) {
		// 	drawBitmapCenteredWithRotation(halfHeartHealth, this.healthPosition.x + this.heartSpacing*i ,this.healthPosition.y, 0);
		// 	return;

		// } else{
		// 	for(var i = 2; i < this.health; i++) {
		// 		var remainder = i % 2;
		// 		if(remainder == 0) {
		// 			drawBitmapCenteredWithRotation(heartHealth, this.healthPosition.x + this.heartSpacing*i ,this.healthPosition.y, 0);
		// 		} else if (remainder != 0 && i < this.health) { 
		// 			return; 
		// 		} else {drawBitmapCenteredWithRotation(halfHeartHealth, this.healthPosition.x + this.heartSpacing*i ,this.healthPosition.y, 0);}
				
		// 	}
		// }
		
	}

}