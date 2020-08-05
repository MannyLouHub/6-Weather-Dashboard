// the API Key
const apiKey = '588ac8f63f6e3b4105ac6b96471ea921';
//array of cities
let cityArray = []

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
async function getOneCall(uvi) {
  const uvIndexURL = `//api.openweathermap.org/data/2.5/onecall?lat=${uvi.coord.lat}&lon=${uvi.coord.lon}&exclude=hourly,minutely&appid=${apiKey}`;
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
  uviElement.innerText = 'UV Index: ';
  // append span-tag to p-tag
  uviElement.append(span);
  // added information to div-tag
  document.getElementById('cityInfo').append(uviElement);
  // If statement for UV Index Colors
  if (uviData.current.uvi > 8) span.classList.add('bg-danger', 'text-white');
  else if (uviData.current.uvi > 3) span.classList.add('bg-warning');
  else span.classList.add('bg-success');
  render5days(uviData.daily);
}

function render5days(days) {
  document.getElementById('forecast').innerHTML = '';
  for (let i = 1; i < 6; i++) {
    // card body
    const card = document.createElement('div')
    card.classList.add('card', 'mx-3', 'col')
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body', 'text-center')
    //date for the days
    const date = days[i].dt
    const currentDate = moment(+(date + '000')).format('MM/DD/YYYY');
    // card header
    const cardheader = document.createElement('h6');
    cardheader.innerText = currentDate
    // icon URL
    const iconURL = `//openweathermap.org/img/wn/${days[i].weather[0].icon}@2x.png`
    const img = document.createElement('img');
    img.setAttribute('src', iconURL);
    img.classList.add('iconImages')
    //getting temp for days
    const temp = convertKelvin(days[i].temp.day)
    const para = document.createElement('div');
    para.innerText = 'Temp: ' + temp;
    //getting Humidity for days
    const humidity = days[i].humidity
    const humPara = document.createElement('div');
    humPara.innerText = 'Humidity: ' + humidity + '%';
//append to body
    document.getElementById('forecast').append(card);
    card.append(cardBody);
    cardBody.append(cardheader);
    cardBody.append(img);
    cardBody.append(para);
    cardBody.append(humPara);
  }
}

// Applying information to first row on right side.
function results(info) {
  // Setting convert function to variable
  const fahrenheit = convertKelvin(info.main.temp);
  // Date
  const date = info.dt
  const currentDate = moment(+(date + '000')).format('MM/DD/YYYY');
  // City name Header1
  const headerName = document.createElement('h1');
  headerName.innerText = info.name + ' - ' + currentDate;
  document.getElementById('cityInfo').append(headerName);
  // Temperature Header2
  const temperature = document.createElement('h2');
  temperature.innerText = fahrenheit + ' °F';
  document.getElementById('cityInfo').append(temperature);
  // Icon for weather.
  const iconURL = `//openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`;
  const img = document.createElement('img');
  img.setAttribute('src', iconURL);
  temperature.append(img);
  // Test for fahrenheit
  console.log(fahrenheit);
  // Status for weather
  const statusText = document.createElement('p');
  statusText.classList.add('font-weight-bold');
  const description = info.weather[0].description;
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
document.getElementById('searchBtn').addEventListener('click', async function () {
  document.getElementById('cityInfo').innerHTML = '';
  const cityName = document.getElementById('userSearch').value;
  document.getElementById('userSearch').value = '';
  const currentWeatherURL = `//api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=` + apiKey;
  const data = await getWeatherInformation(currentWeatherURL);
// logging object to console to view information
  console.log(data);
// setting data to result function
  results(data);
//sending data to get UVindex Function
  await getOneCall(data);
//Creating button for dates.

//   let button = document.createElement('button');
//   button.classList.add('p-3', 'list-group-item', 'list-group-item-action"')
//   button.innerText = data.name
//   document.getElementById('buttonlist').append(button)
  // add information to array
  const indexArray = cityArray.indexOf(data.name);
  if (indexArray !== -1) {
    cityArray.splice(indexArray, 1);
  }


  cityArray.push(data.name);
  localStorage.setItem('Array', JSON.stringify(cityArray));


//checking array information
  renderHistory()

});

function renderHistory() {
  document.getElementById('buttonlist').innerHTML = ''
  for (let i = 0; i < cityArray.length; i++) {
    let button = document.createElement('button');
    button.classList.add('p-3', 'list-group-item', 'list-group-item-action"', 'buttonHistory')
    button.innerText = cityArray[i];
    button.addEventListener('click', function () {
      document.getElementById('userSearch').value = this.innerText;
      $('#searchBtn').click();
    })

    document.getElementById('buttonlist').prepend(button)
  }
}

function loadHistory() {
  cityArray = JSON.parse(localStorage.getItem('Array') ?? '[]');
  renderHistory();
  document.getElementById('userSearch').value = cityArray[cityArray.length - 1];
  $('#searchBtn').click();
}

loadHistory();
