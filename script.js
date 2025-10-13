const apiKey ="762f9283ed803474fa825e90e9279174"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  document.getElementById("icon").style.display = "block";
  document.getElementById("icon").src = 
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
  document.getElementById("desc").innerText = data.weather[0].description;
  document.getElementById("feels").innerText = Math.round(data.main.feels_like);
  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("wind").innerText = (data.wind.speed * 3.6).toFixed(1);

  const sunriseTime = new Date(data.sys.sunrise * 1000);
  document.getElementById("sunrise").innerText = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}