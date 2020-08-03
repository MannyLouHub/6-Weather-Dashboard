const apiKey = '588ac8f63f6e3b4105ac6b96471ea921';
//get weather API information
async function getWeatherInformation(city) {
  const data = await fetch(city);
  return await data.json();
}
// convert K to F function.
function convertKelvin(temp) {
  return ((temp - 273.15) * 9 / 5 + 32).toFixed(1);
}
// Get Uv Index API Info
async function getUVIndex(uvi) {
  const uvIndexURL = `//api.openweathermap.org/data/2.5/onecall?lat=${uvi.coord.lat}&lon=${uvi.coord.lon}&exclude=hourly,daily&appid=${apiKey}`;
  const response = await fetch(uvIndexURL);
  const uviData = await response.json();

  console.log(uviData);
  const span = document.createElement('span')
  span.classList.add('p-2');
  span.setAttribute('id', 'uviColor');
  const uviElement = document.createElement('p');
  span.innerText = 'UV Index: ' + uviData.current.uvi;
  uviElement.append(span);
  document.getElementById('cityInfo').append(uviElement);
}
// Applying information to first row on right side.
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
  document.getElementById('cityInfo').append(windSpeed);

}
// Listen to Click Event.
document.getElementById('searchBtn').addEventListener('click', async function (event) {
  document.getElementById('cityInfo').innerHTML = '';
  const cityName = document.getElementById('userSearch').value;
  const currentWeatherURL = `//api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=` + apiKey;
  const data = await getWeatherInformation(currentWeatherURL);
  console.log(data);
  results(data);
  getUVIndex(data);
});

