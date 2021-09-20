
var trex ,trex_running;
var edges
var ground,ground_image
var sground
var cloud, cloud_image
var cactus, cactus_image
var cactus2,cactus2_image
var cactus3, cactus3_image
var cactus4, cactus4_image
var cactus5, cactus5_image
var cactus6, cactus6_image
var score
var gamestate="alive"
var cactusgroup
var cloudgroup
var trexcollided, trexcollided_animation
var restart, restart_image
var gameover, gameover_image
var checkpointsound
var diesound 
var jumpsound

function preload(){
  trex_running=loadAnimation("trex3.png","trex4.png")
  ground_image=loadImage("ground2.png")
  cloud_image=loadImage("cloud.png")
  cactus_image=loadImage("obstacle1.png")
  cactus2_image=loadImage("obstacle2.png")
  cactus3_image=loadImage("obstacle3.png")
  cactus4_image=loadImage("obstacle4.png")
  cactus5_image=loadImage("obstacle5.png")
  cactus6_image=loadImage("obstacle6.png")
  trexcollided_animation=loadAnimation("trex_collided.png")
  gameover_image = loadImage("gameOver.png")
  restart_image = loadImage("restart.png")
  checkpointsound = loadSound("checkPoint.mp3")
  diesound = loadSound("die.mp3")
  jumpsound = loadSound("jump.mp3")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex=createSprite(50,185,20,50)
  trex.scale=0.6  
  trex.addAnimation("running",trex_running)
  trex.addAnimation("dead",trexcollided_animation)
  //making collision radius of trex visible 
  //trex.debug=true 
  //changing shape and size of collision radius
  trex.setCollider("circle",0,0,40)
  //creating ground
  ground=createSprite(200,180,400,5)
  ground.addImage(ground_image)
  //creating small ground
  sground=createSprite(200,190,400,5)
  sground.visible=false
  //creating gameover and restart icons
  gameover = createSprite(300,100)
  gameover.addImage(gameover_image)
  gameover.scale=0.5
  restart = createSprite(300,140)
  restart.addImage(restart_image)
  restart.scale=0.5
  //creating edges
  edges=createEdgeSprites()
  //practicing random function
  //sky=Math.round(random(1,78))
  //console.log(sky)
  score=0
  //creating cactus and cloud groups
  cloudgroup=new Group ()
  cactusgroup=new Group () 
}

function draw(){
  background("orange")
  //displaying score
  textSize(20)
  fill ("blue")
  text("Score: "+score,450,50)
  if (gamestate=="alive"){
    //moving ground
    ground.velocityX=-6-score/100
    //making gameover and restart invisable 
    gameover.visible=false
    restart.visible=false
    //score increase
    score=score+Math.round(getFrameRate()/60)
    //making trex jump only when trex legs are on sground
      if (keyDown("space")&&trex.collide(sground)){
        trex.velocityY=-10
        jumpsound.play()
      }
      if (score%500==0){
        checkpointsound.play()
      }
    //adding gravity to trex
    trex.velocityY=trex.velocityY+0.5
      //scrolling ground to make it infinite
      if (ground.x<0){
        ground.x=200
      } 
    spawnclouds()
    spawncactus()
    //detecting collision between trex and cactus
      if (trex.isTouching(cactusgroup)){
        gamestate="dead"
        diesound.play() 
      }

  }
  else if (gamestate=="dead"){
    //stopping ground
    ground.velocityX=0
   //making gameover and restart visable 
    gameover.visible=true
    restart.visible=true
    cactusgroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    //changing trex animation to dead
    trex.changeAnimation("dead")
    //setting the lifetime of the game objects so that they dont disapear
    cactusgroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1)
    //fixing flying trex
    trex.velocityY=0
    if (mousePressedOver(restart)){
      reset ()
    }
  }
  //giving trex a base
  trex.collide(sground)
  drawSprites() 

}
function reset () {
  gamestate="alive"
  cactusgroup.destroyEach()
  cloudgroup.destroyEach()
  trex.changeAnimation("running")
  score=0

}
function spawnclouds(){
  if (frameCount%40==0){
    cloud=createSprite(600,40,40,10)
    cloudgroup.add(cloud)
    cloud.lifetime=150
    cloud.scale=0.65
    cloud.velocityX=-4-score/100
    cloud.y=Math.round(random(10,130))
    //console.log(cloud.depth)
    //adjusting depth of trex
    trex.depth=cloud.depth+1
    cloud.addImage(cloud_image)
  }
}
function spawncactus(){
  if (frameCount%60==0){
    cactus=createSprite(600,165,10,10)
    cactusgroup.add(cactus)
    cactus.lifetime=150
    cactus.scale=0.5
    cactus.velocityX=-6-score/100
    trex.depth=cactus.depth+1
    var cacti=Math.round(random(1,6))
    switch(cacti){
      case 1: cactus.addImage(cactus_image)
      break; 
      case 2: cactus.addImage(cactus2_image)
      break; 
      case 3: cactus.addImage(cactus3_image)
      break; 
      case 4: cactus.addImage(cactus4_image)
      break; 
      case 5: cactus.addImage(cactus5_image)
      break; 
      case 6: cactus .addImage(cactus6_image)
      break; 
      default:break
    }
  }
}