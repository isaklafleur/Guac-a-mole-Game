function Game() {
  this.baseUrl = "./sounds/";
  this.audio = ["eat_chips.m4a", "incorrect.mp3"];
  this.gameScore = 0;
  this.level = 1;
  this.lives = 5;
  this.playing = false;
};

Game.prototype.sequentialFadeIn = function (selectorText, speed, display, callback) {
    display = typeof display !== 'undefined' ? display : "block";

    var els = $(selectorText),
        i = 0;

    (function helper() {
        els.eq(i++).fadeIn(speed, helper).css("display", display);
        if (callback && i === els.length) {callback();}
    })();
}

Game.prototype.addMoleToRandomHole = function () {
  var that = this;
  var moleTile = $('#' + Math.floor(Math.random() * 16 + 1));
  moleTile.addClass('mole');

  setTimeout(function(){
    moleTile.removeClass('mole');
    // that.gameScore-- does not work here.. I get he window object
    // this.updateStats()  does not work...
  }, Math.floor(Math.random() * 2000 + 1000));
};

Game.prototype.clickOnHole = function () {
  var that = this;
  this.gameOver();
  $('.cell').click(function() {
    if (!($(this).hasClass('mole'))) {
      new Audio(that.baseUrl + that.audio[1]).play();
      that.lives--
      that.updateStats();
    } else {
      $(this).removeClass('mole');
      that.gameScore++
      that.updateStats();
      new Audio(that.baseUrl + that.audio[0]).play();
    }
  });
};

Game.prototype.levelUp = function () {
  this.level = Math.max(Math.floor(score / 10), 1);
}

Game.prototype.gameOver = function () {
  if (lives === 0) {
    clearInterval(getCells);
    this.score = 0;
    this.level = 1;
    this.lives = 5;
    this.playing = false;
  }
}

Game.prototype.startGame = function () {
  var that = this;
  setInterval(that.addMoleToRandomHole, Math.floor(Math.random()*3000 + 1000));
};

Game.prototype.updateStats = function () {
  //this.levelUp()
  $('#total').text(this.hits + this.misses);
  $('#gameScore').text(this.gameScore);
  $('#level').text(this.level);
  $('#lives').text(this.lives);
};

$(document).ready(function () {
  var moleGame = new Game();
  moleGame.sequentialFadeIn(".toBeFaddedIn", "fast", "inline-block", function() {
    moleGame.startGame();
    moleGame.clickOnHole();
    console.log("I am just a callback");
});
});  
