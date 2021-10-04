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
          // Test playlist to verify authentication
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

        // Target, div creation for iframe
        let spotifyMainContainer = $("#spotify-main-container");
        let iFrameDiv = document.createElement("div");

        $("#spotify-main-container").empty();
        document.body.style.backgroundImage = "";

        // Clouds
        if (response.current.weather[0].main == "Clouds") {
            iFrameDiv;
            iFrameDiv.innerHTML = '<iframe src="https://open.spotify.com/embed/playlist/1Ers2ZxZT2WTcOwIxEWUnb" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
            spotifyMainContainer.append(iFrameDiv);
            document.body.style.backgroundImage = "url(./Images/eberhard-grossgasteiger-pgTu7tevuro-unsplash.jpg";

        // Clear
        } else if (response.current.weather[0].main = "Clear") {
            iFrameDiv;
            iFrameDiv.innerHTML = '<iframe src="https://open.spotify.com/embed/playlist/1e82JSBwrnZF8TODtUcHeR" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
            spotifyMainContainer.append(iFrameDiv);
            document.body.style.backgroundImage = "url(./Images/mosi-knife--PVgDgKXgZA-unsplash.jpg";

        // Thunderstorm
        } else if (response.current.weather[0].main = "Thunderstorm") {
            iFrameDiv;
            iFrameDiv.innerHTML = '<iframe src="https://open.spotify.com/embed/playlist/43E16ip1D8xU9Ij8Fqj698" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
            spotifyMainContainer.append(iFrameDiv);
            document.body.style.backgroundImage = "url(./Images/johannes-plenio-ESL1rIs9j48-unsplash.jpg";
        
        // Drizzle
        } else if (response.current.weather[0].main = "Drizzle") {
            iFrameDiv;
            iFrameDiv.innerHTML = '<iframe src="https://open.spotify.com/embed/playlist/64ldyxYYVgdIxvuuTabYfX" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
            spotifyMainContainer.append(iFrameDiv);
            document.body.style.backgroundImage = "url(./Images/ed-leszczynskl-R3ofE-8DyLk-unsplash.jpg)";
        
        // Rain
        } else if (response.current.weather[0].main = "Rain") {
            iFrameDiv;
            iFrameDiv.innerHTML = '<iframe src="https://open.spotify.com/embed/playlist/1VOREp7qG3Jen3Mpgdus41" width="100%" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>'
            spotifyMainContainer.append(iFrameDiv);
            document.body.style.backgroundImage = "url(./Images/josh-wilburne-6qtdLAQXmgs-unsplash.jpg";

        // No weather at all?
        } else {
            console.log("Weather has stopped existing. Please make sure you are still connected to the third dimension.")
        };
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

document.addEventListener('authenticateSpotifyComplete', function() {
  APIController();
});

window.onload = APIController();