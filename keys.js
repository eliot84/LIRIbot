console.log("key.js is online");

var TWITTER_CONSUMER_KEY = "eewJA7QIjugsfNog8zpBHHQk3";
var TWITTER_CONSUMER_SECRET = "4fxzAeK9BBz7NSVvFROVWt2l42j8S1IkLQUNYbsAWqgsSt9lGZ";
var TWITTER_ACCESS_TOKEN_KEY = "979388391598026752-Qm4T6BBmUfexPY5eYxhIm55XCvXLFAA";
var TWITTER_ACCESS_TOKEN_SECRET = "	b7TyDDKHpJKvnxaFtIynuFavxk6krrz9eRXtAGnt0LAnc";
var SPOTIFY_ID = "047ce9171e3f4232bbce8dab641327b7";
var SPOTIFY_SECRET = "5931bd8c012a493facd86675445426da";

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
