const imageLoader = new (function() {
	const IMAGE_DEFS = [
		{id: "carPic", src: "./images/player1.png"},
		{id: "car2Pic", src: "./images/player2.png"},
		{id: "TRACK_ROAD", src: "./images/track_road.png"},
		{id: "TRACK_WALL", src: "./images/track_wall.png"},
		{id: "TRACK_WALL_SIDE", src: "./images/track_wall_side.png"},
		{id: "TRACK_WALL_SE", src: "./images/track_wall_SE.png"},
		{id: "TRACK_WALL_SW", src: "./images/track_wall_SW.png"},
		{id: "TRACK_WALL_NE", src: "./images/track_wall_NE.png"},
		{id: "TRACK_WALL_NW", src: "./images/track_wall_NW.png"},
		{id: "TRACK_WALL_JOIN", src: "./images/wall_join_N.png"},
		{id: "TRACK_GOAL", src: "./images/track_goal.png"},
		{id: "TRACK_TREE", src: "./images/track_tree.png"},
		{id: "TRACK_FLAG", src: "./images/track_flag.png"},
		{id: "TRACK_GRASS", src: "./images/track_grass.png"},
		{id: "TRACK_OIL", src: "./images/track_oil.png"},
		{id: "TRACK_PILLAR", src: "./images/track_pillar.png"},
		{id: "TRACK_PILLAR_E", src: "./images/track_pillar_e.png"},
		{id: "TRACK_PILLAR_W", src: "./images/track_pillar_w.png"}
	];
	const images = {};

	this.loadImages = function() {
		return Promise.all(IMAGE_DEFS.map(function(imageDef) {
			return new Promise(function(resolve, reject) {
				const image = new Image();
				image.onload = function() {
					resolve({id: imageDef.id, image: image});
				}
				image.onerror = function() {
					reject(image);
				}
				image.src = imageDef.src;
			});
		})).then(function(values) {
			values.forEach(function(value) {
				images[value.id] = value.image;
			});
			Object.freeze(images);
		});
	};

	this.getImage = function(id) {
		return images[id];
	};

	this.getAllImages = function() {
		return images;
	};
})();
