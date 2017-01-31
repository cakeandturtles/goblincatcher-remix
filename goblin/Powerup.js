var Powerup = function(){
  //members
  this.x = 0;
  this.y = GAME_HEIGHT/2;
  this.lb=4;
  this.tb=2;
  this.rb=12;
  this.bb=14;
  this.powerup="none";
  this.powerupTime=0;
  this.powerupScore=0;
  this.visible=false;

  //Animation stuff
  this.frameCount=0;
  this.frameDelay=15;
  this.currFrame=0;
  this.currAni=0;
  this.maxFrame=2;
  this.frameWidth=32;
  this.frameHeight=32;

  //methods
  this.Update = PowerupUpdate;
  this.WhichPowerup = WhichPowerup;
  this.DrawImage = ObjectDrawImage;
};

var PowerupUpdate = function(){
  if (goblinsCaught>=this.powerupScore && !this.visible && hero.powerup==="none")
    this.visible=true;

  //reset if touching a statue or goblin
  for (i in statues){
    if (Collision(this.x+this.lb, this.y+this.tb,
                  this.x+this.rb, this.y+this.bb, statues[i])){
      reset(this);
    }
  }

  for (i in goblins) {
    if (Collision(this.x+this.lb, this.y+this.tb,
                  this.x+this.rb, this.y+this.bb, goblins[i])){
      reset(this);
    }
  }

  //Animation Update
  if (++this.frameCount >= this.frameDelay)
  {
    if (++this.currFrame >= this.maxFrame)
      this.currFrame = 0;
    this.frameCount = 0;
  }
};

var WhichPowerup = function(){
  reset(this);
  this.visible=false;
  this.powerupTime=0;
  this.powerupScore=goblinsCaught+Math.floor((Math.random()*16))+5;


  //we'll use this.currAni as the dummy random holder to calculate which powerup
  //which is also useful because currAni will be used to pick the powerup animation
  this.currAni = Math.floor(Math.random()*5);

  if (this.currAni===0)
    this.powerup="stealth";
  else if (this.currAni===1)
    this.powerup="goldGoblin";
  else if (this.currAni===2)
    this.powerup="goblinPheremones";
  else if (this.currAni===3)
    this.powerup="stoneSkin";
  else if (this.currAni===4)
	this.powerup="speed";
  else //although we should never get here...
    this.powerup="none";

};
