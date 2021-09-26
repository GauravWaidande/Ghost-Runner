var ghost,ghostImg,tower,towerImg,climbersImg,doorsImg,climbersG,doorsG,invisibleBlockG,gameState,play,end;

function preload(){
  
  ghostImg=loadImage("ghost-jumping.png");
  towerImg=loadImage("tower.png");
  climbersImg=loadImage("climber.png");
  doorsImg=loadImage("door.png");
  
}

function setup(){
  
  createCanvas(600,600);
  
  play=1;
  end=2;
  gameState=play;
  
  tower=createSprite(300,100,10,10);
  tower.addImage("t1",towerImg);
  tower.velocityY=3;
  
  ghost=createSprite(300,400,10,10);
  ghost.addImage("g1",ghostImg);
  ghost.scale=0.25;
  
  invisibleBlockG=new Group();
   climbersG=new Group();
   doorsG=new Group();
}

function draw(){
  
  if(gameState===play){
    
  ghost.velocityY=5;
    
    if(ghost.isTouching(climbersG)){
      ghost.velocityY=0;
    }
    
    if(ghost.isTouching(invisibleBlockG)||ghost.y>600){
      gameState=end;
    }
  
  if(tower.y>200){
    tower.y=100;
  }
  
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-5;
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+5;
  }
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  
  Spawn();
    
    drawSprites();
    
  }
  
  if(gameState===end){
    background("black");
    textSize(20);
    fill("red");
    text("Game Over",280,300);
  }
  
}

function Spawn(){
  
  if(frameCount%200===0){
  
    var doors=createSprite(Math.round(random(190,410)),-50,10,10);
    doors.addImage("d1",doorsImg);
    doors.velocityY=2;
    doorsG.add(doors);
    doors.depth=ghost.depth;
    ghost.depth+=1;
    
    var climbers=createSprite(doors.x,5,10,10);
  climbers.addImage("c1",climbersImg);
  climbers.velocityY=2;
    climbersG.add(climbers);
    climbers.depth=ghost.depth;
    ghost.depth+=1;
    
    var  invisibleBlock=createSprite(doors.x,10,100,10);
    invisibleBlock.velocityY=2;
    invisibleBlockG.add(invisibleBlock);
    invisibleBlock.visible=false;
    
  }
  
}