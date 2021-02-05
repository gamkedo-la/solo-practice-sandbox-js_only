const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const xyBtn = document.getElementById("xy");
const xzBtn = document.getElementById("xz");
const yzBtn = document.getElementById("yz");

let currMode = 'xy'
const btnMap = {
  xy: xyBtn,
  xz: xzBtn,
  yz: yzBtn,
}

const ITERATIONS = 100000
const RANGE = 100
const STEP = RANGE / ITERATIONS
const ZOOM = 10
const OFFSET = canvas.width / 2

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
function renderStrangeAttractor() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let _ = 0; _ < ITERATIONS; _++) {
    const i = currMode === 'yz' ? y : x
    const j = currMode === 'xy' ? y : z

    const jOffset = currMode === 'xy' ? OFFSET : 0
    dot(OFFSET + ZOOM * i, jOffset + ZOOM * j)

    // update x, y and z
    x += STEP * P*(y - x)
    y += STEP * (R*x - y - x*z)
    z += STEP * (x*y - B*z)
  }
}

function updateBtns() {
  for (let btn of Object.values(btnMap)) {
    if (btn === btnMap[currMode]) {
      btn.disabled = true
    } else {
      btn.disabled = false
    }
  }
}

function setupListeners() {
  Object.keys(btnMap).forEach(mode => {
    btnMap[mode].addEventListener('click', () => {
      currMode = mode
      updateBtns()
      renderStrangeAttractor()
    })
  })
}

function main() {
  setupListeners()
  updateBtns()
  renderStrangeAttractor()
}

main();
