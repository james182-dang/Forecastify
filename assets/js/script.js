// DOM elements
let elVerifyButton = document.getElementById("verifySpotify");

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

// Code verifier and challenge functions TESTING

// function dec2hex(dec) {
//     return ('0' + dec.toString(16)).substr(-2)
//   }
  
// function generateRandomString() {
//     var array = new Uint32Array(56/2);
//     window.crypto.getRandomValues(array);
//     return Array.from(array, dec2hex).join('');
// }
  
// var verifier = generateRandomString();

// function sha256(plain) { // returns promise ArrayBuffer
//     const encoder = new TextEncoder();
//     const data = encoder.encode(plain);
//     return window.crypto.subtle.digest('SHA-256', data);
// }
  
// function base64urlencode(a) {
//     var str = "";
//     var bytes = new Uint8Array(a);
//     var len = bytes.byteLength;
//     for (var i = 0; i < len; i++) {
//       str += String.fromCharCode(bytes[i]);
//     }
//     return btoa(str)
//       .replace(/\+/g, "-")
//       .replace(/\//g, "_")
//       .replace(/=+$/, "");
// }
  
// async function challenge_from_verifier(v) {
//     hashed = await sha256(v);
//     base64encoded = base64urlencode(hashed);
//     return base64encoded;
// }
  
// var challenge = await challenge_from_verifier(verifier);



// function verifySpotify() {

//     const result = fetch('https://accounts.spotify.com/authorize?client_id=3157f22acedd463f8cf05d236076c33e&response_type=code&redirect_uri=https://james182-dang.github.io/Forecastify/&code_challenge_method=S256&code_challenge=a63ILMPduQMeN_ZewWIlzN6VcOZeA9J1tAH7g_hNSwg', {
//        method: ''
//    })
    
// };



function APIController() {

    let clientID = "3157f22acedd463f8cf05d236076c33e";
    let clientSecret = "1b6cfcf8571647edbb2667eefce03653";
        
        const result = fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        })
        .then (function(response) {
            return response.json();
        })
        .then (function(response) {
            // If statements will begin here in final product
            fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX4OzrY981I1W?si=2b5b1a4f59db4827", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + response.access_token
                }
            })
            .then (function(response) {
                return response.json();
            })
            .then (function(response) {
                console.log(response);
            })
        });

        //Test code to check responses/API calls
        //const data = result.json();
        //console.log(data.access_token);
        //return data.access_token;
};

// BASE function using placeholder playlist
// function getPlaylist() {
//     fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX4OzrY981I1W?si=2b5b1a4f59db4827", {
//         method: 'GET',
//         headers: {
//             'Authorization': 'Bearer ' + accessToken
//         },
//     })

// This code will be later built upon to append the data to the page

    // let dataContainer = document.getElementById("#data-container");
    // let loginForm = document.createElement("div");

    // loginForm.innerHTML = 

    // dataContainer.appendChild(loginForm);
  //};

elVerifyButton.addEventListener("click", verifySpotify);

// Created a call to moment to get the date to put at the top of the page.
var cday = document.querySelector("#currentDay");
var currentdate = moment();
cday.textContent = currentdate.format("ddd, MMMM Do");