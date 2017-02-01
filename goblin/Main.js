var isMSIE = /*@cc_on!@*/0;
var playSound = true;

if (isMSIE){
  playSound = false;
}

if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) {
   playSound = false;
}

var GAME_WIDTH=320;
var GAME_HEIGHT=300;

var canvas = document.getElementById("goblinGame");
var ctx = canvas.getContext("2d");
canvas.tabIndex = 1;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
var mouse_down = false;

//Handle mouse controls
addEventListener("mousedown", function(e){
	e = e || window.event;
	var button = e.which || e.button;
	//left mouse button clicked
	if (button === 1){
		var box = canvas.getBoundingClientRect();

		var x = (e.clientX - box.left);
		var y = (e.clientY - box.top);

		if (x > 3 && x < 54 && y > 3 && y < 54){
			mouse_down = true;
		}
	}
}, false);

addEventListener("mouseup", function(e){
	e = e || window.event;
	var button = e.which || e.button;
	//left mouse button clicked
	if (button === 1){
		var box = canvas.getBoundingClientRect();

		var x = (e.clientX - box.left);
		var y = (e.clientY - box.top);

		if (x > 3 && x < 54 && y > 3 && y < 54 && mouse_down){
			playSound = !playSound;

			if (playSound){
				buttonSound.currentTime=0;
				buttonSound.play();
			}
		}
	}
	mouse_down = false;
}, false);

//Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
  switch(e.keyCode){
    case 37: case 39: case 38:  case 40: // Arrow keys
    case 32: e.preventDefault(); break; // Space
    default: break; // do not block other keys
  }
  //Right key override if pressed after left key
  if (e.keyCode === 39 && keysDown[37] !== undefined) keysDown[37] = false;
  if (e.keyCode === 68 && keysDown[65] !== undefined) keysDown[65] = false;
  //Down key override if pressed after down key
  if (e.keyCode === 40 && keysDown[38] !== undefined) keysDown[38] = false;
  if (e.keyCode === 83 && keysDown[87] !== undefined) keysDown[87] = false;
}, false);

addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
  switch(e.keyCode){
    case 37: case 39: case 38:  case 40: // Arrow keys
    case 32: e.preventDefault(); break; // Space
    default: break; // do not block other keys
  }
  if (e.keyCode === 39 && keysDown[37] !== undefined) keysDown[37] = true;
  if (e.keyCode === 68 && keysDown[65] !== undefined) keysDown[65] = true;
  if (e.keyCode === 40 && keysDown[38] !== undefined) keysDown[38] = true;
  if (e.keyCode === 83 && keysDown[87] !== undefined) keysDown[87] = true;
}, false);

addEventListener("keypress", function(e) {
  if (story < 2 || story > 3 || tempScore >= 10) return;
  /* X key lowercase and uppercase (dumb)*/
  if (e.keyCode == 88 || e.keyCode == 120) {
    tempScore++;
    story = 3;
    var goblinPlant = new Goblin();
    goblinPlant.x = hero.x;
    goblinPlant.y = hero.y;
    var cooties = false;
    goblins.forEach(function(goblin) {
      if (Collision(goblin.x+goblin.lb,goblin.y+goblin.tb,goblin.x+goblin.rb,goblin.y+goblin.bb,goblinPlant)) {
        cooties = true;
      }
    });
    if (cooties) {
      reset(goblinPlant);
    }

    goblinPlant.x  = Math.floor(goblinPlant.x / 8) * 8;
    goblinPlant.y  = Math.floor(goblinPlant.y / 8) * 8;
    goblinPlant.currAni = 3;
    goblinPlant.visible = true;
    goblins.push(goblinPlant);
    var timer = window.setInterval(function(plant, tim) {
      if (plant.currAni < 6) plant.currAni++;
      if (plant.currAni == 6) {
        window.clearInterval(tim);
      }
    }.bind(this, goblinPlant, timer), 1000);
    if (playSound) {
      plantSound.currentTime = 0;
      plantSound.play();
    }
  }
}, false);

//Reset the game when the player catches a monster
var reset = function(resetMe){
  //Throw the monster somewhere on the screen
  resetMe.x = 16 + (Math.random()*(GAME_WIDTH-48));
  resetMe.y = 74 + (Math.random()*(GAME_HEIGHT-104));
  return Math.round(Math.random()*30);
};

var progressStoryCatch = function(goblin) {
  switch (story) {
    case 0: chapterOneCatch(goblin); break;
    case 1: chapterTwoCatch(goblin); break;
  }

};

var beat = 0;
var storyText = "";
var chapterOneCatch = function(goblin) {
  goblinsCaught++;
  if ((goblinsCaught < 20 && goblinsCaught % 10 == 0) ||
      (goblinsCaught < 100 && goblinsCaught >= 20 && goblinsCaught % 20 == 0) ||
      (goblinsCaught < 500 && goblinsCaught >= 100 && goblinsCaught % 5 == 0) ||
      (goblinsCaught >= 500 && goblinsCaught % 5 == 0)) {
    if (goblinsCaught < 20) {
      powerupSound.currentTime=0;
      powerupSound.play();
    }
    console.log("next!");
    goblins.push(new Goblin());
    reset(goblins[goblins.length-1]);
  }
  if (goblinsCaught >= 1000) {
    story++;
    hero.powerupTime = 1;

    winSound.currentTime=0;
    winSound.play();

    ///////////////////////////////////////////////////// ALL THE GOBLINS DISAPPEAR
    storyTimer = window.setInterval(function() {
      if (goblins.length > 500) {
        goblins.splice(0, 5);
      }
      else if (goblins.length > 100) {
        goblins.splice(0, 3);
      }
      else if (goblins.length > 10) {
        goblins.splice(0, 1);
      }
      else if (goblins.length > 1) {
        beat++;
        if (beat == 5) {
          goblins.splice(0, 1);
          beat = 0;
        }
      } else if (goblins.length == 1) {
        beat++;
        if (beat == 50) {
          goblins = [];
          beat = 0;
        }
      }


      if (goblins.length == 0) {
        window.clearInterval(storyTimer);
        ///////////////////////////////////////////////////////////// PRESS X to plant the goblins!!!
        storyTimer = window.setTimeout(function() {
          story++;
          tempScore = 0;
          storyTimer = window.setInterval(function() {
            var finalText = ". . . Press X";
            if (storyText == finalText) {
              window.clearInterval(storyTimer);
            }
            storyText += finalText.substr(storyText.length, 1);
          }, 300);
        }, 3000);
      }
      if (playSound && beat == 0) {
        catch2Sound.currentTime = 0;
        catch2Sound.play();
      }
    }, 100);
  }
  if (!goblin.special){
    ++tempScore;
    if (this.powerup==="goldGoblin")
      ++tempScore;
  }
  else
    tempScore = tempScore+3;
};

var chapterTwoCatch = function(goblin) { };

//main game loop
var main = function(){
  //don't execute this loop until all the resources are loaded
  if (IsResourceLoad()){
    var now = Date.now();
    var delta = now - then;

    if (!isGameOver && !isPaused)
    {
      // for (i in statues)
      //   statues[i].Update(delta/1000);

      hero.Update(delta/1000);
      if (two_players) player2.Update(delta/1000);
      if (tempScore>maxScore)
        maxScore=tempScore;
      for (i in goblins)
        goblins[i].Update(delta/1000);
      for (i = goblins.length-1; i >= 0; i--) {
        if (!goblins[i].visible)
          goblins.splice(i, 1);
      }
      potion.Update();
    }
    else{
      setScore("goblincatcher",maxScore,9999);
    }

    //if ENTER is Pressed
    if (13 in keysDown){
      if (isGameOver){
        isGameOver = false;
        Reset();
      }
      else if (!pauseHelper){
        isPaused = !isPaused;
      }
      pauseHelper = true;
    }
    else{
      pauseHelper = false;
    }

    Render();
    then = now;
    //time variable so we can make the speed right no matter how fast the script
  }
};

//primitive variables
var losePowerupFlash = false;
var isPaused = false;
var pauseHelper = false;
var isGameOver = false;
var tempScore = 0;
var goblinsCaught = 0;
var maxScore = getScore("goblincatcher");
if (maxScore==null || maxScore=="" || maxScore==undefined)
  maxScore=0;

var story = 0;
var storyTimer = null;
//object variables
var two_players = false;
var hero = new Hero(1);
var player2;
var goblins = [new Goblin()];
var potion = new Powerup();

var statues = new Array();
statues[0] = new Statue(40, 100, 0);
statues[1] = new Statue(40, GAME_HEIGHT-56, 3);
statues[2] = new Statue(GAME_WIDTH-56, 100, 1);
statues[3] = new Statue(GAME_WIDTH-56, GAME_HEIGHT-56, 2);

var solids = new Array();
solids[0] = new Solid(GAME_WIDTH, 60, 16, GAME_HEIGHT);
solids[1] = new Solid(0, 44, GAME_WIDTH, 16);
solids[2] = new Solid(-16, 60, 16, GAME_HEIGHT);
solids[3] = new Solid(0, GAME_HEIGHT, GAME_WIDTH, 16);


//Let's play the game!
for (i in goblins) reset(goblins[i]);
potion.WhichPowerup();

var then = Date.now();
LoadScreen();
Reset();
setInterval(main,17); //Execute as fast as possible!!!

function Reset(){
  tempScore = 0;
  goblinsCaught = 0;
  hero.x = GAME_WIDTH/2;
  hero.y = GAME_HEIGHT/2;
  hero.currAni = 0;
  hero.powerup="none";
  hero.powerupTime=0;

  if (two_players) {
    hero.x -= 64;
    player2 = new Hero(2);
    player2.x = GAME_WIDTH/2+64;
    player2.y = GAME_HEIGHT/2;
    player2.currAni = 0;
    player2.powerup="none";
    player2.powerupTime=0;
  }

  for (i in goblins) {
    reset(goblins[i]);
    goblins[i].special = false;
  }
  potion.WhichPowerup();

  for (i in statues)
  {
    statues[i].x = statues[i].startx;
    statues[i].y = statues[i].starty;
    statues[i].xvel = 0;
    statues[i].yvel = 0;
    statues[i].alive = 0;
    statues[i].chase = 0;
    statues[i].currAni = 0;
  }
};

function getScore(c_name)
{
  var i, x, y, ARRcookies=document.cookie.split(";");
  for (i=0; i<ARRcookies.length; i++)
  {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x===c_name)
    {
      return unescape(y);
    }
  }
}

function setScore(c_name,value,exdays)
{
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays===null) ? "" : ";expires="+exdate.toUTCString());
  document.cookie=c_name+"="+c_value;
}
