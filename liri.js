require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var moment = require('moment');

var client = new Twitter(keys.twitter);

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);
//console.log("in client" + client);
//console.log("IN SPOTIFY: " + keys.spotify);
//console.log("IN  CLIENT: " + keys.twitter);

var params = {screen_name: 'dummydev84', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {


 //console.log( moment('Mon Apr 02 17:55:29 +0000 2018', "ddd MMM D HH:mm:ss ZZ YYYY").format('MMMM D, YYYY h:mma') );




//console.log(tweets);

  //  console.log(tweets.length);
  console.log("########################");
  console.log("TWEETS FOR dummydev84: ");
  console.log("");

    for(var i = 0; i < tweets.length; i++){
      console.log( (i + 1) + ". " + tweets[i].text);
      console.log( twitterTime(tweets[i].created_at) );
      console.log("");
    }
    console.log("########################");

  }
});

//Takes the created timestamp at provided by twitter and reformats the time stamp to something legible.
var twitterTime = function(timeStamp){
  var newTime = moment(timeStamp, "ddd MMM D HH:mm:ss ZZ YYYY").format('MMMM D, YYYY h:mma');
  return newTime;
}
