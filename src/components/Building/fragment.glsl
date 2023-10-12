
varying vec2 vUv;
varying vec3 vPos;
uniform vec3 size;
uniform vec3 color;
uniform float thickness;
uniform float smoothness;
void main()	{
    vec3 d = abs(vPos) - (size * 0.5);
    float a = smoothstep(thickness, thickness + smoothness, min(min(length(d.xy), length(d.yz)), length(d.xz)));
    gl_FragColor = vec4(color, 1.0 - a);
}