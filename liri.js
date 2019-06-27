require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);


var artistNames = function(artist) {
  return artist.name;
};

// Spotify search query 
var getSong = function(songName) {
  if (songName === undefined) {
    songName = "The Sign" ;
  }

  spotify.search(
    {
      type: "track",
      query: songName,
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
        console.log("----------------------------");
        console.log("song name: " + songs[i].name);
        console.log("----------------------------");
        console.log("preview url: " + songs[i].preview_url);
        console.log("----------------------------");
        console.log("album: " + songs[i].album.name);
        console.log("----------------------------");
       
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

        console.log("City: " + concerts.venue.city);
        console.log("Venue Region: " + concerts.venue.region || concerts.venue.country);
        console.log("Venue Name: " + concerts.venue.name);
        console.log("Date: " +  moment(concerts.datetime).format("MM/DD/YYYY"));
        console.log("--------------------------------");
      }
    }
  );
};


var movie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }



var moviequery =
"http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=2d88790e";

axios.get(moviequery).then(
  function(response) {
    var movieData = response.data;

      console.log("Title: " + movieData.Title);
      console.log("----------------------------");
      console.log("Year: " + movieData.Year);
      console.log("----------------------------");
      console.log("IMDB Rating: " + movieData.imdbRating);
      console.log("----------------------------");
      console.log("Country: " + movieData.Country);
      console.log("----------------------------");
      console.log("Language: " + movieData.Language);
      console.log("----------------------------");
      console.log("Plot: " + movieData.Plot);
      console.log("----------------------------");
      console.log("Actors: " + movieData.Actors);
      console.log("----------------------------");
      
    }
  );
};
   
//movie();
var runFile = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArray = data.split(",");

    if (dataArray.length === 2) {
      select(dataArray[0], dataArray[1]);
    } else if (dataArray.length === 1) {
      select(dataArray[0]);
    }
  });
};

 var select = function(caseData, functionData) {
  switch (caseData) {
  case "concert-this":
    band(functionData);
    break;
  case "spotify-this-song":
    getSong(functionData);
    break;
  case "movie-this":
    movie(functionData);
    break;
  case "do-what-it-says":
    runFile();
    break;
  default:
    console.log("I do not know that");
  }
};
var runThis = function(arg1, arg2) {
  select(arg1, arg2);
};
runThis(process.argv[2], process.argv.slice(3).join(" "));




//getSong("bed of roses");
//band("back street boys");
//movie("lion king");