var StateMachine = require('javascript-state-machine');
class Game {
  constructor(cfg) {
    this.cfg = cfg;
    this.fsm = new StateMachine({
      // STATES:
      // idle - в ожидании (экран настроек)
      //      (?) - похоже, тоже не надо, т.к. игра создается только после настройки
      // ready - ожидание старта игры (кнопка "Старт")
      // starting - на старт, внимание, полелети
      //         (?) возможно, это стейт представления, а не модели
      // playing - процесс игры
      // paused - игра на паузе
      // waitng - ожидание ответа
      // finished - игра завершена
      init: 'settings',
      transitions: [
        { name: 'getReady', from: 'settings',  to: 'ready'    },
        { name: 'start',    from: 'ready',     to: 'starting' },
        { name: 'play',     from: 'starting',  to: 'playing'  },
        { name: 'pause',    from: 'playing',   to: 'paused'   },
        { name: 'resume',   from: 'paused',    to: 'playing'  },
        { name: 'wait',     from: 'playing',   to: 'waiting'  },
        { name: 'finish',   from: 'waiting',   to: 'finished' }
      ]
      // methods: {
      //   onMelt:     function() { console.log('I melted')    },
      //   onFreeze:   function() { console.log('I froze')     },
      //   onVaporize: function() { console.log('I vaporized') },
      //   onCondense: function() { console.log('I condensed') }
      // }
    });
  }
};

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.Game = factory();
    }
}(this, function () {
    return Game;
}));