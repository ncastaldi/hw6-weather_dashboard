$(document).ready(function () {

    // Declare DOM Variables
    var cityInputEl = $("#cityInput");
    var searchButton = $("#searchButton");
    var storedCitiesEl = $("#storedCities");
    var currentCityEl = $("#currentCity");
    var currentTempEl = $("#currentTemp");
    var currentHumidityEl = $("#currentHumidity");
    var currentWind = $("#currentWind");
    var currentUVEl = $("currentUV");
    var fiveDayForecastEl = $("fiveDayForecast");

    // Delcare JavaScript Variables
    queryCurrent = "https://api.openweathermap.org/data/2.5/weather?";
    queryUV = "http://api.openweathermap.org/data/2.5/uvi?";
    queryForecast = "http://api.openweathermap.org/data/2.5/forecast?";
    myKey = "appid=3ba28d112b1ad87abd972d7f6388e493&q=";

    // Declare Functions
    function retrieveWeatherData(event) {
        event.preventDefault();

        var currentCity = cityInputEl[0].value;

        /* Make ajax call for "Current Weather" */
        $.ajax({
            url: queryCurrent + myKey + currentCity + "units=imperial",
            method: "GET"
        }).then(function (response) {
            console.log(response);

            /* Store retrieved data */
            var currentDate = ""; //ToDo: Add moment.js to capture and display date
            var currentTemp = response.main.temp;
            var currentHumidity = response.main.humidity;
            var currentWind = response.wind.speed;
            var currLat = response.coord.lat;
            var currLon = response.coord.lon;
            var currUV = retrieveUVIndex(currLat, currLon);

        })
    }

    function retrieveUVIndex(lat, lon) {
        $.ajax({
            url: queryUV + myKey
        })

        return uvIndex;
    }

    // Make Function Calls

    // Register Event Listeners
    searchButton.on("click", retrieveWeatherData);
})
