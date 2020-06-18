 var player1,player2,ball,bg_img;
 var redge, ledge, tedge, dedge;
 var rside,lside,tside;
 var rside2,lside2,tside2;
 var playerCount=0;
 var database,gameState=0;
 var playerIndex=1;
 var reset,resetImg;


 function preload(){
  bg_img=loadImage("bg.jpg");
  resetImg=loadImage("RESET.png");
 }

 function setup() {
  createCanvas(windowWidth,windowHeight);
  database=firebase.database();

 
  player1 = new Player(windowWidth/3,windowHeight/2);
  player2 = new Player(windowWidth/1.5,windowHeight/2);
  ball = new Ball(windowWidth/2,windowHeight/2);

  ledge=createSprite(0,windowHeight/2,10,windowHeight);
  ledge.shapeColor="#91B632";

  redge=createSprite(windowWidth,windowHeight/2,10,windowHeight);
  redge.shapeColor="#91B632";

  tedge=createSprite(windowWidth/2,0,windowWidth,10);
  tedge.shapeColor="#91B632";

  dedge=createSprite(windowWidth/2,windowHeight,windowWidth,10);
  dedge.shapeColor="#91B632";

  
  reset=createSprite(1000,60,10,10);
  reset.addImage(resetImg);
  reset.scale=0.25;

  if(gameState===0){
    database.ref('playerCount').once("value",(data)=>{
    playerCount=data.val();
    
    if(playerCount===0){
      playerCount++;
      updateCount(playerCount);
      playerIndex=1;
      console.log("playerIndex is "+ playerIndex );
      console.log("playerCount is "+ playerCount );
    }
    else if (playerCount===1){
      playerCount++
      updateCount(playerCount);
      updateState(1);
      playerIndex=2;
      console.log("playerCount is "+ playerCount );
      console.log("playerIndex is "+ playerIndex );
      console.log("game has started");
    }
    else{
      console.log("already 2 players have joined");
    }
    });
  }
  else{
    console.log("game is in progress");
  }

  ball.getBallPosition();
  
}

function draw() {
  background(bg_img);  
 
  player1.body.bounce(ball.body);
  player2.body.bounce(ball.body);
  player1.body.collide(player2.body);

  ball.body.bounceOff(ledge);
  ball.body.bounceOff(redge);
  ball.body.bounceOff(tedge);
  ball.body.bounceOff(dedge);

  player1.body.collide(ledge);
  player1.body.collide(redge);
  player1.body.collide(tedge);
  player1.body.collide(dedge);

  player2.body.collide(ledge);
  player2.body.collide(redge);
  player2.body.collide(tedge);
  player2.body.collide(dedge);

  if(mousePressedOver(reset)){
    updateCount(0);
    updateState(0);
    ball.updateBall();
  }


  ball.updateBall();
 
  drawSprites();
}

function keyPressed(){
   if(keyCode===38){
     player1.body.velocityX=0;
     player1.body.velocityY=-2;
     console.log("up");
   }


   else if(keyCode===40){
     player1.body.velocityX=0;
     player1.body.velocityY=2;
     console.log("down");
   }
  

   else if(keyCode===37){
     player1.body.velocityX=-2;
     player1.body.velocityY=0;
     console.log("left");
   }
  

   else if(keyCode===39){
    player1.body.velocityX=2;
    player1.body.velocityY=0;
    console.log("right");
   }
   else{
    player1.body.velocityX=0;
    player1.body.velocityY=0;
   }
}

function updateCount(count){
  database.ref('/').update({
    'playerCount':count
  });
}

function updateState(gcount){
  database.ref('/').update({
    'gameState':gcount
  });
}

