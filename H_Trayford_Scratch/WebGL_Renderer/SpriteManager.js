//SpriteManager.js
import Sprite from './Sprite.js';

/**
 * Manages the creation and updating of Sprites, retains the vertex and texture coordinate arrays for where and how to draw them.
 * @typedef {Object} SpriteManager
 * @param {Number} maxSprites Integer representing the maximum number of Sprites to be drawn simultaneously, excludes tiles in tile layers.
 * @param {Number} canvasWidth Integer width of the canvas to which the Sprites will be drawn.
 * @param {Number} canvasHeight Integer height of the canvas to which the Sprites will be drawn.
 * @param {ShaderManager} shaderManager Used to get gl location information for the shaders used to draw Sprites.
 */
function SpriteManager(maxSprites, canvasWidth, canvasHeight) {
    /**
     * @type {Float32Array}
     * @description Typed array of vertex data sized to accommodate maxSprites number of sprites. There are four vertexes per Sprite with x and y values for each vertex, so this array is sized 8 * maxSprites.
     */
    this.spriteGeometry = new Float32Array(8 * maxSprites).fill(0);

    /**
     * @type {Float32Array}
     * @description Typed array of texture coordinate data. Each of the four vertexes per Sprite requires a (u, v) texture coordinate, so there are four coorinates (eight values) per Sprite. Size is 8 * maxSprites.
     */
    this.spriteTextureCoordinates = new Float32Array(8 * maxSprites).fill(0);

    /**
     * @type {Int16Array}
     * @description Typed array which contains the indices into the spriteGeometry and spriteTextureCoordinates arrays to use to draw each of the two triangles used to draw a Sprite.  Two triangles, with one value at each point is six points.  Size is 6 * maxSprites.
     */
    this.spriteIndices = new Int16Array(6 * maxSprites).fill(0);
    /**
     * @description The full list of all Sprites which have been added (but not removed).
     * @type {Object.<string, Sprite>}
     */
    this.sprites = {};

    /**
     * @description The list of sprites to draw this frame.
     * @type {Sprite[]}
     */
    this.spritesToDraw = [];

    /**
     * @description Adds the named Sprite, making it available for drawing.
     * @param {string} name Unique name for this Sprite.  Reusing an existing name will overwrite the existing Sprite with this one.
     * @param {HTMLImageElement|HTMLCanvasElement} image The image containing this Sprite's frame(s).
     * @param {Number} left Integer pixel position of the left-most edge of this Sprite's horizontal strip of animation frames. Measured from the left edge of the image. Default is 0.
     * @param {Number} top Integer pixel position of the top of this Sprite's horizontal strip of animation frames. Measured from the top of the image. Default is 0.
     * @param {Number} frameWidth Integer pixel width of every frame of this Sprite's animation.
     * @param {Number} frameHeight Integer pixel height of every frame of this Sprite's animation.
     * @param {Number} frameCount Integer number of animation frames for this Sprite. Default is 1 (i.e. a static image).
     * @param {Number} depth Non-negative integer indicating position of this Sprite relative to the camera.  A depth of 0 is the furthest from the camera, positive values are progressively closer to the camera and occlude layers with smaller depths. Default is 1. These depths are interleaved with tile layer depths. For best performance, use the fewest possible different depths as each depth requires an additional draw call to the GPU.  Typically, all characters and interactable Sprites will share a depth.
     */
    this.addSprite = function(name, image, left = 0, top = 0, frameWidth, frameHeight, frameCount = 1, depth = 1) {
        const aNewSprite = new Sprite(name, image, left, top, frameWidth, frameHeight, frameCount, depth);
        this.sprites[name] = aNewSprite;
    };
    /**
     * @description Sets up the named Sprite to be drawn this frame. Does not do any actual drawing, so adding them individually does not result in
     * multiple draw calls.
     * @param {string} name The unique name of the Sprite which will be drawn using the supplied parameters.
     * @param {Number} frameNumber An integer referring to which frame of animation to use when drawing this Sprite. Use 0 for static Sprites. Default is 0.
     * @param {Boolean} flipX Indicates whether or not to flip this Sprite horizontally (across its vertical axis). Default is false.
     * @param {Boolean} flipY Indicates whether or not to flip this Sprite vertically (across its horizontal axis). Default is false.
     * @param {Number} rotation Angle (in degrees) of rotation to draw this Sprite at. Rotation occurs around the Sprite's center. Default is 0.
     * @param {Number[]} colorAdjust RGB values between -1 and +1 inclusive to add to the base values of this Sprite. Final RGB values of the Sprite will be clamped to 0 to 1 inclusive during rendering.  Can be used to cause a Sprite to flash brightly or to add a red hue for example.
     * @param {Number} scaleX Non-negative float value to multiply the Sprite's width by (zero will make the Sprite not appear on screen). Use the flipX parameter to flip the Sprite horizontally rather than using negative scale values.
     * @param {Number} scaleY Non-negative float value to multiply the Sprite's height by (zero will make the Sprite not appear on screen). Use the flipY parameter to flip the Sprite vertically rather than using negative scale values.
     * @param {string} shaderName The name of the shader to use when rendering this Sprite. Minimizing the number of different shaders used to render Sprites will improve performance.
     */
    this.drawSprite = function(name, frameNumber = 0, flipX = false, flipY = false, rotation = 0, colorAdjust = [0.0, 0.0, 0.0], scaleX = 1.0, scaleY = 1.0, shaderName = 'defaultSprite') {
        const thisSprite = this.sprites[name];
        if(thisSprite) {
            const numSpritesToDraw = Object.keys(this.numSpritesToDraw).length;
            thisSprite.setTexCoords(frameNumber, flipX, flipY, 8 * numSpritesToDraw, this.spriteTextureCoordinates);
            thisSprite.setVertexGeometry(scaleX, scaleY, 8 * numSpritesToDraw, this.spriteGeometry, canvasWidth, canvasHeight);
            this.spritesToDraw.push(thisSprite);
        }
    };

    /**
     * @description Removes the named Sprite from the list of sprites, making room for other sprites without exceeding maxSprites.
     * @param {string} name the name of the Sprite to remove.
     * @returns {Boolean} true if the named Sprite was found and removed, false otherwise.
     */
    this.removeSprite = function(name) {
        for(let i = 0; i < this.sprites.length; i++) {
            const aSprite = this.sprites[i];
            if(aSprite.name === name) {
                this.sprites.splice(i,1);
                return true;
            }
        }

        return false;
    };

    /**
     * @description Used to notify the SpriteManager that rendering has occurred and this.spritesToDraw should be cleared.
     */
    this.didRender = function() {
        this.spritesToDraw = [];
    };
}

export default SpriteManager;