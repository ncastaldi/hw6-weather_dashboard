$(document).ready(function () {

    // Declare DOM Variables
    var cityInputEl = $("#cityInput");
    var searchButton = $("#searchButton");
    var storedCitiesEl = $("#storedCities");
    var currentCityEl = $("#currentCity");
    var currentTempEl = $("#currentTemp");
    var currentHumidityEl = $("#currentHumidity");
    var currentWindEl = $("#currentWind");
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
    function retrieveWeatherData(event, lastSearchCity) {
        event.preventDefault();
        currentCityEl.empty();

        console.log("last searched city: " + lastSearchCity);
        if (localStorage.getItem("lastSearchCity") !== undefined) {
            var currentCity = cityInputEl[0].value;
            storeSearchedCity(currentCity);
        }

        /* Make ajax call for "Current Weather Conditions" */
        $.ajax({
            url: queryCurrent + myKey + "&q=" + currentCity + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            /* Store "Current Weater Conditions" */
            currentTemp = response.main.temp;
            currentHumidity = response.main.humidity;
            currentWind = response.wind.speed;
            currentLat = response.coord.lat;
            currentLon = response.coord.lon;

            /* Write "Current Weather Conditions" to screen */
            currentCityEl.attr("style", "margin-top: 2%; border: 1px; border-color: gray; border-style: solid;")
            var currentCityH3 = $("<h3>");
            currentCityH3.text(currentCity + " " + "{TODAYS DATE}" + "{WEATHER ICON}");
            currentCityEl.append(currentCityH3);
            var currentTempP = $("<p>");
            currentTempP.text("Temperature: " + currentTemp + "°F");
            currentCityEl.append(currentTempP);
            var currentHumidityP = $("<p>");
            currentHumidityP.text("Humidity: " + currentHumidity + "%");
            currentCityEl.append(currentHumidityP);
            var currentWindP = $("<p>");
            currentWindP.text("Wind Speed: " + currentWind + " MPH");
            currentCityEl.append(currentWindP);

            /* Make ajax call for "Current UV Index" */
            $.ajax({
                url: queryUV + myKey + "&lat=" + currentLat + "&lon=" + currentLon,
                method: "GET"
            }).then(function (response) {
                /* Store "Current UV Index" */
                currentUV = response.value;

                /* Write "Current UV Index to screen" */
                var currentUVIndexP = $("<p>");
                currentUVIndexP.text("UV Index: " + currentUV);
                currentCityEl.append(currentUVIndexP);
            })

            /* Make ajax call for "Five Day Forecast" */
            $.ajax({
                url: queryForecast + myKey + "&q=" + currentCity,
                method: "GET"
            }).then(function (response) {
                console.log(response);
            })
        })
    }

    function storeSearchedCity(currCity) {
        console.log(currCity);
        localStorage.setItem("lastSearchedCity", currCity);
    }

    function pageInit() {
        console.log("success");
        if (localStorage.getItem("lastSearchCity") !== null) {
            lastSeached = localStorage.get("lastSearchedCity");
            retrieveWeatherData(lastSearched);
        }
    }

    // Make Function Calls
    pageInit();

    // Register Event Listeners
    searchButton.on("click", retrieveWeatherData);
})
