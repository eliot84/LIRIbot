require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var moment = require('moment');
var inquirer = require('inquirer');

var client = new Twitter(keys.twitter);

//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);
//console.log("in client" + client);
//console.log("IN SPOTIFY: " + keys.spotify);
//console.log("IN  CLIENT: " + keys.twitter);
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
});

/*
  {
    type: "checkbox",
    name: "carryingWhat",
    message: "What are you carrying in your hands??",
    choices: ["TV", "Slice of Toast", "Butter Knife"]
  },

  {
    type: "confirm",
    name: "canLeave",
    message: "Can you leave now?"
  },

  {
    type: "password",
    name: "myPassword",
    message: "Okay fine. You can stay. But only if you say the magic password."
  }

]).then(function(user) {

  // If the user guesses the password...
  if (user.myPassword === "myHouse") {

    console.log("==============================================");
    console.log("");
    console.log("Well a deal's a deal " + user.name);
    console.log("You can stay as long as you like.");
    console.log("Just put down the " + user.carryingWhat.join(" and ") + ". It's kind of freaking me out.");
    console.log("");
    console.log("==============================================");
  }


  // If the user doesn't guess the password...
  else {

    console.log("==============================================");
    console.log("");
    console.log("Sorry " + user.name);
    console.log("I'm calling the cops!");
    console.log("");
    console.log("==============================================");

  }
});
*/
