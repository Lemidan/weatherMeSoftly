/* global $ */
$(document).ready(function () {
  "use strict";
  var position;

  //Get geolocation.
  $("#locationBtn").click(function () {
    //Button animation.
    $(locationBtn).addClass("animated pulse");

    //Get geolocation.
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var positionLongitude = position.coords.longitude;
        var positionLatitude = position.coords.latitude;

        //Get weather API and assign position.
        $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + positionLatitude + "&lon=" + positionLongitude,
          function (data) {
            //Get the city name, temperature, conditions and image from API.
            var city = data.name;
            var temp = Math.round(data.main.temp).toFixed(1);
            var tempUnit = "C";
            var weather = data.weather[0].description;
            var image = "<img src=" + data.weather[0].icon + ">";

            //Assign the variables to html elements.
            $("#locationOutput").html(city);
            $("#conditionsOutput").html(weather);
            $("#imageOutput").html(image);
            $("#temperatureOutput").html(temp + " °" + tempUnit);

            //Toggle unit.
            $("#temperatureOutput").click(function() {
              if (tempUnit == "C") {
                tempUnit = "F";
                temp = temp * (9 / 5) + 32;
                $("#temperatureOutput").html(temp.toFixed(1) + " °" + tempUnit);
              } else if (tempUnit == "F") {
                tempUnit = "C";
                temp = (temp - 32) * 5 / 9;
                $("#temperatureOutput").html(temp.toFixed(1) + " °" + tempUnit);
              } else {
                $("#temperatureOutput").html("Something went wrong.");
              }
            });

            //Animations for the emergin elements.
            $("#locationOutput").addClass("animated swing");
            $("#conditionsOutput").addClass("animated swing");
            $("#temperatureOutput").addClass("animated swing");
          }
        );
      });
    } else {
      $("locationBtn").html("Location is not available");
    }
  });
});