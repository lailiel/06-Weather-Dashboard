// var cityName = $("#input").textcontent

var cityName = "Milwaukee"
var search = $(".input-group")



$('#search').on('click', generateForecast())







function generateForecast() {
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

                humidity = (`Humidity: ${fiveDayData[i].main.humidity}%`);
                humidityEl.text(humidity)

                date = fiveDayData[i].dt_txt.split(" ")[0].replaceAll("-", "/");
                dateEl.text(date)

                weatherIcon = fiveDayData[i].weather[0].icon;
                weatherIconEl.text(weatherIcon)
                console.log(days)
                days++
            }
        });
    });
}