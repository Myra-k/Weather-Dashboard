var dailyForecastNum = 5;
var baseURL = 'http://api.openweathermap.org';
var weatherApiKey = "d88475fbbf0b433a0f9e5f2aa5fbe29a";


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
    fetch( apiUrl )
        .then(function (response){

            return response.json()
        })  
        .then (function(data){

            console.log(data);
            getweather(data[0])
        })

     


        }
        
        function getweather(location) {
                let { lat, lon } = location
                let city = location.name




                // Pick the First location from the results
                // var lat = data[0].lat;
                // var lon = data[0].lon;


                // var mydata = {
                //     name: data[0].name,
                //     country: data[0].country,
                //     lat: data[0].lat,
                //     lon: data[0].lon

                // }
                // console.log(myData);


                // the Weather for the cached location
                var apiUrl = `${baseURL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;
                console.log(apiUrl);
                fetch(apiUrl)
                    .then(function (response){
                        return response.json()

                    })
                    .then(function(data) {

                        console.log(data);



                        displayCurrentWeather(data);

                        displayWeatherForecast(data);

                  

                displayWeather(data);
                 });
            }
// )}

var displayCurrentWeather = (weatherData) => {
    let currWeather = weatherData.current;

    document.getElementById('tempVal').textContent = `${currWeather.temp}°`;
    document.getElementById('humidVal').textContent = `${currWeather.wind_speed}MPH`;
    document.getElementById('windVal').textContent = `${currWeather.humidity}%`;
}

var displayWeatherForecast = (weatherData) => {

    var dailyData = weatherData.daily;

    //     var day1 = new Date(dailyforecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
    // console.log(day1);
    //     $('#day1day_value').text(day1);
    //     document.getElementById('day1temp_vale').textContent=`${dailyForecastNum.temp.day}•`;

    // document.getElementById('forecast').style.display ='block';

    // var forecastlist = document.getElementById('forecast-day');
    // forecastlist.innerHTML = '';

        for (let i = 0; i < dailyForecastNum; i++) {

            forecasts.innerHTML += `<div class="fivedays"><p>${math.floor(((data.daily[i].temp.max)-32)*(5/9))}</p><p>${data.daily[i].wind_speed}</p>`;
  //         var newForecast=document.getElementById('div');
    //         newForecast.classList.add('forecast-day');
    //         newForecast.innerHTML = `<div class="weather-info">
    //         <div class="date">
    //             <span>${day}</span>
    //         </div>
    //         <div class="temperature">
    //            <span>${temp}</span>
    //        </div>
    //        <div class="wind">
    //            <span>${wind}</span>
    //        </div>
    //       <div class="humidity">
    //           <span>${humidity}</span>
    //      </div> 
    //      </div>`;

    //      forecastlist.appendChild(newForecast);


    //         var dailyforecast = dailyData[i];
    //         var day = new Date(dailyforecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long'});
    //         var temp = `${dailyforecast.temp.day}°`;
    //         var humidity = `${dailyforecast.humidity}%`;
    //         var wind= `${dailyforecast.wind_speed}MPH`;


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