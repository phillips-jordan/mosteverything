function round(number, precision) {
  var shift = function(number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    numArray = ("" + number).split("e");
    return +(
      numArray[0] +
      "e" +
      (numArray[1] ? +numArray[1] + precision : precision)
    );
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

// This sectin contains some game constants. It is not super interesting
var GAME_WIDTH = 1500;
var GAME_HEIGHT = 650;

var ENEMY_WIDTH = 78;
var ENEMY_HEIGHT = 90;

var ENEMY2_WIDTH = 157;
var ENEMY2_HEIGHT = 80;

var ENEMY3_WIDTH = 75;
var ENEMY3_HEIGHT = 68;

var MAX_ENEMIES = 4;

var MAX_PROJECTILES = 10;
var PROJECTILE_HEIGHT = 156;
var PROJECTILE_WIDTH = 75;

var PLAYER_WIDTH = 100;
var PLAYER_HEIGHT = 150;

var BG_WIDTH = 4098;

// These two constants keep us from using "magic numbers" in our code
var LEFT_ARROW_CODE = 37;
var RIGHT_ARROW_CODE = 39;
var HEART_WIDTH = 30;
var START_LIFE = 3;
var MAX_LIFE = 4;
// These two constants allow us to DRY
var MOVE_LEFT = "left";
var MOVE_RIGHT = "right";
var jumping = false;
let directions = {
  left: false,
  right: false,
  up: false,
  down: false
};

let deathcheck = false
let playerX;
let playerY;
let enemy3 = 0;
let playerLife = MAX_LIFE;
let overHead = false;
let shooting = false;
let bgm = new Audio(["OOPMusic.mp3"]);
let jump = new Audio(['jump.wav']);
let crash = new Audio(['enemy1crash.wav']);
let death = new Audio(['death.wav']);
let exploder = new Audio(['explode.wav']);
let projExp = new Audio(['projectile.wav']);
let shoot = new Audio(['shoot.wav']);
let overH = new Audio(['over.wav']);
overH.volume = 0.4

// Preload game images
var images = {};
[
  "enemy.png",
  "stars.png",
  "player.png",
  "BGTest.jpg",
  "explosion1.png",
  "explosion2.png",
  "explosion3.png",
  "explosion4.png",
  "explosion5.png",
  "background1.jpg",
  "run4.png",
  "run5.png",
  "jump1.png",
  "jump2.png",
  "jump3.png",
  "over1.png",
  "over2.png",
  "over3.png",
  "over4.png",
  "over5.png",
  "run3.png",
  "back.png",
  "shoot1.png",
  "shoot2.png",
  "projectile1.png",
  "projectile2.png",
  "projectile3.png",
  "projectile4.png",
  "cloud1.png",
  "cloud2.png",
  "enemy11.png",
  "enemy12.png",
  "enemy2.png",
  "enemy31.png",
  "enemy32.png",
  "death1.png",
  "death2.png",
  "death3.png",
  "die1.png",
  "die2.png",
  "die3.png",
  "die4.png",
  "die5.png",
  "beam1.png",
  "beam2.png",
  "beam3.png"
].forEach(imgName => {
  var img = document.createElement("img");
  img.src = "images/" + imgName;
  images[imgName] = img;
});

// This section is where you will be doing most of your coding
class Entity {
  constructor() {}
  render(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y);
  }
}

class Projectile {
  constructor(xPos, yPos) {
    this.x = xPos + PLAYER_WIDTH * 0.7;
    this.y = yPos + PLAYER_HEIGHT / 5;
    this.sprite = images["projectile1.png"];

    // Each enemy should have a different speed
    this.speed = 0.5;
  }

  update(timeDiff) {
    this.x = this.x + timeDiff * this.speed;
    if (this.speed > 0) {
      this.sprite =
        images["projectile" + Math.round(Math.random() * (4 - 1) + 1) + ".png"];
    }
  }
  render(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y);
  }
}

class BackG extends Entity {
  constructor(xPos) {
    super();
    this.x = xPos;
    this.y = 0;
    this.sprite = images["background1.jpg"];
    this.speed = 0.1;
  }
  update(timeDiff) {
    this.x = this.x - timeDiff * this.speed;
  }
}

class Enemy extends Entity {
  constructor(yPos) {
    super();
    this.x = GAME_WIDTH;
    this.y = yPos;
    this.sprite = images["enemy2.png"];
    this.life = 1;
    this.id = 1;

    // Each enemy should have a different speed
    this.speed = Math.random() / 4 + 0.25;
  }

  update(timeDiff) {
    this.x = this.x - timeDiff * this.speed * 1.6;

    this.y = this.y + timeDiff * this.speed * 0.7;
  }
}

class Enemy2 extends Entity {
  constructor() {
    super();
    this.x = GAME_WIDTH;
    this.y = GAME_HEIGHT - ENEMY2_HEIGHT;
    this.sprite = images["enemy11.png"];
    this.life = 20;
    this.id = 2;

    // Each enemy should have a different speed
    this.speed = Math.random() / 6 + 0.2;
  }

  update(timeDiff) {
    this.x = this.x - timeDiff * this.speed;
    this.sprite = images["enemy1"+Math.round(Math.random()*(2-1)+1)+".png"]
}
}

class Enemy3 extends Entity {
  constructor(yPos) {
    super();
    this.x = GAME_WIDTH - 1;
    this.y = yPos;
    this.sprite = images["enemy31.png"];
    this.life = 20;
    this.id = 3;

    // Each enemy should have a different speed
    this.speed = Math.random() / 4 + 0.25;
  }

  update(timeDiff) {
    this.sprite =
      images["enemy3" + Math.round(Math.random() * (2 - 1) + 1) + ".png"];
    if (this.x > playerX + PLAYER_WIDTH / 2) {
      this.x = this.x - timeDiff * this.speed / 2;
    }
    if (
      this.y + ENEMY3_HEIGHT <= playerY + 70 &&
      this.y + ENEMY3_HEIGHT < GAME_HEIGHT - 10
    ) {
      this.y = this.y + timeDiff * this.speed / 4;
    }
    if (this.y > playerY) {
      this.y = this.y - timeDiff * this.speed / 2;
    }
    if (this.x < playerX - PLAYER_WIDTH / 2) {
      this.x = this.x + timeDiff * this.speed / 2;
    }
  }
}

class Player extends Entity {
  constructor() {
    super();
    this.x = 2 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    this.sprite = images["player.png"];
    this.speed = 0.6;
    this.jumpspeed = 0.9;
  }
  update(timeDiff) {
    if (
      directions.left == true &&
      this.x > 0 &&
      this.x < GAME_WIDTH - PLAYER_WIDTH &&
      deathcheck == false
    ) {
      this.x = this.x - timeDiff * this.speed;
      playerX = this.x;
      if (jumping == false && overHead == false) {
        this.sprite = images["back.png"];
      }
    }
    if (
      directions.right == true &&
      this.x > 0 &&
      this.x < GAME_WIDTH - PLAYER_WIDTH &&
      deathcheck == false
    ) {
      this.x = this.x + timeDiff * this.speed;
      playerX = this.x;
      if (jumping == false && overHead == false) {
        this.sprite = images["jump1.png"];
      }
    }
    if (this.x < 0) {
      this.x = 1;
    }
    if (this.x > GAME_WIDTH - PLAYER_WIDTH) {
      this.x = GAME_WIDTH - PLAYER_WIDTH - 1;
    }
    if (directions.up == true) {
      if (this.y > GAME_HEIGHT - PLAYER_HEIGHT * 3.3) {
        this.y = this.y - timeDiff * this.speed;

        setTimeout(() => {
          this.sprite = images["player.png"];
        }, 400);
      }
    }
    if (directions.down == true) {
      if (this.y < GAME_HEIGHT - PLAYER_HEIGHT - 10) {
        this.y = this.y + timeDiff * this.speed;
      }
    }
    if (this.y > GAME_HEIGHT - PLAYER_HEIGHT - 11) {
      this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
      directions.down = false;
      jumping = false;
    }
  }
}

class Cloudback extends Entity {
  constructor(x) {
    super();
    this.x = x;
    this.y = Math.random() * (300 - 50) + 50;
    this.sprite =
      images["cloud" + Math.round(Math.random() * (2 - 1) + 1) + ".png"];
    this.speed = Math.random() / 6 + 0.2;
  }
  update(timeDiff) {
    this.x = this.x - timeDiff * this.speed;
  }
}

class Cloudfront extends Entity {
  constructor(x) {
    super();
    this.x = x;
    this.y = Math.random() * (330 - 90) + 90;
    this.sprite =
      images["cloud" + Math.round(Math.random() * (2 - 1) + 1) + ".png"];
    this.speed = Math.random() / 3 + 0.25;
  }
  update(timeDiff) {
    this.x = this.x - timeDiff * this.speed;
  }
}
class Death extends Entity {
    constructor(x, y){
        super()
        this.x = x;
        this.y = y;
        this.sprite = images['die1.png']
    }
    explode(){
        exploder.play()
        if (this.sprite== images['die1.png']){
             setTimeout(() => { 
                this.sprite = images["die2.png"];
            }, 30);
        }
        if (this.sprite== images['die2.png']){
             setTimeout(() => { 
                this.sprite = images["die3.png"];
            }, 60);
        } 


    
        if (this.sprite== images['die3.png']){
             setTimeout(() => { 
                this.sprite = images["die4.png"];
            }, 90);
        }
    

        if (this.sprite== images['die4.png']){
             setTimeout(() => { 
               this.sprite = images["die5.png"];
            }, 110);
        }  
    }
}

/*
This section is a tiny game engine.
This engine will use your Enemy and Player classes to create the behavior of the game.
The engine will try to draw your game at 60 frames per second using the requestAnimationFrame function
*/
class Engine {
  constructor(element) {
    // Setup the player
    this.player = new Player();

    // Setup enemies, making sure there are always three
    this.setUpHoming();
    this.setupEnemies();
    this.setupShoot();
    this.setUpBG();
    this.setUpCf();
    this.setUpCb();
    this.setUpExplode();

    // Setup the <canvas> element where we will be drawing
    var canvas = document.createElement("canvas");
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    canvas.setAttribute(
      "style",
      "position: absolute;  left: 50%;margin-left:-750px; top: 50%;margin-top:-300px; border:2px solid blue"
    );
    element.appendChild(canvas);

    this.ctx = canvas.getContext("2d");

    // Since gameLoop will be called out of context, bind it once here.
    this.gameLoop = this.gameLoop.bind(this);
  }

  /*
    The game allows for 5 horizontal slots where an enemy can be present.
     At any point in time there can be at most MAX_ENEMIES enemies otherwise the game would be impossible
     */
  setUpHoming() {
    if (this.player) {
      playerX = this.player.x;
      playerY = this.player.y;
    }
  }
  setUpBG() {
    if (!this.bg) {
      this.bg = [new BackG(0)];
    }
    this.bgScroll();
  }
  setUpCb() {
    if (!this.cb) {
      this.cb = [new Cloudback(150), new Cloudback(350), new Cloudback(500)];
    }
    this.cloudB();
  }
  setUpCf() {
    if (!this.cf) {
      this.cf = [new Cloudfront(400)];
    }
    this.cloudF();
  }

  setUpExplode(){
      if (!this.exp){
          this.exp = [];
      }
      this.expLoop()
  }

  setupEnemies() {
    if (!this.enemies) {
      this.enemies = [];
    }

    while (this.enemies.filter(e => !!e).length < MAX_ENEMIES) {
      this.addEnemy();
      this.addEnemy2();
      this.addEnemy3();
    }
  }
  setupShoot() {
    if (!this.playerProj) {
      this.playerProj = new Array(MAX_PROJECTILES);
    }
    // while (this.playerProj(e=>!!e).length < MAX_PROJECTILES){

    // }
  }
  bgScroll() {
    if (this.bg.length < 2) {
      this.bg.push(new BackG(BG_WIDTH));
    }
  }
  cloudB() {
    if (this.cb.length < 6) {
      this.cb.push(new Cloudback(GAME_WIDTH));
    }
  }
  cloudF() {
    if (this.cf.length < 3) {
      this.cf.push(new Cloudfront(GAME_WIDTH));
    }
  }
  expLoop(){
      this.exp.forEach((e,i)=>{
          if(e.sprite==images['die5.png']){
              delete this.exp[i]
          }
          e.explode();
      })
  }

  // This method finds a random spot where there is no enemy, and puts one in there
  addEnemy() {
    var enemySpots = 10;
    var enemySpot;

    // Keep looping until we find a free enemy spot at random
    while (enemySpot === false || this.enemies[enemySpot]) {
      enemySpot = Math.round(Math.random() * enemySpots);
    }
    this.enemies[enemySpot] = new Enemy(
      enemySpot * ENEMY_HEIGHT - 2 * ENEMY_HEIGHT
    );
  }
  addEnemy2() {
    var enemySpots = 10;
    var enemySpot;
    // Keep looping until we find a free enemy spot at random
    while (enemySpot === false || this.enemies[enemySpot]) {
      enemySpot = Math.round(Math.random() * enemySpots);
    }
    this.enemies[enemySpot] = new Enemy2();
  }
  addEnemy3() {
    var enemySpots = 10;
    var enemySpot;

    // Keep looping until we find a free enemy spot at random
    while (!enemySpot || this.enemies[enemySpot]) {
      enemySpot = Math.round(Math.random() * enemySpots);
    }
    if (this.score > 15000 && enemy3 < 3) {
      this.enemies[enemySpot] = new Enemy3(0);
      enemy3++;
    }
  }

  projectileFire() {
    for (let i = 0; i < this.playerProj.length; i++) {
      if (!this.playerProj[i]) {
        this.playerProj[i] = new Projectile(this.player.x, this.player.y);
        shoot.play();
        break;
      }
    }
  }
  overHead() {
    if (overHead == true) {
      let cycle1 = true;
      let cycle2 = true;

      if (this.charge > 0) {
        this.charge -= 100;
        // setTimeout(() => { if (overHead == true && cycle1==true) { this.player.sprite = images['over2.png'];cycle1=false } }, 40)
        // setTimeout(() => { if (overHead == true &&cycle2==true) { this.player.sprite = images['over3.png'];cycle2=false } }, 60)
        setTimeout(() => {
          if (overHead == true) {
            this.player.sprite = images["over5.png"];
          }
        }, 100);
        this.enemies.forEach((ene, i) => {
          if (
            ene.x + ENEMY_WIDTH > this.player.x + 40 &&
            ene.x < this.player.x + PLAYER_WIDTH * 1.4 &&
            ene.y + ENEMY_HEIGHT > GAME_HEIGHT - 1.3 * PLAYER_HEIGHT &&
            ene.y + ENEMY_HEIGHT < GAME_HEIGHT + PLAYER_HEIGHT * 0.8 ||
            
            ene.x + ENEMY2_WIDTH > this.player.x + 40 &&
            ene.x < this.player.x + PLAYER_WIDTH * 1.4 &&
            ene.y + ENEMY2_HEIGHT > GAME_HEIGHT - 1.3 * PLAYER_HEIGHT &&
            ene.y + ENEMY2_HEIGHT < GAME_HEIGHT + PLAYER_HEIGHT * 0.8 ||

             
            ene.x + ENEMY3_WIDTH > this.player.x + 40 &&
            ene.x < this.player.x + PLAYER_WIDTH * 1.4 &&
            ene.y + ENEMY3_HEIGHT > GAME_HEIGHT - 1.3 * PLAYER_HEIGHT &&
            ene.y + ENEMY3_HEIGHT < GAME_HEIGHT + PLAYER_HEIGHT * 0.8
        ) {
            ene.life -= 3;
            if (ene.life <= 0) {
              if (ene.id == 3) {
                enemy3--;
              }
              this.exp.push(new Death(ene.x, ene.y));
              delete this.enemies[i];
            }
          }
        });
      }
      if (this.charge <= 0) {
        overHead = false;
        this.player.sprite = images["player.png"];
      }
    }
  }

  // This method kicks off the game
  start() {
    bgm.loop = true;
    bgm.play();
    this.time = 0;
    this.score = 0;
    this.lastFrame = Date.now();
    this.charge = 10000;

    // Listen for keyboard left/right and update the player
    document.addEventListener("keydown", e => {
      if (e.keyCode === LEFT_ARROW_CODE) {
        directions.left = true;
      } else if (e.keyCode === RIGHT_ARROW_CODE) {
        directions.right = true;
      }
      if (e.keyCode === 81) {
        if (this.playerProj) {
          shooting = true;
          this.player.sprite = images["shoot1.png"];
          setTimeout(() => {
            (this.player.sprite = images["shoot2.png"]), 50;
          });
          this.projectileFire();
        }
      }
      if (e.keyCode === 32) {
        if (jumping == false) {
          directions.up = true;
          jumping = true;
          jump.play();
          this.player.sprite = images["jump1.png"];
          setTimeout(() => {
            this.player.sprite = images["jump2.png"];
          }, 110);
          setTimeout(() => {
            this.player.sprite = images["jump3.png"];
          }, 160);
          setTimeout(() => {
            directions.up = false;
            directions.down = true;
            setTimeout(() => {}, 300);
          }, 300);
        }
      }
      if (e.keyCode === 87) {
        if (this.charge > 0) {
        overH.play();
          overHead = true;
          this.player.sprite = images["over1.png"];
        }
      }
    });

    document.addEventListener("keyup", e => {
      if (e.keyCode === LEFT_ARROW_CODE) {
        directions.left = false;
        if (jumping == false) {
          this.player.sprite = images["player.png"];
        }
      } else if (e.keyCode === RIGHT_ARROW_CODE) {
        directions.right = false;
        if (jumping == false) {
          this.player.sprite = images["player.png"];
        }
      }
      if (e.keyCode === 87) {
        overHead = false;
        if (jumping == false) {
          this.player.sprite = images["player.png"];
        }
      }
      if (e.keyCode === 81) {
        setTimeout(() => {
          shooting = false;
          this.player.sprite = images["player.png"];
        }, 60);
      }
    });

    this.gameLoop();
  }

  /*
    This is the core of the game engine. The `gameLoop` function gets called ~60 times per second
    During each execution of the function, we will update the positions of all game entities
    It's also at this point that we will check for any collisions between the game entities
    Collisions will often indicate either a player death or an enemy kill

    In order to allow the game objects to self-determine their behaviors, gameLoop will call the `update` method of each entity
    To account for the fact that we don't always have 60 frames per second, gameLoop will send a time delta argument to `update`
    You should use this parameter to scale your update appropriately
     */
  gameLoop() {
    // Check how long it's been since last frame
    var currentFrame = Date.now();
    var timeDiff = currentFrame - this.lastFrame;

    // Increase the score!
    if (this.charge < 10000) {
      this.charge += 20;
    }
    this.score += timeDiff;
    this.time += timeDiff;
    playerY = this.player.y;
    playerX = this.player.x;

    // Call update on all enemies
    this.bg.forEach(bg => bg.update(timeDiff));
    this.cb.forEach(c => c.update(timeDiff));
    this.enemies.forEach(enemy => enemy.update(timeDiff));
    this.cf.forEach(c => c.update(timeDiff));
    this.playerProj.forEach(projectile => projectile.update(timeDiff));
    this.player.update(timeDiff);
    this.overHead();

    // Draw everything!
    //this.ctx.drawImage(images['BGTest.jpg'], 0, -1000); // draw the star bg
    this.bg.forEach(bgx => bgx.render(this.ctx));
    this.cb.forEach(c => c.render(this.ctx));
    this.enemies.forEach(enemy => enemy.render(this.ctx)); // draw the enemies
    this.exp.forEach(x => x.render(this.ctx))
    this.cf.forEach(c => c.render(this.ctx));
    if(jumping==false && shooting==false){
    this.ctx.drawImage(images['beam'+Math.round(Math.random()*(3-1)+1)+'.png'], this.player.x-60, this.player.y+PLAYER_HEIGHT-25)
    }
    this.player.render(this.ctx); // draw the player
    this.playerProj.forEach(projectile => projectile.render(this.ctx));
    // this.ctx.drawImage(images['explosion1.png'], 20, 30)
    // this.ctx.drawImage(images['explosion1.png'], 50, 30)
    // this.ctx.drawImage(images['explosion1.png'], 80, 30)

    this.bg.forEach((a, i) => {
      if (a.x + BG_WIDTH <= 0) {
        this.bg.splice(0, 1);
      }
    });
    this.cb.forEach((a, i) => {
      if (a.x + 300 <= 0) {
        this.cb.splice(0, 1);
      }
    });
    this.cf.forEach((a, i) => {
      if (a.x + 300 <= 0) {
        this.cf.splice(0, 1);
      }
    });

    // Check if any enemies should die
    this.enemies.forEach((enemy, enemyIdx) => {
      if (enemy.id == 1) {
        if (enemy.y > GAME_HEIGHT - ENEMY_HEIGHT || enemy.x + ENEMY_WIDTH < 0) {
            crash.play();
          enemy.sprite = images["explosion1.png"];
          setTimeout(() => {
            {
              enemy.sprite = images["explosion2.png"];
            }
          }, 40);
          setTimeout(() => {
            {
              enemy.sprite = images["explosion3.png"];
            }
          }, 80);
          setTimeout(() => {
            {
              enemy.sprite = images["explosion4.png"];
            }
          }, 120);
          setTimeout(() => {
            {
              enemy.sprite = images["explosion5.png"];
            }
          }, 160);
          setTimeout(() => {
            delete this.enemies[enemyIdx];
          }, 180);
        }
      }
      if (enemy.id == 2) {
        if (enemy.y > GAME_HEIGHT || enemy.x + ENEMY2_WIDTH < 0) {
          delete this.enemies[enemyIdx];
        }
      }
      if (enemy.id == 3) {
        if (enemy.y > GAME_HEIGHT || enemy.x + ENEMY3_WIDTH < 0) {
          enemy3--;
            
          delete this.enemies[enemyIdx];
        }
      }
    });
    this.playerProj.forEach((proj, i) => {
      if (proj.x > GAME_WIDTH) {
        delete this.playerProj[i];
      }
    });
    this.enemies.forEach((ene, i) => {
      
      if (ene.id == 1) {
        if (ene.x < this.player.x && 
            ene.x + ENEMY_WIDTH > this.player.x &&
             ene.y + ENEMY_HEIGHT  > this.player.y + PLAYER_HEIGHT * 0.8 &&
              ene.y + ENEMY_HEIGHT > this.player.y)
               {
          this.exp.push(new Death(ene.x, ene.y));
          delete this.enemies[i];
          if (overHead == false) {
            playerLife--;
          }
        }
    } else if (ene.id == 2) {
        if (
            ene.x + ENEMY2_WIDTH * 0.2 < this.player.x + PLAYER_WIDTH &&
            ene.x + ENEMY2_WIDTH > this.player.x &&
            ene.y + ENEMY2_HEIGHT * 0.8 > this.player.y + PLAYER_HEIGHT * 0.8 &&
            ene.y < this.player.y + PLAYER_HEIGHT * 0.8
        ) {
            this.exp.push(new Death (ene.x, ene.y))
          delete this.enemies[i];
          if (overHead == false) {
            playerLife--;
          }
        }
      } else if (ene.id != 2 && ene.id != 1) {
        if (
          ene.x + ENEMY3_WIDTH * 0.5 < this.player.x + PLAYER_WIDTH &&
          ene.x + ENEMY3_WIDTH > this.player.x &&
          ene.y + ENEMY3_HEIGHT < this.player.y + PLAYER_HEIGHT &&
          ene.y + ENEMY3_HEIGHT > this.player.y
        ) {
          enemy3--;
          this.exp.push(new Death(ene.x, ene.y));
          delete this.enemies[i];
          if (overHead == false) {
            playerLife--;
          }
        }
      }
    });
    this.playerProj.forEach((projectile, j) => {
      this.enemies.forEach((enemy, i) => {
        if (enemy.id == 1) {
          if (
            enemy.x + ENEMY_WIDTH * 0.2 < projectile.x + PROJECTILE_WIDTH &&
            enemy.x + ENEMY_WIDTH > projectile.x &&
            enemy.y + ENEMY_HEIGHT * 0.8 >
              projectile.y + PROJECTILE_HEIGHT / 2 &&
            enemy.y < projectile.y + PROJECTILE_HEIGHT / 2
          ) {
            projExp.play();  
            this.playerProj[j].speed = 0;
            this.playerProj[j].sprite = images["explosion1.png"];
            setTimeout(() => {
              {
                projectile.sprite = images["explosion2.png"];
              }
            }, 40);
            setTimeout(() => {
              {
                projectile.sprite = images["explosion3.png"];
              }
            }, 80);
            setTimeout(() => {
              {
                projectile.sprite = images["explosion4.png"];
              }
            }, 120);
            setTimeout(() => {
              {
                projectile.sprite = images["explosion5.png"];
              }
            }, 160);
            this.score += 100;
            enemy.life--;
            setTimeout(() => {
              if (projectile) {
                delete this.playerProj[j];
              }
            }, 200);
            if (enemy.life == 0) {
              if (enemy.id == 3) {
                enemy3--;
              }
              this.exp.push(new Death(enemy.x, enemy.y));
              delete this.enemies[i];
            }
          }
        }
        if (enemy.id == 2) {
          if (
            enemy.x + ENEMY2_WIDTH * 0.2 < projectile.x + PROJECTILE_WIDTH &&
            enemy.x + ENEMY2_WIDTH > projectile.x &&
            enemy.y + ENEMY2_HEIGHT * 0.8 >
            projectile.y + PROJECTILE_HEIGHT / 2 &&
            enemy.y < projectile.y + PROJECTILE_HEIGHT / 2
          ) {
              projExp.play();  
            this.playerProj[j].speed = 0;
            this.playerProj[j].sprite = images["explosion1.png"];
            setTimeout(() => {
              {
                projectile.sprite = images["explosion2.png"];
              }
            }, 40);
            setTimeout(() => {
              {
                projectile.sprite = images["explosion3.png"];
              }
            }, 80);
            setTimeout(() => {
              {
                projectile.sprite = images["explosion4.png"];
              }
            }, 120);
            setTimeout(() => {
              {
                projectile.sprite = images["explosion5.png"];
              }
            }, 160);
            this.score += 100;
            enemy.life--;
            setTimeout(() => {
              if (projectile) {
                delete this.playerProj[j];
              }
            }, 200);
            if (enemy.life == 0) {
              if (enemy.id == 3) {
                enemy3--;
              }
              this.exp.push(new Death(enemy.x, enemy.y));
              delete this.enemies[i];
            }
          }
        }
        if (enemy.id == 3) {
          if (
            enemy.x + ENEMY3_WIDTH * 0.5 < projectile.x + PROJECTILE_WIDTH &&
            enemy.x + ENEMY3_WIDTH > projectile.x &&
            enemy.y + ENEMY3_HEIGHT < projectile.y + PROJECTILE_HEIGHT &&
            enemy.y + ENEMY3_HEIGHT > projectile.y
          ) {
              projExp.play();  
            this.playerProj[j].speed = 0;
            this.playerProj[j].sprite = images["explosion1.png"];
            setTimeout(() => {
              {
                projectile.sprite = images["explosion2.png"];
              }
            }, 40);
            setTimeout(() => {
              {
                projectile.sprite = images["explosion3.png"];
              }
            }, 80);
            setTimeout(() => {
              {
                projectile.sprite = images["explosion4.png"];
              }
            }, 120);
            setTimeout(() => {
              {
                projectile.sprite = images["explosion5.png"];
              }
            }, 160);
            this.score += 100;
            enemy.life--;
            setTimeout(() => {
              if (projectile) {
                delete this.playerProj[j];
              }
            }, 200);
            if (enemy.life == 0) {
              if (enemy.id == 3) {
                enemy3--;
              }
              this.exp.push(new Death(enemy.x, enemy.y));
              delete this.enemies[i];
            }
          }
        }
      });
    });

    // this.playerProj.forEach((projectile, i) => {
    //     if (projectile.x + PROJECTILE_WIDTH > GAME_WIDTH) {

    //         this.playerProj.splice(i, 1);

    //     }
    // });
    this.setupEnemies();
    this.setUpBG();
    this.setUpCb();
    this.setUpCf();
    this.setUpExplode();
    //this.setupShoot();

    // Check if player is dead
    if (this.isPlayerDead()) {
        deathcheck = true
      // If they are dead, then it's game over!
      this.player.sprite = images["death1.png"];
      jump.volume = 0
      shoot.volume = 0;
      overH.volume = 0
      this.bg.forEach(bgx => bgx.render(this.ctx));
      this.cb.forEach(c => c.render(this.ctx));
      this.enemies.forEach(enemy => enemy.render(this.ctx)); // draw the enemies
      this.cf.forEach(c => c.render(this.ctx));
      this.player.render(this.ctx); // draw the player
      this.playerProj.forEach(projectile => projectile.render(this.ctx));
      setTimeout(() => {
        this.player.sprite = images["death2.png"];
        this.bg.forEach(bgx => bgx.render(this.ctx));
        this.cb.forEach(c => c.render(this.ctx));
        this.enemies.forEach(enemy => enemy.render(this.ctx)); 
        this.cf.forEach(c => c.render(this.ctx));
        this.player.render(this.ctx); 
      }, 90);
      setTimeout(() => {
        death.play();
        this.player.sprite = images["death3.png"];
        this.bg.forEach(bgx => bgx.render(this.ctx));
        this.cb.forEach(c => c.render(this.ctx));
        this.enemies.forEach(enemy => enemy.render(this.ctx));
        this.cf.forEach(c => c.render(this.ctx));
        if(this.player.y<GAME_HEIGHT-PLAYER_HEIGHT){
            this.player.y=GAME_HEIGHT-PLAYER_HEIGHT
            this.player.update(0)
        }
        this.player.render(this.ctx); 
        this.ctx.font = "bold 200px Gugi";
        this.ctx.fillStyle = "#f40424";
        this.ctx.fillText(this.score, 170, 270);
        this.ctx.fillText("GAME OVER", 150, 470);
      }, 200);
    } else {
      // If player is not dead, then draw the score
      this.ctx.fillStyle = "f40424";
      this.ctx.font = "bold 30px Gugi";
      this.ctx.fillText(Math.round(this.time / 1000), 700, 30);
      this.ctx.fillStyle = "#db213e";
      this.ctx.font = "bold 30px Gugi";
      this.ctx.fillText(this.score, 680, 60);
      this.ctx.fillStyle = "#444444";
      this.ctx.fillRect(5, 30, 400, 15);
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(5, 30, playerLife * 2500 / 25, 15);
      this.ctx.fillText(this.score, 680, 60);
      this.ctx.fillStyle = "#444444";
      this.ctx.fillRect(5, 50, 400, 15);
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(5, 50, this.charge / 25, 15);
      this.ctx.fillStyle = "#db213e";
      // Set the time marker and redraw
      this.lastFrame = Date.now();
      requestAnimationFrame(this.gameLoop);
    }
  }

  isPlayerDead() {
    if (playerLife < 1) {
      return true;
    }

    return false;
  }
}

// This section will start the game
var gameEngine = new Engine(document.getElementById("app"));
gameEngine.start();
