var Game = require('./game');

export default class FlashCardGame extends Game {
  constructor(cfg) {
    super(cfg);

    this.impulses = [];
    this.currentIndex = 0;
    generateAllImpulses();
    this.answers = [];
  }
  generateAllImpulses() {
    this.impulses = [];
    for (var i = 0; i < this.cfg.impulsesCount; i++) {
      this.impulses.push(this.generateImpulse());
    }
  }
  show() {
    if (this.currentIndex < this.impulses.length) {
      return this.impulses[this.currentIndex++];
    } else {
      this.fsm.wait();
    }
  }

  submit(answers) {
    this.answers = [];
    answers.forEach(function(abakusAnswers, indexOfAbakus, array1) {
      this.answers[indexOfAbakus] = [];
      abakusAnswers.forEach(function(answer, indexOfImpulse, array2) {
          this.answers[indexOfAbakus][indexOfImpulse] = {
              submitted: answer,
              proper: this.impulses[indexOfImpulse][indexOfAbakus],
              isCorrect: answer == this.impulses[indexOfImpulse][indexOfAbakus]
            };
      }, this);
    }, this);
    this.fsm.finish();
    return this.answers;
  }

  generateImpulse() {
    const res = [];
    let min = this.cfg.difficulty < 2 ? 0 : Math.pow(10, this.cfg.difficulty - 1)
    let max = this.cfg.difficulty === 0 ? 5 : Math.pow(10, this.cfg.difficulty) 
    // TODO: cfg.difficulty should be counted
    for (let i = 0; i < this.cfg.abakusCount; i++){
      res.push(getRandomInt(min, max));
    }
    return res;
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