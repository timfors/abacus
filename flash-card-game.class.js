var Game = require('./game');

class FlashCardGame extends Game {
  constructor(cfg) {
    super(cfg);

    this.impulses = [];
    for (var i = 0; i < cfg.impulsesCount; i++) {
      this.impulses.push(this.generateImpulse())
    }
    this.currentIndex = 0;

    this.answers = [];
  }

  show() {
    if (this.currentIndex < this.impulses.length) {
      return this.impulses[this.currentIndex++];
    } else {
      this.fsm.wait();
    }
  }

  submit(answers) {
    answers.forEach(function(item, index, array) {
      this.answers.push(
          {
            submitted: item,
            proper: this.impulses[index],
            isCorrect: item == this.impulses[index]
          }
        )
    }, this);
    this.fsm.finish();
  }

  generateImpulse() {
    // TODO: cfg.difficulty should be counted
    return getRandomInt(0, 100);
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.FlashCardGame = factory();
    }
}(this, function () {
    return FlashCardGame;
}));