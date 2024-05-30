// shaders.js

const vsSource = `
    precision mediump float;
    attribute vec3 pos;


    attribute vec2 ztexCoord;
    varying vec2 vTexCoord;


    uniform float angle;
    float x;
    float y;
    float z;



    void main() {

        vTexCoord = ztexCoord;

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
    varying vec2 vTexCoord;
    uniform sampler2D texture;

    void main() {
        gl_FragColor = texture2D(texture, vTexCoord);
    }
`;

export { vsSource, fsSource }
