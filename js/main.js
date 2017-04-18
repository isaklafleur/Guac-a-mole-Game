function Game() {
  this.baseUrl = "./sounds/";
  this.audio = ["eat_chips.m4a", "incorrect.mp3"];
  this.backgroundSound = "";
  this.speedRemoveClass = 1000;
  this.speedHighlight = 2000;
  this.score = 0;
  this.prevScore = 0;
  this.level = 1;
  this.lives = 5;
  this.playing = false;
};

var scoreDisplay = document.getElementById("score-display");
var cells = document.querySelectorAll(".cell");
Game.prototype.displayScore = function () {
  var that = this;
    this.levelUp();
    scoreDisplay.innerHTML = "Score: " + that.score + "<span id='level-display'> Level: " + that.level + "</span><span id='lifes-display'> Lives: " + that.lives + "</span>";
}

Game.prototype.levelUp = function () {
  var that = this;
  this.level = Math.max(Math.floor((this.score+10) / 10), 1);
  switch(this.level) {
    case 2:
    myAudio.playbackRate = 1.3;
    myAudio.play();
    this.speedRemoveClass = 900;
    this.speedHighlight = 1600;
    break;
    case 3:
    myAudio.playbackRate = 1.6;
    myAudio.play();
    this.speedRemoveClass = 800;
    this.speedHighlight = 1200;
    break; 
    case 4:
    myAudio.playbackRate = 1.9;
    myAudio.play();
    this.speedRemoveClass = 700;
    this.speedHighlight = 800;
    break;
    case 5:
    myAudio.playbackRate = 2.1;
    myAudio.play();
    this.speedRemoveClass = 600;
    this.speedHighlight = 800;
    break;
  }
};

Game.prototype.randomCell = function () {
    return Math.floor(Math.random() * 16);
};

Game.prototype.gameOver = function () {
  var that = this;
  if (this.lives === 0) {
    clearInterval(that.getCells);
    this.score = 0;
    this.level = 1;
    this.lives = 5;
    this.playing = false;
    myAudio.pause();
    myAudio.currentTime = 0;
    $('#start').show();
  }
};

Game.prototype.highlightCell = function() {
  var that = this;
  var target = this.randomCell();
  this.prevScore = this.score;
  var moles = $('#' + Math.floor(Math.random() * 16 + 1));
  moles.addClass('mole');
  
  setTimeout(function() {
    moles.removeClass('mole');
    if (that.score === that.prevScore) {
      that.lives--;
      that.displayScore();
      that.gameOver();
    }
  }, that.speedRemoveClass)
};

Game.prototype.startGame = function () {
  var that = this;
  $('#start').click(function() {
    if (!(that.playing)) {
      that.playing = true;
      that.speedRemoveClass = 1000;
      that.speedHighlight = 2000;
      that.displayScore();
      $(this).hide();
      myAudio.playbackRate = 1;
      myAudio.play();
      that.getCells = setInterval(function() {
        that.highlightCell();
      }, that.speedHighlight);
    }
  });
};

Game.prototype.checkClicks = function () {
  var that = this;
  $('.cell').click(function() {
    if ($(this).hasClass('mole')) {
      new Audio(that.baseUrl + that.audio[0]).play();
      that.score++
      that.displayScore()
    } else {
      new Audio(that.baseUrl + that.audio[1]).play();
    }
  })
};

var myAudio = document.createElement('audio');
myAudio.setAttribute('src','./sounds/el_jarabe_tapatio.m4a');
myAudio.loop = true;


$(document).ready(function () {
  var moleGame = new Game();
    moleGame.startGame();
    moleGame.checkClicks();
});
