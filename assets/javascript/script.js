$(document).ready(function () {

    // Declare DOM Variables
    var cityInputEl = $("#cityInput");
    var searchButton = $("#searchButton");
    var storedCitiesEl = $("#storedCities");
    var currentWeatherEl = $("#currentWeather");
    var currentCityEl = $("#currentCity");
    var currentTempEl = $("#currentTemp");
    var currentHumidityEl = $("#currentHumidity");
    var currentWindEl = $("#currentWind");
    var currentUVEl = $("#currentUV");
    var fiveDayForecastEl = $("#fiveDayForecast");

    // Delcare JavaScript Variables
    queryCurrent = "https://api.openweathermap.org/data/2.5/weather?";
    queryUV = "http://api.openweathermap.org/data/2.5/uvi?";
    queryForecast = "http://api.openweathermap.org/data/2.5/forecast?";
    iconURL = "http://openweathermap.org/img/wn/";
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
            var currentCityH3 = $("<h3>");
            currentCityH3.text(currentCity + " " + "{TODAYS DATE}" + "{WEATHER ICON}");
            currentCityEl.append(currentCityH3);
            var currentTempP = $("<p>");
            currentTempP.text("Temperature: " + currentTemp + "°F");
            currentTempEl.append(currentTempP);
            var currentHumidityP = $("<p>");
            currentHumidityP.text("Humidity: " + currentHumidity + "%");
            currentHumidityEl.append(currentHumidityP);
            var currentWindP = $("<p>");
            currentWindP.text("Wind Speed: " + currentWind + " MPH");
            currentWindEl.append(currentWindP);

            /* Add border around "Current Weather Conditions" */
            currentWeatherEl.attr("style", "margin-top: 2%; border: 1px; border-color: gray; border-style: solid;")

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
                currentUVEl.append(currentUVIndexP);
            })


            /* Make ajax call for "Five Day Forecast" */
            $.ajax({
                url: queryForecast + myKey + "&q=" + currentCity + "&units=imperial&mode=json",
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var forecastDateArray = [];
                var forecastIconArray = [];
                var forecastTempArray = [];
                var forecastHumidityArray = [];
                /* Store "Five Day Forecast Data" */
                for (var i = 0; i < response.list.length; i += 8) {
                    // console.log(response.list[i].dt_txt);
                    // console.log(response.list[i].main.temp);
                    // console.log(response.list[i].main.humidity);

                    forecastDateArray.push(response.list[i].dt_txt);
                    forecastIconArray.push(response.list[i].weather.icon);
                    forecastTempArray.push(response.list[i].main.temp);
                    forecastHumidityArray.push(response.list[i].main.humidity);
                }
                console.log(forecastDateArray);
                console.log(forecastIconArray);
                console.log(forecastTempArray);
                console.log(forecastHumidityArray);

                /* Write "Five Day Forecast Data" to screen */
                var fiveDayForecastH3 = $("<h3>");
                fiveDayForecastH3.text("5-Day Forecast:");
                fiveDayForecastEl.append(fiveDayForecastH3);

                for (var i = 0; i < 5; i++) {
                    var forecastDayEl = $("<div>");
                    forecastDayEl.addClass("forecastDay");
                    var forecastDateEl = $("<div>");
                    forecastDateEl.addClass("forecastDate");
                    forecastDateEl.text(forecastDateArray[i]);
                    forecastDayEl.append(forecastDateEl);
                    forecastDayEl.append(forecastDateEl);
                    fiveDayForecastEl.append(forecastDayEl);


                }
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