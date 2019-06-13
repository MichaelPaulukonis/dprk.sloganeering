var Spew = require('./dprk.spew.js');
var senttags = require('./tagged.slogans.js');
var spewer = new Spew(require('./slogans.words.tagged.json'));
var _ = require('underscore');
var config = require('./config.js');
var Twit = require('twit');

var logger = function (msg) {
  if (config.log) console.log(msg);
};


var cleanup = function (text) {

  var clean = text;

  // removes spaces before punctuation
  clean = clean.replace(/\s+([.,;!])/g, '$1');

  // capitalize first word (leave all other caps alone)
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);

  return clean;

};


var tweeter = function () {

  try {

    var st = _.sample(senttags);
    var tags = st[0];
    var sent = st[1];

    logger(sent + '\n' + tags);

    var spewed = spewer.spew(tags);
    spewed = cleanup(spewed);

    logger(spewed);

  } catch (err) {
    console.log('Error: ' + err.message);
  }

  if (spewed.length === 0 || spewed.length > 280) {
    tweeter();
  } else {
    if (config.tweet_on) {
      const T = new Twit(config);
      T.post('statuses/update', { status: spewed }, function (err, reply) {
        if (err) {
          console.log('error:', err);
        }
        else {
        }
      });
    }
  }

};

// Tweets once on initialization.
tweeter();
