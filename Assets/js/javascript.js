const canvas = document.getElementById("the-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 550;

let enemys = [];
let frames = 0;
let score = 0;
let lives = 10;

// PLAYER
const player = {
  x: 250,
  y: 320,
  width: 42,
  height: 55,
  frameX: 0,
  frameY: 0,
  speed: 15,
  moving: false,
};

// NPCs
function zombi() {
  return {
    x: canvas.width,
    y: Math.random() * 400,
    width: 28,
    height: 56,
    frameX: 1,
    frameY: 0,
    speed: 20,
    moving: true,
  };
}

//IMAGES

const bgImg = new Image(); //BACKGROUND
bgImg.src = "/Assets/images/game_bg.png";

const mjImg = new Image();
mjImg.src = "/Assets/images/game_mj1-01.png";

const zombiImg = new Image();
zombiImg.src = "/Assets/images/zombi.png";

const smokeImg = new Image();
smokeImg.src = "/Assets/images/smooke-01.png";

const gameOverImg = new Image();
gameOverImg.src = "/Assets/images/thriller-gameover-01.png";

//AUDIOS
const laugh = new Audio();
laugh.src = "/Assets/musics/y2mate.com - Thriller laugh.mp3";
laugh.volume = 0.1;

const soundtrack = new Audio();
soundtrack.src =
  "/Assets/musics/y2mate.com - Thriller 8 Bit Remix Cover Version Tribute to Michael Jackson  8 Bit Universe.mp3";
soundtrack.volume = 0.1;

function draw(img, sX, sY, sWidth, sHeight, x, y, width, height) {
  ctx.drawImage(img, sX, sY, sWidth, sHeight, x, y, width, height);
}

//UPDATE GAME
function animationId() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  draw(
    mjImg,
    player.width * player.frameX,
    player.width * player.frameY,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height
  );
  ctx.font = "14px PressStart2p ";
  ctx.fillStyle = "white";
  ctx.fillText(`SCORE: ${score}`, 600, 65);

  ctx.font = "14px  PressStart2p";
  ctx.fillStyle = "white";
  ctx.fillText(`LIVES: ${lives}`, 750, 65);

  soundtrack.play();
  attackFrame();
  checkGameOver();
  requestAnimationFrame(animationId);
}

// FRAME MOVIMENTOS
function playerFrame() {
  if (player.frameX < 1 && player.moving === true) {
    player.frameX++;
  } else {
    player.frameX = 0;
  }
}

// FRAME ATTACK
function attackFrame() {
  frames++;

  for (let i = 0; i < enemys.length; i++) {
    enemys[i].x -= enemys[i].speed && enemys[i].x > 170;
    draw(
      zombiImg,
      enemys[i].width * enemys[i].frameX,
      enemys[i].width * enemys[i].frameY,
      enemys[i].width,
      enemys[i].height,
      enemys[i].x,
      enemys[i].y,
      enemys[i].width,
      enemys[i].height
    );

    //COLLISION
    if (
      player.x < enemys[i].x + enemys[i].width &&
      player.x + player.width > enemys[i].x &&
      player.y < enemys[i].y + enemys[i].height &&
      player.y + player.height > enemys[i].y
    ) {
      ctx.drawImage(smokeImg, enemys[i].x, enemys[i].y, 80, 70);
      enemys.splice(i, 1);
      score++;
    } else if (enemys[i].x < 200) {
      enemys.splice(i, 1);
      lives--;
    }
  }
  if (frames % 120 === 0) {
    zombi.x = 900;
    const minY = 150;
    const maxY = 470;
    const RandomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    const enemy1 = zombi();
    enemy1.y = RandomY;
    enemys.push(enemy1);
  }
}

// MOVIMENTOS PLAYER
window.addEventListener("keydown", function (event) {
  player.moving = true;
  if (event.code === "ArrowUp" && player.y > 150) {
    player.y -= player.speed;
    if (player.frameX < 1 && player.moving === true) {
      player.frameX++;
    } else {
      player.frameX = 0;
    }
  }
  if (event.code === "ArrowDown" && player.y < canvas.height - 80) {
    player.y += player.speed;
    if (player.frameX < 1 && player.moving === true) {
      player.frameX++;
    } else {
      player.frameX = 0;
    }
  }
  if (event.code === "ArrowRight" && player.x < canvas.width - 100) {
    player.x += player.speed;
    if (player.frameX < 1 && player.moving === true) {
      player.frameX++;
    } else {
      player.frameX = 0;
    }
  }
  if (event.code === "ArrowLeft" && player.x > 200) {
    player.x -= player.speed;
    if (player.frameX < 1 && player.moving === true) {
      player.frameX++;
    } else {
      player.frameX = 0;
    }
  }
});

window.addEventListener("keyup", (event) => {
  delete event.code;
  player.moving = false;
});

// GAMEOVER
function checkGameOver() {
  if (lives <= 0) {
    cancelAnimationFrame(animationId);
    laugh.play();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gameOverImg, 0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "60px PressStart2P";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER", 195, 300);

    soundtrack.pause();
  }
}

document.getElementById("start-button").onclick = () => {
  playerFrame();
  animationId();
};
