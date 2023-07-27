$("#search").on("click", function () {
  generateForecast();
});

// ----------------------------------------------------------------------------------------

function generateForecast() {
  var input = $("#input");
  var searchList = [];
  var searchDisplay = $("#search-list");

  // ---------------------------

  searchList = JSON.parse(localStorage.getItem("searchList") || "[]");

  var cityName = input.val().trim();
  if (cityName !== "") {
    searchList.push(cityName);
  }

  localStorage.setItem("searchList", JSON.stringify(searchList));
  console.log(searchList);

  searchDisplay.empty();

  for (var i = 0; i < searchList.length; i++) {
    var listItem = $('<li></li>').text(searchList[i]);
    searchDisplay.prepend(listItem);
  }

  // ---------------------------

  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=acbf659b6dad995f4221a78b638e6923`;
  fetch(weatherUrl).then(function (response) {
    if (!response.ok) {
      return response.json();
    }
    response.json().then(function (data) {
      console.log(data);
      var fiveDayData = [];
      console.log(fiveDayData);
      data.list.forEach((element) => {
        var queryTime = data.list[0].dt_txt;
        var currentHour = new Date(queryTime).getHours();
        var elementDate = new Date(element.dt_txt).getHours();

        if (elementDate === currentHour) {
          fiveDayData.push(element);
        }
      });

      // var currentDate= moment().format('L');

      // var dateElCurrent = $("#current").children(0)
      // var weatherIconElCurrent = $("#current").children(0)
      // var tempElCurrent = $("#current").children(0))
      // var windElCurrent = $("#current").children(0)
      // var humidityElCurrent = $("#current").children(0)

      //     temp = `Temp: ${fiveDayData[i].main.temp.toFixed(2)}°F`;
      //     tempElCurrent.text(temp)

      //     wind = `Wind: ${fiveDayData[i].wind.speed}mph`;
      //     windElCurrent.text(wind)

      //     humidity = `Humidity: ${fiveDayData[i].main.humidity}%`;
      //     humidityElCurrent.text(humidity)

      // date = data.dt_txt.split(" ")[0].replaceAll("-", "/");

      // dateElCurrent.text(currentDate)

      //     weatherIcon = fiveDayData[i].weather[0].icon;
      //     weatherIconElCurrent.attr("src", 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png')

      var days = 0;

      for (i = 1; i < 7; i++) {
        var dateEl = $("#future").children().eq(days).children().eq(0);
        var weatherIconEl = $("#future").children().eq(days).children().eq(1);
        var tempEl = $("#future").children().eq(days).children().eq(2);
        var windEl = $("#future").children().eq(days).children().eq(3);
        var humidityEl = $("#future").children().eq(days).children().eq(4);

        temp = `Temp: ${fiveDayData[i].main.temp.toFixed(2)}°F`;
        tempEl.text(temp);

        wind = `Wind: ${fiveDayData[i].wind.speed}mph`;
        windEl.text(wind);

        humidity = `Humidity: ${fiveDayData[i].main.humidity}%`;
        humidityEl.text(humidity);

        date = fiveDayData[i].dt_txt.split(" ")[0].replaceAll("-", "/");

        dateEl.text(date);

        weatherIcon = fiveDayData[i].weather[0].icon;
        weatherIconEl.attr(
          "src",
          "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
        );
        days++;
      }
    });
  });
}
