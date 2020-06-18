class Ball{
    constructor(x,y){   
        this.image=loadImage("fotball.jpg");
        this.body = createSprite(x,y,40,40);
        this.body.addImage(this.image);
        this.body.scale=0.1;
    }

     updateBall(){
        database.ref('ball').update({
          'x':this.body.x,
          'y':this.body.y
          
        });
        
      }
      
     getBallPosition(){
        var ballRef=database.ref('ball');
        ballRef.on("value",(data)=>{
            var pos=data.val();
            this.body.x=pos.x;
            this.body.y=pos.y;
            console.log(pos.x,pos.y);
        });
        
      }
}