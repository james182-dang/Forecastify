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

$(document).ready(function () {
  // variable to hold the user's city input
  var city = "";
  // vaiable to hold the latitude and longitude of the city that was called
  var lat = "";
  var lon = "";

  // This is another call to the API to retrieve the rest of the current weather and daily weather
  function weatherGrabAPI(a,b) {
    weathURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + a + "&lon=" + b + "&exclude=minutely,hourly&appid=aec299195260a001b09706b5bfe740f7&units=imperial";

    // The actual API key to get the rest of the current weathre and 5 day forecast
    $.ajax({
      url: weathURL2,
      method: "GET"
    }) .then(function(response) {
      console.log(response);

      // This will remove the data that was in the 5-day forecast previously
      // $("#fiveday").empty();

      // Grabs the weather icon and adds it to the page
      var icon = response.current.weather[0].icon;
      console.log(icon);
      var iconImg = $("<img>");
      iconImg.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
      console.log(iconImg);
      $("#city").append(iconImg);

      // populates the IDs with the weather data
      $("#temp").text("Temperature: " + response.current.temp + "° F");
      $("#humidity").text("Humidity: " + response.current.humidity + "%");
      $("#wind").text("Wind Speed: " + response.current.wind_speed + " MPH");
      $("#uv-index").text(response.current.uvi);

      // This dispalys the html to the user
      $("currentweather").css({"display":"block"});

      // array built to hold the daily response from the api
      var fivedayf = response.daily;
      console.log(fivedayf);
      // a for loop to grab the forecast for the next 5 days
      for (i = 1; i < fivedayf.length - 2; i++) {
        var timestamp = fivedayf[i].dt;
        console.log(timestamp);
        var datetime = new Date(timestamp);
        console.log(datetime.getTime);
        var ddate = datetime; //moment.unix(daily[i].dt).format("dddd MM/DD/YYYY");
        var dtemp = fivedayf[i].temp.day;
        var dhum = fivedayf[i].humidity;
        var dicon = fivedayf[i].weather[0].icon;

        console.log(ddate);

        // creates the elements to hold the data
        var ddiv = $("<div>");
        var ptemp = $("<p>");
        var phum = $("<p>");
        var imgicon = $("<img>");
        var hdate = $("<h6>");


        // adds the text to the elements made above
        hdate.text(ddate);
        imgicon.attr("src", "https://openweathermap.org/img/wn/" + dicon + "@2x.png");
        imgicon.css({"width": "100%"});
        ptemp.text("Temp: " + dtemp + "° F");
        phum.text("Humidity: " + dhum + "%");

        // This appends the elements made above to the html
        ddiv.append(hdate);
        ddiv.append(imgicon);
        ddiv.append(ptemp);
        ddiv.append(phum);
        $("#5fore").append(ddiv);

        // This displays the html to the user
        $("#fiveday").css(" box-border border-2");
      }
    })
  };

  // This function calls the weather API and inputs the users values
  function weatherGrab() {
    var weathURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=en&appid=aec299195260a001b09706b5bfe740f7";
    $.ajax({
      url: weathURL,
      method: "GET"
    }).then(function (response) {
      // this will grab the latitude and longitude of the city that was input
      lat = response.coord.lat;
      lon = response.coord.lon;

      // Add the city and state to the html for the current weather section
      $("#city").text(response.name);
      $("#date").text(moment.unix(response.dt).format("dddd, MM/DD/YYYY"));

      localStorage.setItem("cityname", response.name);

      weatherGrabAPI(lat,lon);
    });
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
  });

  $("#citysubmit").click(function(event) {
    event.preventDefault();
    searchButton();
  });

});