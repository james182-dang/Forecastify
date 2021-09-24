window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQB-hlKahpdBd55qlh2we6bimzSTa299qoQPKp2YK0gUN7jlPuyFryXtDQA5zqTxzffgN_KyXbjFy4Mom7YbWfJpGtMKd16LfdW-LzWfNwmsQjzyeiXTGAyDcQvjnCcGMtXJwCnTMou7vUg36EPbdY46b8eEEedAsSODB--gW7goJHRyb3aaUrk';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    })
    
    // Ready
    player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  player.addListener('initialization_error', ({ message }) => { 
      console.error(message);
  });

  player.addListener('authentication_error', ({ message }) => {
      console.error(message);
  });

  player.addListener('account_error', ({ message }) => {
      console.error(message);
  });

  player.connect();


};


// Created a call to moment to get the date to put at the top of the page.
var cday = document.querySelector("#currentDay");
var currentdate = moment();
cday.textContent = currentdate.format("ddd, MMMM Do");

$(document).ready(function () {
  // variable to hold the user's city input
  var city = "";
  // vaiable to hold the latitude and longitude of the city that was called
  var lat = "";
  var lon = "";

  // This function calls the weather API and inputs the users values
  function weatherGrab() {
    var weathURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=en&appid=aec299195260a001b09706b5bfe740f7";
    $.ajax({
      url: weathURL,
      method: "GET"
    }).then(function (response) {
      
    })
  };

  function searchButton() {
    city = $("input").val().trim();

    // Below is a function that will clear out the input field
    $("input").val("");

    weatherGrab();
  };

  // This is calling the submition of the user's input of the city name
  $("#cityform").submit(function(event) {
    event.preventDefault();
    searchButton();
  })

  $("#citysubmit").submit(function(event) {
    event.preventDefault();
    searchButton();
  })

})