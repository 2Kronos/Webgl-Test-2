// shaders.js

const vsSource = `
    precision mediump float;
    attribute vec3 pos;

    attribute vec2 ztexCoord;
    varying vec2 vTexCoord;

    uniform mat4 u_TranslateMatrix;
    uniform mat4 u_Matrix;

    void main() {

        vTexCoord = ztexCoord;
 
         gl_Position = u_TranslateMatrix * u_Matrix  * vec4(pos*0.5, 1);
         gl_PointSize = 40.0;   
    }
`;
const fsSource = `
    precision mediump float;

    varying vec2 vTexCoord;
    uniform sampler2D texture;
    
    void main() {
        gl_FragColor = texture2D(texture, vTexCoord);
    }
`;
export { vsSource, fsSource }
