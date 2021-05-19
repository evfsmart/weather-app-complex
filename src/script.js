function formatDate(now) {
    let hourEl = now.getHours();
    if (hourEl < 10) {
      hourEl = `0${hourEl}`;
    }
    let minutesEl = now.getMinutes();
    if (minutesEl < 10) {
      minutesEl = `0${minutesEl}`;
    }
    let dateEl = now.getDate();
    let dayIndex = now.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let dayEl = days[dayIndex];
    let monthIndex = now.getMonth();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let monthEl = months[monthIndex];
    return `${dayEl} ${dateEl} ${monthEl}, ${hourEl}:${minutesEl}`;
  }
  
  let dateEl = document.querySelector("#currentDate");
  let now = new Date();
  dateEl.innerHTML = formatDate(now);
  
  // let londonTime = document.querySelector("#london-time");
  // londonTime.innerHTML = `${hour}:${minutes}`;
  
  // let belfastTime = document.querySelector("#belfast-time");
  // belfastTime.innerHTML = `${hour}:${minutes}`;
  
  // let wellingtonTime = document.querySelector("#wellington-time");
  // wellingtonTime.innerHTML = `${hour}:${minutes}`;
  
  // let beijingTime = document.querySelector("#beijing-time");
  // beijingTime.innerHTML = `${hour}:${minutes}`;
  
  // function updateCity(event) {
  //   event.preventDefault();
  //   let cityEl = document.querySelector("#currentCity");
  //   let cityInput = document.querySelector("#citySearch");
  //   cityEl.innerHTML = cityInput.value;
  //   retrieveSearchedPosition();
  // }
  
  function showLondonTemp(response) {
    document.querySelector("#london-temp").innerHTML = Math.round(
      response.data.main.temp
    );
  }
  
  function showBelfastTemp(response) {
    document.querySelector("#belfast-temp").innerHTML = Math.round(
      response.data.main.temp
    );
  }
  
  function showWellingtonTemp(response) {
    document.querySelector("#wellington-temp").innerHTML = Math.round(
      response.data.main.temp
    );
  }
  
  function showBeijingTemp(response) {
    document.querySelector("#beijing-temp").innerHTML = Math.round(
      response.data.main.temp
    );
  }
  
  function showTemperature(response) {
    //displayWeatherCondition
    document.querySelector("#current-temp").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#small-current-temp").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#feels-like").innerHTML = Math.round(
      response.data.main.feels_like
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;
  
    document.querySelector("#currentCity").innerHTML = response.data.name;
    document.querySelector("#country").innerHTML = response.data.sys.country;
  }
  
  function retrieveSearchedPosition(city) {
    //searchCity
    let units = "metric";
    let apiKey = "17a639a638a4bfe25417abb69ec4868d";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    // let cityInput = document.querySelector("#citySearch");
    // let city = cityInput.value;
    let weatherApiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(weatherApiUrl).then(showTemperature);
  }
  
  function updateCity(event) {
    //handleSubmit
    event.preventDefault();
    let city = document.querySelector("#citySearch").value;
    retrieveSearchedPosition(city);
  }
  
  function retrieveCurrentPosition(position) {
    //searchLocation
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
    let temperature = Math.round((tempEl.innerHTML * 9) / 5 + 32);
    tempEl.innerHTML = temperature;
  }
  // if temp conversion breaks due to tempEl.innerHTML being string, add line >temperature = Number(temperature);<
  function toCelsius(event) {
    event.preventDefault();
    let tempEl = document.querySelector("#current-temp");
    let temperature = 11; //********************************************* fix!/
    tempEl.innerHTML = temperature;
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
  
  document.querySelector("#toC").addEventListener("click", toCelsius);
  document.querySelector("#toF").addEventListener("click", toFahrenheit);
  
  // navigator.geolocation.getCurrentPosition(retrieveCurrentPosition);
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", updateCity);
  
  let currentButton = document.querySelector("#current-submit");
  currentButton.addEventListener("click", getCurrentNavigatorInfo);
  
  retrieveSearchedPosition("Wellington");
  londonTemperature("London");
  belfastTemperature("Belfast");
  wellingtonTemperature("Wellington");
  BeijingTemperature("Beijing");
  
  // Notes:
  // Get large icon to change based on description
  // Get local time
  