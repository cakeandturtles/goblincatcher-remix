var Goblin = function(){
  //members
  this.x = 0;
  this.y = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.lb = 0;
  this.tb = 0;
  this.rb = 16;
  this.bb = 16;
  this.special = false;

  //Animation stuff
  this.frameCount=0;
  this.frameDelay=30;
  this.currFrame=0;
  this.currAni=0;
  this.maxFrame=2;
  this.frameWidth=32;
  this.frameHeight=32;

  //methods
  this.Update = GoblinUpdate;
  this.DrawImage = ObjectDrawImage;
  this.visible = true;
};

var GoblinUpdate = function(modifier){
  for (i in statues){
    if (Collision(this.x+this.lb, this.y+this.tb,
                  this.x+this.rb, this.y+this.bb, statues[i])){
      if (reset(this)===0)
        this.special = true;
      else
        this.special = false;
    }
  }


  //BEING DRAWN TO THE GOBLIN PHEREMONES
  if (hero.powerup==="goblinPheremones" && story == 0){
    if (hero.x > this.x+4)
      this.x++;
    else if (hero.x < this.x-4)
      this.x--;

    if (hero.y > this.y+4)
      this.y++;
    else if (hero.y < this.y-4)
      this.y--;
  }

  //Animation Update
  if (story < 10) {
    if (this.special && story == 0)
      this.currAni=2;
    else if (story == 0){
      if (hero.powerup==="goldGoblin" && !losePowerupFlash )
        this.currAni=1;
      else
        this.currAni=0;
    }
  }

  if (++this.frameCount >= this.frameDelay)
  {
    if (++this.currFrame >= this.maxFrame)
      this.currFrame = 0;
    this.frameCount = 0;
  }
};
