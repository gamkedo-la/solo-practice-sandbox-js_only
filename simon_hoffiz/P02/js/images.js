//image loading
var imageNames = ["PlayerSpaceship.png",
					 "Shield.png"
					];
var imageLoadCounter = imageNames.length;
var imageArray = [];

function receivedImage() {
	imageLoadCounter --;
	if(imageLoadCounter <= 0) {
		startGame();
	}
}

function imageLoading() {
	for(var i=0; i < imageNames.length; i++){
		var newImg = document.createElement("img");
		newImg.onload = receivedImage;
		newImg.src = imageNames[i];
		imageArray[ imageNames[i] ] = newImg;
	}
}
