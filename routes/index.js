var express = require("express");
var router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index.hbs", { title: "Express" });
  res.render("index.hbs");
});

router.get("/artist-search", function (req, res, next) {
  // console.log(req.query)
  spotifyApi
    .searchArtists(req.query.artistName) //artistName
    .then((data) => {
      console.log("The received data from the API: ", data.body.artists.items[0].images);
      // ----> 'HERE'S WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      res.render("artist-search-results.hbs", data.body.artists);
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

router.get("/albums/:artistId", (req, res, next) => {
  // .getArtistAlbums() code goes here
  console.log(req.params.artistId);
  spotifyApi
    .getArtistAlbums(req.params.artistId)
    .then((data) => {
      console.log("artist albums data: ", data.body.items[0].images);
      res.render("albums.hbs", data);
    })
    .catch((err) => console.log("Error whilst finding albums"));
});

router.get("/tracks/:albumId", (req, res, next) => {
  console.log("album id: ", req.params.albumId);
  spotifyApi
    .getAlbumTracks(req.params.albumId)
    .then((data) => {
      console.log("track data: ", data);
      res.render("tracks.hbs", data);
    })
    .catch((err) => console.log("error finding tracks from album"));
});

module.exports = router;
