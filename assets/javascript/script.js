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
    myKey = ""; //ToDo: include openweather api key
    queryURL = ""; //ToDo: include basic query url

    // Declare Functions
    function retrieveWeatherData(event) {
        event.preventDefault();
        /* BUILD AJAX CALL HERE */
    }

    // Make Function Calls

    // Register Event Listeners
    searchButton.on("click", retrieveWeatherData);
})
