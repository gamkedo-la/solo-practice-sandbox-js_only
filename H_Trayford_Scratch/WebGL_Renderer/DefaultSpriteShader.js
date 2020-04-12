//DefaultSpriteShader.js

/**
 * @type {ShaderObject} ShaderObject
 */
function DefaultSpriteShader() {
    const attribs = ["vertPosition", "aTextureCoord", "deltaPos", "bright"];
    const uniforms = ["sampler"];

    this.name = "DefaultSprite";

    /**
     * @description A function used to get the string representing the vertex shader for this ShaderObject.
     * @param {Boolean} canRotate Determines whether to return a vertex shader string which supports rotating the vertex geometry.
     * @returns {string} The string representing the vertex shader for this ShaderObject.
     * @todo Implement the vertex shader string which enables rotation.
     */
    this.getVertexShader = function(canRotate) {
        if(canRotate) {
            return `
            precision mediump float;

            attribute vec2 deltaPos;
            attribute vec2 vertPosition;
            attribute vec2 aTextureCoord;
            attribute float bright;

            varying vec2 vTextureCoord;
            varying float brightness;

            void main() {
                gl_Position = vec4(vertPosition.x + deltaPos.x, vertPosition.y + deltaPos.y, 0.0, 1.0);
                vTextureCoord = aTextureCoord;
                brightness = bright;
            }
        `;
        }

        return `
            precision mediump float;

            attribute vec2 deltaPos;
            attribute vec2 vertPosition;
            attribute vec2 aTextureCoord;
            attribute float bright;

            varying vec2 vTextureCoord;
            varying float brightness;

            void main() {
                gl_Position = vec4(vertPosition.x + deltaPos.x, vertPosition.y + deltaPos.y, 0.0, 1.0);
                vTextureCoord = aTextureCoord;
                brightness = bright;
            }
        `;
    };

    /**
     * @description A function used to get the string representing the fragment shader for this ShaderObject.
     * @returns {string} The string representing the fragment shader for this ShaderObject.
     */
    this.getFragmentShader = function() {
        return `
            precision mediump float;

            varying vec2 vTextureCoord;
            varying float brightness;

            uniform sampler2D sampler;

            void main(void) {
                gl_FragColor = texture2D(sampler, vTextureCoord);
                gl_FragColor.r = clamp(gl_FragColor.r + brightness, 0.0, 1.0);
                gl_FragColor.g = clamp(gl_FragColor.g + brightness, 0.0, 1.0);
                gl_FragColor.b = clamp(gl_FragColor.b + brightness, 0.0, 1.0);
            }
        `;
    };

    /**
     * @description Uses the gl context and the shader program made from this ShaderObject's vertex and fragment shaders to get the gl locations of this shader's uniforms.
     * @returns {Object} Keys are the string names of the uniforms (as described in the uniforms const of this ShaderObject) and values are the locations of the uniforms.
     */
    this.getUniformLocations = function(gl, program) {
        const locations = {};

        for(let i = 0; i < uniforms.length; i++) {
            locations[uniforms[i]] = gl.getUniformLocation(program, uniforms[i]);
        }

        return locations;
    };

    /**
     * @description Uses the gl context and the shader program made from this ShaderObject's vertex and fragment shaders to get the gl locations of this shader's attributes.
     * @returns {Object} Keys are the string names of the uniforms (as described in the attribs const of this ShaderObject) and values are the locations of the attributes.
     */
    this.getAttributeLocations = function(gl, program) {
        const locations = {};
        for(let i = 0; i < attribs.length; i++) {
            locations[attribs[i]] = gl.getAttribLocation(program, attribs[i]);
        }

        return locations;
    };
}

export default DefaultSpriteShader;