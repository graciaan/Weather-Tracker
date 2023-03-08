var APIkey = '76b47fba64d8e967ca3c17365fddc563';
var cityInput = $("#city-input");
var searchBtn = $(".btn");
var searchHistory = $(".history");

var cityArray =JSON.parse(localStorage.getItem('savedCity')) || [];

function savedCity() {
  event.preventDefault();

  cityInput = $('#city-input').val();
  cityArray.push(cityInput);

  localStorage.setItem('savedCity', JSON.stringify(cityArray));

  searchHistory.empty();

  displayCities();
  getCurrentWeather();
}

function displayCities() {
  for (var i = 0; i < cityArray.length; i++) {
    var cityList = $('<li>').addClass('list-group-item').text(cityArray[i]);
    searchHistory.append(cityList);
  }
}

displayCities();
searchBtn.click(savedCity);

function getCurrentWeather() {
  var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + APIkey;

  fetch(apiURL)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCurrentWeather(data);
        getForecast(data);
      });
    } else {
      alert('City Not Found');
    }
  })
  .catch(function (error) {
    alert('Unable to connect to API');
  })
};

var getForecast = function (data) {
  var cityLat = data.coord.lat;
  var cityLon = data.coord.lon;

  var forecastURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&exclude=minutely,hourly&appid=' + APIkey;

  fetch(forecastURL).then(function (response) {
    response.json().then(function (data) {
      displayForecast(data);
      console.log(data);
    });
  });
};

var city = $("#city");
var today = $("#today");
var currentWeatherEl = $("#current-weather");

var displayCurrentWeather = function (data) {
  currentWeatherEl.empty();
  city.text(data.name);
  today.text(" (" + moment().format("MM/DD/YYYY") + ") ");
  var currentIcon = $(
    "<img src=http://openweathermap.org/img/wn/" +
    data.weather[0].icon +
    "@2x.png>"
  ).addClass("icon");
  var currentTemp = $("<p>").text(
    "Temp: " + ((data.main.temp - 273.15) * 1.8 + 32).toFixed() + "°F"
  );
  var currentWind = $("<p>").text("Wind: " + data.wind.speed + " MPH");
  var currentHumidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
  $("#current-tab").addClass("current-card");

  city.append(today, currentIcon);
  currentWeatherEl.append(city, currentTemp, currentWind, currentHumidity);
};

