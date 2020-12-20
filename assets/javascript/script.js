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
    queryUV = "https://api.openweathermap.org/data/2.5/uvi?";
    queryForecast = "https://api.openweathermap.org/data/2.5/forecast?";
    iconURL = "https://openweathermap.org/img/wn/";
    myKey = "appid=3ba28d112b1ad87abd972d7f6388e493";
    var currentCity;
    var currentDate;
    var currentIcon;
    var currentTemp;
    var currentHumidity;
    var currentUV;
    var currentLat;
    var currentLon;
    var citiesSearchedArray = [];

    // Declare Functions
    function retrieveWeatherData(event) {
        // event.preventDefault();
        clearPage();

        var dynamicSearch = localStorage.getItem("dynamicSearch");
        if (dynamicSearch !== null) {
            currentCity = dynamicSearch;
        } else {
            currentCity = cityInputEl[0].value;
            currentCity = capitalizeInput(currentCity);
        }

        /* Make ajax call for "Current Weather Conditions" */
        $.ajax({
            url: queryCurrent + myKey + "&q=" + currentCity + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            /* Store "Current Weater Conditions" */
            currentDate = moment().format("MM/D/YYYY");
            currentIcon = iconURL + response.weather[0].icon + "@2x.png";
            currentTemp = response.main.temp;
            currentHumidity = response.main.humidity;
            currentWind = response.wind.speed;
            currentLat = response.coord.lat;
            currentLon = response.coord.lon;

            /* Write "Current Weather Conditions" to screen */
            var currentCityH3 = $("<h3>");
            currentCityH3.text(currentCity + "     ");
            var currDate = $("<p>");
            currDate = "(" + currentDate + ")     ";
            currentCityH3.append(currDate);
            var currIcon = $("<img>");
            currIcon.attr("src", currentIcon);
            currentCityH3.append(currIcon);
            $("#favicon").attr("href", currentIcon); //Dynamically update favicon with current weather icon
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
                //currentUVIndexP.text("UV Index: " + currentUV);
                currentUVIndexP.text("UV Index: ");
                currentUVIndexP.attr("width", "fit-content");
                var dataP = $("<p>");
                dataP.text(currentUV);
                dataP.attr("width", "fit-content");

                /* Determine color of UV Index element based on scale */
                if (currentUV < 3) {
                    dataP.addClass("UV-green");
                } else if (currentUV >= 3 && currentUV < 6) {
                    dataP.addClass("UV-yellow");
                } else if (currentUV >= 6 && currentUV < 8) {
                    dataP.addClass("UV-orange");
                } else if (currentUV >= 8 && currentUV < 11) {
                    dataP.addClass("UV-red");
                } else if (currentUV >= 11) {
                    dataP.addClass("UV-purple");
                } else {
                    console.log("Something Broke. Contact Admin.");
                }

                currentUVIndexP.append(dataP);
                currentUVEl.append(currentUVIndexP);
            })

            /* Make ajax call for "Five Day Forecast" */
            $.ajax({
                url: queryForecast + myKey + "&q=" + currentCity + "&units=imperial&mode=json",
                method: "GET"
            }).then(function (response) {
                var forecastDateArray = [];
                var forecastIconArray = [];
                var forecastTempArray = [];
                var forecastHumidityArray = [];
                /* Store "Five Day Forecast Data" */
                for (var i = 0; i < response.list.length; i += 8) {
                    forecastDateArray.push(response.list[i].dt_txt);
                    forecastIconArray.push(response.list[i].weather[0].icon);
                    forecastTempArray.push(response.list[i].main.temp);
                    forecastHumidityArray.push(response.list[i].main.humidity);
                }

                /* Write "Five Day Forecast Data" to screen */
                var fiveDayForecastH3 = $("<h3>");
                fiveDayForecastH3.text("5-Day Forecast:");
                fiveDayForecastEl.append(fiveDayForecastH3);
                for (var i = 0; i < 5; i++) {
                    var forecastDayEl = $("<div>");
                    forecastDayEl.addClass("forecastDay");

                    var forecastDateEl = $("<div>");
                    forecastDateEl.addClass("forecastDate");
                    forecastDateArray[i] = forecastDateArray[i].substring(0, 10);
                    forecastDateEl.text(forecastDateArray[i]);
                    forecastDayEl.append(forecastDateEl);

                    var forecastIconEl = $("<img>");
                    forecastIconEl.addClass("forecastIcon");
                    forecastIconEl.attr("src", iconURL + forecastIconArray[i] + "@2x.png");
                    forecastIconEl.text(forecastIconArray[i]);
                    forecastDayEl.append(forecastIconEl);

                    var forecastTempEl = $("<div>");
                    forecastTempEl.addClass("forecastTemp");
                    forecastTempEl.text("Temp: " + forecastTempArray[i] + "°F");
                    forecastDayEl.append(forecastTempEl);

                    var forecastHumidityEl = $("<div>");
                    forecastHumidityEl.addClass("forecastHumidity");
                    forecastHumidityEl.text("Humidity: " + forecastHumidityArray[i] + "%");
                    forecastDayEl.append(forecastHumidityEl);

                    fiveDayForecastEl.append(forecastDayEl);
                }
            })
        })

        storeSearchedCity(currentCity)
    }

    function storeSearchedCity(currCity) {
        /* Add last searched city to front of array */
        citiesSearchedArray.unshift(currCity);

        /* Add last searched city to list on page */
        var cityButton = $("<p>").addClass("").text(citiesSearchedArray[0]);
        storedCitiesEl.prepend(cityButton);

        /* Add array to localStorage */
        localStorage.setItem("citiesSearched", JSON.stringify(citiesSearchedArray));
    }

    function pageInit() {
        /* Check localStorage for exisiting data */
        var citiesFromStorage = JSON.parse(localStorage.getItem("citiesSearched"));
        if (citiesFromStorage !== null) {
            citiesSearchedArray = citiesFromStorage;

            for (var i = 0; i < citiesSearchedArray.length; i++) {
                var cityButton = $("<p>").addClass("").text(citiesSearchedArray[i]);
                storedCitiesEl.append(cityButton);
            }
        }
    }

    function clearPage() {
        currentCityEl.empty();
        fiveDayForecastEl.empty();
        currentTempEl.empty();
        currentHumidityEl.empty();
        currentWindEl.empty();
        currentUVEl.empty();
        fiveDayForecastEl.empty();
    }

    function capitalizeInput(city) {
        return city.replace(/(?:^|\s)\w/g, function (match) {
            return match.toUpperCase();
        });
    }

    // Make Function Calls
    pageInit();

    // Register Event Listeners
    searchButton.on("click", retrieveWeatherData);
    storedCitiesEl.on("click", "p", function () {
        dynamicSearch = this.innerHTML;
        localStorage.setItem("dynamicSearch", dynamicSearch);
        retrieveWeatherData();
    });
});