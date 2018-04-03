require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var moment = require('moment');
var inquirer = require('inquirer');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var ombdKey = keys.Ombd.key;


var ombdCall = function(key, movie){

if (movie == ""){
    movie = 'Mr. Nobody';
}
  console.log('THE MOVE IS ' + movie);
  request('http://www.omdbapi.com/?i=tt3896198&apikey=' + key + '&t=' + movie, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    var result = JSON.parse(body);

    //console.log(result.Title); // Print the HTML for the Google homepage.
    console.log("########################");
    console.log("MOVIES QUERY: ");
    console.log("Title: " + result.Title);
    console.log("Year: " + result.Year);
    console.log("IMDB Rating: " + result.imdbRating);
    console.log("Rotten Tomatoes Rating: " + result.Ratings[1].Value);
    console.log("Country Produced: " + result.Country);
    console.log("Language: " + result.Language);
    console.log("Plot: " + result.Plot);
    console.log("Plot: " + result.Actors);
    console.log("########################");
    console.log("");
  });

}


var spotifyCall = function(spotify, songname){

  if (songname == ""){
      songname = 'The Sign';
  }

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

//call twitter api and check dummydev84 most recent 20 tweets
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
     console.log("");

  } // end if
}); //end client.get
} //close twitterCall
//twitterCall(client);


//Takes the created timestamp at provided by twitter and reformats the time stamp to something legible.
var twitterTime = function(timeStamp){
  var newTime = moment(timeStamp, "ddd MMM D HH:mm:ss ZZ YYYY").format('MMMM D, YYYY h:mma');
  return newTime;
}

var doWhatItSaysCall = function(){
  //read from random.txt and perform the requested call with the QUERY
  //format for the file is call request type, QUERY

  fs.readFile('random.txt', 'utf8', function (err, file) {
    if (err) throw err;
    var fromTheFile = file.split(',');
    var query = fromTheFile[1];

    if(fromTheFile[0] == 'spotify-this-song'){
      spotifyCall(spotify, query);
    } else {
      ombdCall(ombdKey, query);
    }
  });
}


//Prompt the user in the command line when the program begins
inquirer.prompt([
  {
    type: "list",
    name: "performThis",
    message: "Hello! I'm LiRiBoT :-) What would you like to do?",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  }
]).then(function(user){
//  console.log(user.doingWhat);
  if(user.performThis == "my-tweets"){
    twitterCall(client);
  }
  //if user picks spotify-this-song
  if(user.performThis == "spotify-this-song"){
    inquirer.prompt([
      {
         type: "input",
         name: "song",
         message: "Please enter a song name"
      }
    ]).then(function(user){
    //  console.log(user.song);
      spotifyCall(spotify, user.song);
    });
  }
    if(user.performThis == "movie-this"){
      inquirer.prompt([
        {
           type: "input",
           name: "movie",
           message: "Please enter a movie title"
        }
      ]).then(function(user){
      //  console.log(user.movie);
        ombdCall(ombdKey, user.movie);
        //spotifyCall();
      });
  }
  // did the user pickdp-what-it-says
  if(user.performThis == "do-what-it-says"){
      doWhatItSaysCall();
  }


}); //prompt
