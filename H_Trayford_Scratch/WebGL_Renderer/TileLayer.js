//TileLayer.js
/**
 * Collects all data necessary to render a layer of tiles to the canvas.
 * @typedef {Object<string, Number, Number, HTMLImageElement|HTMLCanvasElement, Number>} TileLayer
 * @param {string} name Name of this layer.  A convenient way to refer to this layer.
 * @param {Number} tileWidth Integer representing the width in pixels of every tile for this layer.
 * @param {Number} tileHeight Integer representing the height in pixels of every tile for this layer.
 * @param {HTMLImageElement|HTMLCanvasElement} tileSource Image containing all of the tiles for this layer.
 * @param {Number} depth Non-Negative Integer representing how far from the camera this layer is.  0 is the furthest from the camera.
 * Successively higher integers are closer to the camera and occlude layers with depths closer to zero.
 */
function TileLayer(tileSource, name, tileWidth, tileHeight, depth) {//tileSource, name, tileWidth, tileHeight, layerDepth
    this.tileSource = tileSource;
    this.name = name;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.depth = depth;
    this.sourceWidthInTiles = tileSource.width / tileWidth;
    this.sourceHeightInTiles = tileSource.height / tileHeight;
}

export default TileLayer;