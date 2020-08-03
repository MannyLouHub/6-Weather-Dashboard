const apiKey = '588ac8f63f6e3b4105ac6b96471ea921';

async function getWeatherInformation(city) {
  const data = await fetch(city);

  return await data.json();
}

function convertKelvin(temp) {
  return ((temp - 273.15) * 9 / 5 + 32).toFixed(1);
}

async function getUVIndex(uvi) {
  const uvIndexURL = `//api.openweathermap.org/data/2.5/onecall?lat=${uvi.coord.lat}&lon=${uvi.coord.lon}&
exclude=hourly,daily&appid=${apiKey}`
  const uvIndex =

}

function results(info) {
  const fahrenheit = convertKelvin(info.main.temp);
  const resultName = document.createElement('h2');
  resultName.innerText = info.name;
  document.getElementById('cityInfo').append(resultName);
  const temperature = document.createElement('p');
  temperature.innerText = 'Temperature: ' + fahrenheit + ' F';
  document.getElementById('cityInfo').append(temperature);
  console.log(fahrenheit);
  const humidity = document.createElement('p');
  humidity.innerText = 'Humidity: ' + info.main.humidity + '%';
  document.getElementById('cityInfo').append(humidity);
  const windSpeed = document.createElement('p');
  windSpeed.innerText = 'Wind Speed: ' + info.wind.speed + ' MPH'

}

document.getElementById('searchBtn').addEventListener('click', async function (event) {
  document.getElementById('cityInfo').innerHTML = '';
  const cityName = document.getElementById('userSearch').value;
  const currentWeatherURL = `//api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=` + apiKey;
  const data = await getWeatherInformation(currentWeatherURL);
  const uvIndexURL  = getUVIndex(data);
  const uvIndex =
  console.log(data);
  results(data);
});

