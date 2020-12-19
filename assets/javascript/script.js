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
    myKey = "appid=3ba28d112b1ad87abd972d7f6388e493";
    var currentDate; //ToDo: Add moment.js to capture and display date
    var currentTemp;
    var currentHumidity;
    var currentUV;
    var currentLat;
    var currentLon;


    // Declare Functions
    function retrieveWeatherData(event) {
        event.preventDefault();

        var currentCity = cityInputEl[0].value;

        /* Make ajax call for "Current Weather Conditions" */
        $.ajax({
            url: queryCurrent + myKey + "&q=" + currentCity + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            console.log(response);

            /* Store "Current Weater Conditions" */
            currentTemp = response.main.temp;
            currentHumidity = response.main.humidity;
            currentWind = response.wind.speed;
            currentLat = response.coord.lat;
            currentLon = response.coord.lon;
            console.log("lat= " + currentLat);
            console.log("lon= " + currentLon);

            /* Make ajax call for "Current UV Index" */
            $.ajax({
                url: queryUV + myKey + "&lat=" + currentLat + "&lon=" + currentLon,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                currentUV = response.value;
                console.log(currentUV);
            })


        })
    }

    // Make Function Calls

    // Register Event Listeners
    searchButton.on("click", retrieveWeatherData);
})
