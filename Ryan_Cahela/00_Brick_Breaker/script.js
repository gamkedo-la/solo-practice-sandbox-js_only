const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let deltaTime = 0;
let timeOfLastFrame = 0;

const square = {
  position: { x: 0, y: 0 },
  direction: { x: 1, y: 0 },
  color: "red",
  speed: 500,
};

function loop(totalTimeElapsedMiliseconds) {
  requestAnimationFrame(loop);

  const currentTime = totalTimeElapsedMiliseconds / 1000; //convert to seconds
  const deltaTime = currentTime - timeOfLastFrame;
  timeOfLastFrame = currentTime;

  //clear game screen
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  //move cube
  if (square.position.x > WIDTH || square.position.x < 0) {
    square.direction.x = -square.direction.x;
  }
  square.position.x += square.speed * square.direction.x * deltaTime;

  //draw cube
  ctx.fillStyle = square.color;
  ctx.fillRect(square.position.x, square.position.y, 100, 100);
}

requestAnimationFrame(loop);
