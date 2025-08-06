let input = document.querySelector(".box .search input");
let form = document.querySelector(".box .search ");
let temp = document.querySelector(".box .temp");
let city = document.querySelector(".box .city");
let humidity = document.querySelector(".box .details .col .txt .humid");
let wind = document.querySelector(".box .details .col .txt .wind");
let img = document.querySelector(".box img");
let loader = document.querySelector(".loader");
let weather = document.querySelector(".box .weather");

const apiKey = "2a2934bbd2d881d41d35d1d2c7112d9e";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(cityName) {
  loader.style.display = "block";
  const response = await fetch(apiURL + cityName + `&appid=${apiKey}`);
  var data = await response.json();
  //   console.log(data);

  loader.style.display = "none";

  if (data.cod === "404") {
    input.value = "";
    document.querySelector(".error").style.display = "block";
    weather.style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + " °C";
    humidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clear") {
      img.src = "images/clear.png";
    } else if (data.weather[0].main == "Clouds") {
      img.src = "images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      img.src = "images/rain.png";
    } else if (data.weather[0].main == "Mist") {
      img.src = "images/mist.png";
    } else if (data.weather[0].main == "Drizzle") {
      img.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Snow") {
      img.src = "images/snow.png";
    } else if (data.weather[0].main == "Wind") {
      img.src = "images/wind.png";
    }

    // document.querySelector(".box .weather").style.display = "block";
    weather.style.display = "block"; 
    setTimeout(() => {
      weather.style.opacity = "1"; 
    }, 10);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkWeather(input.value);
});
