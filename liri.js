require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var artistNames = function(artists) {
  return artists.name;
};

// Spotify search query 
var getSong = function(song) {
  if (song === undefined) {
    song ="The Sign";
  }

  spotify.search(
    {
      type: "track",
      query: song,
      limit:5
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      // Collect data in an array called songs - returns 5 matching results for the song name query 
      var songs = data.tracks.items;
      //loop songs array and get the info for each result.
      for (var i = 0; i < songs.length; i++) {
      
        console.log("artist(s): " + songs[i].artists.map(artistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview url: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
       
      }
    }
  );
};

var band = function(artist){
  
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=cdc84c08-b97a-4f9c-8116-5040569d3f27";

 
  axios.get(queryURL).then(
    function(response) {
      var data = response.data;
//if returned data is undefind 
      if (!data.length) {
        console.log("No results for:" + artist);
        return;
      }
//else
      console.log("Upcoming concerts:" + artist);

      for (var i = 0; i < data.length; i++) {
        var concerts = data[i];

        console.log(concerts.venue.city + "," +(concerts.venue.region || concerts.venue.country) + " : " + concerts.venue.name + " " +
            moment(concerts.datetime).format("MM/DD/YYYY")
        );
      }
    }
  );
};

var movie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }
}

