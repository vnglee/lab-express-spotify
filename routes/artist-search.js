var express = require('express');
var router = express.Router();

spotifyApi
  .searchArtists(artistName)
  .then((data) => {
    console.log("The received data from the API: ", data.body);
    // ----> 'HERE'S WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
  })
  .catch((err) =>
    console.log("The error while searching artists occurred: ", err)
  );
