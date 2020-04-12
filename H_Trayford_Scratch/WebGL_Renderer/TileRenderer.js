import ShaderManager from './ShaderManager.js';
import TileLayerManager from './TileLayerManager.js';
import TextureManager from './TextureManager.js';
import VertexManager from './VertexManager.js';
import SpriteManager from './SpriteManager.js';

/**
 * @description Uses WebGL to draw tile based game with one draw call per tile layer, abstracting away the WebGL complexity.
 * @param {HTMLCanvasElement} canvas must have width and height properties already set.
 * @param {Boolean} usesBinaryAlpha If all pixels of all tiles and all sprites are either fully opaque or fully transparent set this to true to take advantage of improved performance. If some pixels are partially transparent, set this to false to allow blending. Default is true.
 * @param {Number} maxSprites Integer representing the maximum number of sprites expected to be drawn to screen simultaneously.  Used to set the size of the vertex array (Float32Array(8 * maxSprites)). Excludes any tile layers. Default is 50.
 * @param {Boolean} rotationAllowed Indicates whether sprites (not tiles) can rotate. Disallowing rotation simplifies the default sprite shader and improves performance. Default is false.
 */
function TileRenderer(canvas, usesBinaryAlpha = true, maxSprites = 50, rotationAllowed = false) {
    this.canvas = canvas;

    //------Get WebGL context---------//
    let gl = this.canvas.getContext('webgl');
    if(!gl) {
        gl = this.canvas.getContext('experimental-webgl');
    }

    if(!gl) {
        // eslint-disable-next-line no-console
        console.error('WebGL not supported');
    }

    const tileLayerManager = new TileLayerManager();
    const spriteManager = new SpriteManager(maxSprites, this.canvas.width, this.canvas.height);
    const shaderManager = new ShaderManager(gl, rotationAllowed);
    const vertexManager = new VertexManager(this.canvas.width, this.canvas.height);
    const textureManager = new TextureManager(gl);

    /**
     * @description Adds the named tile layer to the renderer for later use.
     * @param {HTMLImageElement|HTMLCanvasElement} tileSource Image which contains all tiles for this layer.  Tile index 0 is upper left corner and should be transparent.
     * @param {string} name Name of this layer.  A convenient way to refer to this layer. Default is 'background'.
     * @param {Number} tileWidth Integer pixel width of all tiles in the tileSource image. Default is 8.
     * @param {Number} tileHeight Integer pixel height of all tiles in the tileSource image. Default is 8.
     * @param {Number} layerDepth Non-negative integer indicating position of this layer relative to the camera.  A depth of 0 is the furthest from the camera, positive values are progressively closer to the camera and occlude layers with smaller depths. Default is 0. These depths are interleaved with sprite depths. For best performance, use the fewest possible different depths as each depth requires an additional draw call to the GPU.  Typically, each tile layer will require its own depth value.
     */
    this.addTileLayer = function(tileSource, name = 'background', tileWidth = 8, tileHeight = 8, layerDepth = 0) {
        const textureForLayer = textureManager.setUpTexture(tileSource);
        tileLayerManager.addLayer(tileSource, name, tileWidth, tileHeight, layerDepth);
    };

    /**
     * @description Removes the named tile layer.  Frees up memory, allowing it to be garbage collected.  Returns true if successful, false otherwise.
     * @param {string} name The name of the layer to remove.
     * @returns {Boolean} true if the named tile layer was successfully removed or false otherwise.
     */
    this.removeTileLayerByName = function(name) {
        return tileLayerManager.removeLayerWithName(name);
    };

    /**
     * @description This function tells the renderer which tile layers to draw this frame.  Drawing doesn't actually occur until the 'render' function is called, so adding layers individually does not result in multiple draw calls.
     * @param {string} name The name of the layer to draw.
     * @param {Int16Array|Int32Array} tileIDs A typed array containing the indices for each tile to be drawn. Reuse the same array, just updating the elements each frame, in order to avoid allocating new memory every frame.  The indices refer to each tile's location in the tileSource image.  The first element in this array refers to the tile to be drawn in the upper left corner of the canvas. The second element in this array refers to the tile to be drawn to the right of the first element.
     * @param {Array<Number>} colorAdjust Array of three floats between -1.0 and +1.0 inclusive.  Represents the rgb values to add to the color of every tile in this layer by. Final values will be clamped to range 0.0 to +1.0 prior to rendering.
     * @param {string} shaderName The name of the shader to use to draw this layer with.
     */
    this.drawTileLayer = function(name, tileIDs, colorAdjust = [0.0, 0.0, 0.0], shaderName = 'defaultTile') {

    };

    /**
     * @description Adds the named sprite to the renderer for later use.
     * @param {string} name The unique name of this Sprite. Must be unique, reusing the same name will overwrite the existing Sprite.
     * @param {HTMLImageElement|HTMLCanvasElement} image The image from which to render this sprite. For animated sprites, this may be a horizontal strip of animation frames.
     * @param {Number} frameWidth An integer specifying the width of each frame of animation for an animated sprite.  Specify the entire image width for non-animated sprites.
     * @param {Number} depth Non-negative integer indicating position of this sprite relative to the camera.  A depth of 0 is the furthest from the camera, positive values are progressively closer to the camera and occlude layers with smaller depths.  Default is 1.  These depth values are interleaved with layer depths.  For best performance, place sprites on the fewest possible different depths since each depth requires a new draw call to the GPU.
     */
    this.addSprite = function(name, image, left = 0, top = 0, frameWidth, frameHeight, frameCount = 1, depth = 1) {
        spriteManager.addSprite(name, image, left, top, frameWidth, frameHeight, frameCount, depth);
    };

    /**
     * @description This function tells the renderer which sprites to draw this frame.  Drawing doesn't actually occur until the 'render' function is called, so adding sprites individually does not result in multiple draw calls.
     * @param {string} name The unique name of the Sprite which will be drawn using the supplied parameters.
     * @param {Number} xPos The pixel position of the left side of this Sprite measured from the left edge of the canvas.
     * @param {Number} yPos The pixel position of the top of this Sprite measured from the top of the canvas.
     * @param {Number} frameNumber An integer referring to which frame of animation to use when drawing this Sprite. Use 0 for static Sprites. Default is 0.
     * @param {Boolean} flipX Indicates whether or not to flip this Sprite horizontally (across its vertical axis). Default is false.
     * @param {Boolean} flipY Indicates whether or not to flip this Sprite vertically (across its horizontal axis). Default is false.
     * @param {Number} rotation Angle (in degrees) of rotation to draw this Sprite at. Rotation occurs around the Sprite's center. Default is 0.
     * @param {Number[]} colorAdjust RGB values between -1 and +1 inclusive to add to the base values of this Sprite. Final RGB values of the Sprite will be clamped to 0 to 1 inclusive during rendering.  Can be used to cause a Sprite to flash brightly or to add a red hue for example.
     * @param {Number} scaleX Non-negative float value to multiply the Sprite's width by (zero will make the Sprite not appear on screen). Use the flipX parameter to flip the Sprite horizontally rather than using negative scale values.
     * @param {Number} scaleY Non-negative float value to multiply the Sprite's height by (zero will make the Sprite not appear on screen). Use the flipY parameter to flip the Sprite vertically rather than using negative scale values.
     * @param {string} shaderName The name of the shader to use when rendering this Sprite. Minimizing the number of different shaders used to render Sprites will improve performance.
     */
    this.drawSprite = function(name, xPos, yPos, frameNumber = 0, flipX = false, flipY = false, rotation = 0, colorAdjust = [0.0, 0.0, 0.0], scaleX = 1.0, scaleY = 1.0, shaderName = 'defaultSprite') {

    };

    /**
     * @description Call this function to render the specified tile layers and sprites to the canvas.  Typically this will be called once per frame after all draw commands have been issued.
     */
    this.render = function() {

    };
}

export default TileRenderer;