let canvas, canvasContext;
const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 800;
const floor = CANVAS_HEIGHT - 35;
const FRAMES_PER_SECOND = 1000 / 50;

let player = new Player();
let obstacles = [];
let frameCount = 0;
let gameOver = false;

let score = 0;
let addPoint = false;
let highestScore = JSON.parse(localStorage.getItem("highestScore")) || 0;

let jumpSound = new SoundOverlapsClass("audio/Jump");
let gameOverSound = new SoundOverlapsClass("audio/GameOver");

let bgImage = new Image();
bgImage.src = "img/bg.png";

let imageWidth = CANVAS_WIDTH;
let scrollSpeed = 5;

const obstacleSprite = new Image();
obstacleSprite.src = "img/spr_boulder_0.png";

const SPRITE_SIZE = 16;
// spriteSheet is the object the contains the sprite that will be used as player and the set of frames to be used
const spriteSheet = {
  // images that show the character walking to the right
  frameSet: [2, 3],
  image: new Image(),
};
