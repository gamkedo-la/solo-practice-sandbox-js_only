const fshader = `
uniform float time;
uniform vec2 resolution;

void main( void ) {
    
    vec2 p = gl_FragCoord.xy / resolution.xy;
    p -= vec2(0.5, 0.5);
    float r = sqrt( dot(p,p));
    float a = atan( p.y, p.x);
    float s = 0.1 + 0.1*sin(4.0*a);
    float t = 0.1 + 0.2*pow(s, 0.3);
    t += 0.03*pow(0.5+0.5*cos(8.0*a), 0.5);
    float h = r/t;
    float f = 0.0;
    if(r<t) f=1.0;
    vec3 col = mix( vec3(1.0), vec3(0.5*h, 0.5+0.5*h, 0.0), f);
    gl_FragColor = vec4(col, 1.0);


}
`