var cityName = "";

$("#search").on("click", function () {
  var input = $("#input");
  cityName = input.val().trim();
  generateForecast();
});

$("#clear").on("click", function () {
  clearHistory();
});

$("#search-list").on("click", function (event) {
  var pastSearch = $(event.target);
  cityName = pastSearch.text();
  generateForecast();
});

// ----------------------------------------------------------------------------------------

function clearHistory() {
  localStorage.clear();
  location.reload();
}

// ----------------------------------------------------------------------------------------

function generateForecast() {
  var searchList = [];
  var searchDisplay = $("#search-list");

  searchList = JSON.parse(localStorage.getItem("searchList") || "[]");

  if (cityName !== "") {
    searchList.unshift(cityName);
  }

  localStorage.setItem("searchList", JSON.stringify(searchList));
  console.log(searchList);

  searchDisplay.empty();

  for (var i = 0; i < Math.min(searchList.length, 5); i++) {
    var listItem = $(
      '<button class="btn btn-primary btn-block mb-3 p-1 past-search" id="past-search"></button>'
    ).text(searchList[i]);
    searchDisplay.append(listItem);
  }

  // ----------------------------------------------------------------------------------------

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

      var dateElCurrent = $("#current").children().eq(0);

      var currentDate = new Date();
      var formattedDate = currentDate.toLocaleDateString();

      dateElCurrent.text(cityName + " (" + formattedDate + ")");

      var weatherIconElCurrent = $("#current").children().eq(1);
      var tempElCurrent = $("#current").children().eq(2);
      var windElCurrent = $("#current").children().eq(3);
      var humidityElCurrent = $("#current").children().eq(4);

      temp = `Temp: ${fiveDayData[0].main.temp.toFixed(2)}°F`;
      tempElCurrent.text(temp);

      wind = `Wind: ${fiveDayData[0].wind.speed}mph`;
      windElCurrent.text(wind);

      humidity = `Humidity: ${fiveDayData[0].main.humidity}%`;
      humidityElCurrent.text(humidity);

      weatherIcon = fiveDayData[0].weather[0].icon;
      weatherIconElCurrent.attr(
        "src",
        "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      );

      var days = 0;

      for (i = 0; i < 6; i++) {
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

        var date = new Date();

        date.setDate(date.getDate() + 1 + i);

        var formattedDate = date.toLocaleDateString();

        dateEl.text(formattedDate);

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
