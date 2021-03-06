var Hero = function(player_number){
  this.player_number = player_number;

  //members
  this.speed = 162; //pixels/second
  this.x = GAME_WIDTH/2;
  this.y = GAME_HEIGHT/2;
  this.xvel = 0;
  this.yvel = 0;
  this.lb = 2;
  this.tb = 2;
  this.rb = 14;
  this.bb = 14;

  //powerups
  this.powerup="none";
  this.powerupTime=0;

  //Animation stuff
  this.frameCount=0;
  this.frameDelay=30;
  this.currFrame=0;
  this.currAni=0;
  this.maxFrame=2;
  this.frameWidth=32;
  this.frameHeight=32;

  //methods
  this.Update = HeroUpdate;
  this.HorizontalSolidCollision = HeroHoriSolidCollision;
  this.VerticalSolidCollision = HeroVertSolidCollision;
  this.UpdateAnimation = HeroUpdateAnimation;
  this.DrawImage = ObjectDrawImage;
};

var HeroUpdate = function(modifier)
{
  //first, catch goblins!!
  for (i in goblins) {
    let goblin = goblins[i];
    if (Collision(this.x+this.lb,this.y+this.tb,this.x+this.rb,this.y+this.bb,goblin)){
      if (story >= 3 && goblin.currAni >= 6 && goblin.visible) {
        tempScore--;
        goblin.visible = false;
        if (playSound) {
          special2Sound.currentTime = 0;
          special2Sound.play();
        }
      }
      else if (story == 0) {
        progressStoryCatch(goblin);

        if (playSound && story == 0){
          if (goblin.special){
            specialSound.currentTime=0;
            special2Sound.currentTime=0;
            if (this.player_number == 1)
              specialSound.play();
            else
              special2Sound.play();
          }
          else{
            if (this.powerup==="goldGoblin"){
              goldSound.currentTime=0;
              gold2Sound.currentTime=0;
              if (this.player_number == 1)
                goldSound.play();
              else
                gold2Sound.play();
            }
            else{
              catchSound.currentTime=0;
              catch2Sound.currentTime=0;
              if (this.player_number == 1)
                catchSound.play();
              else
                catch2Sound.play();
            }
          }
        }
        if (reset(goblin)===0)
          goblin.special = true;
        else
          goblin.special = false;
      }
    }
  }

  //then, collect powerups!!!
  if (Collision(this.x+this.lb,this.y+this.tb,this.x+this.rb,this.y+this.bb,potion) && potion.visible){
    this.powerup = potion.powerup;
    this.powerupTime = 320;
    potion.visible=false;
    if (playSound){
      powerupSound.currentTime=0;
      powerupSound.play();
    }
  }
  if (this.powerup!=="none" && story == 0){
    this.powerupTime--;
    if (this.powerupTime===0){
      this.powerup="none";
      potion.WhichPowerup();
    }
    if (this.powerupTime===60)
    {
      if (playSound){
        losePowerSound.currentTime=0;
        losePowerSound.play();
      }
    }
  }

  //then, let statues kill you!
  for (i in statues){
    if (statues[i].alive !== 0)
    {
      if (Collision(this.x+this.lb, this.y+this.tb,
                  this.x+this.rb, this.y+this.bb, statues[i])){
        if (this.powerup!="stoneSkin"){
          isGameOver=true;
          if (playSound){
            dieSound.currentTime=0;
            dieSound.play();
          }
        }
        else if (statues[i].currAni === 1){
          statues[i].currFrame=0;
          statues[i].frameDelay = 5;
          statues[i].currAni=2;
          statues[i].alive=0;
          statues[i].chase=0;
          statues[i].xvel=0;
          statues[i].yvel=0;
          if (playSound){
            killSound.currentTime=0;
            killSound.play();
          }
        }
      }
    }
  }

  if (this.powerup=="stoneSkin"){
    this.xvel/=1.7; this.yvel/=1.7;
  }else if (this.powerup=="speed"){
	this.xvel *= 1.5; this.yvel *= 1.5;
  }

  //horizontal solid collisions
  for (i in solids){
    this.HorizontalSolidCollision(solids[i]);
  }
  for (i in statues){
    if (statues[i].alive === 0 && statues[i].currAni < 2 && statues[i].dead === 0)
      this.HorizontalSolidCollision(statues[i]);
  }
  //TODO:: Fix this junk so movement is based on vector speeds and not some weird half assed workaround
  if (this.yvel==0)
    this.x += this.xvel;
  else
    this.x += this.xvel*.71;

  //vertical solid collisions
  for (i in solids){
    this.VerticalSolidCollision(solids[i]);
  }
  for (i in statues){
    if (statues[i].alive === 0 && statues[i].currAni < 2 && statues[i].dead === 0)
      this.VerticalSolidCollision(statues[i]);
  }
  if (this.xvel==0)
    this.y += this.yvel;
  else
    this.y += this.yvel*.71;

  // check for keyboard input
  if ((38 in keysDown && this.player_number == 1) || (87 in keysDown && this.player_number == 2)){ //Up key
    this.yvel = (-1)*this.speed*modifier; }
  else if ((40 in keysDown && this.player_number == 1) || (83 in keysDown && this.player_number == 2)){ //Down key
    this.yvel = this.speed*modifier; }
  else{
    this.yvel = 0;
  }
  if ((37 in keysDown && this.player_number == 1) || (65 in keysDown && this.player_number == 2)){ //Left key
    this.xvel = (-1)*this.speed*modifier; }
  else if ((39 in keysDown && this.player_number == 1) || (68 in keysDown && this.player_number == 2)){ //Right key
    this.xvel = this.speed*modifier; }
  else{
    this.xvel = 0;
  }

  this.UpdateAnimation()
};

var HeroHoriSolidCollision = function(solid)
{
  var xspd = this.x + this.xvel;

  //left solid collision
  if (Collision(xspd+this.lb, this.y+this.tb,
                this.x+this.lb, this.y+this.bb, solid)){
    this.xvel = 0;
    while (!Collision(this.x+this.lb-1, this.y+this.tb,
                       this.x+this.lb, this.y+this.bb, solid))
      this.x--;
  }

  //right solid collision
  if (Collision(this.x+this.rb, this.y+this.tb,
                xspd+this.rb, this.y+this.bb, solid)){
    this.xvel = 0;
    while (!Collision(this.x+this.lb, this.y+this.tb ,
            this.x+this.rb+1, this.y+this.bb, solid))
      this.x++;
  }
};

var HeroVertSolidCollision = function(solid)
{
  var yspd = this.y+this.yvel;

  //top solid collision
  if (Collision(this.x+this.lb, yspd+this.tb,
                this.x+this.rb, this.y+this.tb, solid))
  {
    this.yvel=0;
    while (!Collision(this.x+this.lb, this.y+this.tb-1,
                       this.x+this.rb, this.y+this.tb, solid))
      this.y--;
  }
  //bottom solid collision
  if (Collision(this.x+this.lb, this.y+this.bb,
                this.x+this.rb, yspd+this.bb, solid)){
    this.yvel=0;
    while (!Collision(this.x+this.lb, this.y+this.bb,
                       this.x+this.rb, this.y+this.bb+1, solid))
      this.y++;
  }
};

var HeroUpdateAnimation = function(){
  //CHANGE SPRITE DIRECTION/ANIMATION
  if ((keysDown[38] && this.player_number == 1) || (keysDown[87] && this.player_number == 2)) //UP KEY
    this.currAni = 2;
  else if ((keysDown[40] && this.player_number == 1) || (keysDown[83] && this.player_number == 2)) //DOWN KEY
    this.currAni = 0;
  else if ((keysDown[37] && this.player_number == 1) || (keysDown[65] && this.player_number == 2)) //LEFT KEY
    this.currAni = 1;
  else if ((keysDown[39] && this.player_number == 1) || (keysDown[68] && this.player_number == 2)) //RIGHT KEY
    this.currAni = 3;

  //change speed of animation if you're walking
  if (this.xvel===0 && this.yvel===0)
    this.frameDelay = 30;
  else
    this.frameDelay = 10;

  //update frames
  if (++this.frameCount >= this.frameDelay)
  {
    if (++this.currFrame >= this.maxFrame)
      this.currFrame = 0;
    this.frameCount = 0;
  }
};
