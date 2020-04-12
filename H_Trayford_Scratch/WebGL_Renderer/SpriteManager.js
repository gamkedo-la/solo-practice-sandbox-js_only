//SpriteManager.js
import Sprite from './Sprite.js';

/**
 * Manages the creation and updating of Sprites, retains the vertex and texture coordinate arrays for where and how to draw them.
 * @typedef {Object} SpriteManager
 * @param {Number} maxSprites Integer representing the maximum number of Sprites to be drawn simultaneously, excludes tiles in tile layers.
 * @param {Number} canvasWidth Integer width of the canvas to which the Sprites will be drawn.
 * @param {Number} canvasHeight Integer height of the canvas to which the Sprites will be drawn.
 */
function SpriteManager(maxSprites, canvasWidth, canvasHeight) {
    /**
     * @type {Float32Array}
     * @description Typed array of vertex data sized to accommodate maxSprites number of sprites.
     */
    this.spriteGeometry = new Float32Array(8 * maxSprites).fill(0);

    /**
     * 
     */
    this.spriteTextureCoordinates = new Float32Array(8 * maxSprites).fill(0);

    /**
     * @type {Sprite[]}
     */
    this.sprites = [];

    this.addSprite = function(name, image, left = 0, top = 0, frameWidth, frameHeight, frameCount = 1) {
        const aNewSprite = new Sprite(name, image, left, top, frameWidth, frameHeight, frameCount);
        aNewSprite.setTexCoords(0, 8 * this.sprites.length, this.spriteTextureCoordinates);
        aNewSprite.setVertexGeometry(8 * this.sprites.length, this.spriteGeometry, canvasWidth, canvasHeight);
        this.sprites.push(aNewSprite);
    };

    this.drawSprite = function() {

    };

    this.removeSprite = function(name) {

    };
}

export default SpriteManager;