import { autocomplete } from "./autocomplete.js";
import { presentInformation, darkMode, lightMode } from "./functions.js";

const search = document.querySelector(".search-button");
const input = document.querySelector("input");
const form = document.querySelector("form");
const mode = document.querySelector(".mode");
let graphColor = "#475569";
let listOfCities = [];

document.querySelector(".container").style.display = "none";

document.querySelector(
  ".middle"
).style.backgroundImage = `url(../assets/sunset.jpeg)`;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    let chosenSpot = "lat=" + lat + "&lon=" + lng;
    presentInformation(chosenSpot);
    document.querySelector(".container").style.display = "block";;
    document.querySelector(".loading").style.display = "none";
  });
}

fetch(
  "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
)
  .then((response) => response.json())
  .then((cities) => {
    for (let step = 0; step < cities.length; step++) {
      listOfCities.push(cities[step]["name"]);
    }
  });

search.addEventListener("click", () => {
  if (
    listOfCities.findIndex(
      (item) => input.value.toLowerCase() === item.toLowerCase()
    ) >= 0
  ) {
    presentInformation("q=" + input.value, graphColor);
    form.classList.remove("invalid");
  } else {
    console.log("Not a valid input");
    form.className += " invalid";
  }
});

input.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    search.click();
  }
});

mode.addEventListener("click", () => {
  if (mode.innerHTML === '<i class="fa-solid fa-moon"></i>') {
    mode.innerHTML = '<i class="fa-solid fa-sun-bright"></i>';
    darkMode();
    graphColor = "#cbd5e1";
  } else {
    mode.innerHTML = '<i class="fa-solid fa-moon"></i>';
    lightMode();
    graphColor = "#475569";
  }
  console.log(graphColor);
});

autocomplete(document.getElementById("myInput"), listOfCities);
