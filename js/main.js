class Game {
  constructor(lives) {
    this.baseUrl = "./sounds/";
    this.audio = [
      "eat_chips.m4a",
      "incorrect.mp3",
      "gameover.mp3",
      "el_jarabe_tapatio.m4a",
    ];
    this.speedRemoveClass = 1000;
    this.getCells;
    this.speedHighlight = 2000;
    this.score = 0;
    this.prevScore = 0;
    this.level = 1;
    this.lives = lives;
    this.playing = false;
  }

  startGame() {
    document.getElementById("start").addEventListener("click", () => {
      if (!this.playing) {
        this.playing = true;
        this.speedRemoveClass = 1000;
        this.speedHighlight = 2000;
        this.displayScore();
        document.getElementById("startbutton").style.display = "none";
        myAudio.playbackRate = 1;
        myAudio.play();
        this.getCells = setInterval(() => {
          this.highlightCell();
        }, this.speedHighlight);
      }
    });
  }

  displayScore() {
    this.levelUp();
    statsScore.innerHTML = this.score;
    statsLevel.innerHTML = this.level;
    statsLives.innerHTML = this.lives;
  }

  levelUp() {
    this.level = Math.max(Math.floor((this.score + 10) / 10), 1);
    switch (this.level) {
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
  }

  randomCell() {
    return Math.floor(Math.random() * 16);
  }

  gameOver() {
    if (this.lives === 0) {
      clearInterval(this.getCells);
      new Audio(this.baseUrl + this.audio[2]).play();
      this.score = 0;
      this.level = 1;
      this.lives = 5;
      this.playing = false;
      myAudio.pause();
      myAudio.currentTime = 0;
      document.getElementById("startbutton").style.display = "block";
    }
  }

  highlightCell() {
    const target = this.randomCell();
    this.prevScore = this.score;
    const moles = document.getElementById(Math.floor(Math.random() * 16 + 1));
    moles.classList.add("mole");

    setTimeout(() => {
      moles.classList.remove("mole");
      if (this.score === this.prevScore) {
        this.lives--;
        this.displayScore();
        this.gameOver();
      }
    }, this.speedRemoveClass);
  }

  checkClicks(e) {
    if (e.currentTarget.classList.contains("mole")) {
      new Audio(this.baseUrl + this.audio[0]).play();
      this.score++;
      this.displayScore();
    } else {
      new Audio(this.baseUrl + this.audio[1]).play();
    }
  }
}

const statsScore = document.getElementById("stats-score");
const statsLevel = document.getElementById("stats-level");
const statsLives = document.getElementById("stats-lives");
const cells = document.querySelectorAll(".cell");
const myAudio = document.createElement("audio");
const allCells = document.getElementsByClassName("cell");
for (let i = 0; i < allCells.length; i++) {
  allCells[i].addEventListener("click", event => moleGame.checkClicks(event));
}
const moleGame = new Game(5);
myAudio.setAttribute("src", `${moleGame.baseUrl}/${moleGame.audio[3]}`);
myAudio.loop = true;
moleGame.startGame();
