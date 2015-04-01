// this was just a test
// require('child_process').fork('hello.js');


/*
 * based on spewer
 * https://github.com/dariusk/spewer
 *
 * Copyright (c) 2015 Darius Kazemi
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('underscore');
// TODO: we need a lexicon of words, sorted by their POS-tag
// and then we mod the below
// getWordByTag becomes soooo much easier
// var lexicon = require('./lexicon.js');
var lexicon = require('./retagged.slogans.json');

function getWordByTag(tag) {
  var word;
  if (lexicon[tag]) {
    var words = lexicon[tag];
    word = _.sample(words);
  }
  return word;

  var words = _.chain(lexicon)
    .map(function(v, k) {
      if (_.indexOf(v, tag) > -1) {
        return k;
      }
      else {
        return null;
      }
    })
    .filter(function(el) {
      return el !== null;
    })
    .value();
  return _.sample(words, 1);
}

module.exports = {
  spew: function(tags) {
    var out = '';
    tags = tags.split(' ');
    _.each(tags, function(tag) {
      var word = getWordByTag(tag);
      out += word + ' ';
    });
    return out.trim();
  }
};
