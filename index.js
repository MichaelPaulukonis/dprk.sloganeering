// this was just a test
// require('child_process').fork('hello.js');

var spewer = require('./dprk.spew.js');
var senttags = require('./slogans.words.tagged.min.js');
var _ = require('underscore');

var cleanup = function(text) {

  var clean = text;

  // removes spaces before punctuation
  clean = clean.replace(/\s+([.,;!])/g, '$1');

  // capitalize first word (leave all other caps alone
  // should be fixed w/in .json
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);

  return clean;

};


var st = _.sample(senttags);
var tags = st[0];
var sent = st[1];

console.log(sent + '\n' + tags);

var spewed = spewer.spew(tags);
spewed = cleanup(spewed);
// TODO: fix capitalization

console.log('\n' + spewed.length + ' : ' + spewed);
