var viewScale = 2;
var fontColor = "rgb(0,0,0)"

//base function to draw images to screen
var ObjectDrawImage = function(image){
  ctx.drawImage(image, this.currFrame*this.frameWidth, this.currAni*this.frameHeight,
                this.frameWidth, this.frameHeight, ~~ (this.x+0.5), ~~ (this.y+0.5),
                this.frameWidth/2, this.frameHeight/2);

  //do the weird tilda thing (called bitwise operation something) to round the x, y values
  //so javascript won't try to draw to canvas between pixels and antialias
};

var ObjectDrawImageHead = function(image){
	ctx.drawImage(image, this.currFrame*this.frameWidth, this.currAni*this.frameHeight,
                this.frameWidth, this.frameHeight/2, ~~ (this.x+0.5), ~~ (this.y+0.5),
                this.frameWidth/2, this.frameHeight/2);
};


//draw images to screen (really)
var Render = function(){ //THE ORDER OF THE DRAWING determines layers
  ctx.canvas.width = GAME_WIDTH*viewScale;
  ctx.canvas.height = GAME_HEIGHT*viewScale;
  ctx.scale(viewScale,viewScale);

  //Erase screen
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  //Choose font color
  if (tempScore<25)
    fontColor = "rgb(255,111,20)"; //#FF6F14
  else if (tempScore<50)
    fontColor = "rgb(44,205,21)"; //#2CCD15
  else if (tempScore<75)
    fontColor = "rgb(0,146,235)"; //#0092EB
  else if (tempScore<100)
    fontColor = "rgb(255,38,177)"; //#FF26B1
  else if (tempScore<150)
    fontColor = "rgb(255, 255, 255)"; //#FFFFFF
  else if (tempScore<200)
    fontColor = "rgb(255,234,0)"; //#FFEA00
  else if (tempScore<255)
    fontColor = "rgb(44, 235, 235)"; //#2CEBEB
  else
    fontColor = "rgb(255,111,20)"; //#FF6F14

  if (maxScore<25)
    maxFontColor = "rgb(255,111,20)";
  else if (maxScore<50)
    maxFontColor = "rgb(44,205,21)";
  else if (maxScore<75)
    maxFontColor = "rgb(0,146,235)";
  else if (maxScore<100)
    maxFontColor = "rgb(255,38,177)";
  else if (maxScore<150)
    maxFontColor = "rgb(255, 255, 255)";
  else if (maxScore<200)
    maxFontColor = "rgb(255,234,0)";
  else if (maxScore<255)
    maxFontColor = "rgb(44, 235, 235)";
  else
    maxFontColor = "rgb(255,111,20)";

  ctx.drawImage(bgImage, 0, 0, 640, 480, 0, 60, 320, 240);



  // for (var i in statues)
  // {
  //   if (!statues[i].visible) continue;
  //   if (statues[i].id%2==0)
  //     statues[i].DrawImage(statueImage);
  //   else
  //   {
  //     statues[i].DrawImage(statueImageFlipped);
  //   }
  // }

  for (var i in goblins)
    goblins[i].DrawImage(monsterImage);


  if (potion.visible){
    potion.DrawImage(powerupImage);
  }

  if (hero.powerupTime<=60 && hero.powerupTime%10===0 && hero.powerupTime!==0)
    losePowerupFlash = !losePowerupFlash;
  else if (hero.powerupTime===0) losePowerupFlash = false;

  //choose hero color
  if (hero.powerup==="stoneSkin" && !losePowerupFlash)
    hero.DrawImage(heroGrey);
  else if (hero.powerup==="stealth" && !losePowerupFlash)
    hero.DrawImage(heroStealth);
  else if (hero.powerup==="goblinPheremones" && !losePowerupFlash)
    hero.DrawImage(heroGoblin);
  else if (hero.powerup=="speed" && !losePowerupFlash)
	hero.DrawImage(heroSpeed);
  else
  {
    if (tempScore<25)
      hero.DrawImage(heroImage);
    else if (tempScore<50)
      hero.DrawImage(heroGreen);
    else if (tempScore<75)
      hero.DrawImage(heroBlue);
    else if (tempScore<100)
      hero.DrawImage(heroPurple);
    else if (tempScore<150)
      hero.DrawImage(heroBW);
    else if (tempScore<200)
      hero.DrawImage(heroGold);
    else if (tempScore<255)
      hero.DrawImage(heroNegative);
    else
      hero.DrawImage(heroStatue);
  }
  if (two_players) player2.DrawImage(heroBlue);

  //draw object's heads
  // for (var i in statues)
  // {
  //   if (!statues[i].visible) continue;
  //   if (statues[i].id%2==0)
  //     ObjectDrawImageHead(statueImage);
  //   else
  //   {
  //     ObjectDrawImageHead(statueImageFlipped);
  //   }
  // }

  ObjectDrawImageHead(monsterImage);


  if (potion.visible){
    ObjectDrawImageHead(powerupImage);
  }


  if (isPaused || isGameOver){
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "24px pixelFont";
    ctx.textAlign = "left";
    ctx.textBaselin = "top";
    ctx.fillText("Your Best: ", 80, 80);
    ctx.fillStyle = maxFontColor;
    ctx.fillText(maxScore, 232, 80);
    ctx.fillStyle = "rgb(255,255,255)";

    if (isPaused){
      ctx.fillText("GAME PAUSED", 80, GAME_HEIGHT/2+16);
      ctx.fillText("PRESS ENTER TO CONTINUE", 8, GAME_HEIGHT-32);
    }

    else if (isGameOver){
      ctx.fillText("GAME OVER", 84, GAME_HEIGHT/2+16);
      ctx.fillText("PRESS ENTER TO RESTART", 14, GAME_HEIGHT-32);
    }
  }


  //Score
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.font = "24px pixelFont";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Goblins caught: ", 50, 20);
  ctx.fillStyle = fontColor;
  ctx.fillText(tempScore, 250, 20);

  //Sound/music controller buttons
  var buttonOffset = 0;
  //music on/off
  //if (!bgmusicOn) buttonOffset = 1;
  //ctx.drawImage(soundButtonsImage, 0+51*bgmusicPress, 0+51*buttonOffset, 51, 51, 3, 3, 51/2, 51/2);
  //sound on/off
  if (!playSound) buttonOffset = 1;
  else buttonOffset = 0;
  var q = 0
  if (mouse_down) q = 1;
  ctx.drawImage(soundButtonsImage, 0+51*q, 102+(51*buttonOffset), 51, 51, 3, 3, 51/2, 51/2);
};
