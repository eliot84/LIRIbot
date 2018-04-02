require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');

var client = new Twitter(keys.twitter);

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);
console.log("in client" + client);
//console.log("IN SPOTIFY: " + keys.spotify);
//console.log("IN  CLIENT: " + keys.twitter);

var params = {screen_name: 'dummydev84', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
console.log(tweets);

    console.log(tweets.length);
    for(var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text);
      console.log(tweets[i].created_at);
    }
  }
});
