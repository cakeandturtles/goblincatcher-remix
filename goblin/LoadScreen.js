//Display the loading screen while everything else is loading...
var LoadScreen = function(){
  ctx.canvas.width = GAME_WIDTH*viewScale;
  ctx.canvas.height = GAME_HEIGHT*viewScale;
  ctx.scale(viewScale,viewScale);


  //Display the LOADING... screen
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = "rgb(255,255,255)";
  //ctx.font = "24px pixelFont";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("LOADING...", 134, GAME_HEIGHT/2-4);
};

var IsResourceLoad = function(){
  if (bgReady && monsterReady && powerupReady && statueReady && statueFlippedReady){
    if (heroReady && heroGreyReady && heroStealthReady && heroGoblinReady && heroSpeedReady){
      if (heroGreenReady && heroBlueReady && heroPurpleReady && heroGoldReady){
        if (heroBWReady && heroNegativeReady && heroStatueReady){
          return true;
        }
      }
    }
  }
  return false;
};

//////////////////////////////////////////////////////////////////////////////////////////
//Load sounds
//button press sound
var buttonReady = false;
var buttonSound = document.createElement("audio");
buttonSound.oncanplaythrough = function(){
  buttonReady = true;
};
buttonSound.src = "goblin/sounds/button.wav";

//sound for catching a goblin
var catchReady = false;
var catchSound = document.createElement("audio");
catchSound.oncanplaythrough = function(){
  catchReady = true;
};
catchSound.src = "goblin/sounds/catch.wav";

//sound for catching a goblin player 2
var catch2Ready = false;
var catch2Sound = document.createElement("audio");
catch2Sound.oncanplaythrough = function(){
  catch2Ready = true;
};
catch2Sound.src = "goblin/sounds/catch2.wav";

//sound for catching a gold goblin
var goldReady = false;
var goldSound = document.createElement("audio");
goldSound.oncanplaythrough = function(){
  goldReady = true;
};
goldSound.src = "goblin/sounds/gold.wav";

//sound for catching a gold goblin player 2
var gold2Ready = false;
var gold2Sound = document.createElement("audio");
gold2Sound.oncanplaythrough = function(){
  gold2Ready = true;
};
gold2Sound.src = "goblin/sounds/gold2.wav";

//sound for catching a special goblin
var specialReady = false;
var specialSound = document.createElement("audio");
specialSound.oncanplaythrough = function(){
  specialReady = true;
};
specialSound.src = "goblin/sounds/specialGoblin.wav";

//sound for catching a special goblin player 2
var special2Ready = false;
var special2Sound = document.createElement("audio");
special2Sound.oncanplaythrough = function(){
  special2Ready = true;
};
special2Sound.src = "goblin/sounds/specialGoblin2.wav";

//sound for awakening a statue
var awakenReady = false;
var awakenSound = document.createElement("audio");
awakenSound.oncanplaythrough = function(){
 awakenReady = true;
};
awakenSound.src = "goblin/sounds/awaken.wav";

//sound for statue regrowing
var regrowReady = false;
var regrowSound = document.createElement("audio");
regrowSound.oncanplaythrough = function(){
  regrowReady = true;
};
regrowSound.src = "goblin/sounds/regrow.wav";

//sound for obtaining a powerup/tunic shift
var powerupReady = false;
var powerupSound = document.createElement("audio");
powerupSound.oncanplaythrough = function(){
  powerupReady = true;
};
powerupSound.src = "goblin/sounds/gainPower.wav";

var winReady = false;
var winSound = document.createElement("audio");
winSound.oncanplaythrough = function(){
  winReady = true;
};
winSound.src = "goblin/sounds/win.wav";

var dieReady = false;
var dieSound = document.createElement("audio");
dieSound.oncanplaythrough = function(){
  dieReady = true;
};
dieSound.src = "goblin/sounds/die.wav";

var killReady = false;
var killSound = document.createElement("audio");
killSound.oncanplaythrough = function(){
  killReady = true;
};
killSound.src = "goblin/sounds/kill.wav";

var losePowerReady = false;
var losePowerSound = document.createElement("audio");
losePowerSound.oncanplaythrough = function(){
  losePowerReady = true;
};
losePowerSound.src = "goblin/sounds/losePower.wav";

var plantReady = false;
var plantSound = document.createElement("audio");
plantSound.oncanplaythrough = function() {
  plantReady = true;
};
plantSound.src = "goblin/sounds/plant.wav";


/////////////////////////////////////////////////////////////////////////////////////////////
//Load Images
//Background Image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
  bgReady = true;
};
bgImage.src = "goblin/images/background.png";

//sound/music button images
var soundButtonsReady = false;
var soundButtonsImage = new Image();
soundButtonsImage.onload = function(){
  soundButtonsReady = true;
};
soundButtonsImage.src = "goblin/images/soundButtons.png";

//Hero Image and various colors
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
  heroReady = true;
};
heroImage.src = "goblin/images/heroSheet.png";

var heroGreyReady = false;
var heroGrey = new Image();
heroGrey.onload = function(){
  heroGreyReady = true;
};
heroGrey.src = "goblin/images/heroSheetGrey.png";

var heroStealthReady = false;
var heroStealth = new Image();
heroStealth.onload = function(){
  heroStealthReady = true;
};
heroStealth.src = "goblin/images/heroSheetStealth.png";

var heroGoblinReady = false;
var heroGoblin = new Image();
heroGoblin.onload = function(){
  heroGoblinReady = true;
};
heroGoblin.src = "goblin/images/heroSheetGoblin.png";

var heroSpeedReady = false;
var heroSpeed = new Image();
heroSpeed.onload = function(){
  heroSpeedReady = true;
};
heroSpeed.src = "goblin/images/heroSheetSpeed.png";

var heroGreenReady = false;
var heroGreen = new Image();
heroGreen.onload = function(){
  heroGreenReady = true;
};
heroGreen.src = "goblin/images/heroSheetGreen.png";

var heroBlueReady = false;
var heroBlue = new Image();
heroBlue.onload = function(){
  heroBlueReady = true;
};
heroBlue.src = "goblin/images/heroSheetBlue.png";

var heroPurpleReady = false;
var heroPurple = new Image();
heroPurple.onload = function(){
  heroPurpleReady = true;
};
heroPurple.src = "goblin/images/heroSheetPurple.png";

var heroGoldReady = false;
var heroGold = new Image();
heroGold.onload = function(){
  heroGoldReady = true;
};
heroGold.src = "goblin/images/heroSheetGold.png";

var heroBWReady = false;
var heroBW = new Image();
heroBW.onload = function(){
  heroBWReady = true;
};
heroBW.src = "goblin/images/heroSheetBW.png";

var heroNegativeReady = false;
var heroNegative = new Image();
heroNegative.onload = function(){
  heroNegativeReady = true;
};
heroNegative.src = "goblin/images/heroSheetNegative.png";

var heroStatueReady = false;
var heroStatue = new Image();
heroStatue.onload = function(){
  heroStatueReady = true;
};
heroStatue.src = "goblin/images/heroSheetStatue.png";




//Monster Image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
  monsterReady = true;
};
monsterImage.src = "goblin/images/goblinSheet.png";


//Powerup Image
var powerupReady = false;
var powerupImage = new Image();
powerupImage.onload = function(){
  powerupReady = true;
};
powerupImage.src = "goblin/images/powerupSheet.png";

//Solid Image
var statueReady = false;
var statueImage = new Image();
statueImage.onload = function(){
  statueReady = true;
};
statueImage.src = "goblin/images/statueSheet.png";

var statueFlippedReady = false;
var statueImageFlipped = new Image();
statueImageFlipped.onload = function(){
  statueFlippedReady = true;
};
statueImageFlipped.src = "goblin/images/statueSheetFlip.png";
