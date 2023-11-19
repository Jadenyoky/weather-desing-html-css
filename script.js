const apiKey = "bf4404d8d44a5466b1191bd3a7b25643";

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Optionally, handle the error, such as displaying a message to the user
  }
}

function displayWeather(data) {
  // Update the DOM elements with the fetched data
  const { temp_min, temp_max } = data.main;
  document.querySelector(
    "#temp"
  ).textContent = `${data.main.temp.toFixed()} °C`;
  document.querySelector("#temp-min").textContent = `${temp_min.toFixed()} °C`;
  document.querySelector("#temp-max").textContent = `${temp_max.toFixed()} °C`;

  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  document.querySelector("#icon").src = iconUrl;
  document.querySelector("#icon").alt = data.weather[0].description;

  document.querySelector(
    "#city"
  ).textContent = `( ${data.name} - ${data.sys.country} )`;
  document.querySelector(
    "#temp"
  ).textContent = `${data.main.temp.toFixed()} °C`;
  document.querySelector("#description").textContent = capitalizeFirstLetter(
    data.weather[0].description
  );
  document.querySelector("#humidity").textContent = `${data.main.humidity}%`;
  document.querySelector("#pressure").textContent = `${data.main.pressure} hPa`;
  document.querySelector("#visibility").textContent = `${(
    data.visibility / 1000
  ).toFixed(2)} km`;
  document.querySelector("#wind").textContent = `${data.wind.speed.toFixed(
    1
  )} km/h`;
  document.querySelector("#cloudiness").textContent = `${data.clouds.all}%`;
  document.querySelector("#sunrise").textContent = formatTime(data.sys.sunrise);
  document.querySelector("#sunset").textContent = formatTime(data.sys.sunset);
  document.querySelector("#last-update").textContent = `${formatTime(data.dt)}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatTime(unixTime) {
  const date = new Date(unixTime * 1000);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Example usage
fetchWeather("london");
