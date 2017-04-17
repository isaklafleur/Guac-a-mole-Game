function Game() {
  this.baseUrl = "./sounds/";
  this.audio = ["eat_chips.m4a", "incorrect.mp3"];
  this.score = 0;
  this.prevScore = 0;
  this.level = 1;
  this.lives = 5;
  this.playing = false;
};

var scoreDisplay = document.getElementById("score-display");
var cells = document.querySelectorAll(".cell");

// OK
Game.prototype.displayScore = function () {
  var that = this;
    this.levelUp();
    scoreDisplay.innerHTML = "Score: " + that.score + "<span id='level-display'> Level: " + that.level + "</span><span id='lifes-display'> Lives: " + that.lives + "</span>";
}

Game.prototype.levelUp = function () {
  this.level = Math.max(Math.floor((this.score+10) / 10), 1);
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
  }, 1000)
};

Game.prototype.startGame = function () {
  var that = this;  
  $('#start').click(function() {
    if (!(that.playing)) {
      that.playing = true;
      that.displayScore();
      $(this).hide();
      that.getCells = setInterval(function() {
        that.highlightCell();
      }, 2000);
    }
  });
};

Game.prototype.checkClicks = function () {
  var that = this;
  $('.cell').click(function() {
    if ($(this).hasClass('mole')) {
      new Audio(that.baseUrl + that.audio[0]).play();
      that.score++
      that.displayScore();
    } else {
      new Audio(that.baseUrl + that.audio[1]).play();
      that.lives--;
      that.displayScore();
      that.gameOver();
    }
  })
};

$(document).ready(function () {
  var moleGame = new Game();

    moleGame.startGame();
    moleGame.checkClicks();
});
