// Default city configuration
const defaultCity = {
  name: "New York",
  timezone: "America/New_York",
};

// Extract city name from timezone
function getCityNameFromTimezone(timezone) {
  // Split timezone by '/' and get the last part (city name)
  const parts = timezone.split("/");
  const cityPart = parts[parts.length - 1];

  // Replace underscores with spaces and capitalize each word
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

// Update the displayed city based on selectiona
function updateDisplayedCity() {
  const select = document.getElementById("timezone");
  const selectedValue = select.value;
  const cityElement = document.getElementById("city");

  if (!selectedValue || !cityElement) return;

  let timezone, cityName;

  if (selectedValue === "current") {
    // Use user's current timezone
    timezone = moment.tz.guess();
    cityName = getCityNameFromTimezone(timezone);
  } else {
    // Use selected timezone
    timezone = selectedValue;
    // Get city name from the selected option text
    const selectedOption = select.options[select.selectedIndex];
    cityName = selectedOption.textContent;
  }

  // Update the city name and timezone
  const cityNameElement = cityElement.querySelector("h2");
  if (cityNameElement) {
    cityNameElement.textContent = cityName;
  }

  // Update the data-timezone attribute
  cityElement.setAttribute("data-timezone", timezone);

  // Update the time immediately
  updateCityTime(cityElement, timezone);
}

// Update displayed city
function updateAllCities() {
  const cityElement = document.getElementById("city");
  if (!cityElement) return;

  const timezone = cityElement.getAttribute("data-timezone");
  if (timezone) {
    updateCityTime(cityElement, timezone);
  }
}

// Initialize the application
function init() {
  // Set up default city
  const cityElement = document.getElementById("city");
  if (cityElement) {
    cityElement.setAttribute("data-timezone", defaultCity.timezone);
    const cityNameElement = cityElement.querySelector("h2");
    if (cityNameElement) {
      cityNameElement.textContent = defaultCity.name;
    }
  }

  // Initial time update
  updateAllCities();

  // Update time every second
  setInterval(updateAllCities, 1000);

  // Add event listener to update button
  const updateButton = document.getElementById("update-time");
  if (updateButton) {
    updateButton.addEventListener("click", updateDisplayedCity);
  }

  // Add event listener to select dropdown
  const timezoneSelect = document.getElementById("timezone");
  if (timezoneSelect) {
    timezoneSelect.addEventListener("change", function () {
      if (this.value) {
        console.log("Selected timezone:", this.value);
        // Wait for button click to updatete
      }
    });
  }
}

// Start the application
document.addEventListener("DOMContentLoaded", init);
