//image loading
var spaceshipPic = document.createElement("img");
var spaceshipPicLoaded = false;
var alienShipPic = document.createElement("img");
var alienShipPicLoaded = false;
var shieldPic = document.createElement("img");
var shieldPicLoaded = false;

function imageLoading() {
	spaceshipPic.onload = function() {
		spaceshipPicLoaded = true;
		alienShipPicLoaded = true;
		shieldPicLoaded = true;
	}		
	spaceshipPic.src = "PlayerSpaceship.png";
	alienShipPic.src = "AlienShip.png";
	shieldPic.src = "Shield.png";
}