//Sprite.js
/**
 * Calculates and retains all data necessary to draw a sprite, including vertex and texture coordinate data.
 * @typedef {Object} Sprite
 * @param {string} name A convenient name to refer to this Sprite.
 * @param {HTMLImageElement|HTMLCanvasElement} image The image containing the pixel data for this Sprite. For animated Sprites, all frames of
 * animation must be on a single row. This image may support more than just this Sprite (i.e. can use a sprite atlas, but this object only creates
 * one Sprite).
 * @param {Number} left Integer representing the pixel position of the left-most edge of this Sprite in the image. Default is 0.
 * @param {Number} top Integer representing the pixel position of the top of this Sprite in the image. Default is 0.
 * @param {Number} frameWidth Width of all frames of this Sprite.
 * @param {Number} frameHeight Height of all frames of this Sprite.
 * @param {Number} frameCount The number of animation frames for this Sprite, use 1 for static Sprites. Default is 1.
 * @param {Number} depth Non-negative integer indicating position of this Sprite relative to the camera.  A depth of 0 is the furthest from the camera, positive values are progressively closer to the camera and occlude layers with smaller depths. Default is 1. These depths are interleaved with tile layer depths. For best performance, use the fewest possible different depths as each depth requires an additional draw call to the GPU.  Typically, all characters and interactable Sprites will share a depth.
 */
function Sprite(name, image, left = 0, top = 0, frameWidth, frameHeight, frameCount = 1, depth = 1) {
    const VERTS_PER_SPRITE = 4;

    this.name = name;
    this.image = image;
    this.left = left;
    this.top = top;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameCount = frameCount;
    this.depth = depth;

    this.leftTexCoord = left / this.image.width;
    this.texFrameWidth = this.frameWidth / this.image.width;
    this.topTexCoord = top / this.image.height;
    this.texFrameHeight = this.frameHeight / this.image.height;

    let lastTexZeroIndex = null;
    let lastFrameNumber = null;
    let lastFlipX = null;
    let lastFlipY = null;
    let lastVertZeroIndex = null;
    let lastScaleX = null;
    let lastScaleY = null;
    let lastIndexZeroIndex = null;

    /**
     * @description Used to set the texture coordinates for this Sprite using the provided image.
     * @param {Number} frameNumber Which frame of the animation to draw. Default is 0.
     * @param {Boolean} flipX Indicates whether or not to flip this Sprite horizontally (across its vertical axis). Default is false.
     * @param {Boolean} flipY Indicates whether or not to flip this Sprite vertically (across its horizontal axis). Default is false.
     * @param {Number} zeroIndex The integer index in the coordArray at which to start inserting this Sprite's texture coordinate data.
     * @param {Float32Array} coordArray A reference to the array where texture coordinate data is stored. Effectively and in/out variable.
     */
    this.setTexCoords = function(frameNumber = 0, flipX = false, flipY = false, zeroIndex, coordArray) {
        if((lastFrameNumber === frameNumber) &&
           (lastFlipX === flipX) &&
           (lastFlipY === flipY) &&
           (lastTexZeroIndex === zeroIndex)) return;
        
        lastFrameNumber = frameNumber;
        lastTexZeroIndex = zeroIndex;
        lastFlipX = flipX;
        lastFlipY = flipY;

        let x1, x2, y1, y2;
        
        if(flipX) {
            x2 = left + frameNumber * this.texFrameWidth;
            x1 = x2 + this.texFrameWidth;
        } else {
            x1 = left + frameNumber * this.texFrameWidth;
            x2 = x1 + this.texFrameWidth;
        }

        if(flipY) {
            y2 = this.topTexCoord;
            y1 = y2 + this.texFrameHeight;
        } else {
            y1 = this.topTexCoord;
            y2 = y1 + this.texFrameHeight;
        }

        //first vertex (upper left)
        coordArray[zeroIndex + 0] = x1;
        coordArray[zeroIndex + 1] = y1;
        //second vertex (upper right)
        coordArray[zeroIndex + 2] = x2;
        coordArray[zeroIndex + 3] = y1;
        //third vertex (lower left)
        coordArray[zeroIndex + 4] = x1;
        coordArray[zeroIndex + 5] = y2;
        //fourth vertex (lower right)
        coordArray[zeroIndex + 6] = x2;
        coordArray[zeroIndex + 7] = y2;
    };

    /**
     * @description Used to set the vertex data for this Sprite.
     * @param {Number} scaleX Non-negative float value to multiply the Sprite's width by (zero will make the Sprite not appear on screen). Use the flipX parameter to flip the Sprite horizontally rather than using negative scale values.
     * @param {Number} scaleY Non-negative float value to multiply the Sprite's height by (zero will make the Sprite not appear on screen). Use the flipY parameter to flip the Sprite vertically rather than using negative scale values.
     * @param {Number} zeroIndex The integer index in the vertexArray at which to start inserting this Sprite's vertex data.
     * @param {Float32Array} vertexArray A reference to the array where vertex data is stored. Effectively and in/out variable.
     * @param {Number} width Integer width of the canvas to which this Sprite will be drawn.
     * @param {Number} height Integer height of the canvas to which this Sprite will be drawn.
     */
    this.setVertexGeometry = function(scaleX, scaleY, zeroIndex, vertexArray, width, height) {
        if((lastScaleX === scaleX) &&
           (lastScaleY === scaleY) &&
           (lastVertZeroIndex === zeroIndex)) return;

        lastScaleX = scaleX;
        lastScaleY = scaleY;
        lastVertZeroIndex = zeroIndex;

        const x1 = 0.0;
        const x2 = scaleX * (this.frameWidth * 2.0 / (width));
        const y1 = scaleY;
        const y2 = scaleY * (1.0 - this.frameHeight * 2.0 / (height));

        vertexArray[zeroIndex + 0] = x1;
        vertexArray[zeroIndex + 1] = y1;
        vertexArray[zeroIndex + 2] = x2;
        vertexArray[zeroIndex + 3] = y1;
        vertexArray[zeroIndex + 4] = x1;
        vertexArray[zeroIndex + 5] = y2;
        vertexArray[zeroIndex + 6] = x2;
        vertexArray[zeroIndex + 7] = y2;
    };

    this.setIndices = function(zeroIndex, indexArray) {
        if(lastIndexZeroIndex === zeroIndex) return;

        lastIndexZeroIndex = zeroIndex;

        indexArray[6 * zeroIndex + 0] = (0 + zeroIndex * VERTS_PER_SPRITE);
        indexArray[6 * zeroIndex + 1] = (3 + zeroIndex * VERTS_PER_SPRITE);
        indexArray[6 * zeroIndex + 2] = (1 + zeroIndex * VERTS_PER_SPRITE);
        indexArray[6 * zeroIndex + 3] = (0 + zeroIndex * VERTS_PER_SPRITE);
        indexArray[6 * zeroIndex + 4] = (2 + zeroIndex * VERTS_PER_SPRITE);
        indexArray[6 * zeroIndex + 5] = (3 + zeroIndex * VERTS_PER_SPRITE);
    };
}

export default Sprite;