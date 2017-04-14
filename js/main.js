function Game() {
  this.molesArray = [];
  this.answer = undefined;
  this.baseUrl = "./sounds/";
  this.audio = ["correct.mp3", "incorrect.mp3"];
}

Game.prototype.createMolesArray = function (moles) {
  for (var i = 0; i < moles; i++) {
    this.molesArray.push(Math.floor(Math.random() * 5));
  }
  //console.log(this.molesArray)
  return this.molesArray;
};

Game.prototype.addMoleToHole = function () {

};

Game.prototype.clickOnHole = function () {
  var that = this;
  $('button').click(function() {
    this.answer = $(this).attr('id');
    that.playSound(this.answer);
  });
};

Game.prototype.playSound = function (answer) {
  if (answer === 'correct') {
    new Audio(this.baseUrl + this.audio[0]).play();
  } else {
    new Audio(this.baseUrl + this.audio[1]).play();
  }
};

$(document).ready(function () {
  var moleGame = new Game();
  moleGame.createMolesArray(20);
  moleGame.clickOnHole();
});  
