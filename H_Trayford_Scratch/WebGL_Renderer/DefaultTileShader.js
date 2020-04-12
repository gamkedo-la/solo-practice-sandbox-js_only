//DefaultTileShader.js
/**
 * @typedef {Object} ShaderObject
 */

/**
 * @type {ShaderObject} ShaderObject
 */
function DefaultTileShader() {
    /**
     * @description an array of strings representing the attributes used by this shader.
     * @type {string[]}
     */
    const attribs = ["vertPosition", "aTextureCoord"];
    /**
     * @description an array of strings representing the uniforms used by this shader.
     * @type {string[]}
     */
    const uniforms = ["delta", "sampler"];

    /**
     * @description The name of this shader, must be unique.
     * @type {string}
     */
    this.name = "DefaultTile";

    /**
     * @description A function used to get the string representing the vertex shader for this ShaderObject.
     * @returns {string} The string representing the vertex shader for this ShaderObject.
     */
    this.getVertexString = function() {
        return `
            precision mediump float;

            uniform vec2 delta;

            attribute vec2 vertPosition;
            attribute vec2 aTextureCoord;

            varying vec2 vTextureCoord;

            void main() {
                gl_Position = vec4(vertPosition.x + delta.x, vertPosition.y + delta.y, 0.0, 1.0);
                vTextureCoord = aTextureCoord;
            }
        `;
    };

    /**
     * @description A function used to get the string representing the fragment shader for this ShaderObject.
     * @returns {string} The string representing the fragment shader for this ShaderObject.
     */
    this.getFragmentString = function() {
        return `
            precision mediump float;

            varying vec2 vTextureCoord;

            uniform sampler2D sampler;

            void main(void) {
                gl_FragColor = texture2D(sampler, vTextureCoord);
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

export default DefaultTileShader;