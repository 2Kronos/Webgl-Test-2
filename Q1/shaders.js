// shaders.js

const vsSource = `
    precision mediump float;
    attribute vec3 pos;
    attribute vec3 color;
    varying vec3 vColor;

    void main() {
         gl_Position = vec4(pos*0.5, 1);
         gl_PointSize = 40.0;
        vColor = color;   
    }
`;

const fsSource = `
    precision mediump float;
    varying vec3 vColor;
    void main() {
        gl_FragColor = vec4(vColor, 1);
    }
`;
export { vsSource, fsSource }