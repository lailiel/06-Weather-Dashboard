function getApi() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=f5f3ddf3910736b34c1aca155ff392a9`;
    fetch(requestUrl)
}