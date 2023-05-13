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

    

}


