function get5DaysForecast(apiResponse) {
  return apiResponse.list.reduce(function(days,current) {
      var currentDate=current.dt_txt.split(" ")[0];
      if(!days.find(function(day) {
        return day.dt_txt.includes(currentDate);
      })) {
        return [...days,current];
      }
      return days;
  },[])
}

//Example usage
fetch("https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=76b47fba64d8e967ca3c17365fddc563").then(function(response){
  return response.json();
}).then(function(data){
  var fiveDaysForecast=get5DaysForecast(data);
  console.log(fiveDaysForecast);
});