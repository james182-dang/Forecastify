// DOM elements
let elVerifyButton = document.getElementById("verifySpotify");

// Spotify SDK connection
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQA2OGFMjgF415f8j0wRO2ER5znxG2EMRnJqbvs8sREYUqPVowjuko5i7nLFSA7hSQAbvhFYQwcgq_xZoYWfgevDox-uNOi0gVOlpcgVL8GEeWbv0_N8QhZ732kD_l94WHmtC5KW4O5PFWZXv4-FeFfmWrimWxCOEOef5rq_n3AkzYb3JV4blpw';
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



// Function to authenticate Spotify on load, returns playlist data as check
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

};

// Created a call to moment to get the date to put at the top of the page.
var cday = document.querySelector("#currentDay");
var currentdate = moment();
// cday.textContent = currentdate.format("ddd, MMMM Do");

$(document).ready(function () {
  // variable to hold the user's city input
  var city = "";
  // vaiable to hold the latitude and longitude of the city that was called
  var lat = "";
  var lon = "";
  
  //
  $("#spotify-main-container").innerHTML = "";

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
      $("#uv-index").text("UV Index: " + response.current.uvi);

      // This dispalys the html to the user
      $("currentweather").css({"display":"block"});

      // array built to hold the daily response from the api
      var fivedayf = response.daily;
      console.log(fivedayf);
      // a for loop to grab the forecast for the next 5 days
      // for (i = 1; i < fivedayf.length - 2; i++) {
      //   var timestamp = fivedayf[i].dt;
      //   console.log(timestamp);
      //   var datetime = new Date(timestamp);
      //   console.log(datetime.getTime);
      //   var ddate = datetime; //moment.unix(daily[i].dt).format("dddd MM/DD/YYYY");
      //   var dtemp = fivedayf[i].temp.day;
      //   var dhum = fivedayf[i].humidity;
      //   var dicon = fivedayf[i].weather[0].icon;

      //   console.log(ddate);

      //   // creates the elements to hold the data
      //   var ddiv = $("<div>");
      //   var ptemp = $("<p>");
      //   var phum = $("<p>");
      //   var imgicon = $("<img>");
      //   var hdate = $("<h6>");


      //   // adds the text to the elements made above
      //   hdate.text(ddate);
      //   imgicon.attr("src", "https://openweathermap.org/img/wn/" + dicon + "@2x.png");
      //   imgicon.css({"width": "100%"});
      //   ptemp.text("Temp: " + dtemp + "° F");
      //   phum.text("Humidity: " + dhum + "%");

      //   // This appends the elements made above to the html
      //   ddiv.append(hdate);
      //   ddiv.append(imgicon);
      //   ddiv.append(ptemp);
      //   ddiv.append(phum);
      //   $("#5fore").append(ddiv);

      //   // This displays the html to the user
      //   $("#fiveday").css(" box-border border-2");


        // Target, div creation for iframe
        let spotifyMainContainer = $("#spotify-main-container");
        let iFrameDiv = document.createElement("div");

        $("#spotify-main-container").empty();

        // Clouds
        if (response.current.weather[0].main == "Clouds") {
            iFrameDiv;
            iFrameDiv.innerHTML = '<iframe src="https://open.spotify.com/embed/playlist/1Ers2ZxZT2WTcOwIxEWUnb" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
            spotifyMainContainer.append(iFrameDiv);

        // Clear
        } else if (response.current.weather[0].main = "Clear") {
            iFrameDiv;
            iFrameDiv.innerHTML = '<iframe src="https://open.spotify.com/embed/playlist/1e82JSBwrnZF8TODtUcHeR" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
            spotifyMainContainer.append(iFrameDiv);

        // Thunderstorm
        } else if (response.current.weather[0].main = "Thunderstorm") {
            iFrameDiv;
            iFrameDiv.innerHTML = '<iframe src="https://open.spotify.com/embed/playlist/43E16ip1D8xU9Ij8Fqj698" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
            spotifyMainContainer.append(iFrameDiv);
        
        // Drizzle
        } else if (response.current.weather[0].main = "Drizzle") {
            iFrameDiv;
            iFrameDiv.innerHTML = ''
            spotifyMainContainer.append(iFrameDiv);

        // No weather at all?
        } else {
            console.log("Weather has stopped existing. Please make sure you are still connected to the third dimension.")
        };
      // }

      // // array built to hold the daily response from the api
      // var fivedayf = response.daily;
      // console.log(fivedayf);
      // // a for loop to grab the forecast for the next 5 days
      // for (i = 1; i < fivedayf.length - 2; i++) {
      //   var timestamp = fivedayf[i].dt;
      //   console.log(timestamp);
      //   var datetime = new Date(timestamp);
      //   console.log(datetime.getTime);
      //   var ddate = moment.unix(daily[i].dt).format("dddd MM/DD/YYYY");
      //   var dtemp = fivedayf[i].temp.day;
      //   var dhum = fivedayf[i].humidity;
      //   var dicon = fivedayf[i].weather[0].icon;

      //   console.log(ddate);

      //   // creates the elements to hold the data
      //   var ddiv = $("<div>");
      //   var ptemp = $("<p>");
      //   var phum = $("<p>");
      //   var imgicon = $("<img>");
      //   var hdate = $("<h6>");


      //   // adds the text to the elements made above
      //   hdate.text(ddate);
      //   imgicon.attr("src", "https://openweathermap.org/img/wn/" + dicon + "@2x.png");
      //   imgicon.css({"width": "100%"});
      //   ptemp.text("Temp: " + dtemp + "° F");
      //   phum.text("Humidity: " + dhum + "%");

      //   // This appends the elements made above to the html
      //   ddiv.append(hdate);
      //   ddiv.append(imgicon);
      //   ddiv.append(ptemp);
      //   ddiv.append(phum);
      //   $("#5fore").append(ddiv);

      //   // This displays the html to the user
      //   $("#fiveday").css(" box-border border-2");
      // }
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

document.addEventListener('DOMContentLoaded', function() {
  APIController();
});