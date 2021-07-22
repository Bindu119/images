var player, playerImg;
var bg, bgImg;
var enemy, enemyImg;
var enemyGroup;
var bulletGroup;
var score = 0;
var gameState = 1;
var velX=0;
var speed=0;

function preload() {
  playerImg = loadImage("shooter.png");
  enemyImg = loadImage("Zombie.png");
  bgImg = loadImage("city.png");
  bg2Img = loadImage("bg2.jpg")
  towerImg = loadImage("tower.png");
  sunset11Img = loadImage("sunset11.png");
  sunset8Img = loadImage("sunset8.png")
  sunrise4Img = loadImage("sunrise4.png");
  bulletImg=loadImage("bullet.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight); 

  player = createSprite(200, 200, 10, 50);
  player.addImage(playerImg);
  player.scale = 0.5;

  bulletGroup = new Group();
  enemyGroup = new Group();
}

function draw() {
  background(bgImg);

  if (keyDown("UP_ARROW")) {
    player.y = player.y - 30;
  }
  if (keyDown("DOWN_ARROW")) {
    player.y = player.y + 30;
  }

  if (keyWentDown("space")) {
    shootBullet();
  }

  if (bulletGroup.isTouching(enemyGroup)) {
    for (var i = 0; i < enemyGroup.length; i++) {
      if (enemyGroup[i].isTouching(bulletGroup)) {
        enemyGroup[i].destroy();
        bulletGroup.destroyEach();
        score = score + 5;
      }
    }
  }

  if(player.isTouching(enemyGroup)){
    gameState=7;
  }

  if(keyDown("r")){
    gameState=1;
    score=0;
    player.x=200;
    player.y=200;
  }

  if(gameState === 1){
    spawnZombies(10,60);
    textSize(30)
    fill("black")
    text("Level 1 ", width - 500, 50)
  }

  if (score > 50 && score < 100) {
    gameState = 2;
  }
  if (gameState === 2) {
    spawnZombies(12,55);
    background(bg2Img);
    textSize(30)
    fill("white")
    text("Level 2 ", width - 500, 50)
  }
  if (score > 100 && score < 150) {
    gameState = 3;
  }

    if(gameState === 3){
      spawnZombies(14,50);
      background(sunrise4Img);
      textSize(30);
      fill("black");
      text("Level 3", width - 500, 50);
    }
    if (score > 150 && score < 200) {
      gameState = 4;
    }
    if(gameState === 4){
      spawnZombies(16,45);
      background(sunset8Img);
      textSize(30);
      fill("black");
      text("Level 4", width - 500, 50);
    }

    if (score > 200  && score < 250) {
      gameState = 5;
    }
    if(gameState === 5){
      spawnZombies(18,40);
      background(sunset11Img);
      textSize(30);
      fill("black");
      text("Level 5", width - 500, 50);
    }

    if (score > 250 && score < 300) {
      gameState = 6;
    }

    if(gameState === 6){
      background(towerImg);
      player.x=windowWidth/2;
      player.y=windowHeight/2;
      textSize(50);
      textAlign(CENTER);
      fill("black");
      text("You Won!", windowWidth/2, windowHeight/2 -100);
    }

    if(gameState === 7){
      background(towerImg);
      player.x=windowWidth/2;
      player.y=windowHeight/2;
      enemyGroup.destroyEach();
      textAlign(CENTER);
      textSize(50);
      fill("black");
      text("You Lost!!!", windowWidth/2, windowHeight/2 -100);
      text("Press R to restart", windowWidth/2, windowHeight/2 +200);
    }
   
  
  drawSprites();
  textSize(30);
  text("Score  :  " + score, width - 350, 50);

}

function spawnZombies(velX,speed) {
  if (frameCount % speed === 0) {
    enemy = createSprite(random(800, 1200), random(100, 500), 40, 40);
    enemy.addImage(enemyImg);
    enemy.scale=0.7;
    enemy.velocityX =-velX;
    enemy.lifetime = 800;
    enemyGroup.add(enemy);

  }
}

function shootBullet() {
  bullet = createSprite(200, 200, 20, 10);
  bullet.addImage(bulletImg);
  bullet.scale=0.5;
  bullet.velocityX = 25;
  bullet.x = player.x;
  bullet.y = player.y;
  bullet.lifetime = 500;
  bulletGroup.add(bullet);
}
