
$("#search").on('click', function () {

    generateForecast()
})



// ----------------------------------------------------------------------------------------




function generateForecast() {

    var input = $('#input')
    var cityName = input.val();
    var searchList = []

    // ---------------------------

    searchList = JSON.parse(localStorage.getItem("searchList") || "[]");
    searchList.push(cityName)

    localStorage.setItem("searchList", JSON.stringify(searchList))

    var searchDisplay = JSON.parse(localStorage.getItem("searchList"));



    for (i = 0; i < searchDisplay.length; i++) {
        var listItem = $('#search-list').appendChild("li")
        listItem.textContent = cityName
        displayList.appendChild(listItem)

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

            var days = 0

            for (i = 0; i < 6; i++) {


                var dateEl = $("#future").children().eq(days).children().eq(0)
                var weatherIconEl = $("#future").children().eq(days).children().eq(1)
                var tempEl = $("#future").children().eq(days).children().eq(2)
                var windEl = $("#future").children().eq(days).children().eq(3)
                var humidityEl = $("#future").children().eq(days).children().eq(4)


                temp = `Temp: ${fiveDayData[i].main.temp.toFixed(2)}°F`;
                tempEl.text(temp)

                wind = `Wind: ${fiveDayData[i].wind.speed}mph`;
                windEl.text(wind)

                humidity = `Humidity: ${fiveDayData[i].main.humidity}%`;
                humidityEl.text(humidity)

                date = fiveDayData[i].dt_txt.split(" ")[0].replaceAll("-", "/");
                dateEl.text(date)

                weatherIcon = fiveDayData[i].weather[0].icon;
                weatherIconEl.attr("src", 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png')
                days++
            }
        });
    });
}