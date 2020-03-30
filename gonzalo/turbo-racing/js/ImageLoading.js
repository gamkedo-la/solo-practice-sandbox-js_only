const imageLoader = new (function() {
  const IMAGE_DEFS = [
	{id: "carPic", src: "./images/player1.png"},
	{id: "car2Pic", src: "./images/player2.png"},
	{id: "GROUND_TILES_DEFAULT", src: "./images/ground_tiles_default.png"},
	{id: "OBJECT_TILES_DEFAULT", src: "./images/object_tiles_default.png"}
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
