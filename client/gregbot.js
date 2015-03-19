(function(window){
  'use strict';

  window.Greg = window.Greg || {};
  var $ = function(selector) {
    return document.querySelectorAll(selector);
  };

  // var fetch = function(url, good, bad) {
  //   bad = bad ||function(){};
  //
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('GET', encodeURI(url));
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //       good(JSON.parse(xhr.responseText));
  //     }
  //     else {
  //       bad(xhr.status, JSON.parse(xhr.responseText));
  //     }
  //   };
  //   xhr.send();
  // };

  var checkbox = '\u2713 ';
  var xMark = '\u2717 ';
  var roboFace = ' (︺︹︺) ';
  var log = function(message, test){
    var type = message.type || 'log';
    if (test) {
      var color = 'background-color:#263238; padding-left: 5px;padding-right:5px;';
    }
    message.messages.forEach(function(m) {
      m = '%c' + m;

      if(m.match('\u2713')) {
        color += 'color: #1DE9B6;';
        type = 'log';
      }

      if (m.match('\u2717')) {
        color += 'color: #F44336;';
        type = 'log';
      }

      if (m.match('\u2622')) {
        color += 'color: #039BE5;';
        type = 'log';
      }

      var css = message.css + color;
      console[type](m, css || '');
      type = message.type;
    });
  };

  var messages = {
    noCommand: {
      type: 'error',
      messages: [
        'Umm, I dont\'t know that yet, ask me somthing else, Greg.help()'
      ]
    },
    intro: {
      type: 'log',
      messages: [
        'Hey, my name is Greg' + roboFace +'and I\'m here to help you out. Just use the',
        '`help` method on the Greg object and I\'ll help you. For a',
        'list of all things I can help you with, just call Greg.help() with no args.'
      ],
      css: 'color: #263238;text-align: center; margin-left: 50px; font-size:1.0em;'
    },

    commands: {
      help: {
        type: 'log',
        messages: [
          'Call Greg.help() with one of the args below to find out more.',
          '   \u2738 feed',
          '   \u2738 filter'
        ],
        css: 'color:#1B5E20; text-align: center; margin-left: 50px'
      },

      test: {
        type: 'log',
        messages: [
          'I can check Newsie for you and let you know if anything is missing.',
          'Just run Greg.test() and I\'ll start checking. I\'m still learing',
          'and not perfect, but I try ᕦ(ò_óˇ)ᕤ.'
        ]
      },

      filter: {
        type: 'log',
        messages: [
          'Using an input placed in section.controls, as you type',
          'the news feed should filter and remove and add news feed',
          'items by the content in the search box. Should at least',
          'filter by firstName, if you can filter by everything, that',
          'would be awesome.'
        ]
      },

      feed: {
        type: 'info',
        messages: [
          'The feed should list all 50 accounts and meta whatever',
          'meaningful data the events have. You can fetch the data via ajax',
          'events data url: /events.js accounts data url: /accounts.js',
          'There is a 1 for 1 match for events and accounts ask me to see what',
          'the data looks like. Greg.help(\'sample\')'
        ],
        css: 'text-align: center; margin-left: 50px;'
      },

      sample: {
        type: 'log',
        messages: [
          'Events',
          {
            "accountId":7,
            "event":{
               "eventType":"Project Completion",
               "snippet":"Completed project 0!"
            },
            "time":1434265200000
          },
          'Accounts',
          {
            "accountId":0,
            "firstName":"Derek-0",
            "lastName":"Zoolander",
            "bio":"Male Model Of The Year 2000, 2001. Inventor of Blue Steel and Magnum.",
            "age":35,
            "image":"http://mcgrelio.com/gallery/var/albums/vacanze/capodanno2004/capodanno2004_bluesteel/derek.jpg?m=1286923065"
          }
        ],
        css: 'text-align: center; margin-left: 50px;'
      }
    },

    testResults: {
      type: 'warn',
      messages: [],
      css: 'text-align: center; margin-left: 50px;'
    }
  };

  var testMap = {
    feedItem: function() {

      var result = [checkbox + 'Feed-items: Looks good.'];
      var feedItems = $('.feed-item');
      var count = feedItems.length;

      if(!count) {
        result[0] = xMark + 'Feed-items: You have no feed items';
        return result;
      }

      var checkImg = function(count) {
        var imageCount = $('.feed-item img').length;
        return imageCount === count;
      };
      if (count > 50) {
        result[0] = xMark + 'Feed-items: you have more than 50 feed items, you have ' + count;
      }

      if (count < 50) {
        result[0] = xMark + 'Feed-items: you have less than 50 feed items, you have ' + count;
      }

      if (!checkImg(count)) {
        result.push(xMark + 'Feed-items: you\'re not using all the images for your feed.');
      }

      return result;
    },

    searchBox: function() {
      var result = [checkbox + 'Search-box: Looks good'];
      var searchBox = $('.controls input');

      if(!searchBox.length) {
        result[0] = xMark + 'Search-box: Didn\'t see a search box in section.controls;';
      }

      return result;
    },

    sorting: function() {
      var result = [checkbox + 'Sorting: looks good'];
      var select = $('.controls select');

      if (!select.length) {
        result[0] = xMark + 'Sorting: didn\'t see any select box ignore this if you took a diff approach';
      }

      return result;
    }
  };

  var tests = Object.keys(testMap).map(function(test) {
    var testObj = {};
    testObj.run = testMap[test];
    testObj.name = test;
    return testObj;
  });

  Greg.init = function(){
    log(messages.intro);
  };

  Greg.help = function(what) {
    what = what || 'help';
    var face = '';
    var message = messages.commands[what];
    if (!message) {
      message = messages.noCommand;
      face ='(ʘᗩʘ\')';
    }
    log(message);
    return face;
  };

  Greg.test = function() {
    var results = tests.reduce(function(result, spec) {
      var testResult = spec.run();

      return result.concat(testResult);
    }, []);

    var nuke = '\u2622';
    var star = '\u2605';
    var banner = nuke + star + nuke;

    messages.testResults.messages = results;
    messages.testResults.messages.unshift(banner + ' TEST RESULTS ' + banner);

    log(messages.testResults, true);
    return roboFace;
  };

  Greg.init();
}(window));
