/*eslint-disable*/
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
  let upper = document.querySelector('#upper');
  let app = document.querySelector('#app');
  let iconURL = data.weather[0].icon;
  let header = document.querySelector('header');
  let img = document.createElement('img');
  let h2 = document.createElement('h2');
  let h3 = document.createElement('h3');
  let section = document.createElement('section');
  let div = document.createElement('div');
  let div2 = div.cloneNode();
  let div3 = div.cloneNode();
  console.log(data);
  city.textContent = data.name;
  h2.textContent = data.weather[0].description;
  img.setAttribute('src', iconURL);

  h2.setAttribute('id', 'weatherDescription');
  setAttributes(section, {id:'lower', class:'row'});
  setAttributes(div, {id:'humidity', class: 'col s4'});
  setAttributes(div2, {id:'hitemp', class: 'col s4'});
  setAttributes(div3, {id:'lotemp', class: 'col s4'});
  h3.setAttribute('id', 'temp');
  header.appendChild(h2);
  upper.appendChild(img);
  upper.appendChild(h3);
  app.appendChild(section);

  let lower = document.querySelector('#lower');
  lower.appendChild(div);
  lower.appendChild(div2);
  lower.appendChild(div3);
  let temp = document.querySelector('#temp');
  temp.textContent = data.main.temp;

  let hitemp = document.querySelector('#hitemp');
  let lotemp = document.querySelector('#lotemp');
  let humidity = document.querySelector('#humidity');
  humidity.textContent = data.main.humidity;
  hitemp.textContent = data.main['temp_max'];
  lotemp.textContent = data.main['temp_min'];

}

function setAttributes(el, obj){
  Object.keys(obj).forEach(attr => el.setAttribute(attr, obj[attr]));
}
