const weatherLabel = document.querySelector(".js-weather")

const API_KEY = "9009787807337227972f9da130b6c08b";
const COORDS = "coords";

function getWeatherData(latitude, longitude) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then(res => {
      return res.json();
    })
    .then(json => {
      const temperature = json.main.temp;
      const humidity = json.main.humidity;
      const country = json.sys.country;
      const city = json.name;

      weatherLabel.innerText = `${temperature}℃, ${humidity}％ @ ${city}, ${country}`
      
      console.log(temperature, humidity, country, city);
      console.log(json);
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
}

function handleGeoError() {
  console.log("geo Error");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  console.log("ask");
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeatherData(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
