let loc = {};
let url = 'https://fcc-weather-api.glitch.me/api/current?';

document.addEventListener("DOMContentLoaded", function() {
  navigator.geolocation.getCurrentPosition(getWeather, err);
});
function err(error) {
  console.warn(`Error ${error.code}: ${error.message}`);
}

function getWeather(pos) {
  loc.lat = pos.coords.latitude;
  loc.long = pos.coords.longitude;
  url += `lat=${loc.lat}&lon=${loc.long}`;
  fetch(url)
    .then(response => response.json())
    .then(displayWeather)
    .catch(error => {
      console.log('Oops! Something went wrong!', error);
    });
}

function displayWeather(data){
  let city = document.querySelector('#city');
  let today = document.querySelector('#today');
  let iconURL = data.weather[0].icon;
  city.textContent = data.name;
  console.log(data);
  let iconElement = document.createElement('img');

  iconElement.setAttribute('src', iconURL);
  today.appendChild(iconElement);


}
