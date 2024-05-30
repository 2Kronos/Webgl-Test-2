// shaders.js

const vsSource = `
    precision mediump float;
    attribute vec3 pos;

    attribute vec2 zTexCoord;
    attribute vec2 yTexCoord;
    varying vec2 vZTexCoord;
    varying vec2 vYTexCoord;

    uniform float angle;
    float x;
    float y;
    float z;

   

    void main() {

        //spin on z axis
        //x = pos.x*cos(angle)-pos.y*sin(angle);
         //y = pos.x*sin(angle)+pos.y*cos(angle);
         //z = pos.z;
   
          //spin on y axis
        x = pos.x*cos(angle)-pos.z*sin(angle);
         z = pos.x*sin(angle)+ pos.z*cos(angle);
         y = pos.y;
   
         //spin on x
          //z = pos.y*sin(angle) + pos.z*cos(angle);
          //y = pos.y*cos(angle)+pos.z*sin(angle);
         // x = pos.x;
   
         gl_Position = vec4(x*0.5, y*0.5, z*0.5, 1);
         gl_PointSize = 40.0;
        
       

       
    }
`;

const fsSource = `

    precision mediump float;
   

    varying vec2 vZTexCoord;
    varying vec2 vYTexCoord;
    uniform sampler2D zTexture;
    uniform sampler2D yTexture;


    void main() {

        vec4 zColor = texture2D(zTexture, vZTexCoord);
        vec4 yColor = texture2D(yTexture, vYTexCoord);
        gl_FragColor = mix(zColor, yColor, 0.5); // This will blend the two textures

    }
`;

export { vsSource, fsSource }
