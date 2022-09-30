// Get all the relevant HTML Elements
const cityInput = document.getElementById("city-input");
const searchBtn = document.querySelector("#search-btn");
const cityName = document.querySelector("#city-name");
const condition = document.querySelector("#condition");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const feelslike = document.querySelector("#feelslike");
const errorMsg = document.querySelector("#error-msg");

// Keys given by RapidAPI.com
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "65014af152msh87eda40a94ca1e5p1d1562jsnaa6da74196b4",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

// Get the data form user inputted location
searchBtn.onclick = () => {
  let locationName = cityInput.value;

  fetch(
    `https://weatherapi-com.p.rapidapi.com/current.json?q=${locationName}`,
    options
  )
    .then((response) => response.json())
    .then((weatherData) => outputWeatherData(weatherData))
    .catch((err) => {
      console.error(err);
    });
};

// Check for error and display data
const outputWeatherData = (data) => {
  // Show error message if error is received
  if (data.error) {
    errorMsg.style.display = "block";
    errorMsg.innerHTML = data.error.message;
		// Remove error after 5 seconds
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 5000);
    cityInput.value = "";
  }
	// Display data
  cityName.innerHTML = `${data.location.name}, ${data.location.region}`;
  condition.innerHTML = data.current.condition.text;
  temp.innerHTML = data.current.temp_c;
  humidity.innerHTML = data.current.humidity;
  feelslike.innerHTML = data.current.feelslike_c;
};
