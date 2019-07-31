const imageLoader = new (function() {
	let picsToLoad = 0;
	const imageData = {};
	const countLoadedImage = function() {
		if (picsToLoad > 0) {
			picsToLoad--;
			if (picsToLoad <= 0) {
				// TODO: fire event here instead
				loadingDoneSoStartGame();
			}
		}
	};

	this.registerImage = function(name, filePath) {
		imageData[name] = {
			img: document.createElement("img"),
			path: filePath
		}; // TODO: don't create image element if name is already in imageData
		imageData[name].img.onload = countLoadedImage;
		picsToLoad++;
		return this;
	};

	this.registerImages = function (namesAndPaths) {
		for (let i=0; i<namesAndPaths.length; i++){
			this.registerImage(namesAndPaths[i].name, namesAndPaths[i].path);
		}
		return this;
	}

	this.loadImages = function() {
		for (const data of Object.values(imageData)) {
			data.img.src = data.path;
		}
		return this;
	}

	this.getImage = function(name) {
		return imageData[name].img;
	}

	this.getAllImages = function() {
		return imageData;
	}
})();

imageLoader.registerImages([
	{name: "carPic", path: "./images/player1.png"},
	{name: "car2Pic", path: "./images/player2.png"},
	{name: "TRACK_ROAD", path: "./images/track_road.png"},
	{name: "TRACK_WALL", path: "./images/track_wall.png"},
	{name: "TRACK_GOAL", path: "./images/track_goal.png"},
	{name: "TRACK_TREE", path: "./images/track_tree.png"},
	{name: "TRACK_FLAG", path: "./images/track_flag.png"},
	{name: "TRACK_GRASS", path: "./images/track_grass.png"},
	{name: "TRACK_OIL", path: "./images/track_oil.png"}
]);

const trackPics = Object.entries(imageLoader.getAllImages()).filter(function(entry) {
	return entry[0].startsWith('TRACK');
}).map(function(entry) {
	return entry[1].img;
});
