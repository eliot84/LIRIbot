require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var moment = require('moment');
var inquirer = require('inquirer');
var Spotify = require('node-spotify-api');


var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);
//console.log("in client" + client);
//console.log("IN SPOTIFY: " + keys.spotify);
//console.log("IN  CLIENT: " + keys.twitter);

var spotifyCall = function(spotify, songname){

  spotify.search({ type: 'track', query: songname, limit: 2 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("########################");
    console.log("SPOTIFY SONG QUERY: ");
    //Artist Name
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    console.log("");

    //Song Name
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("");

    //Preview URL
    console.log("Preview URL: " + data.tracks.items[0].preview_url);
    console.log("");

    //Album Name
    console.log("Album Name: " + data.tracks.items[0].album.name);
    console.log("########################");
    console.log("");

  });

}




var twitterCall = function(client){
var params = {screen_name: 'dummydev84', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  // Print tweets returned
    console.log("########################");
    console.log("TWEETS FOR dummydev84: ");
    console.log("");
      for(var i = 0; i < tweets.length; i++){
          console.log( (i + 1) + ". " + tweets[i].text);
          console.log( twitterTime(tweets[i].created_at) );
          console.log("");
      } //end for
     console.log("########################");
  } // end if
}); //end client.get
} //close twitterCall
//twitterCall(client);
//Takes the created timestamp at provided by twitter and reformats the time stamp to something legible.
var twitterTime = function(timeStamp){
  var newTime = moment(timeStamp, "ddd MMM D HH:mm:ss ZZ YYYY").format('MMMM D, YYYY h:mma');
  return newTime;
}
//Prompt the user in the command line when the program begins
inquirer.prompt([
  {
    type: "list",
    name: "doingWhat",
    message: "Hello! I'm LiRiBoT :-) What would you like to do?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  }
]).then(function(user){
  console.log(user.doingWhat);
  if(user.doingWhat == "my-tweets"){
    twitterCall(client);
  }
  //if user picks spotify-this-song
  if(user.doingWhat == "spotify-this-song"){
    inquirer.prompt([
      {
         type: "input",
         name: "song",
         message: "Please enter a song name"
      }
    ]).then(function(user){
      console.log(user.song);
      spotifyCall(spotify, user.song);
      //spotifyCall();
    });
  }
});
