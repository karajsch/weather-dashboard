var key = 'b5942f68daa74be0dfea239a7f88064c';

function weatherBalloon(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            drawWeather(data);
            getFiveDay(city)
        })
        .catch(function (err) {
            // catch any errors
            console.log(err)
        });
}


function get_icon_url(weather) {
    switch (weather) {
        case "snow":
            return "assets/rns-weather-icons/SVG/weather_icons-31.svg"
        case "sun":
            return "assets/rns-weather-icons/SVG/weather_icons-01.svg"
        case "rain":
            return "assets/rns-weather-icons/SVG/weather_icons-19.svg"
        case "clouds":
            return "assets/rns-weather-icons/SVG/weather_icons-17.svg"
        default:
            return "assets/rns-weather-icons/SVG/weather_icons-01.svg"
    }
}

function getFiveDay(city) {

    $.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=4d698eb6c6464d1bba5e19d866c9950f`, (data) => {
        console.log(data)
        let result = data.results[0]
        $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${result.geometry.lat}&lon=${result.geometry.lng}&units=imperial&exclude=hourly,minutely,current,alerts&appid=${key}`, (result_city) => {
            let forecast = result_city.daily;
            console.log(forecast)
            $(".forecast").html("");
            forecast.slice(0, 5).forEach((day, index) => {
                $(".forecast").append(`<div class="card mb-3" style="max-width: 10rem;">
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <img src=${get_icon_url(day.weather[0].main.toLowerCase())} height="100">
                    <p style="text-transform: capitalize;">${day.weather[0].description}</p>
                    <p class="card-text">Temp: ${~~day.temp.day} F</p>
                    <p class="card-text">Humidity: ${day.humidity}%</p>
                </div>
            </div>`)
            })

        })
    })

}



function add_to_local_storage(search) {
    var current = localStorage.getItem("searches")
    if (current !== null) {
        let parsed = JSON.parse(current)
        parsed.push(search)
        localStorage.setItem("searches", JSON.stringify(parsed))
    } else {
        localStorage.setItem("searches", JSON.stringify([search]))
    }
}

function loadPastButtons() {
    localStorage.getItem("searches")
    if (localStorage.getItem("searches")) {
        var buttons = JSON.parse(localStorage.getItem("searches"))
        buttons.forEach((city) => {
            $("#buttons_past").append(`<button onClick=weatherBalloon(${city}) class="city_button m-1">${city}</button>`)
        })
    }
}



$(document).ready(() => {
    let city = "Philadelphia"
    weatherBalloon(city);
    //getFiveDay(city)
    loadPastButtons()

    $(document).on("click", "button.city_button", () => {
        console.log($(this))
        alert($(this).innerHTML)
    })
    // WhenI click on the search button
    // Grab the value from the search box
    // Use that value to get the weather using the functions I wrote earlier
    document.getElementById("searchBtn").addEventListener("click", (e) => {
        e.preventDefault();
        let search = document.getElementById("citySearch").value
        weatherBalloon(search)
        add_to_local_storage(search)




    })
})

function drawWeather(d) {
    console.log(d)
    var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);

    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
    document.getElementById('location').innerHTML = d.name;
    document.getElementById('todaysWeather').src = get_icon_url(d.weather[0].main.toLowerCase());
    document.getElementById('humidity').innerHTML = 'Humidity is ' + d.main.humidity + '&#37;';
    document.getElementById('windspeed').innerHTML = 'Wind Speed is ' + d.wind.speed + ' mph';

}

var today = moment().format("hh:mm A [ on ] dddd, MMMM Do, YYYY");
console.log(today)

$("#today").append(today);

var day1 = moment().add(1, 'days').calendar();
var day2 = moment().add(2, 'days').calendar();
var day3 = moment().add(3, 'days').calendar();
var day4 = moment().add(4, 'days').calendar();
var day5 = moment().add(5, 'days').calendar();

$("#day1").append(day1);
$("#day2").append(day2);
$("#day3").append(day3);
$("#day4").append(day4);
$("#day5").append(day5);