// the API Key
const apiKey = '588ac8f63f6e3b4105ac6b96471ea921';

// get weather API information
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
  // create span element
  const span = document.createElement('span');
  // add class to span element "for padding"
  span.classList.add('p-1', 'rounded');
  // add id to span-tag
  span.setAttribute('id', 'uviColor');
  // create p element
  const uviElement = document.createElement('p');
  // add information to span element.
  span.innerText = uviData.current.uvi;
  uviElement.innerText = 'UV Index: '
  // append span-tag to p-tag
  uviElement.append(span);
  // added information to div-tag
  document.getElementById('cityInfo').append(uviElement);

// If statement for UV Index Colors
  if (uviData.current.uvi > 8) span.classList.add('bg-danger', 'text-white');
  else if (uviData.current.uvi > 3) span.classList.add('bg-warning');
  else span.classList.add('bg-success');
}

// Applying information to first row on right side.
function results(info) {
  // Setting convert function to variable
  const fahrenheit = convertKelvin(info.main.temp);
  // City name Header1
  const headerName = document.createElement('h1');
  headerName.innerText = info.name;
  document.getElementById('cityInfo').append(headerName);
  // Temperature Header2
  const temperature = document.createElement('h2');
  temperature.innerText = fahrenheit + ' °F';
  document.getElementById('cityInfo').append(temperature);
  // Icon for weather.
  const iconURL = `//openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`
  const img = document.createElement('img')
  img.setAttribute('src', iconURL);
  temperature.append(img);
  // Test for fahrenheit
  console.log(fahrenheit);
  // Status for weather
  const statusText = document.createElement('p');
  statusText.classList.add('font-weight-bold')
  const description = info.weather[0].description
  statusText.innerText = 'Current Status: ' + description.charAt(0).toUpperCase() + description.slice(1);
  document.getElementById('cityInfo').append(statusText);
  // Humidity Paragraph
  const humidity = document.createElement('p');
  humidity.innerText = 'Humidity: ' + info.main.humidity + '%';
  document.getElementById('cityInfo').append(humidity);
  // Wind Speed Paragraph
  const windSpeed = document.createElement('p');
  windSpeed.innerText = 'Wind Speed: ' + info.wind.speed + ' MPH';
  document.getElementById('cityInfo').append(windSpeed);


}

// Listen to Click Event to get user input
document.getElementById('searchBtn').addEventListener('click', async function (event) {
  document.getElementById('cityInfo').innerHTML = '';
  const cityName = document.getElementById('userSearch').value;
  const currentWeatherURL = `//api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=` + apiKey;
  const data = await getWeatherInformation(currentWeatherURL);
  console.log(data);
  results(data);
  getUVIndex(data);
});

