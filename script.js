function weatherBalloon(cityID) {
    var key = 'b5942f68daa74be0dfea239a7f88064c';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + 4560349 + '&appid=' + key)
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            drawWeather(data);
        })
        .catch(function () {
            // catch any errors
        });
}

window.onload = function () {
    weatherBalloon(4560349);
}

function drawWeather(d) {
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);

    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
    document.getElementById('location').innerHTML = d.name;
}