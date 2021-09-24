
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

// TEST SPOTIFY CODE
// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = "BQAb80rmNMRiHEx1XQAh8SxlhOexRknlltu4Plbjh4z_vKIqb4_FxxK4n_HBtoM_MFOB28f79g3xlZLkni_S-XTVfB2nsQRPQUhRfjMpXUjo8IBATeANiqhpg627AJNO2b3Q-ISvIUEidNNBcnV7d5WeVk_IidD2UDQ";

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '3157f22acedd463f8cf05d236076c33e';
const redirectUri = 'https://james182-dang.github.io/Forecastify/';
const scopes = [
  'playlist-modify-public',
  'playlist-read-public'
];

// If there is no token, redirect to Spotify authorization
if (!_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
};


// Functions to append the playlist iframe to the container div
function getSunnyPlaylist() {
    fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX4OzrY981I1W")
}

// Created a call to moment to get the date to put at the top of the page.
var cday = document.querySelector("#currentDay");
var currentdate = moment();
cday.textContent = currentdate.format("ddd, MMMM Do");