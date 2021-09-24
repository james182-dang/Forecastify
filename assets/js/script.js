// DOM element
let authUser = $("#authUser");
// Spotify SDK connection
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQAKDRHeTKI8CGpTXel_W4PSM9hgh4I50GYseRU9BnAyWe6qrsydbhc5KOO4-odJNEXR0uIyZOGIvZNH57hn6xhHSFztSsYBLrqPeezMEob4PrnZbWbypPKALtudgRcQOM4eg-r6CPVmHCk5xN8VHRmqwTBoxS26_gremBxoGX3oWXKzm7tysBY';
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


function authorizeUser() {
    fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX4OzrY981I1W?si=2b5b1a4f59db4827")
        .then (function(response) {
            return response.json;
        })

    // let dataContainer = document.getElementById("#data-container");
    // let loginForm = document.createElement("div");

    // loginForm.innerHTML = 

    // dataContainer.appendChild(loginForm);
};

// Created a call to moment to get the date to put at the top of the page.
var cday = document.querySelector("#currentDay");
var currentdate = moment();
cday.textContent = currentdate.format("ddd, MMMM Do");

// Event Listener
authUser.on("click", authorizeUser);