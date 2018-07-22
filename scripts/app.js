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
  let app = document.querySelector('#app');
  let city = document.querySelector('#city');
  let upper = document.querySelector('#upper');
  let header = document.querySelector('header');

  let img = document.createElement('img');
  let h2 = document.createElement('h2');
  let h3 = document.createElement('h3');
  let button = document.createElement('button');
  let div = document.createElement('div');

  div.setAttribute('class', 'container center-align');
  div.setAttribute('id', 'tempAndButton');
  button.setAttribute('class', 'btn-floating btn-large waves-effect waves-light red');
  h2.setAttribute('id', 'weatherDescription');
  h3.setAttribute('class', 'temp',);
  h3.setAttribute('style', 'margin: 10px 5px 0px 5px; display: inline-block');


  let iconURL = data.weather[0].icon || '';
  img.setAttribute('src', iconURL);

  console.log(data);

  button.textContent = '°C';   //initialize values
  city.textContent = data.name;
  h2.textContent = data.weather[0].description;
  h3.textContent = data.main.temp;



  div.appendChild(h3);
  div.appendChild(button);
  header.appendChild(h2);
  upper.appendChild(img);
  upper.appendChild(div);
  // let tempAndButton = document.querySelector('#tempAndButton');



  button = app.querySelector('button');
  let originalTemps = [];

  let hitemp = document.querySelector('#hitemp');
  let lotemp = document.querySelector('#lotemp');
  let humidity = document.querySelector('#humidity');
  humidity.textContent = data.main.humidity;
  hitemp.textContent = data.main['temp_max'];
  lotemp.textContent = data.main['temp_min'];

  button.addEventListener('click', function(){
    let temps = app.querySelectorAll('.temp');
    console.log(temps);
    if (button.textContent === '°C') {
      button.textContent = '°F';
      temps.forEach((e) => {
        if (originalTemps.length <= temps.length) {
          originalTemps.push(e.textContent);
        }
          console.log(e.textContent);
        let farenheit = Number(e.textContent) * 1.8 + 32;
        e.textContent = Math.round(farenheit);
      })
    }
    else {
      button.textContent = '°C';
      temps.forEach((e, i) => {
        e.textContent = originalTemps[i];
      });
    }
  })
}
