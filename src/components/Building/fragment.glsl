precision mediump float;
precision mediump int;
uniform float uHeight;
varying vec2 vUv;
void main()	{
    float strength = 1.0-vUv.y;
    
    strength = step( (10.0 - uHeight) / 10.0, strength);

	gl_FragColor =vec4(strength);
}