//TileLayerManager.js
import TileLayer from './TileLayer.js';

/**
 * Provides an abstraction for management of tile layer functions
 * @typedef {Object<TileLayer[]>} TileLayerManager
 */
function TileLayerManager() {
    this.layers = [];
    /**
     * @description Adds the named tile layer to the renderer for later use.
     * @param {HTMLImageElement|HTMLCanvasElement} tileSource Image which contains all tiles for this layer.  Tile index 0 is upper left corner and should be transparent.
     * @param {string} name Name of this layer.  A convenient way to refer to this layer. Default is 'background'.
     * @param {Number} tileWidth Integer pixel width of all tiles in the tileSource image. Default is 8.
     * @param {Number} tileHeight Integer pixel height of all tiles in the tileSource image. Default is 8.
     * @param {Number} layerDepth Non-negative integer indicating position of this layer relative to the camera.  A depth of 0 is the furthest 
     * from the camera, positive values are progressively closer to the camera and occlude layers with smaller depths. Default is 0.
     */
    this.addLayer = function(tileSource, name, tileWidth, tileHeight, layerDepth) {
        const newLayer = new TileLayer(tileSource, name, tileWidth, tileHeight, layerDepth);
        for(let i = 0; i < this.layers.length; i++) {
            const layer = this.layers[i];
            if(layer.depth <= layerDepth) continue;
            if(i === this.layers.length - 1) {
                this.layers.push(newLayer);
            } else {
                this.layers.splice(i, 0, newLayer);
            }
        }
    };

    /**
     * @description Removes the named tile layer.  Frees up memory, allowing it to be garbage collected.
     * @param {string} name The name of the tile layer to remove.
     * @returns {Boolean} true if the named tile layer was successfully removed or false otherwise.
     */
    this.removeLayerWithName = function(name) {
        for(let layer of this.layers) {
            if(layer.name === name) delete this.layers[name];
            return true;
        }

        return false;
    };

    /**
     * @description returns the tile layer with the smallest depth with this name
     * @param {string} name Name of the tile layer you are retrieving.
     * @returns {TileLayer|null} The named tile layer or null if the tile layer wasn't found.
     */
    this.getLayerByName = function(name) {
        for(let layer of this.layers) {
            if(layer.name === name) return layer;
        }

        return null;
    };

    /**
     * @description Gets a tile layer based on its depth value.
     * @param {Number} depth Non-negative Integer representing the depth of the layer you are retrieving.
     * @returns {TileLayer|null} The first tile layer found at this depth (typically the first one added which has this depth value) or null if no layer was found.
     */
    this.getLayerByDepth = function(depth) {
        for(let layer of this.layers) {
            if(layer.depth === depth) return layer;
        }

        return null;
    };
}

export default TileLayerManager;