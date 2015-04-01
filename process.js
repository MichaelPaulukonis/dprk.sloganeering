// convert file of mispellings in a weird format
// into rought json

var fs = require('fs');
var pos = require('pos');
var sentences = require('./tagged.slogans.js');
var retag = {};
var lexer = new pos.Lexer();
var tagger = new pos.Tagger();

for ( var i = 0; i < sentences.length; i++) {
    var sentence = sentences[i][1];

    var words = lexer.lex(sentence);
    var taggedWords = tagger.tag(words);
    for (var j in taggedWords) {
      var taggedWord = taggedWords[j];
      var part = taggedWord[1];
      var word = taggedWord[0];
      // console.log(part + ' : ' + word);
      if (!retag[part]) {
        console.log('adding "' + part +'"');
        retag[part] = [];
      }
      retag[part].push(word);
      // console.log(retag[part]);
    }
}

fs.writeFile('retagged.slogans.json', JSON.stringify(retag, null, 2));
