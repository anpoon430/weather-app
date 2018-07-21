let loc = {};
let url =
  "https://api.darksky.net/forecast/307bd1127a9a2339c5390298d120fa50/";

document.addEventListener("DOMContentLoaded", function() {
  navigator.geolocation.getCurrentPosition(getWeather, err);
});

function getWeather(pos) {
  loc.lat = pos.coords.latitude;
  loc.long = pos.coords.longitude;
  url += loc.lat + ',' + loc.long;
  fetch(url, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      console.log(jsonData);
    })
    .catch(function(error) {
      console.log('Oops! Something went wrong!', error);
    });
}
function err(error) {
  console.warn(`Error ${error.code}: ${error.message}`);
}
