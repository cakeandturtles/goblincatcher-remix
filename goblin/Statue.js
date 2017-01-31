var Statue = function(x, y, id){
  //members
  this.x = x;
  this.y = y;
  this.startx = x;
  this.starty = y;
  this.lb = 2;
  this.tb = 2;
  this.rb = 14;
  this.bb = 14;
  this.xvel = 0;
  this.yvel = 0;
  this.speed = 140;
  this.start = 0;
  this.alive = 0;
  this.flashCount = 0;
  this.dead = 0;
  this.chase = 0;
  this.direction = "DOWN";
  this.id = id;
  
  //Animation stuff
  this.visible = true;
  this.frameCount=0;
  this.frameDelay=15;
  this.currFrame=0;
  this.currAni=0;
  this.maxFrame=2;
  this.frameWidth=32;
  this.frameHeight=32;

  //methods
  this.Update = StatueUpdate;
  this.WhichDirection = WhichDirection;
  this.DrawImage = ObjectDrawImage;
};

var StatueUpdate = function(modifier){
  if (this.dead <= 0 && this.currAni < 2)
  {
    this.speed = (tempScore) + 60;
    if (this.speed>150){
      this.speed=150; 
    }
    if (hero.powerup==="stealth") this.speed/=2;
 
    var checkArea = 4*(tempScore/25)+32;

    if (Collision(this.x+this.lb-checkArea, this.y+this.tb-checkArea,
                  this.x+this.rb+checkArea, this.y+this.bb+checkArea,
                  hero) && this.alive==0 && hero.powerup!=="stealth"){
      this.start = 10;
      this.alive = 80+Math.round(Math.random()*80);
      this.chase = 10*(this.id+1);
    
      if (playSound) {
        awakenSound.currentTime=0;
        awakenSound.play();
      }

      this.currAni = 1;
      this.direction = this.WhichDirection();
    }
  
    if (this.alive>0){ 
      if (this.start === 0)
      {
        //put the logic for chasing the player down here
        if (this.chase>0){
          this.chase--;
          this.xvel = 0;
          this.yvel = 0;
          if (this.direction==="UP")
            this.yvel = (-1)*(this.speed*modifier);
          if (this.direction==="UPRIGHT"){
            this.yvel = (-0.71)*(this.speed*modifier);
            this.xvel = (0.71)*(this.speed*modifier); 
          }
          if (this.direction==="DOWN")
            this.yvel = (this.speed*modifier);
          if (this.direction==="DOWNRIGHT"){
            this.yvel = (0.71)*(this.speed*modifier);
            this.xvel = (0.71)*(this.speed*modifier);
          }
          if (this.direction==="LEFT")
            this.xvel = (-1)*(this.speed*modifier);
          if (this.direction==="UPLEFT"){
            this.yvel = (-0.71)*(this.speed*modifier);
            this.xvel = (-0.71)*(this.speed*modifier);
          }
          if (this.direction==="RIGHT")
            this.xvel = (this.speed*modifier);
          if (this.direction==="DOWNLEFT"){
            this.yvel = (0.71)*(this.speed*modifier);
            this.xvel = (-0.71)*(this.speed*modifier);
          }
        }
        else {
          this.chase = 10*(this.id+1);
          if (hero.powerup!=="stealth")
            this.direction = this.WhichDirection();
        }
        this.alive--;
        if (hero.powerup==="stealth")this.alive--;
      }
      else {
        this.start--;
        if (this.start==0)
          this.direction = this.WhichDirection();
      }
    }
    else {
      this.currAni = 0;
      this.xvel = 0;
      this.yvel = 0;
      this.chase = 0;
      this.alive = 0;
    }
  
    //horizontal solid collisions
    for (i in solids){
      var xspd = this.x + this.xvel; 
 
      //left solid collision
      if (Collision(xspd+this.lb, this.y+this.tb, 
                    this.x+this.lb, this.y+this.bb, solids[i])){
        this.xvel = 0;
        while (!Collision(this.x+this.lb-1, this.y+this.tb,
                           this.x+this.lb, this.y+this.bb, solids[i]))
          this.x--;
      }
    
      //right solid collision
      if (Collision(this.x+this.rb, this.y+this.tb, 
                    xspd+this.rb, this.y+this.bb, solids[i])){
        this.xvel = 0;
        while (!Collision(this.x+this.lb, this.y+this.tb ,
                this.x+this.rb+1, this.y+this.bb, solids[i]))
          this.x++;
      }
    }
    this.x += this.xvel;
  
    //vertical solid collisions
    for (i in solids){
      var yspd = this.y+this.yvel;
        
      //top solid collision
      if (Collision(this.x+this.lb, yspd+this.tb,
                    this.x+this.rb, this.y+this.tb, solids[i]))
      {
        this.yvel=0;
        while (!Collision(this.x+this.lb, this.y+this.tb-1,
                           this.x+this.rb, this.y+this.tb, solids[i]))
          this.y--;
      }
      //bottom solid collision
      if (Collision(this.x+this.lb, this.y+this.bb,
                    this.x+this.rb, yspd+this.bb, solids[i])){
        this.yvel=0;
        while (!Collision(this.x+this.lb, this.y+this.bb,
                           this.x+this.rb, this.y+this.bb+1, solids[i]))
          this.y++;
      }
    }
    this.y += this.yvel;
  }
  else if (this.dead > 0){
    this.dead--;
    if (this.dead <= 0)
    {
      this.currFrame = 0;
      this.currAni = 3;
      this.visible = true;
      if (playSound)
      {
        regrowSound.currentTime=0;
        regrowSound.play();
      }
    }
  }
  
  if (++this.frameCount >= this.frameDelay)
  {
    if (++this.currFrame >= this.maxFrame)
    {
      if (this.currAni === 2 && this.flashCount == 1)
      {
        this.currAni = 0;
        this.dead = 600;
        this.visible = false;
        this.x = this.startx; this.y = this.starty;
      }
      else if (this.currAni === 2)
      	this.flashCount++;
      else if (this.currAni === 3)
      {
        this.currAni = 0;
        this.frameDelay = 15;
        this.flashCount = 0;
      }
      
      this.currFrame = 0;
    }
    this.frameCount = 0;
  }
};


var WhichDirection = function(){
  //if the hero is closer vertically than horizontally
  if (Math.abs(hero.x-this.x)>Math.abs(hero.y-this.y)){
    //if he's to the right
    if (hero.x > this.x)
    {
      if (this.id%2==0)
        return "RIGHT";
      else{
        if (hero.y > this.y)
          return "DOWNRIGHT";
        return "UPRIGHT";
      }
    }
    if (this.id%2==0)
      return "LEFT";
    else
    {
      if (hero.y > this.y)
        return "DOWNLEFT";
      return "UPLEFT";
    }
  }

  //if the hero is closer horizontally than vertically
  else
  {
    //if he's to the bottom
    if (hero.y > this.y)
    {
      if (this.id%2===0)
        return "DOWN";
      else
      {
        if (hero.x > this.x)
          return "DOWNRIGHT";
        return "DOWNLEFT";
      }
    }
    if (this.id%2===0)
      return "UP";
    else
    {
      if (hero.x > this.x)
        return "UPRIGHT";
      return "UPLEFT";
    }
  }
};
