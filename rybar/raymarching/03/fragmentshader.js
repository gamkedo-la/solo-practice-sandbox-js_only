const glsl = x => x;

const fshader = glsl`
uniform float time;
uniform vec2 resolution;

/* #region utilities */
//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec2 P)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;  
  g01 *= norm.y;  
  g10 *= norm.z;  
  g11 *= norm.w;  

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

/* #endregion */
mat2 m = mat2(0.8, 0.6, -0.6, 0.8 );

float fbm ( vec2 p )
{
    float f = 0.0;
    f += 0.5000 * cnoise( p ); p*=m*2.02;
    f += 0.2500 * cnoise( p ); p*=m*2.03;
    f += 0.1250 * cnoise( p ); p*=m*2.04;
    f += 0.0625 * cnoise( p ); p*=m*2.05;
    f /= 0.9375;
    return f;

}
void main( void ) {
    
    vec2 q = gl_FragCoord.xy / resolution.xy;
    vec2 p = -1.0 + 2.0 * q; //0 at center
    p.x *= resolution.x/resolution.y;

    float r = sqrt(dot(p,p));
    float a = atan( p.y, p.x);
    vec3 col = vec3(1.0);
    if(r<0.8)
    {
        //iris color
        col = vec3(0.0, 0.3, 0.4); //a shade of teal
        float f = fbm ( 3.0* p ); //create some noise
        col = mix(col, vec3(0.2, 0.5, 0.4), f ); //vary the color with noise

        //yellow iris center
        f = 1.0 - smoothstep(0.3, 0.7, r); //gradient from center to just outside
        col = mix(col, vec3(0.9, 0.8, 0.2), f ); //mix existing color with yellow center color

        //modulate domain -fancy way of saying make it wavy
        a += 0.05 * fbm( 20.0 *p );
        
        //iris texture, white
        f = smoothstep(-0.5, 1.0, fbm( vec2(6.0*r, 20.0*a)));
        col = mix(col, vec3(1.0), f );

        //iris texture, dark
        f = smoothstep(-0.2, 1.0, fbm( vec2(10.0*r, 7.0*a)));
        col *= 1.0 - f;

        //curvature and shading at edge
        f = smoothstep(0.6, 0.8, r );
        col *= 1.0 - 0.5*f;

        //pupil
        f = smoothstep( 0.3, 0.35, r);
        col *= f;

        //reflection
        f = 1.0 - smoothstep(0.1, 0.15, length(p - vec2(0.25, 0.25) ) );
        col += vec3(f)*0.8;

        //reflection2
        f = 1.0 - smoothstep(0.05, 0.1, length(p - vec2(-0.3, -0.3) ) );
        col += vec3(f)*0.6;

        //smooth edge
        f = smoothstep(0.78, 0.8, r);
        col = mix(col, vec3(1.0), f);

        
    }
    
    gl_FragColor = vec4(col, 1.0);


}
`