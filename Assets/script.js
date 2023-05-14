var dailyForecastNum = 5;
var baseURL = "https://api.openweathermap.org";
var weatherApiKey= "26cbab91dad3fbd1df78b7fdca8d6eae";


var forecasts = document.getElementById("forecast-day")

var recentLoc = [];

var getLoc = () => {
    var userLoc = locationInput.value;

    if (userLoc === '') {
        setLocationError('Enter a location');
    } else {
        lookupLocation(userLoc);
    }
}

var clearError = () => {
    let errorDisplay = document.getElementById('error')
    errorDisplay.textContent = '';
}

let locError = (text) => {
    var errorDisplay = document.getElementById('error');
    errorDisplay.textContent = text;

    setTimeout(clearError, 4000);
}

const lookupLocation = (search) => {

    var apiUrl = `${baseURL}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            // Pick the First location from the results
            var lat = data[0].lat;
            var lon = data[0].lon;


            var myData = {
                name: data[0].name,
                country: data[0].country,
                lat: data[0].lat,
                lon: data[0].lon
            }

            console.log(myData);


            // the Weather for the cached location
            var apiUrl = `${baseURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;
            console.log(apiUrl);
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {

                    console.log(data);

                   

                    displayCurrentWeather(data);

                    displayWeatherForecast(data);
                    
                });

                displayWeather(myData);
        });
}

var displayCurrentWeather = (weatherData) => {
    let currWeather = weatherData.current;

    document.getElementById('temp_val').textContent = `${currWeather.temp}°`;
    document.getElementById('humid_val').textContent = `${currWeather.wind_speed}MPH`;
    document.getElementById('wind_val').textContent = `${currWeather.humidity}%`;
}

var displayWeatherForecast = (weatherData) => {

    var dailyData = weatherData.daily;

    document.getElementById('forecast').style.display ='block';

    var forecastlist = document.getElementById('forecast-day');
    forecastlist.innerHTML = '';

    for (let i = 0; i < dailyForecastNum; i++) {
        
        var dailyforecast = dailyData[i];
        var day = new Date(dailyforecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
        var temp = `${dailyforecast.temp.day}°`;
        var humidity = `${dailyforecast.humidity}%`;
        var wind= `${dailyforecast.wind_speed}MPH`;

       
    }

}

const getTheWeather = (lat, lon) => {

    var apiUrl = `${baseURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayCurrentWeather(data);

        displayWeatherForecast(data);
    })
}

var displayWeather = (weatherData) => {
    document.getElementById('loc-name').textContent = `${weatherData.name}, ${weatherData.country}`;

    getTheWeather(weatherData.lat, weatherData.lon);
}

var locationInput = document.getElementById('location');
var searchButton = document.getElementById('search');

searchButton.addEventListener('click', getLoc);