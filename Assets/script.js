var dailyForecastNum = 5;
var baseURL = 'https://api.openweathermap.org';
var weatherApiKey = "3770aa61038a0816864d556d797ecb9f";

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

let setLocationError = (text) => {
    var errorDisplay = document.getElementById('error');
    errorDisplay.textContent = text;

    setTimeout(clearError, 4000);
}

const lookupLocation = (search) => {
    var apiUrl = `${baseURL}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
    
    fetch(apiUrl)
        .then(function (response){
            return response.json();
        })  
        .then (function(data){
            console.log(data);
            getweather(data[0]);
        });
}

function getweather(location) {
    let { lat, lon } = location;
    let city = location.name;

    var apiUrl = `${baseURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

    fetch(apiUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            displayCurrentWeather(data);
            displayWeatherForecast(data);
            displayWeather(location);
        });
}

var displayCurrentWeather = (weatherData) => {
    let currWeather = weatherData.current;

    document.getElementById('tempVal').textContent = `${currWeather.temp}°`;
    document.getElementById('humidVal').textContent = `${currWeather.wind_speed}MPH`;
    document.getElementById('windVal').textContent = `${currWeather.humidity}%`;
}

var displayWeatherForecast = (weatherData) => {
    var dailyData = weatherData.daily;
    var forecastlist = document.getElementById('forecast-day');
    forecastlist.innerHTML = '';

    for (let i = 0; i < dailyForecastNum; i++) {
        var dailyforecast = dailyData[i];
        var day = new Date(dailyforecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' });
        var temp = `${dailyforecast.temp.day}°`;
        var humidity = `${dailyforecast.humidity}%`;
        var wind = `${dailyforecast.wind_speed}MPH`;
      
        var newForecast = document.createElement('div');
        newForecast.classList.add('forecast-day');
        newForecast.innerHTML = `
          <div class="weather-info">
            <div class="date">
              <span>${day}</span>
            </div>
            <div class="temperature">
              <span>Temperature: ${temp}</span>
            </div>
            <div class="wind">
              <span>Wind: ${wind}</span>
            </div>
            <div class="humidity">
              <span>Humidity: ${humidity}</span>
            </div>
          </div>
        `;
      
        forecastlist.appendChild(newForecast);
      }
      
      localStorage.setItem('weatherForecast', JSON.stringify(dailyData));
}



const getTheWeather = (lat, lon) => {
    var apiUrl = `${baseURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            displayWeatherForecast(data);

            localStorage.setItem('currentWeather', JSON.stringify(data));
        });
}

var displayWeather = (weatherData) => {
    document.getElementById('loc-name').textContent = `${weatherData.name}, ${weatherData.country}`;
    getTheWeather(weatherData.lat, weatherData.lon);
}


var locationInput = document.getElementById('location');
var searchButton = document.getElementById('search');

searchButton.addEventListener('click', getLoc);


























