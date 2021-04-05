const canvas = document.getElementById("the-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 550;

let enemys = [];
let frames = 0;
// class EnemysAttack {
//   constructor(img, sX, sY, sWidth, sHeight, x, y, width, height) {
//     this.img = img;
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.frames = 0;
//   }

//   update() {
//     this.frames++;

//     for (let i = 0; i < this.enemys.length; i++) {
//       this.x += this.speed;
//       this.enemys[i].draw();
//     }

//     if (this.frames % 120 === 0) {
//       const originX = 900;
//       const minY = 150;
//       const maxY = 470;
//       const RandomY = Math.floor(Math.random() * (maxY - minY + 1)) + minX;

//       const enemy = (RandomY, originX);
//       this.enemys.push(enemy);
//     }
//   }

//   draw() {
//     ctx.drawImage(img, sX, sY, sWidth, sHeight, x, y, width, height);
//   }
// }

// PLAYER
const player = {
  x: 250,
  y: 320,
  width: 70,
  height: 70,
  frameX: 0,
  frameY: 0,
  speed: 15,
  moving: false,
};

// NPC
const skeleton = {
  x: canvas.width,
  y: Math.random() * 400,
  width: 40,
  height: 80,
  frameX: 0,
  frameY: 0,
  speed: 18,
  moving: true,
};

const bgImg = new Image(); //BACKGROUND
bgImg.src = "/Assets/images/game_bg.png";

const mjImg = new Image();
mjImg.src = "/Assets/images/game_mj1.png";

const skeletonImg = new Image();
skeletonImg.src = "/Assets/images/skeleton.png";

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
  draw(
    skeletonImg,
    skeleton.width * skeleton.frameX,
    skeleton.width * skeleton.frameY,
    skeleton.width,
    skeleton.height,
    skeleton.x,
    skeleton.y,
    skeleton.width,
    skeleton.height
  );
  skeletonFrame();

  requestAnimationFrame(animationId);
}

playerFrame();
animationId();

// FRAME MOVIMENTOS
function playerFrame() {
  if (player.frameX < 1 && player.moving === true) {
    player.frameX++;
  } else {
    player.frameX = 0;
  }
}

function skeletonFrame() {
  // FRAME ATTACK
  this.frames++;

  if (this.frames % 120 === 0) {
    skeleton.X = 900;
    const minY = 150;
    const maxY = 470;
    const RandomY = Math.floor(Math.random() * (maxY - minY + 1)) + minX;

    const enemy = (RandomY, skeleton.X);
    this.enemys.push(enemy);
    for (let i = 0; i < this.enemys.length; i++) {
      this.x += this.speed;
      this.enemys[i].draw();
    }
  }

  // FRAME MOVIMENTOS
  if (skeleton.FrameX < 6 && skeleton.moving === true) {
    skeleton.FrameX++;
  } else {
    skeleton.FrameX = 0;
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
