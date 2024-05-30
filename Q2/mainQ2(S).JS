import { vsSource } from "./shaders.js";
import { fsSource } from "./shaders.js";


const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

const zoroImage = document.getElementById('zoro');

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


const colorData= [

    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    1, 1, 0,
    1, 1, 0,
    1, 1, 0,
   

]

// Buffer
const buffer = gl.createBuffer();
if (!buffer) {
    console.error("Failed to create buffer");
} else {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

// colorBuffer
const colorBuffer = gl.createBuffer();
if (!buffer) {
    console.error("Failed to create buffer");
} else {
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
}

// Vertex shader
const vertexShaderSourceCode = vsSource;
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

// Error checking for vertex shader
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(`Vertex shader compilation error:
     ${gl.getShaderInfoLog(vertexShader)}
     `);
}

// Fragment shader
const fragmentShaderSourceCode = fsSource;
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

// Error checking for fragment shader
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(`Fragment shader compilation error:
     ${gl.getShaderInfoLog(fragmentShader)}
     `);
}

// Program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// Linking error
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(`Shader program linking error:
     ${gl.getProgramInfoLog(program)}
     `);
}

const positionLocation = gl.getAttribLocation(program, "pos");
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);


const colorLocation = gl.getAttribLocation(program, "color");
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

const uniformLocation = gl.getUniformLocation(program, `angle`);



let angle = 0;

draw();
function draw() {
    gl.clearColor(0, 0, 0, 0); // Set clear color
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear both color and depth buffer
    gl.useProgram(program);
     
    //angle += 0.04 
    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);

    gl.uniform1f(uniformLocation, angle);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.drawArrays(gl.TRIANGLES, 3, 3);
    gl.drawArrays(gl.TRIANGLES, 6, 3);
    gl.drawArrays(gl.TRIANGLES, 9, 3);


    //window.requestAnimationFrame(draw);
}
