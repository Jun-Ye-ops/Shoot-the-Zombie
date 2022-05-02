var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombiesimg
var zombies
var bullets,bulletsimg
var zombieGroup
var bulletGroup
var explosion
var score=0
var life=3
var bullet=150
var heart1img, heart2img, heart3img
var heart1, heart2, heart3
var gamestate="fight"


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombiesimg = loadImage("assets/zombie.png")
  bulletsimg =loadImage("assets/bullet.png")
  explosion =loadSound("assets/explosion.mp3")
  heart1img =loadImage("assets/heart_1.png")
  heart2img =loadImage("assets/heart_2.png")
  heart3img =loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1600, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

bulletGroup= new Group()
zombieGroup= new Group()

heart1=createSprite(width-1850,50,50,50)
heart1.addImage(heart1img)
heart1.scale=0.5
heart1.visible=false

heart2=createSprite(width-1800,50,50,50)
heart2.addImage(heart2img)
heart2.scale=0.5
heart2.visible=false

heart3=createSprite(width-1750,50,50,50)
heart3.addImage(heart3img)
heart3.scale=0.5
heart3.visible=true
}

function draw() {
  background(0);
  if(gamestate=="fight"){
    if(bulletGroup.isTouching(zombieGroup)){
      for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(bulletGroup)){
  zombieGroup[i].destroy()
  bulletGroup[i].destroy()
        }
      }
      explosion.play()
    }
    if(zombieGroup.isTouching(player)){
      for(var i=0;i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(player)){
  zombieGroup[i].destroy()
  life=life-1
        }
    }}
    if(life===3){
      heart3.visible=true
      heart2.visible=false
      heart1.visible=false
    }
    if(life===2){
      heart3.visible=false
      heart2.visible=true
      heart1.visible=false
    }
    if(life===1){
      heart3.visible=false
      heart2.visible=false
      heart1.visible=true
    }
    if(life===0){
      heart3.visible=false
      heart2.visible=false
      heart1.visible=false
      gamestate="Gameover" 
    }
     //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  shootZombies()
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnZombies()
  }
  

  


  

 

drawSprites();
if(gamestate=="Gameover"){
  textSize(100)
  fill("red")
  text("YOU SUCK",500,400)
  zombieGroup.destroyEach()
  bulletGroup.destroyEach()
  player.destroy() 
}


}

function spawnZombies(){
  if(frameCount%15==0){
    zombies= createSprite(width-400,height-100,50,50)
    zombies.addImage(zombiesimg)
    zombies.velocityX=-6
    zombies.scale=0.20
    zombies.y=random(height-100,height-600)
    zombies.lifeTime=200
    zombieGroup.add(zombies)
  }
}

function shootZombies(){
  bullets=createSprite(player.x+100,player.y-35,50,50)
  bullets.addImage(bulletsimg)
  bullets.velocityX=10
  bullets.scale=0.20
  bulletGroup.add(bullets)
}