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
    queryForecast = "";
    myKey = "appid=3ba28d112b1ad87abd972d7f6388e493&q=";

    // Declare Functions
    function retrieveWeatherData(event) {
        event.preventDefault();

        var capturedInput = cityInputEl[0].value;

        /* Make ajax call for "Current Weather" */
        $.ajax({
            url: queryCurrent + myKey + capturedInput,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    }

    // Make Function Calls

    // Register Event Listeners
    searchButton.on("click", retrieveWeatherData);
})
