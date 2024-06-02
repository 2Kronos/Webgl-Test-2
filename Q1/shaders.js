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

function multiplyMatrices(matrixA, matrixB) {
    let result = new Array(16).fill(0);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                result[i * 4 + j] += matrixA[i * 4 + k] * matrixB[k * 4 + j];
            }
        }
    }
    return result;
}

snip  
