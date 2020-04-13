const THEMES = {
  default: {
	ground: "GROUND_TILES_DEFAULT",
	objects: "OBJECT_TILES_DEFAULT"
  },
  night: {
	ground: "GROUND_TILES_NIGHT",
	objects: "OBJECT_TILES_NIGHT"
  }
};

const imageLoader = new (function() {
  const IMAGE_DEFS = [
	{id: "carPic", src: "./images/player1.png"},
	{id: "car2Pic", src: "./images/player2.png"},
	{id: THEMES.default.ground, src: "./images/ground_tiles_default.png"},
	{id: THEMES.default.objects, src: "./images/object_tiles_default.png"},
	{id: THEMES.night.ground, src: "./images/ground_tiles_night.png"},
	{id: THEMES.night.objects, src: "./images/object_tiles_night.png"}
  ];
  const images = {};

  this.loadImages = function() {
	return Promise.all(IMAGE_DEFS.map(function(imageDef) {
	  return new Promise(function(resolve, reject) {
		const image = new Image();
		image.onload = function() {
		  resolve({id: imageDef.id, image: image});
		};
		image.onerror = function() {
		  reject(image);
		};
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
