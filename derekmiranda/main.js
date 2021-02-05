const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ITERATIONS = 100000
const RANGE = 100
const STEP = RANGE / ITERATIONS
const ZOOM = 20
const OFFSET = 100

const pts = [
  { x: 50, y: 50 },
  { x: 100, y: 100 },
  { x: 50, y: 100 },
];

// constants to affect function
const P = 10, R = 28, B = 8/3

function dot(x, y) {
  ctx.fillRect(x, y, 1, 1)
}

let x = 1
let y = 1
let z = 1

function main() {
  for (let i = 0; i < ITERATIONS; i++) {
    dot(OFFSET + ZOOM * x, OFFSET + ZOOM * y)

    // update x, y and z
    x += STEP * P*(y - x)
    y += STEP * (R*x - y - x*z)
    z += STEP * (x*y - B*z)
  }
}

main();
