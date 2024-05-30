import { vsSource } from "./shaders2.js";
import { fsSource } from "./shaders2.js";

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

const zoroImage = document.getElementById('zoro');
const yamiImage = document.getElementById('yami');

if (!gl) {
    throw new Error("WebGL not supported");
}

// Vertices
const vertexData = [
    //FRONT
    0.5, 0.5, 0,  //0
    -0.5, 0.5, 0,  //1
    -0.5, -0.5, 0,  //2
    -0.5, -0.5, 0,  //3
    0.5, -0.5, 0,  //4
    0.5, 0.5, 0,  //5
    //Back
    1, 1, 1,  //6
    0, 1, 1,  //7
    0, 0, 1,  //8
    0, 0, 1,  //9
    1, 0, 1,  //10
    1, 1, 1,  //11
];

// Texture coordinates for zoro
const zoroTexCoordinate = new Float32Array([
    1.0, 1.0, // Bottom right
    0.0, 1.0, // Bottom left
    0.0, 0.0, // Top left
    0.0, 0.0, // Top left
    1.0, 0.0, // Top right
    1.0, 1.0, // Bottom right
]);

// Texture coordinates for yami
const yamiTexCoordinate = new Float32Array([
    1.0, 1.0, // Bottom left
    0.0, 1.0, // Top left
    0.0, 0.0, // Bottom right
    0.0, 0.0, // Bottom right
    1.0, 0.0, // Top right
    1.0, 1.0, // Bottom left
]);

// Buffer
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

//zoro buffer
const zoroBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, zoroBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(zoroTexCoordinate), gl.STATIC_DRAW);

//Yami buffer
const yamiBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, yamiBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(yamiTexCoordinate), gl.STATIC_DRAW);

//Flipping the image
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

function initTexture(gl, image) {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // This flips the image orientation to be upright.

    if (isPowerOfTwo(image.width) && isPowerOfTwo(image.height)) {
        gl.generateMipmap(gl.TEXTURE_2D);
    } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    return texture;
}

const zoroTexture = initTexture(gl, zoroImage);
const yamiTexture = initTexture(gl, yamiImage);

// Vertex shader
const vertexShaderSourceCode = vsSource;
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

// Fragment shader
const fragmentShaderSourceCode = fsSource;
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

// Program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, "pos");
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const zTexCoordLocation = gl.getAttribLocation(program, "zTexCoord");
const yTexCoordLocation = gl.getAttribLocation(program, "yTexCoord");

const uniformLocation = gl.getUniformLocation(program, `angle`);

function drawZoro(){
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, zoroTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSampler"), 0);
    gl.enableVertexAttribArray(zTexCoordLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, zoroBuffer);
    gl.vertexAttribPointer(zTexCoordLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawArrays(gl.TRIANGLES, 3, 3);
}

function drawYami(){
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, yamiTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSampler"), 1);
    gl.enableVertexAttribArray(yTexCoordLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, yamiBuffer);
    gl.vertexAttribPointer(yTexCoordLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 6, 3);
    gl.drawArrays(gl.TRIANGLES, 9, 3);
}

let angle = 0;

draw();
function draw() {
    gl.clearColor(0, 0, 0, 0); // Set clear color
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear both color and depth buffer
    gl.useProgram(program);
     
    angle += 0.04 
    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);

    gl.uniform1f(uniformLocation, angle);

    drawZoro();
    drawYami();

    window.requestAnimationFrame(draw);
}

// checks if its to power of two
function isPowerOfTwo(value) {
    return (value & (value - 1)) === 0;
}
