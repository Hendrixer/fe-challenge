(function(window){
  'use strict';

  window.Greg = window.Greg || {};

  var log = function(message){
    var type = message.type || 'log';
    // message.message = message.message.map(function(i) { return '%c' + i; });
    // message.message[0] = '%c' + message.message[0];
    // var content = message.message.join('\n');
    message.messages.forEach(function(m) {
      m = '%c' + m;
      console[type](m, message.css || '');
    });
  };

  var messages = {
    intro: {
      type: 'info',
      messages: [
        'Hey, my name is Greg, and I\'m here to help you out.',
        'Just use the `ask` method to ask me. Greg.ask(what).',
        'Here is a list of things you can ask me:',
        '\n'
      ],
      css: 'color: #263238;text-align: center; margin-left: 100px; font-size:1.2em;'
    },

    commands: {
      ask: {
        type: 'info',
        messages: [
          'Greg.ask()',
          '   * "feed-items": should be a vertical list of feed items that show the summary of'
        ],
        css: 'color:#1B5E20; text-align: center; margin-left: 100px'
      }
    }
  };

  Greg.init = function(){
    log(messages.intro);
    log(messages.commands.ask);
  };

  Greg.init();
}(window));
