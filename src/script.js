// Extract city name from timezone
function getCityNameFromTimezone(timezone) {
  const parts = timezone.split("/");
  const cityPart = parts[parts.length - 1];
  return cityPart.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

// Format and display time for a city
function updateCityTime(cityElement, timezone) {
  const now = moment().tz(timezone);
  const date = now.format("MMMM DD, YYYY");
  const time = now.format("HH:mm");
  const dateElement = cityElement.querySelector(".date");
  const timeElement = cityElement.querySelector(".time");

  if (dateElement) dateElement.textContent = date;
  if (timeElement) timeElement.textContent = time;
}

// Update all city clocks every second
function updateAllCities() {
  for (let i = 1; i <= 3; i++) {
    const cityElement = document.getElementById(`city${i}`);
    if (!cityElement) continue;

    const timezone = cityElement.getAttribute("data-timezone");
    if (timezone) {
      updateCityTime(cityElement, timezone);
    }
  }
}

// Check if timezone already exists
function findCityByTimezone(timezone) {
  for (let i = 1; i <= 3; i++) {
    const cityElement = document.getElementById(`city${i}`);
    if (cityElement.getAttribute("data-timezone") === timezone) {
      return cityElement;
    }
  }
  return null;
}

// When the user updates timezone
function updateDisplayedCity() {
  const select = document.getElementById("timezone");
  const selectedValue = select.value;
  if (!selectedValue) return;

  const timezone =
    selectedValue === "current" ? moment.tz.guess() : selectedValue;
  const cityName = getCityNameFromTimezone(timezone);

  const existingCity = findCityByTimezone(timezone);

  if (existingCity) {
    // Blink border if already present
    existingCity.classList.add("blink-border");
    setTimeout(() => {
      existingCity.classList.remove("blink-border");
    }, 1000);
    return;
  }

  // Replace first city's data
  const cityElement = document.getElementById("city1");
  cityElement.setAttribute("data-timezone", timezone);

  const cityNameElement = cityElement.querySelector("h2");
  if (cityNameElement) {
    cityNameElement.textContent = cityName;
  }

  updateCityTime(cityElement, timezone);
}

// Start app
function init() {
  updateAllCities();
  setInterval(updateAllCities, 1000);

  const updateButton = document.getElementById("update-time");
  updateButton.addEventListener("click", updateDisplayedCity);
}

document.addEventListener("DOMContentLoaded", init);
