import ShaderManager from './ShaderManager.js';
import TileLayerManager from './TileLayerManager.js';
import TextureManager from './TextureManager.js';
import VertexManager from './VertexManager.js';

/**
 * @description Uses WebGL to draw tile based game with one draw call per tile layer, abstracting away the WebGL complexity.
 * @param {HTMLCanvasElement} canvas must have width and height properties already set.
 * @param {Boolean} usesBinaryAlpha If all pixels of all tiles and all sprites are either fully opaque or fully transparent set this to true
 * to take advantage of improved performance. If some pixels are partially transparent, set this to false to allow blending. Default is true.
 * @param {Number} maxsprites Integer representing the maximum number of sprites expected to be drawn to screen simultaneously.  Used to
 * set the size of the vertex array (Float32Array(8 * maxSprites)). Excludes any tile layers. Default is 50.
 * @param {Boolean} rotationAllowed Indicates whether sprites (not tiles) can rotate. Disallowing rotation simplifies the default sprite
 * shader and improves performance. Default is false.
 */
function TileRenderer(canvas, usesBinaryAlpha = true, maxsprites = 50, rotationAllowed = false) {
    this.canvas = canvas;
    const tileLayerManager = new TileLayerManager();

    //------Get WebGL context---------//
    let gl = this.canvas.getContext('webgl');
    if(!gl) {
        gl = this.canvas.getContext('experimental-webgl');
    }

    if(!gl) {
        // eslint-disable-next-line no-console
        console.error('WebGL not supported');
    }

    const shaderManager = new ShaderManager(usesBinaryAlpha, rotationAllowed);
    const vertexManager = new VertexManager(this.canvas.width, this.canvas.height);
    const textureManager = new TextureManager(gl);

    /**
     * @description Adds the named tile layer to the renderer for later use.
     * @param {HTMLImageElement|HTMLCanvasElement} tileSource Image which contains all tiles for this layer.  Tile index 0 is upper left corner and should be transparent.
     * @param {string} name Name of this layer.  A convenient way to refer to this layer. Default is 'background'.
     * @param {Number} tileWidth Integer pixel width of all tiles in the tileSource image. Default is 8.
     * @param {Number} tileHeight Integer pixel height of all tiles in the tileSource image. Default is 8.
     * @param {Number} layerDepth Non-negative integer indicating position of this layer relative to the camera.  A depth of 0 is the furthest 
     * from the camera, positive values are progressively closer to the camera and occlude layers with smaller depths. Default is 0. These depths
     * are interleaved with sprite depths. For best performance, use the fewest possible different depths as each depth requires an additional
     * draw call to the GPU.  Typically, each tile layer will require its own depth value.
     */
    this.addTileLayer = function(tileSource, name = 'background', tileWidth = 8, tileHeight = 8, layerDepth = 0) {
        const textureForLayer = textureManager.setUpTexture(tileSource);
        tileLayerManager.addLayer(tileSource, name, tileWidth, tileHeight, layerDepth);
    };

    /**
     * @description Removes the named tile layer.  Frees up memory, allowing it to be garbage collected.  Returns true if successful, false otherwise.
     * @param {string} name The name of the layer to remove.
     * @returns true if the named tile layer was successfully removed or false otherwise.
     */
    this.removeTileLayerByName = function(name) {
        return tileLayerManager.removeLayerWithName(name);
    };

    /**
     * @description This function tells the renderer which tile layers to draw this frame.  Drawing doesn't actually occur until the 'render'
     * function is called, so adding layers individually does not result in multiple draw calls.
     * @param {string} name The name of the layer to draw.
     * @param {Int16Array|Int32Array} tileIDs A typed array containing the indices for each tile to be drawn. Reuse the same
     * array, just updating the elements each frame, in order to avoid allocating new memory every frame.  The indices refer to each tile's
     * location in the tileSource image.  The first element in this array refers to the tile to be drawn in the upper left corner of the canvas.  
     * The second element in this array refers to the tile to be drawn to the right of the first element.
     * @param {Array<Number>} colorAdjust Array of three floats between -1.0 and +1.0 inclusive.  Represents the rgb values to add to the color 
     * of every tile in this layer by. Final values will be clamped to range 0.0 to +1.0 prior to rendering.
     * @param {string} shaderName The name of the shader to use to draw this layer with.
     */
    this.drawTileLayer = function(name, tileIDs, colorAdjust = [0.0, 0.0, 0.0], shaderName = 'defaultTile') {

    };

    /**
     * @description Adds the named sprite to the renderer for later use.
     * @param {string} name The name of this sprite, used as a way to refer to it later.
     * @param {HTMLImageElement|HTMLCanvasElement} image The image from which to render this sprite. For animated sprites, this may be a 
     * horizontal strip of animation frames.
     * @param {Number} frameWidth An integer specifying the width of each frame of animation for an animated sprite.  Specify the entire image
     * width for non-animated sprites.
     * @param {Number} depth Non-negative integer indicating position of this sprite relative to the camera.  A depth of 0 is the furthest 
     * from the camera, positive values are progressively closer to the camera and occlude layers with smaller depths.  Default is 1.  These
     * depth values are interleaved with layer depths.  For best performance, place sprites on the fewest possible different depths since
     * each depth requires a new draw call to the GPU.
     */
    this.addSprite = function(name, image, frameWidth, depth = 1) {

    };

    /**
     * @description This function tells the renderer which sprites to draw this frame.  Drawing doesn't actually occur until the 'render'
     * function is called, so adding sprites individually does not result in multiple draw calls.
     * @param {string} name The name of the sprite to draw.
     * @param {Number} xPos A floating point number representing the x-position (measuring from left side of the canvas, in pixels) at which to draw the sprite.
     * @param {Number} yPos A floating point number representing the y-position (measuring from the top of the canvas, in pixels) at which to draw the sprite.
     * @param {Number} frameNumber An Integer representing the frame of animation to use for animated sprites. Default is 0.
     * @param {Boolean} flipped A boolean specifying whether or not to draw this sprite flipped across its vertical axis. Default is false.
     * @param {Number} rotation A floating point value representing the degrees of clockwise rotation of this sprite. Default is 0.
     * @param {Array<Number>} colorAdjust Array of three floats between -1.0 and +1.0 inclusive.  Represents the rgb values to add to the color of this 
     * sprite. Final values will be clamped to range 0.0 to +1.0 prior to rendering.
     * @param {Number} scaleX A positive floating point value which is multiplied by the width of this sprite, affecting its rendered width. Default is 1.0.
     * @param {Number} scaleY A positive floating point value which is multiplied by the height of this sprite, affecting its rendered height. Default is 1.0.
     * @param {string} shaderName The name of the shader to use to draw this layer with.
     */
    this.drawSprite = function(name, xPos, yPos, frameNumber = 0, flipped = false, rotation = 0, colorAdjust = [0.0, 0.0, 0.0], scaleX = 1.0, scaleY = 1.0, shaderName = 'defaultSprite') {

    };

    /**
     * @description Call this function to render the specified tile layers and sprites to the canvas.  Typically this will be called once
     * per frame after all draw commands have been issued.
     */
    this.render = function() {

    };
}