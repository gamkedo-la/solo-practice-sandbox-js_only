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
 */
function Sprite(name, image, left = 0, top = 0, frameWidth, frameHeight, frameCount = 1) {
    this.name = name;
    this.image = image;
    this.left = left;
    this.top = top;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameCount = frameCount;

    this.leftTexCoord = left / this.image.width;
    this.texFrameWidth = this.frameWidth / this.image.width;
    this.topTexCoord = top / this.image.height;
    this.texFrameHeight = this.frameHeight / this.image.height;

    /**
     * @description Used to set the texture coordinates for this Sprite using the provided image.
     * @param {Number} frameNumber Which frame of the animation to draw. Default is 0.
     * @param {Number} zeroIndex The integer index in the coordArray at which to start inserting this Sprite's texture coordinate data.
     * @param {Float32Array} coordArray A reference to the array where texture coordinate data is stored. Effectively and in/out variable.
     */
    this.setTexCoords = function(frameNumber = 0, zeroIndex, coordArray) {
        const x1 = left + frameNumber * this.texFrameWidth;
        const x2 = x1 + this.texFrameWidth;
        const y1 = this.topTexCoord;
        const y2 = y1 + this.texFrameHeight;

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
     * @description Used to set the vertex data for this Sprite using the supplied xPos, yPos.
     * @param {Number} zeroIndex The integer index in the vertexArray at which to start inserting this Sprite's vertex data.
     * @param {Float32Array} vertexArray A reference to the array where vertex data is stored. Effectively and in/out variable.
     * @param {Number} width Integer width of the canvas to which this Sprite will be drawn.
     * @param {Number} height Integer height of the canvas to which this Sprite will be drawn.
     */
    this.setVertexGeometry = function(zeroIndex, vertexArray, width, height) {
        const x1 = 0.0;
        const x2 = this.frameWidth * 2.0 / (width);
        const y1 = 1.0;
        const y2 = 1.0 - this.frameHeight * 2.0 / (height);

        vertexArray[zeroIndex + 0] = x1;
        vertexArray[zeroIndex + 1] = y1;
        vertexArray[zeroIndex + 2] = x2;
        vertexArray[zeroIndex + 3] = y1;
        vertexArray[zeroIndex + 4] = x1;
        vertexArray[zeroIndex + 5] = y2;
        vertexArray[zeroIndex + 6] = x2;
        vertexArray[zeroIndex + 7] = y2;
    };
}

export default Sprite;