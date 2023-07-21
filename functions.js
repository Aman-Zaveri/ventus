import { createChart } from "./graph.js";

const body = document.querySelector("body");
const middle = document.querySelector(".middle")
const text = document.querySelectorAll(".text");
const weatherIcon = document.querySelector(".weather");
const temperature = document.querySelector("h3");
const place = document.querySelector(".location");
const time = document.querySelector(".time");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");
const realFeel = document.querySelector("#real-feel");
const sunset = document.querySelector("#sunset");
const sunrise = document.querySelector("#sunrise");
const chanceOfRain = document.querySelector(".percentage");
const precipitation = document.querySelector(".amount");
const dailyTemp = document.querySelectorAll(".temperature");
const dailyIcons = document.querySelectorAll(".daily-icon");
const daily = document.querySelectorAll(".daily");
let myChart = null;
let xAxis = [];
let yAxis = [];
const weatherIcons = {
  thunderstorm: "fa-light fa-cloud-bolt",
  rain: "fa-light fa-raindrops",
  drizzle: "fa-light fa-cloud-drizzle",
  snow: "fa-light fa-snowflake",
  mist: "fa-light fa-cloud-fog",
  smoke: "fa-light fa-smoke",
  haze: "fa-light fa-sun-haze",
  dust: "fa-light fa-sun-dust",
  fog: "fa-light fa-cloud-fog",
  sand: "fa-light fa-island-tropical",
  ash: "fa-light fa-volcano",
  tornado: "fa-light fa-tornado",
  squall: "fa-light fa-wind-warning",
  clear: "fa-light fa-sun-bright",
  clouds: "fa-light fa-clouds",
};

const weatherBackgrounds = {
  rain: "rain.jpeg",
  snow: "snow.jpeg",
  tornado: "tornado.jpeg",
  clear: "clear.jpeg",
  clouds: "clouds.jpeg",
  thunderstorm: "thunder.jpeg",
};

function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function presentInformation(chosenLocation, graphColor) {
  console.log(
    "https://api.openweathermap.org/data/2.5/weather?" +
      chosenLocation +
      "&appid=b14a8a18ab13cad1fed46faf72a7224d&units=metric"
  );
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?" +
      chosenLocation +
      "&appid=b14a8a18ab13cad1fed46faf72a7224d&units=metric"
  )
    .then((response) => response.json())
    .then((weather) => {
      weatherIcon.className =
        weatherIcons[weather["weather"][0]["main"].toLowerCase()] + " weather";
      if (weather["weather"][0]["main"].toLowerCase() in weatherBackgrounds) {
        middle.style.backgroundImage = `url(../assets/${weatherBackgrounds[weather["weather"][0]["main"].toLowerCase()]})`
      }
      else {
        middle.style.backgroundImage = `url(../assets/sunset.jpeg)`
      }
      temperature.innerHTML = Math.round(weather["main"]["temp"]) + "°";
      place.classList.remove("skeleton");
      place.innerHTML = weather["name"] + ", " + weather["sys"]["country"];
      time.innerHTML = formatTime(
        new Date(
          new Date().getTime() +
            new Date().getTimezoneOffset() * 60000 +
            (3600000 * weather["timezone"]) / 3600
        )
      );
      description.innerHTML =
        weather["weather"][0]["description"].charAt(0).toUpperCase() +
        weather["weather"][0]["description"].slice(1);
      humidity.innerHTML = weather["main"]["humidity"] + "%";
      wind.innerHTML = weather["wind"]["speed"] + " km/h";
      pressure.innerHTML = weather["main"]["pressure"] + " hPa";
      realFeel.innerHTML = Math.round(weather["main"]["feels_like"]) + "°";
      sunrise.innerHTML = formatTime(
        new Date(
          weather["sys"]["sunrise"] * 1000 +
            new Date().getTimezoneOffset() * 60000 +
            (3600000 * weather["timezone"]) / 3600
        )
      );
      sunset.innerHTML = formatTime(
        new Date(
          weather["sys"]["sunset"] * 1000 +
            new Date().getTimezoneOffset() * 60000 +
            (3600000 * weather["timezone"]) / 3600
        )
      );
    });

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?" +
      chosenLocation +
      "&appid=b14a8a18ab13cad1fed46faf72a7224d&units=metric"
  )
    .then((response) => response.json())
    .then((forecast) => {
      for (let step = 0; step < 5; step++) {
        dailyTemp[step].innerHTML =
          Math.round(forecast["list"][step * 8]["main"]["temp"]) + "°";
        dailyIcons[step].className =
          weatherIcons[
            forecast["list"][step * 8]["weather"][0]["main"].toLowerCase()
          ] + " daily-icon";
      }
      chanceOfRain.innerHTML =
        Math.round(forecast["list"][0]["pop"] * 100) + "%";
      if ("rain" in forecast["list"][0]) {
        precipitation.innerHTML = forecast["list"][0]["rain"]["3h"] + " mm";
      } else {
        precipitation.innerHTML = "0mm";
      }
      xAxis = [];
      yAxis = [];
      for (let step = 0; step < 7; step++) {
        xAxis.push(formatTime(new Date(forecast["list"][step]["dt"] * 1000)));
        yAxis.push(Math.round(forecast["list"][step]["main"]["temp"]));
      }
      myChart = createChart(xAxis, yAxis, myChart, graphColor);
    });
}

export function lightMode() {
  body.style.backgroundColor = "#ffffff";
  for (let step = 0; step < text.length; step++) {
    text[step].style.color = "#475569";
  }
  for (let step = 0; step < daily.length; step++) {
    daily[step].style.color = "#475569";
  }
  myChart = createChart(xAxis, yAxis, myChart, "#475569");
}

export function darkMode() {
  body.style.backgroundColor = "#1e293b";
  for (let step = 0; step < text.length; step++) {
    text[step].style.color = "#cbd5e1";
  }
  for (let step = 0; step < daily.length; step++) {
    daily[step].style.color = "#cbd5e1";
  }
  myChart = createChart(xAxis, yAxis, myChart, "#cbd5e1");
  console.log('Dark mode has been run')
}
