//VertexManager.js
/**
 * Creates geometry for tile layers
 * @typedef {Object} VertexManager
 * @param {Number} width Integer width of the canvas to which this layer will be drawn.
 * @param {Number} height Integer height of the canvas to which this layer will be drawn.
 */
function VertexManager(width, height) {
    /**
     * @description Keys are strings created by concatenating tileWidth, 'x', and tileheight (i.e. 8x8).
     * @type {Object.<string, Float32Array>}
     */
    const existingGeometry = {};

    /**
     * @description Creates a Float32Array containing the appropriate vertex data to render a layer of tiles filling the canvas. 
     * Returns an existing Float32Array if possible. Generally only called once per tile layer.
     * @param {TileLayer} layer The layer whose geometry is being created and returned.
     * @returns {Float32Array} The vertex data required to draw this layer.
     */
    this.getGeometryForTileLayer = function(layer) {
        const existingKey = `${layer.tileWidth}x${layer.tileHeight}`;

        if(existingGeometry[existingKey]) {
            return existingGeometry[existingKey];
        }

        const widthInQuads = Math.ceil(width / layer.tileWidth);
        const heightInQuads = Math.ceil(height / layer.tileHeight);
        const numQuads = widthInQuads * heightInQuads;
        const vertArray = new Float32Array(8 * widthInQuads * heightInQuads).fill(0);

        for(let i = 0; i < numQuads; i++) {
            const x1 = (i % widthInQuads) * 2 / widthInQuads;
            const x2 = x1 + 2/widthInQuads;
            const y1 = -(Math.floor(i / widthInQuads)) * 2 / heightInQuads;
            const y2 = y1 - 2/heightInQuads;

            vertArray[8 * i + 0] = x1;
            vertArray[8 * i + 1] = y1;

            vertArray[8 * i + 2] = x2;
            vertArray[8 * i + 3] = y1;

            vertArray[8 * i + 4] = x1;
            vertArray[8 * i + 5] = y2;

            vertArray[8 * i + 6] = x2;
            vertArray[8 * i + 7] = y2;
        }

        existingGeometry[existingKey] = vertArray;

        return vertArray;
    };
}

export default VertexManager;