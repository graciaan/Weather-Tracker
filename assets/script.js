var APIkey = '76b47fba64d8e967ca3c17365fddc563';
var cityInput = $(".city-input");
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

