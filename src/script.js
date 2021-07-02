function formatDate(timestamp) {
  let date = new Date(timestamp);
    let hourEl = date.getHours();
    if (hourEl < 10) {
      hourEl = `0${hourEl}`;
    }
    let minutesEl = date.getMinutes();
    if (minutesEl < 10) {
      minutesEl = `0${minutesEl}`;
    }
    let dateEl = date.getDate();
    let dayIndex = date.getDay();
    let days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];
    let dayEl = days[dayIndex];
    let monthIndex = date.getMonth();
    let months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
    ];
    let monthEl = months[monthIndex];
    return `${dayEl} ${dateEl} ${monthEl}, ${hourEl}:${minutesEl}`;
  }

  
  function showLondonTemp(response) {
    document.querySelector("#london-temp").innerHTML = Math.round(response.data.main.temp);
    let favesIconLondon = document.querySelector("#favesIconLondon");
    favesIconLondon.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  }
  
  function showBelfastTemp(response) {
    document.querySelector("#belfast-temp").innerHTML = Math.round(response.data.main.temp);
    let favesIconBelfast = document.querySelector("#favesIconBelfast");
    favesIconBelfast.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  }
  
  function showWellingtonTemp(response) {
    document.querySelector("#wellington-temp").innerHTML = Math.round(response.data.main.temp);
    let favesIconWellington = document.querySelector("#favesIconWellington");
    favesIconWellington.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  }
  
  function showBeijingTemp(response) {
    document.querySelector("#beijing-temp").innerHTML = Math.round(response.data.main.temp);
    let favesIconBeijing = document.querySelector("#favesIconBeijing");
    favesIconBeijing.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  }

  function formatDay (timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
      if (index < 6) {
        forecastHTML = forecastHTML + `
        <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="img/${forecastDay.weather[0].icon}.png" alt="" width="42" class="icon-medium"/>
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}º</span>
            <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}º</span>
        </div>
        </div>
        `;
      }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }

  function getForecast(coordinates) {
    let apiKey = "17a639a638a4bfe25417abb69ec4868d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }
  
  function showTemperature(response) {
    document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#small-current-temp").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#currentCity").innerHTML = response.data.name;
    document.querySelector("#country").innerHTML = response.data.sys.country;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    let lastUpdatedElement = document.querySelector("#lastUpdated");
    lastUpdatedElement.innerHTML = formatDate(response.data.dt * 1000);

    getForecast(response.data.coord);
  }
  
  function retrieveSearchedPosition(city) {
    let units = "metric";
    let apiKey = "17a639a638a4bfe25417abb69ec4868d";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let weatherApiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(weatherApiUrl).then(showTemperature);
  }
  
  function updateCity(event) {
    event.preventDefault();
    let city = document.querySelector("#citySearch").value;
    retrieveSearchedPosition(city);
  }
  
  function retrieveCurrentPosition(position) {
    let units = "metric";
    let apiKey = "17a639a638a4bfe25417abb69ec4868d";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let weatherApiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(weatherApiUrl).then(showTemperature);
  }
  
  function getCurrentNavigatorInfo(event) {
    //getCurrentLocation
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
  }
  
  function toFahrenheit(event) {
    event.preventDefault();
    let tempEl = document.querySelector("#current-temp");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    tempEl.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  function toCelsius(event) {
    event.preventDefault();
    let tempEl = document.querySelector("#current-temp");
    tempEl.innerHTML = celsiusTemperature;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  }
  
  function londonTemperature(city) {
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=17a639a638a4bfe25417abb69ec4868d&units=metric`;
    axios.get(weatherApiUrl).then(showLondonTemp);
  }
  
  function belfastTemperature(city) {
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=belfast&appid=17a639a638a4bfe25417abb69ec4868d&units=metric`;
    axios.get(weatherApiUrl).then(showBelfastTemp);
  }
  
  function wellingtonTemperature(city) {
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=wellington&appid=17a639a638a4bfe25417abb69ec4868d&units=metric`;
    axios.get(weatherApiUrl).then(showWellingtonTemp);
  }
  
  function BeijingTemperature(city) {
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=beijing&appid=17a639a638a4bfe25417abb69ec4868d&units=metric`;
    axios.get(weatherApiUrl).then(showBeijingTemp);
  }

  let celsiusTemperature = null;
 
  let fahrenheitLink = document.querySelector("#toF");
  fahrenheitLink.addEventListener("click", toFahrenheit);
  
  let celsiusLink = document.querySelector("#toC");
  celsiusLink.addEventListener("click", toCelsius);
 
  
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", updateCity);
  
  let currentButton = document.querySelector("#current-submit");
  currentButton.addEventListener("click", getCurrentNavigatorInfo);
  
  retrieveSearchedPosition("London");
  londonTemperature("London");
  belfastTemperature("Belfast");
  wellingtonTemperature("Wellington");
  BeijingTemperature("Beijing");
  
 
  