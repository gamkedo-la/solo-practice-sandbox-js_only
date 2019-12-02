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

//the signed distance field function
//used in the ray march loop
float map(vec3 p) {

  //a sphere of radius 1.
  float d = length( p ) - 1.;

  //a ground plane
  float d2 = p.y + 0.9;
  return min(d, d2);

}

vec3 calcNormal( in vec3 pos )
{
  vec2 e = vec2(0.0001, 0.0);
  return normalize( vec3(map(pos+e.xyy)-map(pos-e.xyy),
                         map(pos+e.yxy)-map(pos-e.yxy),
                         map(pos+e.yyx)-map(pos-e.yyx) ) );
}

void main(void){

//1 : retrieve the fragment's coordinates
vec2 p = ( 2.0*gl_FragCoord.xy-resolution.xy)/resolution.y;
// //preserve aspect ratio
// uv.x *= resolution.x / resolution.y;


//2 : camera position and ray direction
vec3 ro = vec3( 0.,0.,3.);
vec3 rd = normalize( vec3( p, -1.5 ) );

vec3 col = vec3(0.);


//3 : ray march loop
  //ip will store where the ray hits the surface
vec3 pos;

//variable step size
float t = 0.0;
for( int i = 0; i < 32; i++) {

      //update position along path
      pos = ro + rd * t;

      //gets the shortest distance to the scene
  float temp = map( pos );

      //break the loop if the distance was too small
      //this means that we are close enough to the surface
  if( temp < 0.01 )
    {
      vec3 pos = ro + t*rd;
      vec3 nor = calcNormal(pos);

      vec3 sun_dir = normalize(vec3(0.8, 0.4, -0.2) );
      float sun_dif = clamp( dot(nor, sun_dir), 0.0, 1.0);

      float sky_dif = clamp( 0.5+0.5*dot(nor, vec3(0.0, 1.0, 0.0)), 0.0, 1.0);
      col = vec3(1.0, 0.7, 0.5)*sun_dif;
      col += vec3(0.0, 0.2, 0.4)*sky_dif;

      break;
    };

  //increment the step along the ray path
  t += temp;

}

//4 : apply color to this fragment
  //we use the result position as the color
gl_FragColor = vec4( col, 1.0);

}
`