var Game = require('./game');
var FlashCardGame = require('./flash-card-game.class');

var cfg = {};
var game = new Game(cfg);
// console.assert(game.cfg == {})
console.assert(game.fsm.state == 'idle');
game.fsm.getReady();
console.assert(game.fsm.state == 'ready');

// вызывам, когда настройки заданы
cfg = {
  impulsesCount: 3
}
var flashCardGame = new FlashCardGame(cfg);
console.assert(flashCardGame.impulses.length == cfg.impulsesCount);
console.assert(flashCardGame.currentIndex == 0);
console.assert(flashCardGame.answers.length == 0);
flashCardGame.fsm.getReady();
console.assert(flashCardGame.fsm.state == 'ready');
// вызываем, когда кликнули на старт
flashCardGame.fsm.start();
console.assert(flashCardGame.fsm.state == 'starting');
// показали, "на старт, внимание, полетели"
flashCardGame.fsm.play();
console.assert(flashCardGame.fsm.state == 'playing');
// начинаем игру
var current = flashCardGame.show();
console.assert(current == flashCardGame.impulses[0]);
console.assert(flashCardGame.currentIndex == 1);
flashCardGame.show();
flashCardGame.show();
flashCardGame.show();
console.assert(flashCardGame.fsm.state == 'waiting', flashCardGame.fsm.state);
var answers = flashCardGame.impulses.slice();
answers[0] = answers[0] - 1;
flashCardGame.submit(answers);
console.assert(flashCardGame.fsm.state == 'finished', flashCardGame.fsm.state);
console.assert(flashCardGame.answers.length == flashCardGame.impulses.length);
console.assert(flashCardGame.answers[0].isCorrect == false);
console.assert(flashCardGame.answers[1].isCorrect == true);
