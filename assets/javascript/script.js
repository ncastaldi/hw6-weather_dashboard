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
    myKey = "3ba28d112b1ad87abd972d7f6388e493";
    queryURL = "https://api.openweathermap.org/data/2.5/weather?";

    // Declare Functions
    function retrieveWeatherData(event) {
        event.preventDefault();
        /* BUILD AJAX CALL HERE */
    }

    // Make Function Calls

    // Register Event Listeners
    searchButton.on("click", retrieveWeatherData);
})
