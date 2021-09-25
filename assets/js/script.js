// DOM elements
let elVerifyButton = document.getElementById("verifySpotify");

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
      url: queryURL2,
      method: "GET"
    }) .then(function(respons) {
      console.log(response);

      // This will remove the data that was in the 5-day forecast previously
      $("#fiveday").empty();

      // Grabs the weather icon and adds it to the page
      var icon = response.current.weather[0].icon;
      var iconImg = $("<img>");
      icon.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
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

      // a for loop to grab the forecast for the next 5 days
      for (i = 1; i < daily.length - 2; i++) {
        var ddate = moment.unix(daily[i].dt).format("dddd MM/DD/YYYY");
        var dtemp = daily[i].temp.day;
        var dhum = daily[i].humidity;
        var dicon = daily[i].weather[0].icon;

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
        $("#fiveday").css({"display":"block"});
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

      weatherGrabAPI();
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