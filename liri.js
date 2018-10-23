var fs = require("fs");
var dotEnv = require("dotenv").config();
var keys = require("./keys");
var moment = require("moment");
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var searchArg = process.argv.slice(3).join(" ");
var movieUrl = "http://www.omdbapi.com/?t=" + searchArg + "&y=&plot=short&apikey=trilogy";
var bandUrl = "https://rest.bandsintown.com/artists/" + searchArg + "/events?app_id=codingbootcamp";




/*----------MOVIE-THIS----------*/
if (process.argv[2] === "movie-this")
  request(movieUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("TITLE: " + JSON.parse(body).Title + "," + " " + "RELEASED: " +
        JSON.parse(body).Year + "," + " " + "IMDB RATING: " + JSON.parse(body).imdbRating + "," + " " +
        "ROTTEN TOMATOES RATING: " + JSON.parse(body).Ratings[1].Value + "," + " " +
        "PRODUCTION LOCATION: " + JSON.parse(body).Country + "," + " " + "ORIGINAL LANGUAGE: " +
        JSON.parse(body).Language + "," + " " + "PLOT: " + JSON.parse(body).Plot + "," + " " +
        "STARING: " + JSON.parse(body).Actors
      );
    }
  });

/*----------CONCERT-THIS----------*/
if (process.argv[2] === "concert-this")
  request(bandUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log("The next show will be in: " + JSON.parse(body)[0].venue.country + ", " +
        "in the city of " + JSON.parse(body)[0].venue.city + ". " + " The name of the venue is: "
        + JSON.parse(body)[0].venue.name + ". " + "Date of the show: " + moment(JSON.parse(body)[0].datetime).format("MM/DD/YYYY"));
    }
  })

  /*----------SPOTIFY-THIS----------*/
if (process.argv[2] === "spotify-this")
spotify.request("https://api.spotify.com/v1/search?q=" + searchArg + "&type=track&offset=3&limit=3")
.then(function (data) {
  console.log("******************************")
  console.log("Search Result #1:")
  console.log("Song Name: " + searchArg)
  console.log("Artist: " + data.tracks.items[0].artists[0].name)
  console.log("Album Name: " + data.tracks.items[0].album.name)
  console.log("Preview Song at: " + data.tracks.items[0].preview_url)
  console.log("******************************")
  console.log("Search Result #2:")
  console.log("Song Name: " + searchArg)
  console.log("Artist: " + data.tracks.items[1].artists[0].name)
  console.log("Album Name: " + data.tracks.items[1].album.name)
  console.log("Preview Song at: " + data.tracks.items[1].preview_url)
  console.log("******************************")
  console.log("Search Result #3:")
  console.log("Song Name: " + searchArg)
  console.log("Artist: " + data.tracks.items[2].artists[0].name)
  console.log("Album Name: " + data.tracks.items[2].album.name)
  console.log("Preview Song at: " + data.tracks.items[1].preview_url)
})
.catch(function (err) {
  console.error('Error occurred: ' + err);
});

  //do-what-it-says 
   /*`node liri.js do-what-it-says`*/
   //if (process.argv[2] === "do-what-it-says")
    //fs.readFile("random.txt" function())
  



    //spotify-this-song 



